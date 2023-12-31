const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    Comment.findAll({})
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => res.status(500).json(err));
});

router.post('/', withAuth, (req, res) => {
    Comment.create({
        comment_content: req.body.comment_content,
        blog_id: req.body.blog_id,
        user_id: req.session.user_id
    })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => res.status(500).json(err));
});

router.delete('/:id', withAuth, (req, res) => {
    Comment.destroy({
        where: { id: req.params.id }
    })
    .then(dbCommentData => {
        if (!dbCommentData) {
            res.status(404).json({ message: 'No comment found with this id'});
            return;
        }
        res.json(dbCommentData);
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;