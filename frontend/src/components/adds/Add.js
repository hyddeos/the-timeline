import React from 'react';
import { Helmet } from 'react-helmet';  

import AddBar from './AddBar';
import AddBox from './AddBox';



function Add() {

    const [width, setWidth] = React.useState(window.innerWidth);
   /*  const [height, setHeight] = React.useState(window.innerHeight); */
    

    React.useEffect(() => {
        window.addEventListener("resize", updateWidthAndHeight);
        return () => window.removeEventListener("resize", updateWidthAndHeight);
    });

    const updateWidthAndHeight = () => {
        setWidth(window.innerWidth);
       /* setHeight(window.innerHeight); */
    };


    return (
        <>  
            <Helmet>
            
            </Helmet>                
        </>
    );
}
export default Add