import './Board.css';
import Box from "./Box";
import './Box.css';
import React, { useState, useEffect, createContext } from 'react';

export const GameContext = createContext();

export default function Board() {
    const [guess, setGuess] = useState();

    const boxes = [
        { id: 1, imgSrc: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f8/Mr._Krabs.svg/800px-Mr._Krabs.svg.png" },
        { id: 2, imgSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Patrick_Star.jpg/320px-Patrick_Star.jpg" },
        { id: 3, imgSrc: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRDwOvowjUCpJh2Jw6PqyEeWPMMNbTKNSzbnty5hSBhAJpde75C0MEN6X647TerkTigK86XF-ppA9cZJ9Kal-k-Ve4XR0HtaykDpHrX5Q" }
    ];
    const opponentSelectionId = 2;
    useEffect(() => {
        if (guess === opponentSelectionId) {
            alert('¡Adivinaste!');
        } else {
            alert('¡Fallaste!');
        }
    }, [guess]);


    return (
        <GameContext.Provider value={{ guess, setGuess }}>
            <div className="board">
                <div className="board-row">
                    {boxes.slice(0, 2).map(box => (
                        <Box key={box.id} imgSrc={box.imgSrc} />
                    ))}
                </div>
                <div className="board-row">
                    <Box key={boxes[2].id} imgSrc={boxes[2].imgSrc} />
                </div>
            </div>
        </GameContext.Provider>
    );
}
