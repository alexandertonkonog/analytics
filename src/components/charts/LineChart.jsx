/* eslint-disable react/prop-types */
import React from 'react';
import { Line } from 'react-chartjs-2';
import { colors } from '../../dev/dev';

const LineChart = (props) => {
  const fcolors = {
    backgroundColor: 'rgba(121,199,91,0.7)',
    borderColor: 'rgba(121,199,91,1)'
  };
  const scolors = {
    backgroundColor: 'rgba(253,98,94,0.7)',
    borderColor: 'rgba(253,98,94,1)'
  };
  const data = {
    labels: props.keys,
    responsive: false,
    datasets: props.panel.type === 2 
      ? [{
          label: props.panel.metaTitles.one,
          data: props.values,
          ...fcolors,
          pointBackgroundColor: colors,
      },{
          label: props.panel.metaTitles.two,
          data: props.valuesTwo,
          ...scolors,
          pointBackgroundColor: colors,
      }]
      :[{
          data: props.values,
          ...fcolors,
          pointBackgroundColor: colors,
      }],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true,
            },
        }],
        xAxes: [{
            ticks: {
                fontSize: 0,
            },
        }],
    },
    legend: {
      display: false,
    },
  };
  return (
    <div className="chart-wrapper">
      <Line
        data={data}
        className="bar-chart"
        options={options}
      />
    </div>
  );
};
export default LineChart;
