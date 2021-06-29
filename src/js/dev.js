export let colors = ['#01B8AA', '#FD625E', '#374649','#E344A8',
 '#F6DA5E', '#79C75B', '#BFA0AA', '#6C007C', '#138CFF', '#825EC8', '#E56B38'];
let coorArr = [[47.22251025388384, 39.71862651527511],
    [47.227121095613505, 39.716615624672286],
    [47.22778929926413, 39.71936220801321],
    [47.22655311557876, 39.719950759060445],
    [47.226185596084896, 39.720097899441626],
    [47.226586526233596, 39.72269734371104],
    [47.227689070416645, 39.726817215448264],
    [47.23066248364395, 39.725542016273835],
    [47.23116360348543, 39.72779813909903],
    [47.23510558460577, 39.72608152532952],
    [47.2360409268387, 39.72995616746368],
    [47.235272610991906, 39.73025044298732],
    [47.23443747309497, 39.73054472113028],
    [47.23373594611736, 39.7308880438842],
    [47.23212085791094, 39.731623734002945],
    [47.231035859228754, 39.7345664997166],
    [47.2293654353812, 39.735253150463116],
    [47.23053473772589, 39.74123677373165],
    [47.23544552434855, 39.73819591355745],
    [47.236781713541454, 39.7374602234387],
    [47.2356459547884, 39.73250656319316],
    [47.23795085124698, 39.731476594931465],
    [47.23748319933527, 39.72931856656681],
    [47.23598000404939, 39.7299071202334],
    [47.23471060554052, 39.723776357893385],
    [47.23394227073174, 39.7188227002672],
    [47.2370823512872, 39.71735131610068]];

export let createDrivers = state => {
    for(let i = 0; i < 10; i++) {
        let act = Math.random()*100;
        let driver = {
            id: i+1,
            name: 'Иван Иванов' + (i+1),
            number: '8800555353'+i,
            auto: {
                model: 'Газель Next',
                number: `e22${i}kx161`,
            },
            oil: {
                need: Math.random()*100,
                has: Math.random()*100,
                spend: Math.random()*100
            },
            time: {
                spend: Math.random()*100,
                need: Math.random()*100
            },
            route: {
                need: Math.random()*100,
                complete: Math.random()*100
            },
            points: coorArr.map((item, ind) => {
                let bool = ind < 14;
                let fail = ind < Math.random()*10;
                return {coor: item, complete: bool, time: Math.round(Math.random() * 10), fail: {fail: fail, cause: 'Перекрыта дорога'}}
            }),
            location: coorArr[i+2],
            weight: Math.round(Math.random()*100),
            finish: act > 50,
            repair: false,//Math.random()*100 < 50
            crush: false,
            active: act <= 50
        }
        state.drivers.push(driver);
    }
}
let randomPoints = () => {
    let arr = [];
    for (let i = 0; i < 30; i++) {
        let bool = 15 > i;
        let item = [Math.random()*100, Math.random()*100, bool, Math.round(Math.random() * 10)];
        arr.push(item);
    }
    return arr;
}

export let getCommonProgress = state => {
    state.drivers.forEach(item => {
        item.points.forEach(point => {
            state.info.points.all.push(point);
            if(point[2]) state.info.points.complete.push(point);
            else state.info.points.not.push(point);
        })
    });
}
export let getCommonOilCondition = state => {
    let has = 0;
    let spend = 0;
    let need = 0;
    state.drivers.forEach(item => {
        has += item.oil.has;
        spend += item.oil.spend;
        need += item.oil.need;
    });
    state.info.oil.has = Math.round(has);
    state.info.oil.spend = Math.round(spend);
    state.info.oil.need = Math.round(need);
}
export let getCommonDistance = state => {
    let complete = 0;
    let need = 0;
    state.drivers.forEach(item => {
        complete += item.route.complete;
        need += item.route.need;
    });
    state.info.route.need = Math.round(need);
    state.info.route.complete = Math.round(complete);
}
export let getAllAuto = state => {
    state.drivers.forEach(item => {
        if (item.active) state.info.auto.active.push(item);
        if (item.finish) state.info.auto.finish.push(item);
        if (item.crush) state.info.auto.crush.push(item);
        if (item.repair) state.info.auto.repair.push(item);
    });
}
export let getAllTime = state => {
    let spend = 0;
    let need = 0;
    state.drivers.forEach(item => {
        spend += item.time.spend;
        need += item.route.need;
    });
    state.info.time.need = Math.round(need);
    state.info.time.spend = Math.round(spend);
}
export let getOneProgress = (item) => {
    let complete = item.points.filter(coor => coor[2]).length;
    let all = item.points.length;
    return [complete, all, complete/all*100];
}
export let getRandomColor = () => {
    let r = Math.floor(Math.random() * (256));
    let g = Math.floor(Math.random() * (256));
    let b = Math.floor(Math.random() * (256));
    let color = '#' + r.toString(16) + g.toString(16) + b.toString(16);
    return color;
}
export let getOneSuccess = item => {
    let sDistance = 100 - Math.abs((item.route.complete/item.route.need)/(item.route.need/100));
    let sTime = 100 - (item.time.spend/item.time.need)/(item.time.spend/100);
    let sOil = 100 - (item.oil.spend/item.oil.need)/(item.oil.spend/100);
    let success = (sDistance+sTime+sOil)/3;
    return success;
}
export let getCommonSuccess = state => {
    let sDistance = 100 - Math.abs((state.info.route.complete/state.info.route.need)/(state.info.route.need/100));
    let sTime = 100 - (state.info.time.spend/state.info.time.need)/(state.info.time.spend/100);
    let sOil = 100 - (state.info.oil.spend/state.info.oil.need)/(state.info.oil.spend/100);
    let success = (sDistance+sTime+sOil)/3;
    return success;
}