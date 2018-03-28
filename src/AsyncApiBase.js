'use strict'

const fetch = require("node-fetch");
const https = require('https');
const pool = new https.Agent({ maxSockets: 100 });

class AsyncApiBase {
	constructor(apiKey){
		this.apiKey = apiKey;
		this.contentType = "application/json";
	}

	async makeRequest(url,body,headers={},method='POST'){

		var defaultHeaders = {
			'Ocp-Apim-Subscription-Key': this.apiKey,
			'Content-Type': this.contentType
		};

		//combine default headers + custom
		Object.assign(headers, defaultHeaders)

		try {
			const response = await fetch(url,
				{
					method: method,
					headers: headers,
					body:JSON.stringify(body),
					agent: pool
				});
			const json = await response.json();
		
			if(response.status != 202){
				throw new Error(json.message)
			}else{
				return json
			}
		} catch (error) {
			return Promise.reject(error);
		}

	};
}

module.exports = AsyncApiBase;