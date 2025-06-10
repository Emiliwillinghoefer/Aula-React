
import { Route, Switch } from "wouter";
import './App.css'
import {Home} from "./pages/Home.tsx";

function App() {
    return  (
        <Switch>
            <Route path={"/"} component={Home}></Route>
        </Switch>
    )
}

export default App
