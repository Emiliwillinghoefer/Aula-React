import {Route, Switch} from "wouter";
import './App.css'
import {Home} from "./pages/Home.tsx";
import {ToDosProvider} from "./store/useToDos.tsx";
import {ClearToDoProvider} from "./store/clearToDos.tsx";

function App() {
    return (
        <ToDosProvider>
            <ClearToDoProvider>
                <Switch>
                    <Route path={"/"} component={Home}></Route>
                </Switch>
            </ClearToDoProvider>
        </ToDosProvider>
    )
}

export default App
