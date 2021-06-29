import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faRoad, faCar } from '@fortawesome/free-solid-svg-icons';

const HeaderSwitch = ({callback, positions, active}) => {

    let el = positions.find(item => item.id === active);
    
    let getPosition = (num) => {
        if (num === 'users') return {class: 'switch switch_left', icon: faUser};
        else if (num === 'auto') return {class: 'switch switch_center', icon: faCar};
        else return {class: 'switch switch_right', icon: faRoad};
    }
    
    let posRes = getPosition(el.type);

    return (
        <div className="switch-wrapper">
            <div className="switch-container" >
            {positions.map((pos) => <div
                key={pos.type} 
                className="switch-place"
                onClick={() => callback(pos)} 
                ></div>)}
            <div className={posRes.class}>
                <FontAwesomeIcon icon={posRes.icon} />
            </div>
            </div>
            <div className="switch-des">
            {positions.map((pos) => <div
                key={pos.type} 
                className="switch-item"
                onClick={() => callback(pos)} 
                >{pos.name}</div>)}
            </div>
        </div> 
    )
}

export default HeaderSwitch;