import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Instructions  from '../game/instructions'
import UserWelcome from '../profile/UserWelcome'
import App from './App'
import Board from '../game/board'
import About from './About'

function Routing(){
    return(
        <>
        <BrowserRouter>
        <Routes> 
            <Route path={'/instructions'} element={<Instructions/>}/>
            <Route path={'/welcome'} element={<UserWelcome/>}/>
            <Route path={'/board'} element={<Board/>}/>
            <Route path={'/about'} element={<About/>}/>
            <Route path={'/'} element={<App/>}/>

        </Routes>
        </BrowserRouter>
        </>
    )
}

export default Routing;