'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Players', {
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      email: Sequelize.STRING,
      position: Sequelize.STRING,
      creatorUserId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'Users',
          key: 'uuid',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
      teamId: {
        type: Sequelize.UUID,
        references: {
          model: 'Teams',
          key: 'uuid',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
      draftId: {
        type: Sequelize.UUID,
        references: {
          model: 'Drafts',
          key: 'uuid',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('Players');
  },
};
