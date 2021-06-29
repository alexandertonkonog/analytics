import React, { useState } from 'react';
import AutoItem from './AutoItem';

const AutoList = (props) => {
  const [list, setList] = useState([false, false, false, false, false, false]);
  const openListItem = (index) => {
    const arr = list.map((item, ind) => ((ind === index) ? !item : item));
    setList(arr);
  };
  if (!props.state.hasLoaded) {
    return <div className="preloader">null</div>;
  }
  return (
    <div className="block auto">
      {list.map((item, ind) => (
        <AutoItem
          list={list}
          ind={ind}
          key={ind}
          openListItem={openListItem}
          drivers={props.state.drivers}
          info={props.state.info}
        />
      ))}
    </div>
  );
};

export default AutoList;
