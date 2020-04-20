const getAllDrafts = (ownedDrafts, teams) => (
  teams.reduce((allDrafts, { Draft: draftFromTeam }) => (
    allDrafts.some(draft => draft.uuid === draftFromTeam.uuid)
      ? allDrafts
      : [...allDrafts, draftFromTeam]
  ), [...ownedDrafts])
);

const getTextWithInjections = (inputText, injections) => {
  try {
    return Object.keys(injections).reduce((outputText, key) => (
      outputText.replace(`<%>${key}</%>`, injections[key])
    ), inputText);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('[getTextWithInjections] ', e);
    return '';
  }
};


module.exports = {
  getAllDrafts,
  getTextWithInjections,
};
