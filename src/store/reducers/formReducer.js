import * as actionTypes from "../actions/actionTypes";

const initialState = {
  participants: {
    underEighteen: 0,
    unlicensed: 0,
    firstTimers: 0,
    targetables: 0,
  },
  targetablesData: {
    careAboutEmissions: 0,
    fwdOrIdk: 0,
    ammountOfCars: [],
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
      console.log(state, action);
      return {
        ...state,
        participants: {
          ...state.participants,
          underEighteen: state.participants.underEighteen + 1,
        },
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
      };
    case actionTypes.NOT_LICENSED:
      return {
        ...state,
        participants: {
          ...state.participants,
          unlicensed: state.participants.unlicensed + 1,
        },
        currentUser: {
          ...state.currentUser,
          drivingLicense: action.isLicensed,
        },
      };
    case actionTypes.TARGETABLE_PARTICIPANT:
      console.log(action);
      return {
        ...state,
        participants: {
          ...state.participants,
          targetables: state.participants.targetables + 1,
        },
        targetablesData: {
          ...state.targetablesData,
          careAboutEmissions:
            state.targetablesData.careAboutEmissions +
            action.targetablesData.careAboutEmissions,
          fwdOrIdk:
            state.targetablesData.fwdOrIdk + action.targetablesData.fwdOrIdk,
          ammountOfCars: [
            ...state.targetablesData.ammountOfCars,
            action.targetablesData.amountOfCars,
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
