import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Link, Route, Switch } from "wouter";
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
