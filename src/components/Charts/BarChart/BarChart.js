import { Bar } from "react-chartjs-2";
import { useStyles } from "./BarChart.styles";

const BarChart = (props) => {
  const classes = useStyles();
  const data = {
    labels: props.labels,
    datasets: [
      {
        label: props.datasetLabel,
        data: props.values,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        min: 0,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className={classes.BarChart}>
      <Bar data={data} options={options} className={classes.BarChart} />
    </div>
  );
};

export default BarChart;
