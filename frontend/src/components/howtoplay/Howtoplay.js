import './howtoplay.css';
import React from 'react';

const Howtoplay = () => {

    const [isActive, setActive] = React.useState(false);

    const toggleHtp = () => {
        setActive(!isActive);
      };


    return (
        <div className="htpFrame">
            <button type="button" className="htpBtn" onClick={toggleHtp}>How To Play?</button>
            <div className={isActive ? 'htpDropdown': 'hide'}>
                <h4 className='htpShort'>Select a category and Drag and Drop the people to their correct place on the Timeline</h4>
                <div className='htpdescripcont'>
                    <div className='htpLong'>
                        <h4>Background</h4>
                        <p>Help restore the timeline as we remember it. We don't know why but suddenly the story changed. We don't know if it's due to a hole in spacetime, a merging with a parallel universe, or just the endless disagreement of philosophers about the definition of time that has thrown everything out of whack. So please help sort this out before our ontonology breaks too!</p>
                    </div>
                    <div className='htpLong'>
                        <h4>How to play</h4>
                        <p>Choose your category and start the game. Then 10 historical figures will be randomly placed on the timeline. Your job is to drag them back to their proper place on the timeline in relation to each other. When you feel satisfied that the story is saved, lock the timeline and see your score.</p>
                        <br></br>
                        <h4>Problems?</h4>
                        <p>If you have any problem with the Drag'n Drop feature, try the button to toggle between the Grid and the List layout</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Howtoplay