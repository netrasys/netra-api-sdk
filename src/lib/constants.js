module.exports = {
	baseUrl: 'https://api.getnetra.com',
	imageDetectionService: {
		route: '/image-detection',
		singleImage: '/process',
		endpoints: {
			ALL: '/all',
			BRANDS: '/brands',
			CONTEXT: '/context',
			HUMANS: '/humans'
		}
	},
	videoDetectionService: {
		route: '/async-video-detection-service',
		singleImage: '/process',
		endpoints: {
			BRANDS: '/brands'			
		}
	}
}