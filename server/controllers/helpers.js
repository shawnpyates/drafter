const Sequelize = require('sequelize');
const { User } = require('../models');

const { in: opIn } = Sequelize.Op;


const mapOwnerNamesToOrgs = (orgs, owners) => (
  orgs.map((org) => {
    const orgOwner = owners.find(owner => owner.uuid === org.ownerUserId);
    const { firstName, lastName } = orgOwner;
    const ownerName = `${firstName} ${lastName}`;
    return { ...org, ownerName };
  })
);

const getOrgsWithOwnerName = async (orgs) => {
  const ownerIds = orgs.map(org => org.ownerUserId);
  const owners = await User.findAll({ where: { uuid: { [opIn]: ownerIds } } });
  return mapOwnerNamesToOrgs(orgs, owners);
};

module.exports = {
  TEST_ONLY: {
    mapOwnerNamesToOrgs,
  },
  getOrgsWithOwnerName,
};
