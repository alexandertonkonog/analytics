import {getCommonProgress, getCommonOilCondition, getCommonDistance, getAllAuto, getAllTime} from './dev.js';

export let state = {
    drivers: [],
    info: {
        oil: {
            has: 0,
            spend: 0,
            need: 0
        },
        points: {
            all: [],
            not: [],
            complete: []
        },
        route: {
            complete: 0,
            need: 0,
        },
        auto: {
            active: [],
            repair: [],
            crush: [],
            finish: []
        },
        time: {
            spend: 0,
            need: 0
        }
    },
    subscribers: []
}

export let setState = state => {
    getAllAuto(state);
    getCommonProgress(state); 
    getCommonOilCondition(state);
    getCommonDistance(state);
    getAllTime(state);
}