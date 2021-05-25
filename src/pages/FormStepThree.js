import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import * as actionCreators from "../store/actions/formActions";
import SimpleModal from "../components/Modal/Modal";

import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";

const FormStepThree = (props) => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();

  const history = useHistory();

  console.log(watch("carModel-0"));

  // Iputs State
  const [drivetrain, setDriveTrain] = useState("rwd");
  const [emmisionsConcerned, setEmissions] = useState("no");
  const [totalCars, setTotalCars] = useState("");
  const [carModels, setCarModels] = useState(null);

  const [modalState, setModalState] = useState(false);
  const [modalMsg, setModalMsg] = useState("");

  const onSubmit = (data) => {
    console.log("SUBMITT");

    console.log(data);
    //   Submission Complete
    // history.push("/thank-you");
  };

  const onError = (error) => console.error(error);

  const inputChangeHandler = (e, setStateVar) => {
    console.log(e.target.value);
    setStateVar(e.target.value);
  };

  const dynamicInputsHandler = (e, setStateVar) => {
    setStateVar(e.target.value);
    let carModelsArr = [];

    for (let i = 0; i < e.target.value; i++) {
      carModelsArr.push([]);
    }

    carModelsArr.forEach((arr, i) => {
      carModelsArr[i] = (
        <FormControl key={i}>
          <InputLabel id={`carBrand-${i}-label`}>Car Brand</InputLabel>
          <Select
            labelId={`carBrand-${i}-label`}
            {...register(`carBrand-${i}`, { required: true })}
            defaultValue={watch(`carBrand-${i}`)}
          >
            <MenuItem value="Audi">Audi</MenuItem>
            <MenuItem value="BMW">BMW</MenuItem>
            <MenuItem value="Lexus">Lexus</MenuItem>
            <MenuItem value="Mazda">Mazda</MenuItem>
            <MenuItem value="Mercedes">Mercedes</MenuItem>
            <MenuItem value="Tesla">Tesla</MenuItem>
          </Select>
          {/* {errors.isLicensed && <span>This Field is required</span>} */}
          <TextField
            id={`carModel-${i}`}
            label={`Car Model`}
            defaultValue={watch(`carModel-${i}`)}
            {...register(`carModel-${i}`, { required: true })}
          />
        </FormControl>
      );
    });

    setCarModels(carModelsArr);
  };

  return (
    <Container>
      <SimpleModal open={modalState}>{modalMsg}</SimpleModal>

      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <FormControl>
          <InputLabel id={"drivetrain-label"}>
            Which drivetrain do you prefer?
          </InputLabel>
          <Select
            value={drivetrain}
            labelId={"drivetrain-label"}
            id={"drivetrain"}
            {...register("drivetrain", { required: true })}
            color={"secondary"}
            onChange={(e) => inputChangeHandler(e, setDriveTrain)}
          >
            <MenuItem value="rwd">Rear Wheel Drive</MenuItem>
            <MenuItem value="fwd">Front Wheel Drive</MenuItem>
            <MenuItem value="idk">I don't know</MenuItem>
          </Select>
          {errors.isLicensed && <span>This Field is required</span>}
        </FormControl>
        <FormControl>
          <InputLabel id={"emissions-label"}>
            Are you worried about emissions?
          </InputLabel>
          <Select
            value={emmisionsConcerned}
            labelId={"emissions-label"}
            id={"emissions"}
            {...register("emissions", { required: true })}
            color={"secondary"}
            onChange={(e) => inputChangeHandler(e, setEmissions)}
          >
            <MenuItem value="yes">Yes</MenuItem>
            <MenuItem value="no">No</MenuItem>
          </Select>
          {errors.isLicensed && <span>This Field is required</span>}
        </FormControl>
        <TextField
          id="totalCars"
          type="number"
          label="How many cars do you have in your family?"
          {...register("totalCars", { required: true })}
          onChange={(e) => dynamicInputsHandler(e, setTotalCars)}
          value={totalCars}
        />

        {carModels ? carModels : null}
        <Button type="submit" variant="outlined" color="secondary">
          Continue
        </Button>
      </form>
    </Container>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    isParticipantLicensed: (value) =>
      dispatch(actionCreators.isParticipantLicensed(value)),

    isFirstTimer: (value) => dispatch(actionCreators.isFirstTimer(value)),
  };
};

export default connect(null, mapDispatchToProps)(FormStepThree);
