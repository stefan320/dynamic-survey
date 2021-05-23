import * as actionTypes from "./actionTypes";

export const addMinorParticipant = (age) => {
  return {
    type: actionTypes.MINOR_PARTICIPANT,
    age: age,
  };
};
