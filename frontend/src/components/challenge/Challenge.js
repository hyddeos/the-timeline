import './challenge.css';
import React from 'react';
import { FRONTEND_URL } from '../../constants';


const Challenge = (props) => {

    // Text to clipboard
    const copy = async () => {
        await navigator.clipboard.writeText(challengeUrl + encodedUrl);
        }

    let challengeUrl = `${FRONTEND_URL}/challenge/?g=`

    // Takes data to Generates the url
    let gameinfo = "";    
    gameinfo = "c=" + props.category + "&p=" + props.points;
    props.persons.map((person, index) => {
        gameinfo = gameinfo + "&i=" + person.id;
        return gameinfo
    })

    // Encode the url
    let encodedUrl = btoa(gameinfo);

    return (
        <div className="challangeFrame">           
            <h3 className=''>Challenge a Friend or a Foe</h3>
            <br></br>
            <p>They will get the same timeline you just had and after their game they will get their score compared to you.</p>
            <p>Just send them the URL-below(copy it yourself or click the button)</p>    
            <input readOnly className='URLinput' type="text" value={challengeUrl + encodedUrl}></input>
            <br></br>
            <button className='btn copybtn' onClick={copy} >Copy URL</button>
        </div>
    )
}

export default Challenge