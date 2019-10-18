const getTextWithInjections = (inputText, injections) => {
  try {
    let outputText = inputText;
    Object.keys(injections).forEach((key) => {
      outputText = outputText.replace(`<%>${key}</%>`, injections[key]);
    });
    return outputText;
  } catch (e) {
    console.error('[getTextWithInjections] ', e);
    return '';
  }
};

module.exports = { getTextWithInjections };
