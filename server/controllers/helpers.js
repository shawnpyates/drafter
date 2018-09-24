const Sequelize = require('sequelize');
const { User } = require('../models');

const { in: opIn } = Sequelize.Op;

module.exports = {

  async getTeamsWithOwnerName(teams) {
    const ownerIds = teams.map(team => team.ownerUserId);
    const owners = await User.findAll({ where: { id: { [opIn]: ownerIds } } });
    return teams.map((team) => {
      const { dataValues } = team;
      const orgOwner = owners.find(owner => owner.id === team.ownerUserId);
      const { firstName, lastName } = orgOwner;
      const ownerName = `${firstName} ${lastName}`;
      return { ...dataValues, ownerName };
    });
  },
};
