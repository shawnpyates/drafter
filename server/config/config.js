require('dotenv').config();

module.exports = {
  development: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    protocol: 'postgres',
  },
  test: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
  },
  production: {
    username: 'shawnyates',
    password: 'postgres',
    database: 'drafter',
    hostname: 'localhost',
    dialect: 'postgres',
  },
};
