import * as actionTypes from "../actions/actionTypes";

const initialState = {
  participants: {
    underEighteen: 0,
    unlicensed: 0,
    firstTimers: 0,
    targetables: 0,
  },
  totalParticipants: 0,
  targetablesData: {
    careAboutEmissions: 0,
    dontCareAboutEmissions: 0,
    fwdOrIdk: 0,
    rwd: 0,
    amountOfCars: [],
    cars: [],
  },
  currentUser: {
    age: "",
    gender: "",
    drivingLicense: "",
    firstTimer: "",
    drivetrainPreference: "",
    emmissionConcerned: "",
    numOfCars: 0,
    carModels: [],
  },
};

const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.MINOR_PARTICIPANT:
      return {
        ...state,
        participants: {
          ...state.participants,
          underEighteen: state.participants.underEighteen + 1,
        },
        totalParticipants: state.totalParticipants + 1,
        currentUser: {
          ...state.currentUser,
          age: action.age,
        },
      };
    case actionTypes.ADULT_PARTICIPANT:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          age: action.age,
        },
      };
    case actionTypes.FIRST_TIMER:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          firstTimer: action.isFirstTimer,
        },
        participants: {
          ...state.participants,
          firstTimers: state.participants.firstTimers + 1,
        },
        totalParticipants: state.totalParticipants + 1,
      };
    case actionTypes.NOT_LICENSED:
      return {
        ...state,
        participants: {
          ...state.participants,
          unlicensed: state.participants.unlicensed + 1,
        },
        totalParticipants: state.totalParticipants + 1,
        currentUser: {
          ...state.currentUser,
          drivingLicense: action.isLicensed,
        },
      };
    case actionTypes.TARGETABLE_PARTICIPANT:
      return {
        ...state,
        participants: {
          ...state.participants,
          targetables: state.participants.targetables + 1,
        },
        totalParticipants: state.totalParticipants + 1,
        targetablesData: {
          ...state.targetablesData,
          careAboutEmissions: (state.targetablesData.careAboutEmissions +=
            action.targetablesData.careAboutEmissions),
          dontCareAboutEmissions:
            (state.targetablesData.dontCareAboutEmissions +=
              action.targetablesData.dontCareAboutEmissions),
          fwdOrIdk:
            state.targetablesData.fwdOrIdk + action.targetablesData.fwdOrIdk,
          rwd: state.targetablesData.rwd + action.targetablesData.rwd,
          amountOfCars: [
            ...state.targetablesData.amountOfCars,
            action.targetablesData.amountOfCars,
          ],
          cars: [
            ...state.targetablesData.cars,
            ...action.currentUser.participantCars,
          ],
        },
        currentUser: {
          ...state.currentUser,
          drivetrainPreference: action.currentUser.drivetrain,
          emmissionConcerned: action.currentUser.emissions,
          numOfCars: action.currentUser.totalCars,
          carModels: action.currentUser.participantCars,
        },
      };
    default:
      return state;
  }
};

export default formReducer;
