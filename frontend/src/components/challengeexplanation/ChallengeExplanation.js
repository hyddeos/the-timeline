import './challengeexplanation.css';
import React from 'react';

const ChallengeExplanation = (props) => {
    return (
        <div className='explanationFrame'>
            <h2>You have been challenged!</h2>
            <h4>A friend or foe has challenged you to sort the following timeline</h4>
            <h3>The category is:</h3>
            <h2 className='challengecategory'>{props.category.category}</h2>
        </div>
    )
}

export default ChallengeExplanation