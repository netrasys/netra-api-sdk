'use strict'

const AsyncApiBase = require('./AsyncApiBase');
const assert = require('assert');
const queryString = require('query-string');
const constants = require('./lib/constants');

/**
 * API client of Netra's Image Detection Service.
 * @class
 * @constructor
 * @param {object} config
 * @property {string} config.defaultCallbackUrl - Address of where callbacks will be returned to, can be overridden in processImage.
 * @property {string=} config.apiKey - Can be obtained from https://dev.getnetra.com. Can be set as an environment variable NETRA_API_KEY.
 * @example
var ids = require('./app').ImageDetectionService

var config = {
	apiKey:'abcdefghijklmnopqrstuvwxyz',
	defaultCallbackUrl:'http://myApp.com/callback/'
}

var client = new ids(config)
 */
class ImageDetectionService extends AsyncApiBase{
		constructor(config) {
			let apiKey = config.apiKey || process.env.NETRA_API_KEY;
			assert(apiKey,'apiKey required. Set in config object or env variable NETRA_API_KEY')
			assert(config.defaultCallbackUrl,'defaultCallbackUrl required')
			super(config.apiKey)
			this.defaultCallbackUrl = config.defaultCallbackUrl;
			this.apiUrl = constants.baseUrl + (process.env.CUSTOM_SERVICE_ROUTE || constants.imageDetectionService.route)
		}

		/**
		 * Adds an image to the processing queue of the Netra API
		 * @param {string} image_url - a valid url of a public image
		 * @param {string} endpoint - classification model type. Object from ImageDetectionService.endpoints
		 * @param {string=} callback_url - callback url, will override ImageDetectionService.defaultCallbackUrl
		 * @param {object=} threshold - detection threshold, an integer between 0 and 100, if not specified the default for the model type will be used
		 * @param {object=} query_params - data that will be appended to the query params of the callback url
		 * @param {object=} metadata - data that will be added to a property called "metadata" in the callback JSON
		 * @returns {promise}
		 * @example
		 * client.processImage(image_url, ids.validEndpoints.BRANDS)
		 * .then(data => console.log(data))
		 * .catch(error => console.log(error))
		 */
		async processImage(image_url, endpoint, callback_url=this.defaultCallbackUrl, threshold=null, query_params={}, metadata={}) {
			try {
				assert(image_url)
				assert(endpoint)
				assert(threshold === null || (typeof(threshold) === 'number' && parseInt(threshold) === threshold),
					'threshold must be an integer or absent');
				assert(threshold === null || (threshold >= 0 && threshold <= 100), 'threshold must be between 0 and 100');
				assert.deepEqual(typeof(metadata),'object','metadata must be of type object');
				assert.deepEqual(typeof(query_params),'object','query_params must be of type object')
				assert.deepEqual(typeof(callback_url),'string','callback_url must be of type string')
				assert.deepEqual(typeof(endpoint),'string','endpoint must be of type string')
				assert.deepEqual(typeof(image_url),'string','image_url must be of type string')

				if(Object.values(constants.imageDetectionService.endpoints).indexOf(endpoint) > -1){
					let query_params_string = query_params ? queryString.stringify(query_params) : '';
					let url = this.apiUrl + constants.imageDetectionService.singleImage + endpoint
					let body = {
						'callback_url':callback_url + '?' + query_params_string,
						'image_url': image_url,
						'metadata': metadata
					}
					if (threshold !== null)
						body['threshold'] = threshold;

					return await super.makeRequest(url,body)
				}else{
					throw Error('Invalid endpoint or type for argument \"endpoint\". Usage i.e. ImageDetectionService.endpoints.HUMANS')
				}
			} catch (error) {
				return Promise.reject(error);
			}
		}

		/**
		 * Returns object of valid endpoints for the ImageDetectionService route. i.e. client.endpoints.BRANDS
		 * @returns {object}
		 */
		get validEndpoints(){
			return constants.imageDetectionService.endpoints;
		}

	}

module.exports = ImageDetectionService;
