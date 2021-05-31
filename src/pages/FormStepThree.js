import React, { useEffect, useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { connect } from "react-redux";
import * as actionCreators from "../store/actions/formActions";
import AlertDialog from "../components/AlertDialog/AlertDialog";

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

  const [alertDialogState, setAlertDialogState] = useState(false);
  const [alertDialogMsg, setDialogMsg] = useState("");

  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "participantCars", // unique name for your Field Array
  });

  const classes = useStyles();
  const totalCars = watch("totalCars");

  const onSubmit = (data) => {
    props.targetableParticipant(data);
    setDialogMsg("Survey complete. Thank you for your feedback.");
    setAlertDialogState(true);
  };

  const onError = (error) => console.error(error);

  useEffect(() => {
    const inputs = [];

    //  if the amount of cars is higher than previous value
    if (totalCars > fields.length) {
      for (let i = fields.length; i < totalCars; i++) {
        inputs.push({ carBrand: "", carModel: "" });
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

  const dialogButtonHandler = () => {
    setAlertDialogState(false);
    props.history.push("/");
  };

  const cars = fields.map((field, index) => {
    const isBmw =
      watch(`participantCars.${index}.carBrand`) === "BMW" ? true : false;
    return (
      <Grid key={field.id} container direction="column">
        <FormControl>
          <FormLabel id={`carBrand-${index}-label`}>Car Brand</FormLabel>
          <Controller
            control={control}
            name={`participantCars.${index}.carBrand`}
            rules={{ required: "This field is required" }}
            defaultValue=""
            render={({ field: { onChange, onBlur, value } }) => (
              <Select
                id={`participantCars.${index}.carBrand`}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
              >
                <MenuItem value="Audi">Audi</MenuItem>
                <MenuItem value="BMW">BMW</MenuItem>
                <MenuItem value="Lexus">Lexus</MenuItem>
                <MenuItem value="Mazda">Mazda</MenuItem>
                <MenuItem value="Mercedes">Mercedes</MenuItem>
                <MenuItem value="Tesla">Tesla</MenuItem>
              </Select>
            )}
          />
        </FormControl>
        {errors.participantCars &&
        errors.participantCars[index] &&
        errors.participantCars[index].carBrand ? (
          <Typography color="error">
            {errors.participantCars[index].carBrand.message}
          </Typography>
        ) : null}

        <br />
        <FormLabel htmlFor={`carModel-${index}`}>Car Model</FormLabel>
        <Controller
          control={control}
          name={`participantCars.${index}.carModel`}
          rules={{
            required: "This field is required",
            validate: {
              carValidation: (value) => {
                // No validation if brand is not BMW
                if (isBmw) {
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
          }}
          defaultValue=""
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField
              id={`carModel-${index}`}
              onChange={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
        />
        {console.log(errors)}
        {errors.participantCars &&
          (errors.participantCars[index] &&
          errors.participantCars[index].carModel ? (
            <Typography color="error">
              {errors.participantCars[index].carModel.message}
            </Typography>
          ) : null)}
        <br />
      </Grid>
    );
  });

  return (
    <Container>
      <AlertDialog
        open={alertDialogState}
        dialogButtonHandler={dialogButtonHandler}
      >
        {alertDialogMsg}
      </AlertDialog>
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
              <FormLabel htmlFor="drivetrain">
                Which drivetrain do you prefer?
              </FormLabel>
              <br />
              <Controller
                control={control}
                id="drivetrain"
                name="drivetrain"
                rules={{ required: true }}
                defaultValue=""
                render={({ field: { onChange, onBlur, value } }) => (
                  <Select
                    value={value}
                    id={"drivetrain"}
                    color={"secondary"}
                    onChange={onChange}
                    onBlur={onBlur}
                  >
                    <MenuItem value="rwd">Rear Wheel Drive</MenuItem>
                    <MenuItem value="fwd">Front Wheel Drive</MenuItem>
                    <MenuItem value="idk">I don't know</MenuItem>
                  </Select>
                )}
              />

              {errors.drivetrain && (
                <Typography color="error">This Field is required</Typography>
              )}
            </FormControl>
            <br />
            <FormControl>
              <FormLabel htmlFor={"emissions"}>
                Are you worried about emissions?
              </FormLabel>
              <br />
              <Controller
                control={control}
                name={"emissions"}
                rules={{ required: true }}
                defaultValue=""
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <Select
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    id={"emissions"}
                    color={"secondary"}
                    inputRef={ref}
                  >
                    <MenuItem value="yes">Yes</MenuItem>
                    <MenuItem value="no">No</MenuItem>
                  </Select>
                )}
              />
              {errors.emissions && (
                <Typography color="error">This Field is required</Typography>
              )}
            </FormControl>
            <br />
            <FormLabel htmlFor={"totalCars"}>
              How many cars do you have in your family?
            </FormLabel>
            <br />
            <Controller
              control={control}
              id="totalCars"
              name="totalCars"
              rules={{
                required: "This Field is required",
                min: {
                  value: 0,
                  message: "Invalid number",
                },
              }}
              defaultValue=""
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <TextField
                  type="number"
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  inputRef={ref}
                />
              )}
            />
            {errors.totalCars && (
              <Typography color="error">{errors.totalCars.message}</Typography>
            )}
            <br />
            {cars}
            <Button type="submit" color="primary" variant="outlined">
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
