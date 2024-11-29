require('dotenv').config();
const associations = require('./database/associations');
const express = require('express');
const app = express();
const database = require('./database/connection');
const config = require('./config/environment');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const admin_routes = require('./routes/admin_routes');
const user_routes = require('./routes/user_routes');

app.use('/admin',admin_routes);
app.use('/user',user_routes);

database
.sync()
.then(()=>{
    app.listen(config.app.port,()=>{
        console.log("Server is live on port "+config.app.port);
    })
})
.catch((err)=>{
    console.log("Enable to establish database connection: "+err);
})