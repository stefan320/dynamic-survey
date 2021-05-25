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
  if (isLicensed === "no") {
    return {
      type: actionTypes.NOT_LICENSED,
      isLicensed,
    };
  }
};

export const isFirstTimer = (isFirstTimer) => {
  console.log(2323);
  return {
    type: actionTypes.FIRST_TIMER,
    isFirstTimer,
  };
};
