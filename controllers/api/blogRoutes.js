const router = require('express').Router();
const { Blog, User, Comment } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

// Get all users
router.get('/', (req, res) => {
    Blog.findAll({
        attributes: [
            'id',
            'title',
            'comment_content',
            'created_at'
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_content', 'blog_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            } 
        ]
    })
    .then(dbBlogData => res.json(dbBlogData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
// Get one user
router.get('/:id', (req, res) => {
    Blog.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'comment_content',
            'created_at'
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_content', 'blog_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            } 
        ]
    })
    .then(dbBlogData => {
        if (!dbBlogData) {
            res.status(404).json({ message: 'No blog found with this id'});
            return;
        }
        res.json(dbBlogData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Post Route to Create a Blog
router.post('/', withAuth, (req, res) => {
    Blog.create({
        title: req.body.title,
        comment_content: req.body.comment_content,
        user_id: req.session.user_id
    })
    .then(dbBlogData => res.json(dbBlogData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Put Route to Update a Blog
router.put('/:id', withAuth, (req, res) => {
    Blog.update(
        {
            title: req.body.title,
            comment_content: req.body.comment_content
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbBlogData => {
        if (!dbBlogData) {
            res.status(404).json({ message: 'No blog found with this id'});
            return;
        }
        res.json(dbBlogData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Delete Route to Delete a Blog
router.delete('/:id', withAuth, (req, res) => {
    Blog.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbBlogData => {
        if (!dbBlogData) {
            res.status(404).json({ message: 'No blog found with this id'});
            return;
        }
        res.json(dbBlogData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;