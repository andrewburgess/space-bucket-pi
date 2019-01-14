const ws = new WebSocket(`ws://${window.location.hostname}:${process.env.REACT_APP_REMOTE_PORT}`)

ws.addEventListener("open", () => {
    console.log("websocket initialized")

    ws.send("hello")
})

ws.addEventListener("message", (data) => {
    console.log(data)
})

export default ws
