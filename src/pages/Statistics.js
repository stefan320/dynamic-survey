import React from "react";
import { connect } from "react-redux";

import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Container from "@material-ui/core/Container";

const Statistics = (props) => {
  const calculatePercentage = (
    singleAmount,
    allamounts = props.participants.total
  ) => {
    const percentage = allamounts ? (singleAmount / allamounts) * 100 : 0;
    return +percentage.toFixed(2) + "%";
  };

  const calculateAverage = (valuesArr) => {
    if (valuesArr.length === 0) {
      return 0;
    }
    const sumOfValues = valuesArr.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );

    const average = sumOfValues / valuesArr.length;
    console.log(average);
    return +average.toFixed(2);
  };

  const percentages = {
    adolescents: calculatePercentage(props.participants.underEighteen),
    unlicensed: calculatePercentage(props.participants.unlicensed),
    firstTimers: calculatePercentage(props.participants.firstTimers),
    targetables: calculatePercentage(props.participants.targetables),
    careAboutEmissions: calculatePercentage(
      props.targetablesData.careAboutEmissions,
      props.participants.targetables
    ),
    fwdOrIdk: calculatePercentage(
      props.targetablesData.fwdOrIdk,
      props.participants.targetables
    ),
  };

  const carDistribution =
    props.targetablesData.cars.length > 0 ? (
      <List>
        {props.targetablesData.cars.map((car, i) => {
          return (
            <ListItem key={i}>
              Car Brand: {car.carBrand}, Model: {car.carModel}
            </ListItem>
          );
        })}
      </List>
    ) : (
      <Typography paragraph>No car models have been submited yet.</Typography>
    );

  const averages = {
    familyCars: calculateAverage(props.targetablesData.amountOfCars),
  };

  return (
    <Container>
      <Typography variant="h3">Statistics</Typography>
      <List>
        <ListItem>
          {`${props.participants.underEighteen} adolescents participated in the
          survey`}
        </ListItem>
        <ListItem>
          {`${props.participants.unlicensed} unlicensed participated in the survey`}
        </ListItem>
        <ListItem>
          {`${props.participants.firstTimers} first-timers participated in the
          survey.`}
        </ListItem>
        <ListItem>
          {`${props.participants.targetables} targetables participated in the
          survey.`}
        </ListItem>
      </List>

      <Typography variant="h4">
        A breakdown of each respondent group by percentage
      </Typography>

      <List>
        <ListItem>
          {`${percentages.adolescents} of all
          correspondents where under eighteen.`}
        </ListItem>
        <ListItem>
          {`${percentages.unlicensed} of all correspondents where unlicensed.`}
        </ListItem>
        <ListItem>
          {`${percentages.firstTimers} of all correspondents where first-timers.`}
        </ListItem>
        <ListItem>
          {`${percentages.targetables} of all correspondents where targetables.`}
        </ListItem>
      </List>

      <Typography variant="h4">Targetables Info</Typography>
      <List>
        <ListItem>{`${percentages.careAboutEmissions} of targetables cares about fuel emissions.`}</ListItem>
        <ListItem>{`${percentages.fwdOrIdk} of targetables chose FWD or I don't know as prefered drivetrain.`}</ListItem>
        <ListItem>{`Average amount of cars in a family is ${averages.familyCars}`}</ListItem>
      </List>

      <Typography variant="h4">Car and models distribution</Typography>
      {carDistribution}
    </Container>
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  const statsState = {
    participants: state.formReducer.participants,
    targetablesData: state.formReducer.targetablesData,
  };
  return statsState;
};

export default connect(mapStateToProps)(Statistics);
