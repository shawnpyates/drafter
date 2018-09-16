const Sequelize = require('sequelize');
const { User } = require('../models');

const { in: opIn } = Sequelize.Op;

module.exports = {

  async getOrgsWithOwnerName(jointItems, orgType) {
    const orgs = jointItems.map(item => item[orgType]);
    const ownerIds = orgs.map(org => org.ownerUserId);
    const owners = await User.findAll({ where: { id: { [opIn]: ownerIds } } });
    return orgs.map((org) => {
      const { dataValues } = org;
      const orgOwner = owners.find(owner => owner.id === org.ownerUserId);
      const { firstName, lastName } = orgOwner;
      const ownerName = `${firstName} ${lastName}`;
      return { ...dataValues, ownerName };
    });
  },
};
