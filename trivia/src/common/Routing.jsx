import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Instructions  from '../game/instructions'
import UserWelcome from '../profile/UserWelcome'
import App from './App'
import Board from '../game/board'
import About from './About'
import Register from '../profile/Register'

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
            <Route path={'/'} element={<App/>}/>

        </Routes>
        </BrowserRouter>
        </>
    )
}

export default Routing;