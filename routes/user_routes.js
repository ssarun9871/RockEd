const Router = require("express").Router();
const {
    getContent,
    watchContent
 } = require("../controllers/user_controller");

 Router.get('/content',getContent);
 Router.patch('/content/:video_id',watchContent);

 module.exports = Router;