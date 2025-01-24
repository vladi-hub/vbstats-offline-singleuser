const { db } = require('../util/admin');

exports.addStats  = (request, response) => {
	let reqBody = request.body;
	//console.log("===============addStats:" + reqBody);
    const newBlock = {
        b_error: reqBody.b_error,
        b_touch: reqBody.b_touch,
        b_block: reqBody.b_block,
        b_success: reqBody.b_success,
        playerId: reqBody.playerId,
        gameId: reqBody.gameId,
        name: reqBody.name,
        number: reqBody.number,
        position: reqBody.position,
        
        d_missed: reqBody.d_missed,
        d_touch: reqBody.d_touch,
        d_success: reqBody.d_success,
        
        h_error: reqBody.h_error,
        h_kill: reqBody.h_kill,
        h_total: reqBody.h_total,
        
        p_error: reqBody.p_error,
        p_keep: reqBody.p_keep,
        p_poor: reqBody.p_poor,
        p_perfect: reqBody.p_perfect,
        
        s_total: reqBody.s_total,
        s_ace: reqBody.s_ace,
        s_error: reqBody.s_error
    };
    
    db
        .collection('stats')
        .add(newBlock)
        .then((doc)=>{
            const responseTodoItem = newBlock;
            responseTodoItem.id = doc.id;
            return response.json(responseTodoItem);
        })
        .catch((error) => {
            console.error(error);
			response.status(500).json({ error: 'Something went wrong' });
		});
}

exports.getStats  = (request, response) => {
	db
		.collection('stats')
        .where('gameId', '==',request.params.gameId)
		.get()
		.then((data) => {
			let stats = [];
			data.forEach((doc) => {
				//console.log(doc.id, "=>", doc.data());
				stats.push({
                    id: doc.id,
                    b_error: doc.data().b_error,
			        b_touch: doc.data().b_touch,
			        b_block: doc.data().b_block,
			        b_success: doc.data().b_success,
			        playerId: doc.data().playerId,
			        gameId: doc.data().gameId,
			        name: doc.data().name,
			        number: doc.data().number,
			        position: doc.data().position,
			        
			        d_missed: doc.data().d_missed,
			        d_touch: doc.data().d_touch,
			        d_success: doc.data().d_success,
			        
			        h_error: doc.data().h_error,
			        h_kill: doc.data().h_kill,
			        h_total: doc.data().h_total,
			        
			        p_error: doc.data().p_error,
			        p_poor: doc.data().p_poor,
			        p_keep: doc.data().p_keep,
			        p_perfect: doc.data().p_perfect,
			        
			        s_total: doc.data().s_total,
			        s_ace: doc.data().s_ace,
			        s_error: doc.data().s_error
				});
			});
			console.log("Stats Array:" + JSON.stringify(stats));
			return response.json(stats);
		})
		.catch((err) => {
			console.error(err);
			return response.status(500).json({ error: error.code });
		});
}

exports.deleteAllStatsPerGame  = (request, response) => {
	var statsdelete_query = db
		.collection('stats')
        .where('gameId', '==',request.params.gameId);
        
		statsdelete_query.get().then(function(querySnapshot) {
		  querySnapshot.forEach(function(doc) {
		    doc.ref.delete();
		  });
		});
}

exports.updateStats = (request, response) => {
	if(request.body.statsId){
        response.status(403).json({message: 'Not allowed to edit'});
    }
    let reqBody = request.body;
    let document = db.collection('stats').doc(`${request.params.statsId}`);
    document.update({
    	b_error: reqBody.b_error,
        b_touch: reqBody.b_touch,
        b_block: reqBody.b_block,
        b_success: reqBody.b_success,
        playerId: reqBody.playerId,
        gameId: reqBody.gameId,
        name: reqBody.name,
        number: reqBody.number,
        
        d_missed: reqBody.d_missed,
        d_touch: reqBody.d_touch,
        d_success: reqBody.d_success,
        
        h_error: reqBody.h_error,
        h_kill: reqBody.h_kill,
        h_total: reqBody.h_total,
        
        p_error: reqBody.p_error,
        p_keep: reqBody.p_keep,
        p_poor: reqBody.p_poor,
        p_perfect: reqBody.p_perfect,
        
        s_total: reqBody.s_total,
        s_ace: reqBody.s_ace,
        s_error: reqBody.s_error
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

exports.updatePlayerName = (request, response) => {
    let reqBody = request.body;
    //console.log(">>>>>>>>>>>>>" + request.params.playerId);
    let document = db.collection('stats').where('playerId', '==',request.params.playerId).get()
	.then((data) => {
		
		data.forEach((doc) => {
			console.log("------- Update doc with ID" + doc.id);
			doc.ref.update({name : reqBody.name, number: reqBody.number})
		});
		return response.status(200).json({ 
            error: 'Update successful !' 
		})
	})
	.catch((err) => {
		console.error(err);
		return response.status(500).json({ error: err.code });
	});
}

exports.deleteStats = (request, response) => {
	const document = db.doc(`/stats/${request.params.statsId}`);
    document
        .get()
        .then((doc) => {
            if (!doc.exists) {
                return response.status(404).json({ 
                    error: 'Stats not found' 
            })}
            if(doc.data().username !== request.user.username){
                return response.status(403).json({error:"UnAuthorized"})
            }
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