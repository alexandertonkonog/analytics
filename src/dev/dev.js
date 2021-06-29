import { 
  faExclamationCircle,
  faQuestionCircle,
  faTrashAlt,
  faGasPump,
  faRoad,
  faMapMarkerAlt,
  faCar,
  faTachometerAlt,
  faWeight,
  faClock,
  faLightbulb,
  faChartBar,
  faImages
} from '@fortawesome/free-solid-svg-icons';

export const colors = ['#01B8AA', '#FD625E', '#374649', '#E344A8',
  '#F6DA5E', '#79C75B', '#BFA0AA', '#6C007C', '#138CFF', '#825EC8', '#E56B38', '#01B8AA', '#FD625E', '#374649', '#E344A8',
  '#F6DA5E', '#79C75B', '#BFA0AA', '#6C007C', '#138CFF', '#825EC8', '#E56B38', '#01B8AA', '#FD625E', '#374649', '#E344A8',
  '#F6DA5E', '#79C75B', '#BFA0AA', '#6C007C', '#138CFF', '#825EC8', '#E56B38', '#01B8AA', '#FD625E', '#374649', '#E344A8',
  '#F6DA5E', '#79C75B', '#BFA0AA', '#6C007C', '#138CFF', '#825EC8', '#E56B38', '#01B8AA', '#FD625E', '#374649', '#E344A8',
  '#F6DA5E', '#79C75B', '#BFA0AA', '#6C007C', '#138CFF', '#825EC8', '#E56B38'];


// export const getRandomColor = () => {
//   const r = Math.floor(Math.random() * (256));
//   const g = Math.floor(Math.random() * (256));
//   const b = Math.floor(Math.random() * (256));
//   const color = `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
//   return color;
// };

export const getTime = (elem) => {
  const ost = elem % 60;
  const hours = (elem - ost) / 60;
  return [hours, ost];
}

export let getMinutes = (elem) => {
  let date = new Date(elem);
  return date.getHours()*60+date.getMinutes();
}

export const getFlightTime = (arr) => {
  let nextTime = 480;
  let res = arr.map((item) => {
    let time = getMinutes(item.date);
    let final = getTime(time - nextTime)
    nextTime = time;
    return final;
  });
  return res;
}

export let createBalloon = item => { 
  let [hours, minutes] = getTime(item.time);
  let flights = getFlightTime(item.flight);
  let getLayout = (arr) => {
    return flights.map(item => {
      if(item[1]) {
        return item[0]+'ч '+item[1]+'мин ';
      } else {
        return item[0]+'ч ';
      }
    })
  }
  let getNeedDate = (data) => {
    let date = new Date(data);
    return ('0' + date.getHours()).slice(-2)+':'+('0'+ date.getMinutes()).slice(-2);
  }
  let points = item.route.points.filter(item => item.success).length;
  let html = `<img src="${item.user.img}" alt="user" class="baloon__img">
  <table class="baloon">
      <tr class="baloon__str">
          <td class="baloon__title-icon"><i class="fas fa-user"></i></td>
          <td class="baloon__title">Водитель:</td>
          <td class="baloon__content">${item.user.name}</td>
      </tr>
      <tr class="baloon__str">
          <td class="baloon__title-icon"><i class="fas fa-phone"></i></td>
          <td class="baloon__title">Телефон:</td>
          <td class="baloon__content"><a href="tel:${item.user.number}" class="baloon__link">${item.user.number}</a></td>
      </tr>
      <tr class="baloon__str">
          <td class="baloon__title-icon"><i class="fas fa-car"></i></td>
          <td class="baloon__title">Автомобиль:</td>
          <td class="baloon__content">${item.auto.name} ${item.auto.number}</td>
      </tr>
      <tr class="baloon__str">
          <td class="baloon__title-icon"><i class="fas fa-database"></i></td>
          <td class="baloon__title">Потрачено топлива (л):</td>
          <td class="baloon__content">${item.oil}</td>
      </tr>
      <tr class="baloon__str">
          <td class="baloon__title-icon"><i class="fas fa-clock"></i></td>
          <td class="baloon__title">Рейсов на свалку (шт):</td>
          <td class="baloon__content">${item.flight.length}</td>
      </tr>
      <tr class="baloon__str">
          <td class="baloon__title-icon"><i class="fas fa-clock"></i></td>
          <td class="baloon__title">Время по рейсам:</td>
          <td class="baloon__content">${getLayout(flights)}</td>
      </tr>
      <tr class="baloon__str">
          <td class="baloon__title-icon"><i class="far fa-clock"></i></td>
          <td class="baloon__title">Время выезда/приезда:</td>
          <td class="baloon__content">${item.end 
            ? getNeedDate(item.begin)+' / '+getNeedDate(item.end)
            : getNeedDate(item.begin)+' / ...'}</td>
      </tr>
      <tr class="baloon__str">
          <td class="baloon__title-icon"><i class="far fa-clock"></i></td>
          <td class="baloon__title">Время в пути:</td>
          <td class="baloon__content">${hours}ч ${minutes ? minutes+'мин' : ''}</td>
      </tr>
      <tr class="baloon__str">
          <td class="baloon__title-icon"><i class="fas fa-trash-alt"></i></td>
          <td class="baloon__title">Вывезено мусора (кг):</td>
          <td class="baloon__content">${item.trash}</td>
      </tr>
      <tr class="baloon__str">
          <td class="baloon__title-icon"><i class="fas fa-trash-alt"></i></td>
          <td class="baloon__title">Тип вывозимого мусора:</td>
          <td class="baloon__content">${item.trashType}</td>
      </tr>
      <tr class="baloon__str">
          <td class="baloon__title-icon"><i class="fas fa-road"></i></i></td>
          <td class="baloon__title">Пройдено расстояние (км):</td>
          <td class="baloon__content">${item.km}</td>
      </tr>
      <tr class="baloon__str">
          <td class="baloon__title-icon"><i class="fas fa-map-marker-alt"></i></td>
          <td class="baloon__title">Собрано выполненных точек/точек:</td>
          <td class="baloon__content">${points} / ${item.route.points.length}</td>
      </tr>
  </table>`;
  return html;
}

export const getPanelIcon = (id) => {
  if (id === 1) return faExclamationCircle;
  else if (id === 2) return faTrashAlt;
  else if (id === 3) return faGasPump;
  else if (id === 4) return faRoad;
  else if(id === 5) return faMapMarkerAlt;
  else if (id === 6) return faCar;
  else if (id === 7) return faTachometerAlt;
  else if (id === 8) return faLightbulb;
  else if (id === 9) return faWeight;
  else if (id === 10) return faClock;
  else return faQuestionCircle;
}

export const checkToday = (str) => {
  let date = new Date(str);
  let today = new Date();
  return date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth() && date.getDate() === today.getDate();
}

export const selectAuto = (auto, today) => {
  return today.map(item => {
    let obj = auto.find(elem => elem.id == item.auto.id);
    return {...obj, ...item};
  })
} 

export const filterAuto = (auto) => {
  return auto.map(unit => {
    let newObj = {
      id: unit.id,
      name: unit.nm,
      position: [unit.pos.y, unit.pos.x, unit.pos.c]
    }
    return newObj;
  });
}

export const filterPanels = (panels, need, instead = true) => {
  return instead 
    ? panels.filter(item => need.includes(item.id))
    : panels.filter(item => !need.includes(item.id))
}

export const getHeaderData = (path, panel = null) => {
  if (path === '/') return [faChartBar, 'Интерактивная карта', false];
  else if (path.includes('/analytics')) return [faChartBar, 'Показатели деятельности', false];
  else if (path.includes('/more')) {
    return [faChartBar, panel.title, true];
  }
  else return [faImages, 'Фотографии', false];
}

export const getMaxDate = (str) => {
  
}

export const getLastElemInRows = (length) => {
  const elems = 5;
  const result = [];
  if (length < 5) {
    return null;
  } 
  let count = 0;
  for (let i = 0; i < length; i++) {
    count++;
    if (count === elems) {
      count = 0;
      result.push(i);
    }
  }
  return result;
}

export const getTodayValue = (el, data) => {

  let today = {};
  if (el.type === 2) {
    today.one = data.one.reduce((prev, next) => prev + next, 0);
    today.two = data.two.reduce((prev, next) => prev + next, 0);
    let relation = Math.round(today.one/today.two * 100);
    today.relation = relation || 0;
  } else {
    today.one = data.reduce((prev, next) => prev + next, 0);
  }
  return today;
}

export const getTodayMoreValue = (el, data, name) => {
  let today = {};
  if (el.type === 2) {
    today.one = data[name.one].values.reduce((prev, next) => prev + next, 0);
    today.two = data[name.two].values.reduce((prev, next) => prev + next, 0);
    let relation = Math.round(today.one/today.two * 100);
    today.relation = relation || 0;
  } else {
    today.one = data.values.reduce((prev, next) => prev + next, 0);
  }
  return today;
}

export const setToken = () => {
  const urlParams = new URLSearchParams(window.location.search);
  let token = urlParams.get('access_token');
  if (urlParams.has('access_token')) {
    window.localStorage.setItem('access_token', token);
    window.top.location.reload();
  }
}

// export const createRequests = () => {
//   let str = 'INSERT INTO `events`(`id`, `title`, `user_id`, `date`, `address`, `latitude`, `longitude`, `img`) VALUES ';
//   for (let i = 1; i <= 42; i++) {
//     str += `(null, 'Найдена свалка', 1, '2020-12-01 08:00:00', 'г.Ростов-на-Дону, ул.Есенина 104', 47, 35, '${'http://ecotrans-back/images/emo'+('0'+i).slice(-2)}.jpg'),`
//   }
//   console.log(str);
// }

export const checkLength = (...args) => {
  let len = args.join('').length;
  if (len > 11) {
    return 'panel__int panel__int_super-small';
  } else if (len > 5) {
    return 'panel__int panel__int_small';
  } else {
    return 'panel__int';
  }
}