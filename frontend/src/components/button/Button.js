import './button.css';
import React from 'react';

// The toggle buttons for the category
const Button = ({ text, id, activeCategory, setActiveCategory }) => {

    return (
        <> 
            {text.length < 13 ?
                <button
                    id={id}
                    className={activeCategory === id ? 'btn current' : 'btn'}
                    onClick={() => setActiveCategory(id)} > {text}
                </button>
            :
                <button
                    id={id}
                    className={activeCategory === id ? 'btn current ' : 'btn'}
                    onClick={() => setActiveCategory(id)} > <p className='scrollText'>{text}</p>
                </button>
            }
        </>
    )
}

export default Button