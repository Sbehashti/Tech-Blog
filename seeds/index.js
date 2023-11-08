const seedBlogs = require('./seeds');
const seedUsers = require('./seeds');
const seedComments = require('./seeds');
const sequelize = require('../config/connection');
const seedAll = async () => {
    await sequelize.sync({ force: true });
  await seedUsers();
  await seedBlogs();
  await seedComments();
  process.exit(0);
};
seedAll();