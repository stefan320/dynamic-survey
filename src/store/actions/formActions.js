import * as actionTypes from "./actionTypes";

export const addMinorParticipant = (age) => {
  return {
    type: actionTypes.MINOR_PARTICIPANT,
    age: age,
  };
};

export const addAdultParticipant = (age) => {
  return {
    type: actionTypes.ADULT_PARTICIPANT,
    age: age,
  };
};

export const isParticipantLicensed = (isLicensed) => {
  return {
    type: actionTypes.IS_PARTICIPANT_LICENSED,
    isLicensed,
  };
};
