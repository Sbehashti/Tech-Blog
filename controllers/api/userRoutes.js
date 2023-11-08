const router = require('express').Router();
const { User, Blog, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//Get all users
router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] }
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => res.status(500).json(err));
});
// Get one user
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: { id: req.params.id },
        include: [
            {
                model: Blog,
                attributes: ['id', 'title', 'comment_content', 'created_at']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_content', 'created_at'],
                include: {
                    model: Blog,
                    attributes: ['title']
                }
            }
        ]
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => res.status(500).json(err));
});

// Post Route to Create a User
router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password
    })
    // Create a session
    .then(dbUserData => {
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username
            req.session.loggedIn = true;
            res.json(dbUserData);
        });
    })
    .catch(err => res.status(500).json(err));
});
// Post Route to Login
router.post('/login', (req, res) => {
    User.findOne({
        where: { username: req.body.username }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(400).json({ message: 'No user with that username'});
            return;
        }
        // Verify User
        const validPassword = dbUserData.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect Password'});
            return;
        }
        // Create a session
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username
            req.session.loggedIn = true;
            res.json({ user: dbUserData, message: 'You are now logged in!'});
        });
    });
});
// Post Route to Logout
router.post('/logout', withAuth, (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
        res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

// Put Route to Update a User
router.put('/:id', withAuth, (req, res) => {
    User.update(req.body, {
        individualHooks: true,
        where: { id: req.params.id }
    })
    .then(dbUserData => {
        if (!dbUserData[0]) {
        res.status(404).json({ message: 'No user found with this id'});
        return;
        }
        res.json(dbUserData);
    })
    .catch(err => res.status(500).json(err));
});

// Delete Route to Delete a User
router.delete('/:id', withAuth, (req, res) => {
    User.destroy({
        where: { id: req.params.id }
    })
    .then(dbUserData => {
        if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id'});
        return;
        }
        res.json(dbUserData);
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;