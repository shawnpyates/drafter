/* global describe, expect, test */

const {
  teams,
  owners,
  expectedOutput,
} = require('./testData');

const { mapOwnerNamesToOrgs } = require('../helpers').TEST_ONLY;


describe('Helpers', () => {
  describe('mapOwnerNamesToOrgs', () => {
    test('returns teams with owner full name include as prop', () => {
      const received = mapOwnerNamesToOrgs(teams, owners);
      expect(received).toEqual(expectedOutput);
    });
  });
});
