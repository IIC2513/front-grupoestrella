import './Box.css'
import { useState } from 'react';
import BoxButton from './BoxButton'

export default function Box({imgSrc}){
    const [showImage, setShowImage]=useState(true);
    const toggleImage=() => {
        setShowImage(!showImage);
    }
    return(
        <div className='box'>
            <div className ='box-container'>
            {showImage && <img src={imgSrc} className="logo"/>}
            <BoxButton onClick={toggleImage} showImage={showImage}/>
            
            </div>
        </div>
    )
}