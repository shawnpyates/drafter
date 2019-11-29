'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Teams',
      'selectionOrder',
      { type: Sequelize.INTEGER },
    );
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn(
      'Teams',
      'selectionOrder',
    );
  },
};
