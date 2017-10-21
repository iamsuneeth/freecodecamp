import {
    POWER_TOGGLE,
    STRICT_TOGGLE,
    NEXT_STEP,
    START,
    SET_SEQUENCE,
    SET_PLAY,
    TOGGLE_KEYS,
    ADD_SEQ
} from '../actions';

const initialState = {
    power: false,
    active:false,
    strict:false,
    step:0,
    playing:false,
    currentSequence:[],
    userSequence:[],
    keysActive:false
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
        case TOGGLE_KEYS:
            return {...state, keysActive:true}
        case ADD_SEQ:
            return {...state, userSequence:state.userSequence.push(action.id)}
        default:
            return state;
    }
}