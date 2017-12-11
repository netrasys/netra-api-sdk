var ids = require('../app').ImageDetectionService

var config = {
	apiKey: '123abc',
	defaultCallbackUrl:'http://api.webhookinbox.com/i/D5xZFEyC/in/'
}
var client = new ids(config)

var image_url = 'https://storage.googleapis.com/thehundreds/media/2015/10/nike-versus-adidas-the-hundreds-article2-.jpeg'

client.processImage(image_url, client.validEndpoints.BRANDS)
.then(data => console.log(data))
.catch(error => console.log(error))
