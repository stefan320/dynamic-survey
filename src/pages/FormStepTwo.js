import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import * as actionCreators from "../store/actions/formActions";
import SimpleModal from "../components/Modal/Modal";

import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

const FormStepTwo = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const history = useHistory();

  // Iputs State
  const [drivingLicense, setDrivingLicense] = useState("no");
  const [isFirstCar, setIsFirstCar] = useState("no");

  const [modalState, setModalState] = useState(false);
  const [modalMsg, setModalMsg] = useState("");

  const onSubmit = (data) => {
    props.isParticipantLicensed(data.isLicensed);

    if (drivingLicense === "no") {
      setModalMsg("Thank you for your interest.");
      return setModalState(true);
    }

    if (isFirstCar === "yes") {
      setModalMsg(
        "We are targeting more experienced clients, thank you for your interest."
      );
      return setModalState(true);
    }
  };
  const onError = (error) => console.log(error);

  const selectChangeHandler = (e, setStateVar) => {
    setStateVar(e.target.value);
  };

  const bonusQuestion =
    props.participantAge >= 18 &&
    props.participantAge <= 25 &&
    drivingLicense === "yes" ? (
      <div>
        <FormLabel htmlFor={"isFirstCar"}>Is this your first car?</FormLabel>
        <Select
          id={"isFirstCar"}
          {...register("isFirstCar", { required: true })}
          value={isFirstCar}
          onChange={(e) => selectChangeHandler(e, setIsFirstCar)}
        >
          <MenuItem value="yes">Yes</MenuItem>
          <MenuItem value="no">No</MenuItem>
        </Select>
        {errors.isFirstCar && <span>This Field is required</span>}
      </div>
    ) : null;

  return (
    <Container>
      <SimpleModal open={modalState}>{modalMsg}</SimpleModal>

      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <FormControl>
          <FormLabel htmlFor={"isLicensed"}>
            Do you own a driving license?
          </FormLabel>
          <Select
            value={drivingLicense}
            id={"isLicensed"}
            {...register("isLicensed", { required: true })}
            onChange={(e) => selectChangeHandler(e, setDrivingLicense)}
          >
            <MenuItem value="yes">Yes</MenuItem>
            <MenuItem value="no">No, I prefer using other transport</MenuItem>
          </Select>
          {errors.isLicensed && <span>This Field is required</span>}
        </FormControl>
        {bonusQuestion}
        <Button type="submit" variant="outlined" color="secondary">
          Continue
        </Button>
      </form>
    </Container>
  );
};

const mapStateToProps = (state) => {
  console.log(state.formReducer.currentUser);
  const participant = {
    participantAge: state.formReducer.currentUser.age,
  };

  return participant;
};

const mapDispatchToProps = (dispatch) => {
  return {
    isParticipantLicensed: (value) =>
      dispatch(actionCreators.isParticipantLicensed(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormStepTwo);
