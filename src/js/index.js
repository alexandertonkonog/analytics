import {createDrivers} from './dev.js';
import {initMap} from './map.js';
import {setState} from './info.js';
import {state} from './info.js';

export const loadMap = () => {
  createDrivers(state); //рандомное создание объектов водителей

  setState(state);
  
  initMap(state); //загрузка карт, маркеров, путей, точек
}







