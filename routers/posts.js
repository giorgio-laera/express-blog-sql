
const express = require('express');
const router =express.Router();
const postsController =require('../controllers/postsController');
//const checkId= require('../middlewares/checkId')

//index(cRud) "visualizzare tutti gli elementi"
router.get('/',postsController.index)

//Show(cRud) visualizzare singolo elemento
router.get('/:id', postsController.show)

//Store(Crud) per aggiungere un elemento
router.post('/', postsController.store)

//Update(crUd) serve per MODIFICARE un INTERO ELEMENTO
router.put('/:id', postsController.update)

//Modify (crUd) serve  MODIFICARE (parzialmente) un elemento
router.patch('/:id', postsController.modify)

// Destroy (cruD) serve per ELIMINARE un elemento
router.delete('/:id', postsController.destroy)

module.exports = router;