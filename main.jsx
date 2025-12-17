import App from "./App.jsx";

const el = document.getElementById("root");

if (ReactDOM.createRoot) {
  ReactDOM.createRoot(el).render(React.createElement(App));
} else {
  ReactDOM.render(React.createElement(App), el);
}
