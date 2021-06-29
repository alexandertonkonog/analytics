import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { YMaps, Map, Placemark, Polyline } from 'react-yandex-maps';
import { createBalloon} from '../../dev/dev';
import { checkToday } from '../../dev/dev';
import bus from '../../images/vehicle.png';
import Preloader from '../common/Preloader';
import WialonAuth from '../common/WialonAuth';
import { selectAuto } from '../../dev/dev';

const MapContainer = (props) => {
    let [activeUnit, setActiveUnit] = useState(null);
    useEffect(() => {
        props.getDataWialon();
    }, [])

    useEffect(() => {
		props.getCommonData();
		let int = setInterval(() => {
			props.getCommonData();
		}, 15000);
		return () => {
			clearInterval(int);
		}
	}, []);
    
    if (props.wialonAuth.active) return <WialonAuth wialon={props.wialonAuth.data} />;

    if ((!props.units || !props.today || !props.auto) && !props.wialonAuth.active) return <Preloader />;

    let units = selectAuto(props.auto, props.units);

    const autoSet = {
        modules: ['geoObject.addon.balloon', 'geoObject.addon.hint'],
        options: {
            balloonPanelMaxMapArea: 0,
            iconLayout: 'default#image',
            iconImageHref: bus,
            iconImageSize: [60, 60],
            iconImageOffset: [-5, -38],
        }
    };
    const pointSet = {
        modules: ['geoObject.addon.balloon', 'geoObject.addon.hint'],
    };
    const selectUnit = (item) => {
        setActiveUnit(item);
    };
    const removeSelected = () => {
        setActiveUnit(null);
    };
    
    return (
        <div className="map-wrapper">
            <Sidebar today={props.today} panels={props.panels} />
            <YMaps>
                <Map
                    className="map"
                    onClick={removeSelected}
                        defaultState={{
                        center: [47.23148097918086, 39.71167423343753],
                        zoom: 10,
                    }}
                >   
                    {units.map((unit) => <Placemark
                            key={unit.id}
                            onClick={() => selectUnit(unit)}
                            properties={{balloonContent: createBalloon(unit)}}
                            geometry={unit.position}
                            {...autoSet}
                        />)
                    } 
                    {activeUnit && activeUnit.route.points.map((point, ind) => <Placemark
                            key={ind+1}
                            options={{preset: point.success 
                                ? 'islands#greenCircleDotIcon' 
                                : 'islands#redCircleDotIcon'}}
                            geometry={point.coor}
                            {...pointSet}
                        />
                    )}
                    {activeUnit && <Polyline
                            geometry={activeUnit.route.points.map(point => point.coor)}
                            options={{
                                balloonCloseButton: false,
                                strokeColor: '#000',
                                strokeWidth: 10,
                                strokeOpacity: 0.8,
                            }}
                        />
                    }
                </Map>
            </YMaps>
        </div>
    )
}

export default MapContainer;