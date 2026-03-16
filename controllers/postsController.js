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
	
const {title, content, image}=req.body;
const sqlQuery="INSERT INTO posts (title, content, image) VALUES (?, ?, ?)"
dbConnection.query(sqlQuery,[title, content, image],(err,results)=>{
	if(err){
		return res.status(500).json({error:"DB Error" ,message:"Impossibile caricare la risorsa"})
	}
	res.status(201);
	console.log(results)
	res.json({ id:results.insertId})
})
}

function update(req, res) {
	const id = Number(req.params.id);
	if(isNaN(id)){
		return res.status(400).json({error:"User error", massage:"L'id non e valido"})
	}

	const {title, content, image} =req.body;

	let parametryQuery =[title, content, image, id];
	
	const sqlQuery= `UPDATE posts 
					SET title= ?, content= ? ,image= ?
					WHERE id= ?`
	dbConnection.query(sqlQuery, parametryQuery,(err, results)=>{
		if(err){
			console.log(err)
		return res.status(500).json({error:"DB Error" ,message:"Impossibile caricare la risorsa"})
	}   if(results.affectedRows === 0){
		return res.status(404).json({ error: "Not found", message: "Impossibile modificare una post non esistente" });
	}
	
	const sqlQueryReturn= `SELECT * 
					FROM posts
					WHERE id= ? `;
	dbConnection.query(sqlQueryReturn,[id],(err, results)=>{
	res.status(200).json(results)
	})
	})
	

	
}

function modify(req, res) {
	const id = Number(req.params.id);
	if(isNaN(id)){
		return res.status(400).json({error:"User error", massage:"L'id non e valido"})
	}

	const {title, content, image} =req.body;
	console.log(image)

	let parametryQuery =[title, content, image, id];
	
	let sqlQuery= `UPDATE posts 
					SET title= ?, content= ? ,image= ?
					WHERE id= ?`
	
	if(!title){
		sqlQuery= `UPDATE posts 
					SET  content= ?, image= ?
					WHERE id= ?`;
		parametryQuery =[ content, image, id];
	}
	if(!content){
		sqlQuery= `UPDATE posts 
					SET  title= ?, image= ?
					WHERE id= ?`;
		parametryQuery =[ title,image, id];
	}
	if(!image){
		sqlQuery= `UPDATE posts 
					SET  title= ?, content= ?
					WHERE id= ?`;
		parametryQuery =[ title, content, id];
	}
	if(!title && !content){
		sqlQuery= `UPDATE posts 
					SET  image= ?
					WHERE id= ?`;
		parametryQuery =[ image, id];
	}
	if(!title &&!image){
		sqlQuery= `UPDATE posts 
					SET content= ?
					WHERE id= ?`;
		parametryQuery =[  content, id];
	}if(!content && !image){
		sqlQuery= `UPDATE posts 
					SET  title= ?
					WHERE id= ?`;
		parametryQuery =[ title, id];
	}
	dbConnection.query(sqlQuery, parametryQuery,(err, results)=>{
		if(err){
			console.log(err)
		return res.status(500).json({error:"DB Error" ,message:"Impossibile caricare la risorsa"})
	}   if(results.affectedRows === 0){
		return res.status(404).json({ error: "Not found", message: "Impossibile modificare una post non esistente" });
	}
	
	const sqlQueryReturn= `SELECT * 
					FROM posts
					WHERE id= ? `;
	dbConnection.query(sqlQueryReturn,[id],(err, results)=>{
	res.status(200).json(results)
	})
	})
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