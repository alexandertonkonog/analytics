import {createBalloon} from './sideEffects.js';
import ymaps from 'ymaps';

let mapState = {
    map: null,
    route: null,
    routeCoors: [],
    points: [],
}
console.log(mapState.map)
export let initMap = state => {
    ymaps.load()
        .then(maps => {
            mapState.map = new maps.Map("map", {
                center: [47.23148097918086, 39.71167423343753],
                zoom: 13,
                controls: []
            }, {
                searchControlProvider: 'yandex#search'
            });
            let createRoute = coors => {
                removeRoute();
                let points = coors.map(c => c.coor)
                let myPolyline = new maps.Polyline(points, {}, {
                    balloonCloseButton: false,
                    strokeColor: "#000000",
                    strokeWidth: 4,
                    strokeOpacity: 0.8
                });
                mapState.map.geoObjects.add(myPolyline);
                mapState.route = myPolyline;
            }
            
            let createPoints = coors => {
                removePoints();
                coors.forEach((item, ind) => {
                    let elem = new maps.Placemark(item.coor, {
                        balloonContent: ind+1
                    }, {
                        preset: 'islands#circleIcon',
                        iconColor: item.fail.fail ? '#85BB40' : '#FF0800'
                    });
                    mapState.map.geoObjects.add(elem);
                    mapState.points.push(elem);
                })
                
                
            }
        
            let removePoints = () => {
                if(mapState.points.length > 0) {
                    mapState.points.forEach(item => {
                        mapState.map.geoObjects.remove(item);
                    })
                }
            }
        
            let removeRoute = () => {
                if(mapState.route) {
                    mapState.map.geoObjects.remove(mapState.route);
                }
            }
        
            let createMarkers = (markers) => {
                
                markers.forEach(item => {
                    let marker = new maps.Placemark(item.location, {
                        balloonContent: createBalloon(item),
                        maxHeight: 500,
                    }, {
                        balloonPanelMaxMapArea: 0,
                        draggable: "true",
                        iconLayout: 'default#image',
                        iconImageHref: '../images/vehicle.png',
                        iconImageSize: [42, 42],
                        iconImageOffset: [-5, -38],
                        
                    });
                    
                    mapState.map.geoObjects.add(marker);
                    
                    marker.events.add('click', ()=> {
                        createRoute(item.points);
                        createPoints(item.points);
                    })
                }) 
                console.log(mapState.map);
            }
            
            createMarkers(state.drivers);
            
            mapState.map.events.add('click', e => {
                removeRoute();
                removePoints();
            });
        })
        .catch(error => console.log('Failed to load Yandex Maps', error));
}