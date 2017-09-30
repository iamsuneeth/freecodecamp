import {
    POWER_TOGGLE,
    STRICT_TOGGLE,
    NEXT_STEP,
    START,
    SET_SEQUENCE,
    SET_PLAY
} from '../actions';

const initialState = {
    power: false,
    active:false,
    strict:false,
    step:0,
    playing:false,
    currentSequence:[],
    userSequence:[]
}

export default (state=initialState, action) => {
    console.log(action);
    switch(action.type) {
        case POWER_TOGGLE:
            return {...state, power:!state.power, active:false, step:0};
        case STRICT_TOGGLE:
            return {...state, strict:!state.strict};
        case START:
            if (!state.active)
                return {...state, active:true,step:1};
            return state;
        case NEXT_STEP:
            return {...state, step:++state.step};
        case SET_SEQUENCE:
            return {...state, currentSequence:action.payload};
        case SET_PLAY:
            return {...state, playing:action.payload}
        default:
            return state;
    }
}