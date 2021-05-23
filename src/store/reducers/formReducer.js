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
    ammountOfCars: 0,
  },
  currentUser: {
    age: "",
    gender: "",
    drivingLicense: "",
    firstCar: "",
    drivetrainPreference: "",
    emmissionConcerned: "",
    numOfCars: 0,
    carModels: [
      {
        make: "",
        model: "",
      },
    ],
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
    default:
      return state;
  }
};

export default formReducer;
