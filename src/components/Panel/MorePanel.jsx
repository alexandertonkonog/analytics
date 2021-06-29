import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import BarChart from '../charts/BarChart';
import LineChart from '../charts/LineChart';
import Preloader from '../common/Preloader';
import Switch from '../common/Switch';
import {getPanelIcon, getTime, getTodayMoreValue} from '../../dev/dev';

const MorePanel = (props) => {
  let positions = [
    {name: 'День', num: 1},
    {name: 'Неделя', num: 7},
    {name: 'Месяц', num: 30},
    {name: 'Квартал', num: 90}
  ];
  console.log(props)
  let Chart = props.item.interval === 7 || props.item.interval === 1 ? BarChart : LineChart;
  let today = getTodayMoreValue(props.el, props.result, props.el.name);
  console.log(props)
  let time = props.el.name === 'time' && getTime(today.one);
  let contentTypeTwo, content;
  if (props.el.comUnit) {
    contentTypeTwo = <div className="panel__int">
                {today.one}/{today.two} 
                <span className="panel__int_percent">
                  ({today.relation}{props.el.comUnit})
                </span>
              </div>;
  } else {
    contentTypeTwo = <div className="panel__int">
                {today.one}/{today.two} 
              </div>;
  }
  if (props.el.name === 'time') {
    content = <div className="panel__int">
                {time[0]}
                <span className="panel__int_percent">{time[1]}</span>
              </div>;
  } else {
    content = <div className="panel__int">
                {today.one}
              </div>;
  }
  return (
    <div className={props.dopClass ? "panel_last-in-row panel" : "panel"}>
      {props.loading.includes(props.item.id) && <Preloader />}
      <h3 className="panel__title">
        {props.item.name} 
        {props.type.type === 'auto' && ' ' + props.item.number} ({props.el.unit})
      </h3>
      <div className="panel__info">
        <div className="panel__icon">
          <FontAwesomeIcon icon={getPanelIcon(props.el.id)} />
        </div>
        {props.el.type === 2 ? contentTypeTwo : content}
      </div>
      <div className="panel__chart">
        {props.el.type === 2
          ? <Chart
              panel={props.el}
              values={props.result[props.el.name.one].values} 
              valuesTwo={props.result[props.el.name.two].values} 
              keys={props.result[props.el.name.one].keys} 
              keysTwo={props.result[props.el.name.two].keys} 
              interval={props.el.interval}
            />
          : <Chart
              panel={props.el} 
              values={props.result.values} 
              keys={props.result.keys} 
              interval={props.el.interval}
            />}
      </div>
      <Switch 
        type="more"
        el={props.el} 
        callback={props.clickCallback}
        icon={faCalendarAlt}
        positions={positions} 
        typeCat={props.type.type}
        item={props.item}
      />
    </div>
  );
};

export default MorePanel;
