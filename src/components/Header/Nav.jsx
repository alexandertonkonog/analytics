import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faMapMarkedAlt,
	faImages,
	faChartBar,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Nav = (props) => {
	return (
		<nav className="nav">
			<div className="nav__item">
				<Link to="/" className="nav__btn">
					<FontAwesomeIcon icon={faMapMarkedAlt} />
				</Link>
			</div>
            <div className="nav__item">
				<Link to="/analytics" className="nav__btn">
					<FontAwesomeIcon icon={faChartBar} />
				</Link>
			</div>
			<div className="nav__item">
				<Link to="/images" className="nav__btn">
					<FontAwesomeIcon icon={faImages} />
				</Link>
			</div>
		</nav>
	)
}

export default Nav;