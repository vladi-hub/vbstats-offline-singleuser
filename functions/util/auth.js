const { admin, db } = require('./admin');
const { getIdToken, getAuth } = require('firebase/auth');

module.exports = (request, response, next) => {
	let idToken;
	if (request.headers.authorization && request.headers.authorization.startsWith('Bearer ')) {
		idToken = request.headers.authorization.split('Bearer ')[1];
	} else {
		console.log('No token found');
		return response.status(403).json({ error: 'Unauthorized' });
	}
	admin
		.auth()
		.verifyIdToken(idToken)
		.then((decodedToken) => {
			request.user = decodedToken;
			//console.log(">>>>>>>> 1 = Token decoded - " + request.user.uid);
			return db.collection('users').where('userId', '==', request.user.uid).limit(1).get();
		})
		.then((data) => {
			if(data && (data.docs.length > 0)){
				console.log(">>>>>>>> 2 = data.docs[0].data() - " +  data.docs[0].data());
				request.user.username = data.docs[0].data().username;
			}	
			return next();
		})
		.catch((err) => {
			console.log(err);
			console.error('Error while verifying token', err.stack);
			return response.status(403).json(err);
		});
};