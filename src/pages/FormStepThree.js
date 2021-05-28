import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { connect } from "react-redux";
import * as actionCreators from "../store/actions/formActions";
import SimpleModal from "../components/Modal/Modal";

import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

import { useStyles } from "./Form.styles";

const FormStepThree = (props) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();

  // Iputs State
  const [drivetrain, setDriveTrain] = useState("rwd");
  const [emmisionsConcerned, setEmissions] = useState("no");
  const [totalCars, setTotalCars] = useState("");
  const [carModels, setCarModels] = useState(null);

  const [errorState, setErrorState] = useState(false);
  const [modalState, setModalState] = useState(false);
  const [modalMsg, setModalMsg] = useState("");

  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "participantCars", // unique name for your Field Array
  });

  const classes = useStyles();

  const onSubmit = (data) => {
    props.targetableParticipant(data);
    setModalMsg("Survey complete. Thank you for your feedback.");
    setModalState(true);
  };

  const onError = (error) => console.error(error);

  const inputChangeHandler = (e, setStateVar) => {
    setStateVar(e.target.value);
  };

  useEffect(() => {
    const inputs = [];
    //  if the amount of cars is higher than previous value
    if (totalCars > fields.length) {
      for (let i = fields.length; i < totalCars; i++) {
        inputs.push({ carBrand: "BMW", carModel: "" });
      }
      append(inputs);
    } else {
      //if its lower remove the extra inputs
      const inputElementIndexes = Array.from(Array(fields.length).keys());
      const indexesToRemove = inputElementIndexes.splice(
        totalCars,
        fields.length
      );
      remove(indexesToRemove);
    }
  }, [totalCars]);

  const modalButtonHandler = () => {
    setModalState(false);
    props.history.push("/");
  };

  const cars = fields.map((field, index) => {
    const isBmw =
      watch(`participantCars.${index}.carBrand`) === "BMW" ? true : false;
    return (
      <>
        <FormControl key={field.id}>
          <FormLabel id={`carBrand-${index}-label`}>Car Brand</FormLabel>
          <Select
            labelId={`carBrand-${index}-label`}
            {...register(`participantCars.${index}.carBrand`, {
              required: true,
            })}
            defaultValue={"BMW"}
          >
            <MenuItem value="Audi">Audi</MenuItem>
            <MenuItem value="BMW">BMW</MenuItem>
            <MenuItem value="Lexus">Lexus</MenuItem>
            <MenuItem value="Mazda">Mazda</MenuItem>
            <MenuItem value="Mercedes">Mercedes</MenuItem>
            <MenuItem value="Tesla">Tesla</MenuItem>
          </Select>
        </FormControl>
        <br />
        <FormLabel id={`carModel-${index}-label`}>Car Model</FormLabel>
        <TextField
          defaultValue={field.carModel}
          labelId={`carModel-${index}-label`}
          {...register(`participantCars.${index}.carModel`, {
            required: "This field is required",
            validate: {
              carValidation: (value) => {
                // No validation if brand is not BMW
                if (isBmw) {
                  console.log(isBmw);
                  return (
                    value[0].toLowerCase() === "m" || //starts with m
                    value[0].toLowerCase() === "x" || // starts with x
                    value[0].toLowerCase() === "z" || //starts with z
                    (parseInt(value) && value.length === 1) || // 1 number
                    (parseInt(value) && value.length === 3) || // 3 numbers
                    "Invalid Car Model"
                  );
                  //Invalid message
                }
              },
            },
          })}
        />
        {errors.participantCars &&
          (errors.participantCars[index] ? (
            <span>{errors.participantCars[index].carModel.message}</span>
          ) : null)}
        <br />
      </>
    );
  });

  return (
    <Container>
      <SimpleModal open={modalState} buttonClicked={modalButtonHandler}>
        {modalMsg}
      </SimpleModal>
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "calc(100vh - 81px)" }} //Height - navbar & borderBotton
      >
        <Paper>
          <form
            className={classes.Form}
            onSubmit={handleSubmit(onSubmit, onError)}
          >
            <FormControl>
              <FormLabel id={"drivetrain-label"}>
                Which drivetrain do you prefer?
              </FormLabel>
              <br />
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
            <br />
            <FormControl>
              <FormLabel id={"emissions-label"}>
                Are you worried about emissions?
              </FormLabel>
              <br />
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
            <br />
            <FormLabel htmlFor={"totalCars"}>
              Are you worried about emissions?
            </FormLabel>
            <br />
            <TextField
              id="totalCars"
              type="number"
              min="0"
              {...register("totalCars", { required: true })}
              onChange={(e) => inputChangeHandler(e, setTotalCars)}
              value={totalCars >= 0 ? totalCars : ""}
            />
            <br />
            {cars}
            <Button type="submit" color="primary">
              Continue
            </Button>
          </form>
        </Paper>
      </Grid>
    </Container>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    targetableParticipant: (data) =>
      dispatch(actionCreators.targetableParticipant(data)),
  };
};

export default connect(null, mapDispatchToProps)(FormStepThree);
