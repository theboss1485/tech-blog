const User = require('./User.js');
const BlogPost = require('./BlogPost.js');
const Comment = require('./Comment.js');

User.hasMany(BlogPost, {

    foreignKey: 'user_id',
    OnDelete: 'CASCADE'
});

BlogPost.belongsTo(User, {

    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

BlogPost.hasMany(Comment, {

    foreignKey: 'blog_post_id',
    onDelete: 'CASCADE'
});

Comment.belongsTo(BlogPost, {

    foreignKey: 'blog_post_id',
    onDelete: 'CASCADE'
});

User.hasMany(Comment, {

    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Comment.belongsTo(User, {

    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});



module.exports = {User, BlogPost, Comment}