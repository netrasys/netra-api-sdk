# netra-api-sdk-js

The official SDK for Netra's API

>Install

```
npm install netra-api-sdk
```

>Usage
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

[Documentation](https://netrasys.github.io/netra-api-sdk)
