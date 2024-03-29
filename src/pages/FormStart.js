import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { connect } from "react-redux";
import * as actionCreators from "../store/actions/formActions";
import { useStyles } from "./Form.styles";

import AlertDialog from "../components/AlertDialog/AlertDialog";

import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

const FormStart = (props) => {
  const classes = useStyles();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const [alertDialogState, setAlertDialogState] = useState(false);
  const [alertDialogMsg, setAlertDialogMsg] = useState("");

  const onSubmit = (data) => {
    if (data.age < 18) {
      props.addMinorParticipant(data.age);
      setAlertDialogMsg("Thank you for your interest.");
      setAlertDialogState(true);
    } else {
      props.addAdultParticipant(data.age);
      props.history.push("/step-two");
    }
  };
  const onError = (error) => console.log(error);

  const dialogButtonHandler = () => {
    setAlertDialogState(false);
  };

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
        <Paper className={classes.Paper}>
          <form
            className={classes.Form}
            onSubmit={handleSubmit(onSubmit, onError)}
          >
            <Grid container direction={"column"} spacing={4}>
              <Grid item>
                <Controller
                  control={control}
                  name="age"
                  rules={{
                    required: "This Field is required",
                    min: { value: 1, message: "Invalid Age" },
                    max: { value: 100, message: "Invalid Age" },
                  }}
                  defaultValue=""
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <TextField
                      fullWidth
                      type="number"
                      id={"age"}
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      inputRef={ref}
                      label="Age"
                    />
                  )}
                />
                {errors.age && (
                  <Typography color="error" variant="subtitle2">
                    {errors.age.message}
                  </Typography>
                )}
              </Grid>

              <Grid item>
                <FormControl className={classes.FormControl}>
                  <InputLabel htmlFor={"gender"}>Gender</InputLabel>
                  <Controller
                    control={control}
                    name="gender"
                    rules={{ required: true }}
                    defaultValue=""
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                      <Select
                        id={"gender"}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        inputRef={ref}
                      >
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                        <MenuItem value="other">Other</MenuItem>
                      </Select>
                    )}
                  />
                  {errors.gender && (
                    <Typography color="error" variant="subtitle2">
                      This Field is required
                    </Typography>
                  )}
                </FormControl>
              </Grid>
              <Grid item>
                <Button type="submit" variant="outlined" color="primary">
                  Continue
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Container>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addMinorParticipant: (age) =>
      dispatch(actionCreators.addMinorParticipant(age)),
    addAdultParticipant: (age) =>
      dispatch(actionCreators.addAdultParticipant(age)),
  };
};

export default connect(null, mapDispatchToProps)(FormStart);
