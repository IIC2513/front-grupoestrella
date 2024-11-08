import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Instructions  from '../game/instructions'
import UserWelcome from '../profile/UserWelcome'
import App from './App'
import Board from '../game/board'

function Routing(){
    return(
        <>
        <BrowserRouter>
        <Routes> 
            <Route path={'/instructions'} element={<Instructions/>}/>
            <Route path={'/welcome'} element={<UserWelcome/>}/>
            <Route path={'/board'} element={<Board/>}/>
            <Route path={'/'} element={<App/>}/>

        </Routes>
        </BrowserRouter>
        </>
    )
}

export default Routing;