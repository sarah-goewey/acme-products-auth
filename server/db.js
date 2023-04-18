const Sequelize = require('sequelize');
const { STRING, BOOLEAN } = Sequelize;
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_products_search_db');

const Product = conn.define('product', {
  name: {
    type: STRING
  },
  inStock: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
});

const User = conn.define('user', {
  username: {
    type: STRING,
    unique: true
  },
  password: {
    type: STRING
  },
});

module.exports = {
  Product,
  User,
  conn
};
