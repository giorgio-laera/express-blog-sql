const dbConnection = require("../data/db");


//const checkTime= require('../middlewares/checkTime')
function index(req, res) {
const sqlQuery = "SELECT *FROM posts";

dbConnection.query(sqlQuery, (err, rows) => {
	if(err) {
		console.log(err);
		return res.status(500).json({error: 'DB error', message:'errore nel recuperare i dati'});
	}
	res.json(rows);
})
	// if (req.query.tag) {
	// 	result = posts.filter(post => post.tags.includes(req.query.tag));
	// }



	
	console.log('questo e result', )
}

function show(req, res) {
	const id = (req.params.id);
	res.json(posts.find(post => post.id == id))
}


function store(req, res) {

	const newId = posts.at(-1).id + 1;

	newPost = {
		id: newId,
		title: req.body.title,
		img: req.body.img,
		descrizione: req.body.descrizione
	}
	posts.push(newPost)

	res.sendStatus(201);
}

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

	const title= req.body.title;
	const content= req.body.content;
	const image= req.body.img;
	const tags= req.body.tags;
	
	if (title){
  		result.title=title;

	} if (content){
		result.content =content;
		
	} if (image){
		result.image =image;
		
	} if (tags){
		result.tags = tags;
		
	}
	console.log(result)
	res.send(`hai Modificato (parzialmente) un elemento ${req.params.id} `);
}

function destroy(req, res) {
	const id = (req.params.id)
	const postsFiltered = posts.find(post => post.id == id);

	posts.splice(posts.indexOf(postsFiltered), 1);

	console.log(`post ${id} eliminato, nuova lista dei post:`, posts);

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