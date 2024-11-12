import { BrowserRouter, Routes, Route} from 'react-router-dom'
import React from 'react';
import Instructions  from '../game/instructions'
import UserWelcome from '../profile/UserWelcome'
import App from './App'
import Board from '../game/board'
import About from './About'
import Register from '../profile/Register'
import Login from '../profile/Login'
import UserCheck from '../protected/UserCheck'
import LogoutButton from '../profile/Logout'
import LoggedIn from './LoggedIn'

function Routing(){
    return(
        <>
        <BrowserRouter>
        <Routes> 
            <Route path={'/instructions'} element={<Instructions/>}/>
            <Route path={'/welcome'} element={<UserWelcome/>}/>
            <Route path={'/board'} element={<Board/>}/>
            <Route path={'/about'} element={<About/>}/>
            <Route path={'/register'} element={<Register/>}/>
            <Route path={'/login'} element={<Login/>}/>
            <Route path={'/'} element={<App/>}/>
            <Route path={"/usercheck"} element={<UserCheck />}/>
            <Route path={"/logout"} element={<LogoutButton />}/>
            <Route path={"/loggedin"} element={<LoggedIn />}/>

        </Routes>
        </BrowserRouter>
        </>
    )
}

export default Routing;