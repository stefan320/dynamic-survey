import React from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import * as actionCreators from "../store/actions/formActions";

const FormStepTwo = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (data.age <= 18) {
      props.addMinorParticipant(data.age);
    }
  };
  const onError = (error) => console.log(error);

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <div>
        <label htmlFor={"age"}>Age</label>
        <input
          id={"age"}
          {...register("age", {
            required: { value: true, message: "This Field is required" },
            min: { value: 0, message: "Invalid Age" },
            max: { value: 100, message: "Invalid Age" },
          })}
        />
      </div>
      {errors.age && <span>{errors.age.message}</span>}

      <div>
        <label htmlFor={"gender"}>Gender</label>
        <select id={"gender"} {...register("gender", { required: true })}>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {errors.gender && <span>This Field is required</span>}
      </div>

      <input type="submit" />
    </form>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addMinorParticipant: (age) =>
      dispatch(actionCreators.addMinorParticipant(age)),
  };
};

export default connect(null, mapDispatchToProps)(FormStepTwo);
