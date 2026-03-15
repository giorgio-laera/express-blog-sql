
function errorsHandler (err,req,res,next){
    console.log(err.message)
res.status(500)
res.json({error: err.message});
}
module.exports=errorsHandler;