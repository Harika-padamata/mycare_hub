module.exports = (handler) => {
	return async (req, res, next) => {
		try {
			console.log('****************888888888')
			await handler(req, res)
		} catch(err) {
			console.log('****************')
			next(err)
		}
	}
}