'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let stateClone = { ...state };

  actions.forEach((action) => {
    switch (action.type) {
      case 'clear':
        stateClone = clear();
        result.push({ ...stateClone });
        break;
      case 'removeProperties':
        stateClone = removeProperties({ ...stateClone }, action.keysToRemove);
        result.push({ ...stateClone });
        break;
      case 'addProperties':
        stateClone = addProperties({ ...stateClone }, action.extraData);
        result.push({ ...stateClone });
        break;
      default:
        break;
    }
  });

  return result;
}

function clear() {
  return {};
}

function removeProperties(state, keysToRemove) {
  for (const key of keysToRemove) {
    delete state[key];
  }

  return state;
}

function addProperties(state, extraData) {
  Object.assign(state, extraData);

  return state;
}

module.exports = transformStateWithClones;
