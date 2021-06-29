import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import logo from '../../images/logo.png';
import Nav from '../Header/Nav';
import CircleChart from '../charts/CircleChart';
import {filterPanels} from '../../dev/dev';

const Sidebar = (props) => {
    const needPanel = [1,5,7,9,11];
    const units = filterPanels(props.panels, needPanel);
	return (
		<aside className="sidebar">
            <div className="sidebar__container_main">
                <a href="/"><img className="main-logo sidebar__item" src={logo} alt=""/></a>
            </div>
            <Nav />
            {units.map(item => <Link
                key={item.id} 
                to={'/more/'+item.metaName} 
                className="sidebar__container">
                {item.type === 2
                    ? <CircleChart 
                        values={{
                            one: props.today[item.name.one],
                            two: props.today[item.name.two]
                        }}
                        titles={item.metaTitles}
                        />
                    : <div className="sidebar__panel">{props.today[item.name] 
                        ? props.today[item.name] 
                        : 0}</div>}
                <p className="sidebar__subtitle">{item.title}</p>
            </Link>)}

        </aside>
	)}

export default withRouter(Sidebar);