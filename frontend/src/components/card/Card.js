import './card.css';
import React from 'react';

const Card = (props) => {

 
        function rightOrWrong() {
            // Check if card is right or wrong and updates color(class) there after
            // only gets called if gameOn status changes
            let rightList = [];

            props.rights.map((id, index) => {
                rightList.push(id.id)
                return null;
            })

            if (rightList.includes(props.id)) {
                return "right"
            }
            else {
                return "wrong"
            }
        }
        
    return (
        <>
        {!props.gameOn ?
            <div className={`card ${props.listView ? "cardList" : "cardGrid"} ${rightOrWrong(props)}`}>
                <h4 className='born'>Born</h4>
                <h3 className='born'>{props.born}</h3>
                <h2 className='name'>{props.name}</h2>   
            </div>
        :
            <div className={`card ${props.listView ? "cardList" : "cardGrid"}`}>
                <h2 className='name'>{props.name}</h2>                 
            </div>
        }
        </>
    )
  }
  export default Card