/* eslint-disable react/prop-types */
import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const CircleChart = ({values, titles}) => {
  const data = {
    labels: Object.values(titles),
    responsive: false,
    datasets: [{
        data: [values.one, values.two],
        borderWidth: 0,
        backgroundColor: ['#85BB40', '#fff']
    }],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scaleShowLabels : false,
    cutoutPercentage: 70,
    scales: {
        yAxes: [{
            display: false,
            gridLines: {
                color: "rgba(0, 0, 0, 0)",
            }
        }],
        xAxes: [{
            gridLines: {
                color: "rgba(0, 0, 0, 0)",
            },
            display: false,
        }],
    },
    legend: {
        display: false,
    },
  };
  return (
    <>  
        <div className="sidebar__chart-title">{values.one}/{values.two}</div>
        <div className="sidebar__chart-wrapper">
        <Doughnut
            data={data}
            className="sidebar__chart"
            options={options}
        />
        </div>
    </>
  );
};
export default CircleChart;