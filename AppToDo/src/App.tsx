import {Route, Switch} from "wouter";
import './App.css'
import {Home} from "./pages/Home.tsx";
import {ToDosProvider} from "./store/useToDos.tsx";

function App() {
    return (
        <ToDosProvider>
            <Switch>
                <Route path={"/"} component={Home}></Route>
            </Switch>
        </ToDosProvider>
    )
}

export default App
