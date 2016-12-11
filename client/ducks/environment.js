const ENVIRONMENT = 'ENVIRONMENT';

const initial = {
    temperature: 0,
    humidity: 0,
    pressure: 0,
    light: 'N/A'
};

export default function reducer(state = initial, action) {
    switch (action.type) {
        case ENVIRONMENT:
            return { ...state, ...action.payload};
        default:
            return state;
    }
}
