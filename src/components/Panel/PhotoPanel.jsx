import React from 'react';

const PhotoPanel = ({item, dopClass}) => {
    return (
        <div className={dopClass ? "panel_last-in-row panel" : "panel"}>
            <h3 className="panel__title">{item.title}!</h3>
            <img src={item.img} alt={item.title} className="panel__img"/>
            <div className="panel__table">
                <div className="panel__string">
                    <p className="panel__string-key">Адрес:</p>
                    <p className="panel__string-value">{item.address}</p>
                </div>
                <div className="panel__string">
                    <p className="panel__string-key">Водитель:</p>
                    <p className="panel__string-value">{item.user_name}</p>
                </div>
                <div className="panel__string">
                    <p className="panel__string-key">Дата:</p>
                    <p className="panel__string-value">{item.date}</p>
                </div>
            </div>
        </div>
    )
}

export default PhotoPanel;