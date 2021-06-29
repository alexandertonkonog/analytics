/* eslint-disable react/prop-types */
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { colors } from '../../dev/dev';

const BarChart = (props) => {
  const data = props.panel.type === 2 
    ? {
      labels: props.keys,
      responsive: false,
      datasets: [{
        label: props.panel.metaTitles.one,
        barPercentage: 0.5,
        backgroundColor: colors,
        barThickness: 40,
        data: props.values,
      }, {
        label: props.panel.metaTitles.two,
        barPercentage: 0.5,
        backgroundColor: props.values.map((item, ind) => colors[colors.length - ind]),
        barThickness: 40,
        data: props.valuesTwo,
      }]
    }
    : {
      labels: [''],
      responsive: false,
      datasets: props.values.map((item, ind) => ({
        label: props.keys[ind],
        barPercentage: 0.5,
        backgroundColor: colors[ind],
        barThickness: 40,
        data: [item],
      })),
    };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [{
        stacked: props.panel.type === 2,
        ticks: {
          beginAtZero: true,
        },
      }],
      xAxes: [{
        stacked: props.panel.type === 2,
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
      <Bar
        data={data}
        className="bar-chart"
        options={options}
      />
    </div>
  );
};
export default BarChart;
