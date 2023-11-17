const User = require('./User.js');
const BlogPost = require('./BlogPost.js');

BlogPost.belongsTo(User, {

    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

User.hasMany(BlogPost, {

    foreignKey: 'user_id',
    OnDelete: 'CASCADE'
});

module.exports = {User, BlogPost}