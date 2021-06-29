import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Switch = ({callback, el, icon, positions, type, typeCat, item}) => {

    let getPosition = (num) => {
        if (num === 1) return 'switch switch_left';
        else if (num === 7) return 'switch switch_left-center';
        else if (num === 30) return 'switch switch_right-center';
        else return 'switch switch_right';
    }
    
    let finalCallback = (num) => {
        type === 'more' 
            ? callback(el, item.id, typeCat, num)
            : callback(el, num);
    }
    let interval = type === 'more' ? item.interval : el.interval;
    return (
        <div className="switch-wrapper">
            <div className="switch-container" >
            {positions.map((pos) => <div
                key={pos.num} 
                className="switch-place"
                onClick={() => finalCallback(pos.num)} 
                ></div>)}
            <div className={getPosition(interval)}>
                <FontAwesomeIcon icon={icon} />
            </div>
            </div>
            <div className="switch-des">
            {positions.map((pos) => <div
                key={pos.num} 
                className="switch-item"
                onClick={() => finalCallback(pos.num)} 
                >{pos.name}</div>)}
            </div>
        </div> 
    )
}

export default Switch;