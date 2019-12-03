'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Teams',
      'selectionorder',
      { type: Sequelize.INTEGER },
    );
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn(
      'Teams',
      'selectionorder',
    );
  },
};
