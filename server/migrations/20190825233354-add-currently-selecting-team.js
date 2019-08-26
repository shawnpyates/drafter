'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Drafts',
      'currentlySelectingTeamId',
      {
        type: Sequelize.UUID,
        references: {
          model: 'Teams',
          key: 'uuid',
        },
      },
    );
  },
  down: (queryInterface) => {
    return queryInterface.removeColumn(
      'Drafts',
      'currentlySelectingTeamId',
    );
  },
};
