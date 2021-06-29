import axios from 'axios';
import W from 'wialonjs-api';
import { filterAuto, setToken } from '../dev/dev';

const GET_DATA = 'GET_DATA';
const GET_MORE = 'GET_MORE';
const CHANGE_INTERVAL = 'CHANGE_INTERVAL';
const CHANGE_MORE_INTERVAL = 'CHANGE_MORE_INTERVAL';
const CHANGE_AUTO = 'CHANGE_AUTO';
const CHANGE_HAS_LOADED = 'CHANGE_HAS_LOADED';
const TOGGLE_LOADING = 'TOGGLE_LOADING';
const SET_ACTIVE_TYPE = 'SET_ACTIVE_TYPE';
const SET_WIALON_REGISTER = 'SET_WIALON_REGISTER';
const GET_EVENTS = 'GET_EVENTS';
const CLEAR_EVENTS = 'CLEAR_EVENTS';
const url = 'http://10.5.199.29';

export const getCommonData = () => async (dispatch) => {
  let res = await axios.get(`${url}?method=getUnits`);
  dispatch({ type: GET_DATA, data: res.data });
  dispatch({ type: CHANGE_HAS_LOADED, data: true });
};

export const changeInterval = (el, interval) => async (dispatch) => {
  dispatch({type: TOGGLE_LOADING, id: el.id});
  let name = el.type === 2 ? el.name.one+','+el.name.two : el.name;
  let res = await axios.get(`${url}?method=getUnit&name=${name}&interval=${interval}&type=${el.type}`);
  dispatch({
    type: CHANGE_INTERVAL, 
    data: {name: el.name, interval, res: res.data, type: el.type}});
  dispatch({type: TOGGLE_LOADING, id: el.id});
}

export const getDataWialon = () => async (dispatch) => {
  setToken();
  let token = window.localStorage.getItem('access_token');
  let sess = await new W.Session('https://web.erc61.ru', {
    eventsTimeout: 5
  });
  let params = { token: token };
  sess.execute('token/login', params, (res) => {
    if (!res.error) {
      dispatch({type: SET_WIALON_REGISTER, data: false})
      let params = {spec:[{"type":"type","data":"avl_unit","flags":0x0401,"mode":0}]};
      sess.execute('core/update_data_flags', params, (data) => {
        dispatch({type: CHANGE_AUTO, data: filterAuto(sess.getItems('avl_unit'))});
        let int = setInterval(() => {
          dispatch({type: CHANGE_AUTO, data: filterAuto(sess.getItems('avl_unit'))});
        }, 5000);
      });    
    } else {
      dispatch({type: SET_WIALON_REGISTER, data: true});
    }
  })
}

export const removeIndexes = (panel) => (dispatch) => {
  dispatch({type: GET_MORE, data: null});
}

export const getIndexes = (el, type) => async (dispatch) => {
  dispatch({type: TOGGLE_LOADING, id: el.id});
  let name = el.type === 2 ? el.name.one+','+el.name.two : el.name;
  let res = await axios.get(`${url}?method=getIndexes&name=${name}&type=${el.type}&typeCat=${type}`);
  dispatch({type: GET_MORE, data: res.data});
  dispatch({type: TOGGLE_LOADING, id: el.id});
}

export const setActiveType = (el) => (dispatch) => {
  dispatch({type: SET_ACTIVE_TYPE, id: el.id});
}

export const changeMoreInterval = (el, id, typeCat, interval) => async (dispatch) => {
  dispatch({type: TOGGLE_LOADING, id});
  let name = el.type === 2 ? el.name.one + ',' + el.name.two : el.name;
  let res = await axios.get(`${url}?method=getIndex&id=${id}&name=${name}&interval=${interval}&type=${el.type}&typeCat=${typeCat}`);
  dispatch({
    type: CHANGE_MORE_INTERVAL, 
    data: {
      interval, 
      res: res.data.result, 
      id: id,
    }
  });
  dispatch({type: TOGGLE_LOADING, id});
}

export const getEvents = (counter, len) => async (dispatch) => {
  if (len < 42) {
    dispatch({type: TOGGLE_LOADING, id: 1});
    let res = await axios.get(`${url}?method=getEvents&page=${counter}`);
    dispatch({type: GET_EVENTS, data: res.data, counter});
    dispatch({type: TOGGLE_LOADING, id: 1});
  }
}

export const clearEvents = () => (dispatch) => {
  dispatch({type: CLEAR_EVENTS})
}

const initial = {
  data: null,
  info: null,
  today: null,
  loading: [],
  auto: null,
  more: null,
  activeType: 1,
  events: {
    counter: 0,
    list: []
  },
  wialonAuth: {
    data: {
      login: 'Alex1bit',
      password: 'A$D$123456'
    },
    active: false
  },
  panels: [{
    id: 1,
    name: 'fail',
    interval: 7,
    title: 'Количество срывов',
    unit: 'шт',
    comUnit: null,
    metaName: 'fail'
  }, {
    id: 2,
    name: 'trash',
    interval: 7,
    title: 'Собрано мусора',
    comUnit: null,
    unit: 'кг',
    metaName: 'trash'
  }, {
    id: 3,
    name: 'oil',
    interval: 7,
    title: 'Потрачено топлива',
    comUnit: null,
    unit: 'л',
    metaName: 'oil'
  }, {
    id: 4,
    name: 'km',
    interval: 7,
    title: 'Пройдено расстояния',
    comUnit: null,
    unit: 'км',
    metaName: 'km'
  }, {
    id: 5,
    name: {
      one: 'completePoint',
      two: 'point'
    },
    interval: 7,
    type: 2,
    title: 'Количество точек',
    unit: 'шт',
    comUnit: '%',
    metaName: 'points',
    metaTitles: {
      one: 'Выполненные', 
      two: 'Всего'
    }
  }, {
    id: 6,
    name: {
      one: 'activeAuto', 
      two: 'auto'
    },
    type: 2,
    interval: 7,
    title: 'Количество автомобилей',
    unit: 'шт',
    comUnit: '%',
    metaName: 'auto',
    metaTitles: {
      one:'Активные',
      two:'Всего'
    }
  }, {
    id: 7,
    interval: 7,
    name: 'speed',
    comUnit: null,
    title: 'Превышения скорости',
    unit: 'шт',
    metaName: 'speed'
  }, {
    id: 8,
    interval: 7,
    name: 'report',
    comUnit: null,
    title: 'Количество жалоб',
    unit: 'шт',
    metaName: 'report'
  }, {
    id: 9,
    interval: 7,
    type: 2,
    name: {
      one: 'btw', 
      two: 'ltw'
    },
    title: 'Перегрузы/недогрузы',
    comUnit: null,
    unit: 'шт',
    metaName: 'missWeight',
    metaTitles: {
      one:'Перегрузы', 
      two:'Недогрузы'
    }
  }, {
    id: 10,
    name: 'time',
    interval: 7,
    title: 'Длительность рабочего времени',
    unit: 'ч мин',
    comUnit: null,
    metaName: 'time'
  }, {
    id: 11,
    name: 'сrush',
    interval: 7,
    title: 'Количество ДТП',
    unit: 'шт',
    comUnit: null,
    metaName: 'crush'
  }],
  moreTypes: [{
    id: 1,
    type: 'users',
    name: 'Водители'
  }, {
      id: 2,
      type: 'auto',
      name: 'Автомобили'
  }, {
      id: 3,
      type: 'routes',
      name: 'Маршруты'
  }]
};

export const statReducer = (state = initial, action) => {
  switch (action.type) {
    case GET_DATA: {
      return {
        ...state,
        data: action.data.data,
        info: action.data.stat,
        today: action.data.today,
        panels: state.panels.map(item => ({...item, interval: 7}))
      };
    }
    case GET_MORE: {
      return {
        ...state,
        more: action.data,
      };
    }
    case GET_EVENTS: {
      return {
        ...state,
        events: {
          counter: action.counter + 10,
          list: [...state.events.list, ...action.data]
        },
      };
    }
    case CLEAR_EVENTS: {
      return {
        ...state,
        events: {
          counter: 0,
          list: []
        }
      }
    }
    case CHANGE_HAS_LOADED: {
      return {
        ...state,
        hasLoaded: action.data,
      };
    }
    case CHANGE_AUTO: {
      return {
        ...state,
        auto: action.data,
      };
    }
    case TOGGLE_LOADING: {
      return {
        ...state,
        loading: state.loading.includes(action.id)
          ? state.loading.filter(item => item !== action.id)
          : [...state.loading, action.id]
      };
    }
    case CHANGE_INTERVAL: {
      
      let newInfo = {...state.info};
      if (action.data.type === 2 ) {
        let arr = Object.values(action.data.name);
        arr.forEach(item => {
          newInfo[item] = action.data.res[item];
        });
        
        return {
          ...state,
          panels: state.panels.map(item => {
            if (item.name.one === action.data.name.one && item.name.two === action.data.name.two) {
              return {...item, interval: action.data.interval}
            } else {
              return item;
            }
          }),
          info: newInfo   
        }
      } else {
        newInfo[action.data.name] = action.data.res[action.data.name];
        return {
          ...state,
          panels: state.panels.map(item => {
            return item.name === action.data.name 
              ? {...item, interval: action.data.interval}
              : item
          }),
          info: newInfo   
        }
      }
      
    }
    case SET_ACTIVE_TYPE: {
      return {
        ...state,
        activeType: action.id
      }
    }
    case SET_WIALON_REGISTER: {
      return {
        ...state,
        wialonAuth: {
          ...state.wialonAuth,
          active: action.data
        }
      }
    }
    case CHANGE_MORE_INTERVAL: {
      let need = {...state.more.result};
      need[action.data.id] = action.data.res;
      return {
        ...state,
        more: {
          items: state.more.items.map(item => {
            return item.id == action.data.id
              ? {...item, interval: action.data.interval}
              : item
          }),
          result: need           
        }
      }
    }
    default: {
      return state;
    }
  }
};
