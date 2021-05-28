import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import * as actionCreators from "../store/actions/formActions";
import { useStyles } from "./Form.styles";

import SimpleModal from "../components/Modal/Modal";

import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

const FormStart = (props) => {
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [modalState, setModalState] = useState(false);
  const [modalMsg, setModalMsg] = useState("");

  const onSubmit = (data) => {
    if (data.age < 18) {
      props.addMinorParticipant(data.age);
      setModalMsg("Thank you for your interest.");
      setModalState(true);
    } else {
      props.addAdultParticipant(data.age);
      props.history.push("/step-two");
    }
  };
  const onError = (error) => console.log(error);

  const modalButtonHandler = () => {
    setModalState(false);
  };

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
            <FormLabel id="age-label">Age</FormLabel>
            <TextField
              type="number"
              labelId="age-label"
              id="age"
              {...register("age", {
                required: {
                  value: true,
                  message: "This Field is required",
                },
                min: { value: 0, message: "Invalid Age" },
                max: { value: 100, message: "Invalid Age" },
              })}
            />
            {errors.age && (
              <Typography paragraph color="error">
                {errors.age.message}
              </Typography>
            )}
            <br />
            <FormControl>
              <FormLabel htmlFor={"isLicensed"}>
                Do you own a driving license?
              </FormLabel>
              <Select
                id={"gender"}
                {...register("gender", { required: true })}
                defaultValue="other"
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
              {errors.gender && (
                <Typography paragraph color="error">
                  This Field is required
                </Typography>
              )}
            </FormControl>
            <br />
            <Button type="submit" variant="outlined" color="primary">
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
    addMinorParticipant: (age) =>
      dispatch(actionCreators.addMinorParticipant(age)),
    addAdultParticipant: (age) =>
      dispatch(actionCreators.addAdultParticipant(age)),
  };
};

export default connect(null, mapDispatchToProps)(FormStart);
