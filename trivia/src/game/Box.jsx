import './Box.css'
import { useContext, useState } from 'react';
import BoxButton from './BoxButton'
import { GameContext } from './Board';

export default function Box({id, imgSrc}){
    const [showImage, setShowImage]=useState(true);
    const {
        guess,
        setGuess
    } = useContext(GameContext);
    const toggleImage=() => {
        setShowImage(!showImage);
    }
    const handleGuess = () => {
        setGuess(id);
    }
    return(
        <div className='box'>
            <div className ='box-container'>
                {showImage && <img src={imgSrc} className="logo"/>}
            </div>
            <div className='box-actions'>
                <BoxButton onClick={toggleImage} label = {showImage ? "Ocultar" : "Mostrar"}/>
                {showImage && <BoxButton onClick={toggleImage} label = "Adivinar"/>}
            </div>
        </div>
    )
}