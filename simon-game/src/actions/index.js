export const POWER_TOGGLE = 'POWER_TOGGLE',
    START = 'START',
    STRICT_TOGGLE = 'STRIT_TOGGLE',
    NEXT_STEP = 'NEXT_STEP',
    SET_SEQUENCE = 'SET_SEQUENCE',
    SET_PLAY = 'SET_PLAY',
    TOGGLE_KEYS = 'TOGGLE_KEYS',
    ADD_SEQ = 'ADD_SEQ';


export const powerToggle = () => ({
    type:POWER_TOGGLE
});

export const start = () => ({
    type:START
});

export const strictToggle = () => ({
    type:STRICT_TOGGLE
});

export const nextStep = () => ({
    type: NEXT_STEP
});

export const setSequence = (seq) => ({
    type: SET_SEQUENCE,
    payload:seq
});

export const setPlayStatus = (status) => ({
    type: SET_PLAY,
    payload:status
});

export const toggleKeys = () => ({
    type: TOGGLE_KEYS
});

export const addSequence = id => ({
    type:ADD_SEQ,
    id
})