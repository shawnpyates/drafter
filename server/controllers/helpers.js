const Sequelize = require('sequelize');
const { User } = require('../models');

const { in: opIn } = Sequelize.Op;


const mapOwnerNamesToOrgs = (orgData, owners) => (
  orgData.map((org) => {
    const orgOwner = owners.find(owner => owner.uuid === org.ownerUserId);
    const { firstName, lastName } = orgOwner;
    const ownerName = `${firstName} ${lastName}`;
    return { ...org, ownerName };
  })
);

const getOrgsWithOwnerName = async (orgs) => {
  const orgData = orgs.map(org => org.dataValues);
  const ownerIds = orgData.map(od => od.ownerUserId);
  const owners = await User.findAll({ where: { uuid: { [opIn]: ownerIds } } });
  return mapOwnerNamesToOrgs(orgData, owners);
};

module.exports = {
  TEST_ONLY: {
    mapOwnerNamesToOrgs,
  },
  getOrgsWithOwnerName,
};
