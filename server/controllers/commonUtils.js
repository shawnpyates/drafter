import Sequelize from 'sequelize';

import { User } from '../models';

const { in: opIn } = Sequelize.Op;

module.exports = {

  async getOrgsWithOwnerName(jointItems, orgType) {
    const orgs = jointItems.map(item => item[orgType]);
    const ownerIds = orgs.map(org => org.ownerUserId);
    const owners = await User.findAll({ where: { id: { [opIn]: ownerIds } } });
    return orgs.map((org) => {
      const orgOwner = owners.find(owner => owner.id === org.ownerUserId);
      const { firstName, lastName } = orgOwner;
      const ownerName = `${firstName} ${lastName}`;
      return { ...org, ownerName };
    });
  },
};
