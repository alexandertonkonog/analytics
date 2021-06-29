import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Panel from '../Panel/Panel';
import Preloader from '../common/Preloader';
import { changeInterval, getCommonData } from '../../redux/statReducer';
import { filterPanels, getLastElemInRows } from '../../dev/dev';

const Main = (props) => {

  useEffect(() => {
		props.getCommonData();
		let int = setInterval(() => {
			props.getCommonData();
		}, 15000);
		return () => {
			clearInterval(int);
		}
	}, []);
  
  if (!props.info) return <Preloader />;

  let unNeedPanels = [11];
  let panels = filterPanels(props.panels, unNeedPanels, false);
  
  const changeData = (data) => {
    if (typeof data === 'object') {
      let obj = {
        keys: {
          one: props.info[data.one].keys,
          two: props.info[data.two].keys
        }, 
        values: {
          one: props.info[data.one].values,
          two: props.info[data.two].values
        }
      };
      return obj;
    }
    else {
      return {
        keys: props.info[data].keys, 
        values: props.info[data].values};
    }
  }

  let clickCallback = props.changeInterval;
  let lastElemsInRows = getLastElemInRows(panels.length);

  return (
    <section className='main-page'>
      <div className="panels">
        {panels.map((el, ind) => (
          <Panel
            loading={props.loading}
            key={el.id}
            el={el}
            dopClass={
              lastElemsInRows && lastElemsInRows.includes(ind)
            }
            items={changeData(el.name)}
            clickCallback={clickCallback}
          />
        ))}
      </div>
    </section>
  );
};
const mapStateToProps = (state) => ({
  hasLoaded: state.stat.hasLoaded,
  panels: state.stat.panels,
  info: state.stat.info,
  loading: state.stat.loading
});
export default connect(
  mapStateToProps, 
  {
    getCommonData,
    changeInterval
  })(Main);
