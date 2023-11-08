const { Comment } = require('../models');
const commentData = [
    {
        comment_content: "This is a comment",
        user_id: 1,
        blog_id: 1
    },
    {
        comment_content: "This is another comment",
        user_id: 2,
        blog_id: 2
    },
    {
        comment_content: "This is a third comment",
        user_id: 3,
        blog_id: 3
    },
    {
        comment_content: "This is a fourth comment",
        user_id: 4,
        blog_id: 4
    },
    {
        comment_content: "This is a fifth comment",
        user_id: 5,
        blog_id: 5
    }
    {
        comment_content: "This is a sixth comment",
        user_id: 6,
        blog_id: 6
    }
];
const seedComments = () => Comment.bulkCreate(commentData);
module.exports = seedComments;

const { Blog } = require('../models');
const blogData = [
  {
    title: "First Blog",
    content: "This is the content of the first blog",
    user_id: 1
  },
  {
    title: "Second Blog",
    content: "This is the content of the second blog",
    user_id: 2
  }
  {
    title: "Third Blog",
    content: "This is the content of the third blog",
    user_id: 3
  },
  {
    title: "Fourth Blog",
    content: "This is the content of the fourth blog",
    user_id: 4
  },
  {
    title: "Fifth Blog",
    content: "This is the content of the fifth blog",
    user_id: 5
  },
  {
    title: "Sixth Blog",
    content: "This is the content of the sixth blog",
    user_id: 6
  }
];
const seedBlogs = () => Blog.bulkCreate(blogData);
module.exports = seedBlogs;

const { User } = require('../models');
    const userData = [
      {
        username: "user1",
        email: "user1@email.com",
        password: "password1"
      },
      {
        username: "user2",
        email: "user2@email.com",
        password: "password2"
      },
      {
        username: "user3",
        email: "user3@email.com",
        password: "password3"
      },
      {
        username: "user4",
        email: "user4@email.com",
        password: "password4"
      },
      {
        username: "user5",
        email: "user5@email.com",
        password: "password5"
      },
      {
        username: "user6",
        email: "user6@email.com",
        password: "password6"
      }
    ];
    const seedUsers = () => User.bulkCreate(userData);
    module.exports = seedUsers;