import React from "react";
import { connect } from "react-redux";

import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";

import { useStyles } from "./Statistics.styles";

import BarChart from "../../components/Charts/BarChart/BarChart";
import PieChart from "../../components/Charts/PieChart/PieChart";

const Statistics = (props) => {
  const classes = useStyles();
  const calculatePercentage = (singleAmount, totalAmount) => {
    const percentage = totalAmount ? (singleAmount / totalAmount) * 100 : 0;
    return parseInt(percentage.toFixed(2));
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
    return +average.toFixed(2);
  };

  const percentages = {
    adolescents: calculatePercentage(
      props.participants.underEighteen,
      props.totalParticipants
    ),
    unlicensed: calculatePercentage(
      props.participants.unlicensed,
      props.totalParticipants
    ),
    firstTimers: calculatePercentage(
      props.participants.firstTimers,
      props.totalParticipants
    ),
    targetables: calculatePercentage(
      props.participants.targetables,
      props.totalParticipants
    ),
  };

  console.log(percentages);

  const targetablesPercentages = {
    careAboutEmissions: calculatePercentage(
      props.targetablesData.careAboutEmissions,
      props.participants.targetables
    ),
    dontCareAboutEmissions: calculatePercentage(
      props.targetablesData.dontCareAboutEmissions,
      props.participants.targetables
    ),
    fwdOrIdk: calculatePercentage(
      props.targetablesData.fwdOrIdk,
      props.participants.targetables
    ),
    rwd: calculatePercentage(
      props.targetablesData.rwd,
      props.participants.targetables
    ),
  };

  const carDistribution =
    props.targetablesData.cars.length > 0 ? (
      props.targetablesData.cars.map((car, i) => {
        return (
          <Typography paragraph key={i} className={classes.TextCenter}>
            {`Car Brand: ${car.carBrand}, Model: ${car.carModel}`}
          </Typography>
        );
      })
    ) : (
      <Typography>No car models have been submited yet.</Typography>
    );

  const averages = {
    familyCars: calculateAverage(props.targetablesData.amountOfCars),
  };

  const camelCaseToSentence = (string) => {
    const result = string.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
  };

  return (
    <Container className={(classes.PaddingY, classes.TextCenter)}>
      <Box py={3}>
        <Box py={3}>
          <Typography variant="h3" align="center">
            Statistics
          </Typography>
        </Box>
        <Box py={2}>
          <BarChart
            labels={Object.keys(props.participants).map((str) =>
              camelCaseToSentence(str)
            )}
            values={Object.values(props.participants)}
            datasetLabel={"Respondents groups"}
          />
        </Box>
        <Box py={2}>
          <Box py={1}>
            <Typography variant="h6" className={classes.heading6}>
              A breakdown of each respondent group by percentage
            </Typography>
          </Box>
          <Box py={2}>
            <PieChart
              labels={Object.keys(percentages).map((str) =>
                camelCaseToSentence(str)
              )}
              values={Object.values(percentages)}
              datasetLabel={"Target Participants data"}
            />
          </Box>
        </Box>

        <Box py={2}>
          <Box py={1}>
            <Typography variant="h6" className={classes.heading6}>
              Targetables Info
            </Typography>
          </Box>
          <Box py={1}>
            <Typography>Emissions</Typography>
            <PieChart
              labels={["Care About Emmissions", "Don't care about emissions"]}
              values={[
                targetablesPercentages.careAboutEmissions,
                targetablesPercentages.dontCareAboutEmissions,
              ]}
              datasetLabel={"Care About Emmissions"}
            />
          </Box>
          <Box py={1}>
            <Typography>Drivetrain preference</Typography>
            <PieChart
              labels={["FWD or IDK", "RWD"]}
              values={[
                targetablesPercentages.fwdOrIdk,
                targetablesPercentages.rwd,
              ]}
              datasetLabel={"Drivetrain Preference"}
            />
          </Box>

          <Box py={1}>
            <Typography>
              {`Average amount of cars in a family is ${averages.familyCars}`}
            </Typography>
          </Box>
        </Box>

        <Box py={2}>
          <Typography variant="h6" className={classes.heading6}>
            Car and models distribution
          </Typography>
        </Box>
        {carDistribution}
      </Box>
    </Container>
  );
};

const mapStateToProps = (state) => {
  const statsState = {
    participants: state.formReducer.participants,
    targetablesData: state.formReducer.targetablesData,
    totalParticipants: state.formReducer.totalParticipants,
  };
  return statsState;
};

export default connect(mapStateToProps)(Statistics);
