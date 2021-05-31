import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { connect } from "react-redux";
import * as actionCreators from "../store/actions/formActions";
import AlertDialog from "../components//AlertDialog/AlertDialog";

import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";

import { useStyles } from "./Form.styles";

const FormStepTwo = (props) => {
  const {
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();

  const [alertDialogState, setDialogState] = useState(false);
  const [alertDialogMsg, setDialogMsg] = useState("");

  const classes = useStyles();

  const onSubmit = (data) => {
    if (data.isLicensed === "no") {
      setDialogMsg("Thank you for your interest.");
      setDialogState(true);
      props.isParticipantLicensed(false);
      return;
    }

    if (data.isFirstCar === "yes") {
      props.isFirstTimer(true);
      setDialogMsg(
        "We are targeting more experienced clients, thank you for your interest."
      );
      setDialogState(true);
      return;
    } else {
      // first car = "no" & age over 25
      props.history.push("/step-three");
    }
  };
  const onError = (error) => console.log(error);

  const dialogButtonHandler = () => {
    setDialogState(false);
    props.history.push("/");
  };

  const bonusQuestion =
    props.participantAge <= 25 && watch("isLicensed") === "yes" ? (
      <FormControl>
        <FormLabel htmlFor={"isFirstCar"}>Is this your first car?</FormLabel>
        <Controller
          control={control}
          name="isFirstCar"
          rules={{ required: true }}
          defaultValue=""
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Select
              onBlur={onBlur}
              id={"isFirstCar"}
              onChange={onChange}
              inputRef={ref}
              value={value}
            >
              <MenuItem value="yes">Yes</MenuItem>
              <MenuItem value="no">No</MenuItem>
            </Select>
          )}
        />
        {errors.isFirstCar && (
          <Typography paragraph color="error">
            This Field is required
          </Typography>
        )}
        <br />
      </FormControl>
    ) : null;

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
              <FormLabel htmlFor={"isLicensed"}>
                Do you own a driving license?
              </FormLabel>
              <Controller
                control={control}
                name="isLicensed"
                rules={{ required: true }}
                defaultValue=""
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <Select
                    value={value}
                    id={"isLicensed"}
                    onBlur={onBlur}
                    onChange={onChange}
                    inputRef={ref}
                  >
                    <MenuItem value="yes">Yes</MenuItem>
                    <MenuItem value="no">
                      No, I prefer using other transport
                    </MenuItem>
                  </Select>
                )}
              />
            </FormControl>
            {errors.isLicensed && (
              <Typography color="error">This Field is required</Typography>
            )}
            <br />
            {bonusQuestion}
            <Button type="submit" variant="outlined" color="primary">
              Continue
            </Button>
          </form>
        </Paper>
      </Grid>
    </Container>
  );
};

const mapStateToProps = (state) => {
  const participant = {
    participantAge: state.formReducer.currentUser.age,
  };

  return participant;
};

const mapDispatchToProps = (dispatch) => {
  return {
    isParticipantLicensed: (value) =>
      dispatch(actionCreators.isParticipantLicensed(value)),
    isFirstTimer: (value) => dispatch(actionCreators.isFirstTimer(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormStepTwo);
