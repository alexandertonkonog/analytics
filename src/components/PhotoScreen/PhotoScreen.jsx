import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getEvents, clearEvents } from '../../redux/statReducer';
import { getLastElemInRows } from '../../dev/dev';
import PhotoPanel from '../Panel/PhotoPanel';
import Preloader from '../common/Preloader';
 
const PhotoScreen = () => {

    let events = useSelector(state => state.stat.events);
    let loading = useSelector(state => state.stat.loading);
    let dispatch = useDispatch();
    let lastElemsInRows = getLastElemInRows(events.list.length);

    console.log('reload');

    let scrollCallback = () => {
        // if (!loading.length) {
        //     const scrollBottom = document.documentElement.offsetHeight 
        //     - (document.documentElement.scrollTop 
        //     + document.documentElement.clientHeight) < 300;
        //     if (scrollBottom) {
        //         dispatch(getEvents(events.counter, events.list.length));
        //     }
        // }
    }

    useEffect(() => {
        if (!events.list.length) {
            dispatch(getEvents(events.counter, events.list.length));
        }
        return () => {
            dispatch(clearEvents());
        }
    }, [])

    return (
        <div className="photo">
            <div className="photo-list">
                {events.list.map((item, ind) => <PhotoPanel
                    item={item}
                    key={item.id}
                    dopClass={lastElemsInRows && lastElemsInRows.includes(ind)}
                />)}
            </div>
            <div className={loading.length 
                ? "preloader-area_loading preloader-area"
                : "preloader-area" }>
                    {loading.length 
                        ? <Preloader /> 
                        : <button 
                            className="btn"
                            onClick={() => dispatch(getEvents(events.counter, events.list.length))}>Еще</button>}
            </div>
        </div>
    )
}

export default PhotoScreen;