const Video = require('../models/video');
const User = require('../models/user');
const Views = require('../models/view');

User.hasMany(Views, {foreignKey:'user_id'});
Views.belongsTo(User,{foreignKey:'user_id'});

Video.hasMany(Views,{foreignKey:'video_id'});
Views.belongsTo(Video,{foreignKey:'video_id'});

