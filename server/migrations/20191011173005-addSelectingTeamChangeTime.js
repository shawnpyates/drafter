'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Drafts',
      'selectingTeamChangeTime',
      { type: Sequelize.DATE },
    );
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn(
      'Drafts',
      'selectingTeamChangeTime',
    );
  }
};
