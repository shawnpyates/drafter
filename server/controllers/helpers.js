const Sequelize = require('sequelize');
const { User } = require('../models');

const { in: opIn } = Sequelize.Op;

module.exports = {

  async getOrgsWithOwnerName(orgs, orgType) {
    const ownerIds = orgs.map(org => org[orgType].ownerUserId);
    const owners = await User.findAll({ where: { id: { [opIn]: ownerIds } } });
    return orgs.map((org) => {
      const { dataValues } = org[orgType];
      const orgOwner = owners.find(owner => owner.id === org[orgType].ownerUserId);
      const { firstName, lastName } = orgOwner;
      const ownerName = `${firstName} ${lastName}`;
      return { ...dataValues, ownerName };
    });
  },
};
