const getAllDrafts = (ownedDrafts, teams) => {
  const draftsToReturn = [...ownedDrafts];
  teams.forEach((team) => {
    const { Draft: draftFromTeam } = team;
    if (!draftsToReturn.some(draft => draft.uuid !== draftFromTeam.uuid)) {
      draftsToReturn.push(draftFromTeam);
    }
  });
  return draftsToReturn;
};

const getTextWithInjections = (inputText, injections) => {
  try {
    let outputText = inputText;
    Object.keys(injections).forEach((key) => {
      outputText = outputText.replace(`<%>${key}</%>`, injections[key]);
    });
    return outputText;
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
