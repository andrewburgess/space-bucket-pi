import IO from 'socket.io-client';

const socket = IO();

export default function startSocketListener(dispatch) {
    socket.on('update', (data) => {
        dispatch(data);
    });
}
