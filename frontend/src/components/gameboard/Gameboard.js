import React from 'react';
import './gameboard.css';
import Card from '../card/Card';
import Challenge from '../challenge/Challenge';
import Howtoplay from '../howtoplay/Howtoplay';
import { BASE_URL } from '../../constants';
import { DragDropContext, Droppable, Draggable  } from 'react-beautiful-dnd';
import arrowleft from '../../static/img/arrowleft.svg';
import arrow_right from '../../static/img/arrow_right.svg';
import arrow_up from '../../static/img/arrow_up.svg';
import arrow_down from '../../static/img/arrow_down.svg';



const arrowLeft = <img src={arrowleft}  alt="arrow left" height='15' width='15'/>
const arrowRight = <img src={arrow_right} alt="arrow right" height='15' width='15'/>
const arrowUp = <img src={arrow_up} alt="arrow up" height='15' width='15'/>
const arrowDown = <img src={arrow_down} alt="arrow down" height='15' width='15'/>


const Gameboard = (props) => {

    const [gameOn, setGameOn] = React.useState(true);
    const [rightAnswers, setRightAnswers] = React.useState([]);
    const [totalPoints, setTotalPoints] = React.useState([]);
    const [listView, setListView] = React.useState(false)
    const [categoryData, setCategoryData] = React.useState(false)


    // Get category Info/Data
    React.useEffect(function () {
        async function fetchCategoryDate() {
            try {
                const res_categories = await fetch(`${BASE_URL}/categories/${props.category}/`);
                const category = await res_categories.json();
                setCategoryData(category);

            } catch (e) {
                console.log(e);
            }
        }
        fetchCategoryDate();
    }, [])

    // User device checking, Start with Listview if mobile
    React.useEffect(function () {
        const details = navigator.userAgent;  
        // Check for mobileDevice info
        let regexp = /android|iphone|kindle|ipad/i;
        
        let isMobileDevice = regexp.test(details);
        if (isMobileDevice) {
            setListView(true)
        }
    }, [])

    // Using Btn to change layout. Grid or List view, changeing the "vertical" : "horizontal"
    const handleViewChange = () => {
        if (listView === false){
            setListView(true)
        }
        else {
            setListView(false)
        }       
    }
 
    // Updates the list after dragging and checks so its in a droppzone
    function handleOnDragEnd(result) {
        if(!result.destination) return;
        const newPerson = Array.from(props.persons);
        const [draggedItem] = newPerson.splice(result.source.index, 1);
        newPerson.splice(result.destination.index, 0, draggedItem);
        props.setPersons(newPerson);
    }

    function checkTimeline(props) {        
        // Change Game status to over
        setGameOn(false);
        // Get the correct order
        let correctBirthOrder = [...props].sort((a, b) => a.born - b.born);
        if (listView) {
            correctBirthOrder = [...props].sort((b, a) => a.born - b.born);
        }
        
        // Get the rightly placed persons and count points
        let correct = [];
        let points = 0; 

        
        props.map((person, index) => {
            if (person.id === correctBirthOrder[index].id) {
                correct.push(person)
                points += 1000;
            }
            else {
                if (person.id > correctBirthOrder[index].id){
                    let removePoints = (person.id - correctBirthOrder[index].id) * 10;
                    points = points - removePoints                    
                }
                else {
                    let removePoints = (correctBirthOrder[index].id - person.id) * 10;
                    points = points - removePoints
                }
            } 
            return null;   
        }) 
        // Only returns the Persons the player got right
        setRightAnswers(correct);
        setTotalPoints(points);  
    }
  
    // Makes a PUT request and updates Data about the category
    React.useEffect(function () {
        async function updateData() {
            try {
                if (!gameOn) {
                    const requestOptions = {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            points: {totalPoints},
                            plays: 1, 
                            })
                    };
                    await fetch((`${BASE_URL}/data/${props.category}/`), requestOptions);                 
                    }
            } catch (e) {
                console.log(e);
            }
            }
        updateData()
    }, [totalPoints])



  return (
    <div className='boardcontainer'>  
        {gameOn &&
        <div className='settings-container'>
            <button className='viewBtn' onClick={() => handleViewChange()}>{listView? "Grid View" : "List View"}</button><Howtoplay />
        </div>
        }
        <div className='droppZoneInfo'>            
            {listView ?
                <div className='droppZoneInfoTop'>
                    <p>Present &emsp; {arrowUp}</p>
                </div>
            :   
                <div className='droppZoneInfo'>
                    <p className='droppZoneInfoTop'>{arrowLeft} &emsp;<strong>Past</strong>&emsp; Timeline Direction &emsp;<strong>Present</strong>&emsp; {arrowRight}</p>
                </div>
            }
        </div>
        <DragDropContext onDragEnd={handleOnDragEnd}>      
            <Droppable droppableId="unordedZone" direction={listView ? "vertical" : "horizontal"}> 
                {(provided, snapshot) => (          
                    <div className={`droppZone ${listView ? "droppZoneList" : "droppZoneGrid"}`} ref={provided.innerRef} {...provided.droppableProps}>    
                        {props.persons.map(({id, name, born}, index) => 
                        <Draggable key={id.toString()} draggableId={id.toString()} index={index}> 
                            {(provided) => ( 
                            <div className={`cardspace ${listView ? "cardspaceList" : "cardspaceGrid"}`} ref={provided.innerRef} 
                                {...provided.dragHandleProps} {...gameOn && provided.draggableProps}>
                                <Card id={id} name={name} born={born} gameOn={gameOn} rights={rightAnswers} listView={listView} />                                               
                            </div>
                            )}
                        </Draggable>
                        )}
                        {provided.placeholder}
                    </div>  
                )}            
            </Droppable>            
        </DragDropContext>
        {listView && <p className='droppZoneInfoBottom'>Past &emsp; {arrowDown}</p>}
        {gameOn ?
        <>
            <button id="finishBtn" className='btn' onClick={() => checkTimeline(props.persons)}>Lock in<br></br> Timeline</button>
        </>
        :   
            <>
            {props.challengerPoints ?
                <>
                    <div className='flex'>
                        <div className='aftergame-container'>
                            
                            {props.challengerPoints > totalPoints ? 
                                <h1 style={{color:'darkred'}}>You lost</h1> : <h1 style={{color:'green'}}>You Won</h1>}
                            <h4>You Got: </h4>
                            <h3 className='flame'>{totalPoints} Points</h3> 
                            <h4>Your Challenger Got:</h4>
                            <h3>{props.challengerPoints} Points</h3>                    
                            <button id="newgameBtn" className='btn' onClick={() => window.location.replace('/')}>New Game?</button>
                        </div>                    
                        <div className='aftergame-container'>
                            <h3>Statistics</h3>
                            <div className="grid-row">
                                <div className="cell"><h4>Average Points:</h4></div> <div className="cell"><h4>{categoryData.average} Points</h4></div>
                                <div className="cell"><h4>Plays:</h4></div> <div className="cell"><h4>{categoryData.plays} Times</h4></div>
                                <div className="cell"><h4>Total Objects:</h4></div> <div className="cell"><h4>{categoryData.NrInCate}</h4></div>
                                <div className="cell"><h4>Created:</h4></div> <div className="cell"><h4>{categoryData.date}</h4></div>                        
                            </div>
                        </div>                    
                    </div>
                    <Challenge persons={props.persons} points={totalPoints} category={props.category}/>
                </>                
                :
                <>
                    <div className='flex'>
                        <div className='aftergame-container'>
                            <h3>You Got</h3>
                            <h1 className='flame'>{totalPoints}</h1>
                            <h3>Points</h3>
                            <p>(Get 10 000 points for perfect score!)</p>
                            <button id="newgameBtn" className='btn' onClick={() => window.location.reload() }>New Timeline?</button>
                        </div>
                        <div className='aftergame-container'>
                            <h3>Statistics</h3>
                            <div className="grid-row">
                                <div className="cell"><h4>Average Points:</h4></div> <div className="cell"><h4>{categoryData.average} Points</h4></div>
                                <div className="cell"><h4>Plays:</h4></div> <div className="cell"><h4>{categoryData.plays} Times</h4></div>
                                <div className="cell"><h4>Total Objects:</h4></div> <div className="cell"><h4>{categoryData.NrInCate}</h4></div>
                                <div className="cell"><h4>Created:</h4></div> <div className="cell"><h4>{categoryData.date}</h4></div>                        
                            </div>
                        </div>       
                    </div>
                    <Challenge persons={props.persons} points={totalPoints} category={props.category}/> 
                </>
            }
            </>
        }
    </div>
    
  );
}

export default Gameboard;