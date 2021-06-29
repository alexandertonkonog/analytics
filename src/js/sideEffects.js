import {getOneProgress} from './dev.js';

let getTime = (elem) => {
    let ost = Math.floor(elem % 60);
    let hours = Math.floor((elem-ost) / 60);
    return [hours, ost];
}



export let togglePopup = item => { //запускается в момент выставления маркеров на карту
    let popupWrapper = document.querySelector('.popup-wrapper');
    let popup = document.createElement('div');
    popup.className = item.finish ? 'popup popup_success' :'popup popup_alert';
    let html = `<div class="popup__title">Водитель ${item.name} ${item.finish ? 'завершил маршрут' :'попал в аварию'}</div>
                <img src="images/trash.jpg" class="popup__img">}`;
    popup.innerHTML = html;
    popupWrapper.classList.remove('popup_hidden');
    setTimeout(() => { //тестовое применение, верхний таймаут не нужен
        popupWrapper.prepend(popup);
        setTimeout(() => {
            popup.classList.add('popup_invisible')
            setTimeout(() => {
                popup.remove();
            }, 1000)
        }, 2000)
    }, item.id*1000)
}

