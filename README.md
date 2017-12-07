# netra-api-sdk-js

The official SDK for Netra's API

## Install

```
npm install netra-api-sdk
```

## Usage
```
var ids = require('netra-api-sdk').ImageDetectionService

var config = {
	apiKey: 'abc123',
	defaultCallbackUrl:'http://maWebApp.com/callback'
}

var client = new ids(config)

var image_url = 'https://foo.com/image.jpeg'

client.processImage(image_url, ids.validEndpoints.BRANDS)
.then(data => console.log(data))
.catch(error => console.log(error))

```

## Opening Issues

If you encounter a bug with the SDK we would like to hear about it. Search the existing issues and try to make sure your problem doesn’t already exist before opening a new issue. It’s helpful if you include the version of the SDK, Node.js and OS you’re using. Please include a stack trace and reduced repro case when appropriate, too.

## Documentation

For more details please check out our documentation:

[https://netrasys.github.io/netra-api-sdk](https://netrasys.github.io/netra-api-sdk)
