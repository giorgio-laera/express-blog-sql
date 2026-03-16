
const express = require('express');
const postsRouter = require('./routers/posts');
const app =express()
const errorsHandler= require('./middlewares/errorsHandler')
const port =3000


app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/posts', postsRouter);
app.use(errorsHandler);

app.get('/', (req,res)=>{
 res.send("ciao")
})
app.listen(port, () =>{
    console.log(`Example app listening on port ${port}`)
})