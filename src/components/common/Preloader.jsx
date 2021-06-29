import React from 'react';
import load from '../../images/load.gif';

const Preloader = () => {
    return (
        <div className="preloader-wrapper">
            <img src={load} alt="Загрузка" className="preloader" />
        </div>
    )
}

export default Preloader;
