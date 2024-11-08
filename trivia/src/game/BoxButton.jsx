import './BoxButton.css';

export default function BoxButton({onClick, label}){
  return(
    <div>
      <button onClick={onClick}>
        {label}
      </button>
    </div>
  )
}