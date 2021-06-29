import React, { useEffect } from 'react';
import Panel from '../Panel/MorePanel';
import Preloader from '../common/Preloader';
import {getLastElemInRows} from '../../dev/dev';

const More = (props) => {
    
    let type = props.types.find(item => item.id === props.activeType);

    useEffect(() => {
        props.getIndexes(props.el, type.type);
        let int = setInterval(() => {
            props.getIndexes(props.el, type.type);
        }, 15000)
        return () => {
            clearInterval(int);
            props.removeIndexes();
        }
    }, [type.type, props.el.metaName])
    
    let clickCallback = props.changeMoreInterval;

    if(!props.more) return <Preloader />

    let lastElemsInRows = getLastElemInRows(props.more.items.length);
    
    return (
        <section className="more">
            <div className="panels">
            {props.more.items.map((item, ind) => (
                <Panel
                    type={type}
                    loading={props.loading}
                    key={item.id}
                    item={item}
                    el={props.el}
                    dopClass={
                        lastElemsInRows && lastElemsInRows.includes(ind)
                    }
                    result={props.more.result[item.id]}
                    clickCallback={clickCallback}
                />
            ))}
            </div>
        </section> 
    )
}

export default More;