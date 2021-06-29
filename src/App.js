import React, { useEffect } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Main from './components/Main/Main';
import Header from './components/Header/Header';
import Map from './components/Map/Map';
import PhotoScreen from './components/PhotoScreen/PhotoScreen';
import More from './components/More/More';
import { 
	getCommonData, 
	getDataWialon, 
	getIndexes, 
	removeIndexes,
	setActiveType,
	changeMoreInterval
} from './redux/statReducer';
import {getHeaderData} from './dev/dev';

const App = (props) => {

	let el;
	if (props.location.pathname.includes('/more')) {
		el = props.panels.find(item => item.metaName === props.location.pathname.split('/')[2]);
	}
	const headerData = getHeaderData(props.location.pathname, el);

	useEffect(() => {
		document.title = headerData[1];
	}, [props.location.pathname])

  	return (
		<main className="wrapper">
			<Route exact path="/" render={() => <Map 
				panels={props.panels}
				getDataWialon={props.getDataWialon}
				auto={props.auto} 
				wialonAuth={props.wialonAuth}
				getCommonData={props.getCommonData}
				units={props.units}
				today={props.today} />} />
			<div className="content">
				{props.location.pathname !== '/' && <Header
					el={el}
					setActiveType={props.setActiveType}
					types={props.types} 
					headerData={headerData}
					activeType={props.activeType} />}
				<Route path="/analytics" render={() => <Main 
					loc={props.location.pathname} />}
					more={props.more} />
				<Route path="/more/:name" render={() => <More
					loading={props.loading}
					el={el}
					activeType={props.activeType}
					types={props.types}
					panels={props.panels}
					more={props.more}
					getIndexes={props.getIndexes}
					changeMoreInterval={props.changeMoreInterval}
					removeIndexes={props.removeIndexes} />} />
				<Route path="/images" render={() => <PhotoScreen />} />
			</div>
		</main>
  );
};
const mapStateToProps = (state) => ({
  units: state.stat.data,
  hasLoaded: state.stat.hasLoaded,
  auto: state.stat.auto,
  panels: state.stat.panels,
  today: state.stat.today,
  types: state.stat.moreTypes,
  more: state.stat.more,
  activeType: state.stat.activeType,
  wialonAuth: state.stat.wialonAuth,
  loading: state.stat.loading
});
export default compose(
	withRouter, 
	connect(
		mapStateToProps, 
		{ 
			getCommonData, 
			getDataWialon,
			getIndexes,
			removeIndexes,
			setActiveType,
			changeMoreInterval
		 }))(App);
