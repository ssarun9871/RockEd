const Router = require("express").Router();
const { 
    addContent,
    editContent,
    getContentList ,
    getContentById
} = require("../controllers/admin_controller");

Router.post('/content',addContent);
Router.put('/content/:id',editContent);
Router.get('/list',getContentList);
Router.get('/content',getContentById);

module.exports = Router;