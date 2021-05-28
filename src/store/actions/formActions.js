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
  if (!isLicensed) {
    return {
      type: actionTypes.NOT_LICENSED,
      isLicensed,
    };
  }
};

export const isFirstTimer = (isFirstTimer) => {
  return {
    type: actionTypes.FIRST_TIMER,
    isFirstTimer,
  };
};

export const targetableParticipant = (data) => {
  console.log(data.emissions === "yes" ? 1 : 0);
  const targetablesData = {
    careAboutEmissions: data.emissions === "yes" ? 1 : 0,
    fwdOrIdk: data.drivetrain === "fwd" || data.drivetrain === "idk" ? 1 : 0,
    amountOfCars: parseInt(data.totalCars),
  };
  return {
    type: actionTypes.TARGETABLE_PARTICIPANT,
    currentUser: data,
    targetablesData,
  };
};
