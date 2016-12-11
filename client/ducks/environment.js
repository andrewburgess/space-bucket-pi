const ENVIRONMENT = 'ENVIRONMENT';

const initial = {
    temperature: null,
    humidity: null,
    pressure: null,
    light: null
};

export default function reducer(state = initial, action) {
    switch (action.type) {
        case ENVIRONMENT:
            return { ...state, ...action.payload};
        default:
            return state;
    }
}
