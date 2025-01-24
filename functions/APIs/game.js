const { db } = require('../util/admin');

exports.addGame  = (request, response) => {
	let reqBody = request.body;
    const newGame = {
        title: reqBody.title,
        userId: reqBody.userId

    };
    
    db
        .collection('game')
        .add(newGame)
        .then((doc)=>{
            const responseTodoItem = newGame;
            responseTodoItem.id = doc.id;
            return response.json(responseTodoItem);
        })
        .catch((error) => {
            console.error(error);
			response.status(500).json({ error: 'Something went wrong' });
		});
}

exports.getGame  = (request, response) => {
	db
	.collection('game')
    .where('userId', '==',request.params.userId)
		.get()
		.then((data) => {
			
			let players = [];
			data.forEach((doc) => {
				//console.log(doc.id, "=>", doc.data());
				players.push({
                    id: doc.id,
                    title: doc.data().title
				});
			});
			return response.json(players);
		})
		.catch((err) => {
			console.error(">>>>>>>>>>>>> ERROR:"+err);
			return response.status(500).json({ error: error.code });
		});
}

exports.updateGame = (request, response) => {
	if(request.body.gameId){
        response.status(403).json({message: 'Not allowed to edit'});
    }
    let reqBody = request.body;
    let document = db.collection('game').doc(`${request.params.gameId}`);
    document.update({
    	title: reqBody.title
	})
    .then((doc)=> {
        response.json({message: 'Updated successfully'});
    })
    .catch((error) => {
        if(error.code === 5){
            response.status(404).json({message: 'Not Found'});
        }
        console.error(error);
        return response.status(500).json({ 
                error: error.code 
        });
    });
}

exports.deleteGame = (request, response) => {
	const document = db.doc(`/game/${request.params.gameId}`);
    document
        .get()
        .then((doc) => {
            if (!doc.exists) {
                return response.status(404).json({ 
                    error: 'Game not found' 
            })}
            
            return document.delete();
        })
        .then(() => {
            response.json({ message: 'Delete successfull' });
        })
        .catch((err) => {
            console.error(err);
            return response.status(500).json({ 
                error: err.code 
            });
        });
}