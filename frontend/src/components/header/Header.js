import './header.css';
import React from 'react';




const Header = (props) => {

    const [themesMenu, setThemesMenu] = React.useState(false);

    function toggleThemesMenu() {
        if (themesMenu) {
            setThemesMenu(false)
        }
        else {
            setThemesMenu(true)
        }
    }
    
    return (
        <div className="headerFrame">
            <nav className='headerToplist'>                
                Themes: 
                <a className='headerToplist-link' href="/">Popular</a>
                {props.mainCategories && props.mainCategories.map((mainCategories, id) =>
                    <a className='headerToplist-link' key={id} href={`/${mainCategories.categoryname}`}>{mainCategories.categoryname}</a>
                )}
            </nav>
            <nav className='headerToplistMobile'>                
                <button className='nav-btn' onClick={() => toggleThemesMenu()}>Themes</button>
                <ul className={`${themesMenu ? "" : "hide"}`}>
                    <li><a className='headerToplist-link' href="/">Popular</a></li>
                    {props.mainCategories && props.mainCategories.map((mainCategories, id) =>
                    <li key={id}><a className='headerToplist-link' href={`/${mainCategories.categoryname}`}>{mainCategories.categoryname}</a></li>)}
                </ul>               
               
            </nav>
            {props.mainCategory != null ?
                <div className='header-content'>
                    <h3>TIMELINES OF</h3>
                    <h1 className='flame'>{props.mainCategory}</h1>
                </div>
            :  
                <div className='header-content'>
                    <h3>Welcome To The</h3>
                    <h1 className='flame'>TIMELINE</h1>
                </div>
             }
        </div>
    )
}

export default Header