require('dotenv').config();

module.exports = {
  development: {
    username: 'shawnyates',
    password: 'postgres',
    database: 'drafter',
    hostname: 'localhost',
    dialect: 'postgres',
  },
  test: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
  },
};
