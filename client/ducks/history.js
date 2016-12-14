import moment from 'moment';

const GET_HISTORY = 'GET_HISTORY';

const initial = {
    records: [],
    start: moment().subtract(1, 'days'),
    end: moment()
};

export default function reducer(state = initial, action) {
    switch (action.type) {
        case GET_HISTORY:
            return {
                ...state,
                start: action.payload.request.query.start,
                end: action.payload.request.query.end
            };
        case `${GET_HISTORY}_SUCCESS`:
            return {
                ...state,
                records: action.payload.data
            };
        default:
            return state;
    }
}

export function getHistory(startDate = moment().subtract(1, 'days'), endDate = moment()) {
    return {
        type: GET_HISTORY,
        payload: {
            request: {
                url: '/history',
                query: {
                    start: startDate,
                    end: endDate
                }
            }
        }
    };
}
