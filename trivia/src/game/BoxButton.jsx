import './BoxButton.css';
import React from 'react'; 

export default function BoxButton({onClick, label}){
  return(
    <div>
      <button onClick={onClick}>
        {label}
      </button>
    </div>
  )
}