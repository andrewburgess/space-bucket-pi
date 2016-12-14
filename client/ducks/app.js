import moment from 'moment';

const CRON = 'CRON';

const initial = {
    latest: moment().unix()
};

export default function reducer(state = initial, action) {
    switch (action.payload) {
        case CRON:
            return {
                ...state,
                latest: moment().unix()
            };
        default:
            return state;
    }
}
