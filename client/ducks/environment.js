const ENVIRONMENT = 'ENVIRONMENT';

const initial = {
    temperature: 0,
    humidity: 0,
    pressure: 0,
    light: 0
};

export default function reducer(state = initial, action) {
    switch (action.type) {
        case ENVIRONMENT:
            return { ...state, ...action.payload};
        default:
            return state;
    }
}
