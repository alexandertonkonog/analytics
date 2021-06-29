import React from 'react';
import { getOneProgress, getTime } from '../../dev/dev';

const AutoItem = (props) => {
  const getTitle = (ind) => {
    const arr = ['Количество машин (шт)', 'Потрачено топлива (л)', 'Пройдено расстояние (км)', 'Собрано точек (шт)', 'Потрачено времени (ч)', 'Вывезено мусора (кг)'];
    return arr[ind];
  };
  const getIcon = (ind) => {
    const arr = [<i className="fas fa-car auto__icon" />, <i className="fas fa-database" />, <i className="fas fa-road" />, <i className="fas fa-map-marker-alt" />, <i className="far fa-clock " />, <i className="fas fa-trash-alt" />];
    return arr[ind];
  };
  const getData = (ind, item) => {
    if (ind === 0) return <p className="auto__main">{item.auto.number}</p>;
    if (ind === 1) {
      const oil = Math.round(item.oil.spend / item.oil.has * 100);
      return (
        <p className="auto__main">
          {Math.round(item.oil.spend)}
          /
          {Math.round(item.oil.has)}
          {' '}
          (
          {oil}
          %)
        </p>
      );
    } if (ind === 2) {
      const route = Math.round(item.route.complete / item.route.need * 100);
      return (
        <p className="auto__main">
          {Math.round(item.route.complete)}
          /
          {Math.round(item.route.need)}
          {' '}
          (
          {route}
          %)
        </p>
      );
    } if (ind === 3) {
      const [complete, all, progress] = getOneProgress(item);
      return (
        <p className="auto__main">
          {complete}
          /
          {all}
          {' '}
          (
          {Math.round(progress)}
          %)
        </p>
      );
    } if (ind === 4) {
      const [hours, minutes] = getTime(item.time.spend);
      return (
        <p className="auto__main">
          {hours}
          ч
          {' '}
          {minutes}
          мин
        </p>
      );
    } if (ind === 5) {
      return (
        <p className="auto__main">
          {item.weight}
          {' '}
          кг
        </p>
      );
    }
  };
  const getTitleContent = (ind) => {
    if (ind === 0) return <p className="auto__content">{`${props.info.auto.active.length}/${props.drivers.length}`}</p>;
    if (ind === 1) return <p className="auto__content">{`${Math.round(props.info.oil.spend)}/${Math.round(props.info.oil.need)}`}</p>;
    if (ind === 2) return <p className="auto__content">{`${Math.round(props.info.route.complete)}/${Math.round(props.info.route.need)}`}</p>;
    if (ind === 3) return <p className="auto__content">{`${props.info.points.complete.length}/${props.info.points.all.length}`}</p>;
    if (ind === 4) return <p className="auto__content">{`${getTime(props.info.time.spend)[0]}/${getTime(props.info.time.need)[0]}`}</p>;
    if (ind === 5) return <p className="auto__content">{props.info.weight}</p>;
  };
  return (
    <div className={`auto__item ${props.list[props.ind] ? 'auto__item_open' : ''}`} onClick={() => props.openListItem(props.ind)}>
      <div className="auto__header">
        <p className="auto__left">
          {getIcon(props.ind)}
          <span className="auto__title">{getTitle(props.ind)}</span>
        </p>
        {getTitleContent(props.ind)}
        <i className="fas fa-angle-down auto__arrow" />
      </div>
      <ul className="auto__list">
        {props.drivers.map((d, ind) => (
          <li className="auto__list-item" key={ind}>
            <p className="auto__list-left">
              <span className="auto__id">{d.id}</span>
              <span className="auto__name">
                {d.name}
                {' '}
                (
                {d.auto.model}
                )
              </span>
            </p>
            {getData(props.ind, d)}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default AutoItem;
