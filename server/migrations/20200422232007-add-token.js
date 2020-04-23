'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Users',
      'token',
      { type: Sequelize.UUID },
    );
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn(
      'Users',
      'token',
    );
  }
};
