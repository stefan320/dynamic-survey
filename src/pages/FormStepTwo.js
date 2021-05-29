import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { connect } from "react-redux";
import * as actionCreators from "../store/actions/formActions";
import SimpleModal from "../components/Modal/Modal";

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

  const [modalState, setModalState] = useState(false);
  const [modalMsg, setModalMsg] = useState("");

  const classes = useStyles();

  const onSubmit = (data) => {
    console.log(data);
    if (data.isLicensed === "no") {
      setModalMsg("Thank you for your interest.");
      setModalState(true);
      props.isParticipantLicensed(false);
      return;
    }

    if (data.isFirstCar === "yes") {
      props.isFirstTimer(true);
      setModalMsg(
        "We are targeting more experienced clients, thank you for your interest."
      );
      setModalState(true);
      return;
    } else {
      // first car = "no" & age over 25
      props.history.push("/step-three");
    }
  };
  const onError = (error) => console.log(error);

  const modalButtonHandler = () => {
    setModalState(false);
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
