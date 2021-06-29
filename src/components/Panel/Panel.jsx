import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import BarChart from '../charts/BarChart';
import LineChart from '../charts/LineChart';
import Preloader from '../common/Preloader';
import Switch from '../common/Switch';
import { getPanelIcon, getTime, getTodayValue, checkLength } from '../../dev/dev';

const Panel = (props) => {

  if (!props.items || !props.items.values) {
    return <div className="panel"><Preloader /></div>;
  }
  
  let positions = [
    {name: 'День', num: 1},
    {name: 'Неделя', num: 7},
    {name: 'Месяц', num: 30},
    {name: 'Квартал', num: 90}
  ];  
  
  let Chart = props.el.interval === 7 || props.el.interval === 1 ? BarChart : LineChart;
  let today = getTodayValue(props.el, props.items.values);
  let timeStr, time;
  if (props.el.name === 'time') {
    time = getTime(today.one);
    timeStr = time[1] ? time[0] + ':' + time[1] : time[0];
  }
  let content, check;
  if (props.el.type === 2) {
    if (props.el.comUnit && props.el.metaName !== 'auto') {
      content = <div className={checkLength(today.one, today.relation, today.two, ' (/)')}>
                  {today.one}/{today.two} 
                  <span className="panel__int_percent">
                    ({today.relation}{props.el.comUnit})
                  </span>
                </div>;
    } else if (props.el.metaName === 'auto') {
      content = <div className={checkLength(today.relation)}>
                  {today.relation}
                </div>;
    } else {
      content = <div className={checkLength(today.one, today.two, '/')}>
                  {today.one}/{today.two} 
                </div>;
    }
  } else {
    content = <div className={checkLength(today.one)}>
                {props.el.name === 'time' ? timeStr : today.one}
              </div>
  }
  
  return (
    <div className={props.dopClass ? "panel_last-in-row panel" : "panel"}>
      {props.loading.includes(props.el.id) && <Preloader />}
      <Link to={"/more/"+props.el.metaName}>
        <h3 className="panel__title">
          {props.el.title} ({
            props.el.metaName === 'auto'
            ? props.el.comUnit
            : props.el.unit
          })
        </h3>
        <div className="panel__info">
          <div className="panel__icon">
            <FontAwesomeIcon icon={getPanelIcon(props.el.id)} />
          </div>
          {content}
        </div>
      </Link>
      <div className="panel__chart">
        {props.el.type === 2
          ? <Chart
              panel={props.el}
              values={props.items.values.one} 
              valuesTwo={props.items.values.two} 
              keys={props.items.keys.one} 
              keysTwo={props.items.keys.two} 
              interval={props.el.interval}
            />
          : <Chart
              panel={props.el} 
              values={props.items.values} 
              keys={props.items.keys} 
              interval={props.el.interval}
            />}
      </div>
      <Switch 
        el={props.el} 
        callback={props.clickCallback}
        icon={faCalendarAlt}
        positions={positions} 
      />
    </div>
  );
};

export default Panel;
