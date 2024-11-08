export default function BoxButton({onClick, showImage}){
    return(
<div>
    <button onClick={onClick}>
        {showImage ? "Ocultur" : "Mostrar"}
    </button>
</div>
    )

}
