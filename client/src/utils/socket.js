const host = process.env.REACT_APP_URL;

let ws = new WebSocket(host); // eslint-disable-line

ws.init = () => {
  ws = new WebSocket(host);
};

ws.onclose = ws.init;

export default ws;
