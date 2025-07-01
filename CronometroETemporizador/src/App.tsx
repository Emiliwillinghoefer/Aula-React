import { Route, Switch } from "wouter";
import { Cronometro } from "./pages/cronometro";
import { Temporizador } from "./pages/temporizador";

function App() {
  return (
    <Switch>
      <Route path="/temporizador" component={Temporizador} />
      <Route path="/" component={Cronometro} />
    </Switch>
  );
}

export default App;
