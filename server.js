const express = require('express');
const routes = require('config/routes');
const sequelize = require('config/connection');
const path = require('path');
const helpers = require('utils/helpers');
const expressHandlebars = require('express-handlebars');
const handlebars = expressHandlebars.create({ helpers });
const session = require('express-session');
const app = express();
const PORT = process.env.PORT || 3001;
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sess = {
    secret: 'Top Top Secret',
    cookie: {
        expires: 600000
    },
    resave: true,
    rolling: true,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    }),
};

app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.engine('handlebars', hb.engine);
app.set('view engine', 'handlebars');
app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});