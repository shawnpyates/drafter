const Sequelize = require('sequelize');
const { User } = require('../models');

const { in: opIn } = Sequelize.Op;

module.exports = {

  async getOrgsWithOwnerName(orgs) {
    const ownerIds = orgs.map(org => org.ownerUserId);
    const owners = await User.findAll({ where: { uuid: { [opIn]: ownerIds } } });
    return orgs.map((org) => {
      const { dataValues } = org;
      const orgOwner = owners.find(owner => owner.uuid === org.ownerUserId);
      const { firstName, lastName } = orgOwner;
      const ownerName = `${firstName} ${lastName}`;
      return { ...dataValues, ownerName };
    });
  },
};
