const { db } = require('../util/admin');

exports.addPlayer  = (request, response) => {
	let reqBody = request.body;
    const newPlayer = {
        name: reqBody.name,
        number: reqBody.number,
        position: reqBody.position,
        userId: reqBody.userId
    };
    
    db
        .collection('player')
        .add(newPlayer)
        .then((doc)=>{
            const responseTodoItem = newPlayer;
            responseTodoItem.id = doc.id;
            return response.json(responseTodoItem);
        })
        .catch((error) => {
            console.error(error);
			response.status(500).json({ error: 'Something went wrong' });
		});
}

exports.getPlayer  = (request, response) => {
	db
	.collection('player')
    .where('userId', '==',request.params.userId)
		.get()
		.then((data) => {
			
			let players = [];
			data.forEach((doc) => {
				//console.log(doc.id, "=>", doc.data());
				players.push({
                    id: doc.id,
                    name: doc.data().name,
                    number: doc.data().number,
					position: doc.data().position
				});
			});
			return response.json(players);
		})
		.catch((err) => {
			console.error(err);
			return response.status(500).json({ error: error.code });
		});
}

exports.updatePlayer = (request, response) => {
	if(request.body.playerId){
        response.status(403).json({message: 'Not allowed to edit'});
    }
    let reqBody = request.body;
    console.log(reqBody);
    let document = db.collection('player').doc(request.params.playerId);
    document.update({
    	name: reqBody.name,
        number: reqBody.number,
        position: reqBody.position
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

exports.deletePlayer = (request, response) => {
	const document = db.doc(`/player/${request.params.playerId}`);
    document
        .get()
        .then((doc) => {
            if (!doc.exists) {
                return response.status(404).json({ 
                    error: 'Player not found' 
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
