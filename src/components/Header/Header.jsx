import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Nav from './Nav';
import HeaderSwitch from '../common/HeaderSwitch';

const Header = ({headerData, types, activeType, setActiveType}) => {
	
	return (
		<header className='header'>
			<div className="header__left">
				<FontAwesomeIcon className="header__icon" icon={headerData[0]} />
				<h1 className="header__title">{headerData[1]}</h1>
				<Nav />
				
			</div>
			{headerData[2] && <div className="header__switch">
				<HeaderSwitch 
					positions={types}
					callback={setActiveType}
					active={activeType} />
			</div>}
		</header>
	)}

export default Header;