const dbConnection = require("../data/db");


//const checkTime= require('../middlewares/checkTime')
function index(req, res) {
	const sqlQuery = "SELECT *FROM posts";

	dbConnection.query(sqlQuery, (err, rows) => {
		if (err) {
			console.log(err);
			return res.status(500).json({ error: 'DB error', message: 'errore nel recuperare i dati' });
		}
		res.json(rows);
	})
	// if (req.query.tag) {
	// 	result = posts.filter(post => post.tags.includes(req.query.tag));
	// }




	console.log('questo e result',)
}

function show(req, res) {
	const id = Number(req.params.id)

	if (isNaN(id)) {
		return res.status(400).json({ error: "User Error", message: "L'id non e valido" })
	}

	const sqlQuery = `SELECT * 
					FROM posts
					WHERE id= ? `;
	const relationQuery= `SELECT tags.label
						  FROM post_tag
						  JOIN tags
						  ON post_tag.tag_id = tags.id 
						  WHERE post_id =?`
	const paramentryQuery = [id];
    
	dbConnection.query(sqlQuery, paramentryQuery, (err, results) => {
		if (err) {
			return res.status(500).json({ error: "DB Error", message: "errore nel trovare il post" })
		}
		const posts = results[0]
		dbConnection.query(relationQuery, paramentryQuery,(err, results)=>{
			if(err) {
				return res.status(500).json({error:"DB Error" ,message:"Impossibile trovare la risorsa"})
			}
		posts.tags=results.map(tag=>tag.label)
			res.status(200).json(posts)
		})
	})
}


function store(req, res) {
	

function update(req, res) {
	const id = (req.params.id);
	result = posts.find(post => post.id == id);


	result.title = req.body.title;
	result.content = req.body.content
	result.image = req.body.image
	result.tags = req.body.tags

	res.status(200)
	res.json(result)
}

function modify(req, res) {
	const id = (req.params.id)
	const result = posts.find(post => post.id == id);

	const title = req.body.title;
	const content = req.body.content;
	const image = req.body.img;
	const tags = req.body.tags;

	if (title) {
		result.title = title;

	} if (content) {
		result.content = content;

	} if (image) {
		result.image = image;

	} if (tags) {
		result.tags = tags;

	}
	console.log(result)
	res.send(`hai Modificato (parzialmente) un elemento ${req.params.id} `);
}

function destroy(req, res) {
	const id = Number(req.params.id)

	if (isNaN(id)) {
		return res.status(400).json({ error: "User Error", message: "L'id non e valido" })
	}

	const sqlQuery = "DELETE FROM posts WHERE id = ?";
	const paramentryQuery = [id];

	dbConnection.query(sqlQuery, paramentryQuery, (err, rows) => {
		if (err) {
			return res.status(500).json({ error: "DB error", message: "Impossibile eliminare la pizza" })
		}
		if (rows.affectedRows === 0) {
			res.status(404).json({ error: "Not Found", message: "Post non trovato" })
		}
		return res.sendStatus(204);
	})



	return res.sendStatus(204);

}
const postsController = {
	index,
	show,
	store,
	update,
	modify,
	destroy
};

module.exports = postsController;