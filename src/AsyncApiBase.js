'use strict'

const fetch = require("node-fetch");
const http = require('http');
const pool = new http.Agent({ maxSockets: 100 });

class AsyncApiBase {
	constructor(apiKey){
		this.apiKey = apiKey;
		this.contentType = "application/json";
	}

	async makeRequest(url,body,method='POST'){
		try {
			const response = await fetch(url,
				{
					method: method,
					headers: {
						'Ocp-Apim-Subscription-Key': this.apiKey,
						'Content-Type':'application/json'
					},
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