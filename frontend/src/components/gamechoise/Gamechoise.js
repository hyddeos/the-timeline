import './gamechoise.css';
import Button from '../button/Button'
import React from 'react';
import Howtoplay from '../howtoplay/Howtoplay';

        
const Gamechoise = (props) => {
    

    const [activeCategory, setActiveCategory] = React.useState(null)
    const [startgameCategory, setStartgameCategory] = React.useState(null)

    if (startgameCategory) {
        props.setCategory(startgameCategory)
    }

    return (
        <>
            <div className='choiseFrame' id="choise-cont">
            {props.mainCategory ? 
                <p>{props.mainCategory.description}</p>
            :
                <p>Here you can choose by the most Popular timelines. If you don´t find anything you like you can choose another theme at the top!</p>
            }
                <br></br>
                <h3>Choose Your Category</h3>
                <div className="category_row">
                    {props.categories.map(item => (
                        <Button text={item.category} id={item.id} key={item.id} activeCategory={activeCategory} setActiveCategory={setActiveCategory}/>            
                ))}
                </div>
                <button className={activeCategory ? 'btn startgame' : 'btn disabled'} onClick={() => setStartgameCategory(activeCategory)}>Start Game</button>
                <Howtoplay />
            </div>
        </>
    )
}

export default Gamechoise
