import React from 'react';
import Header from '../header/Header';
import ChallengeExplanation from '../challengeexplanation/ChallengeExplanation'
import Gameboard from '../gameboard/Gameboard';

import { useLocation } from "react-router-dom";
import { BASE_URL } from '../../constants';

const Challengemode = (props) => {

    const [mainCategories, setMainCategories] = React.useState();
    const [category, setCategory] = React.useState("");
    const [persons, setPersons] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    const url = useLocation().search;
    const getEncoded = new URLSearchParams(url).get('g');
    const decodedUrl = atob(getEncoded);


    const getCategory = new URLSearchParams(decodedUrl).get('c');
    const getPoints = new URLSearchParams(decodedUrl).get('p');
    const getPersons = new URLSearchParams(decodedUrl).getAll('i');

    React.useEffect(function () {
        async function fetchMainCategories() { // Gets all Maincategories
            setIsLoading(true);
            try {
                const res_maincategories = await fetch(`${BASE_URL}/maincategories/ `);
                const maincategories = await res_maincategories.json();
                setMainCategories(maincategories);
            } catch (e) {
                console.log(e);
            } finally {
                setIsLoading(false);
            }
        }
        fetchMainCategories();
    }, [])

    // Get category
    React.useEffect(function () {
        async function fetchChallengeCategory() {
            setIsLoading(true);
            try {
                const res_categories = await fetch(`${BASE_URL}/categories/${getCategory}/`);
                const category = await res_categories.json();
                setCategory(category);

            } catch (e) {
                console.log(e);
            }  finally {
                setIsLoading(false);
            }
            
        }
        fetchChallengeCategory();
    }, [])

    // Get persons
    React.useEffect(function () {
        async function fetchChallengePersons() {
            try {
                const res_person = await fetch(`${BASE_URL}/challenge/${getPersons}/`);
                const persons = await res_person.json();
                setPersons(persons);

            } catch (e) {
                console.log(e);
            }
        }
        fetchChallengePersons();
    }, [])

    if (isLoading) {
        return <div>Loading...</div>
    }


    return (
        <>
            {console.log(category)}
            <Header mainCategories={mainCategories && mainCategories} />
            <div className='container'>
                <ChallengeExplanation category={category} />
                <Gameboard persons={persons} setPersons={setPersons} challengerPoints={getPoints} category={category.id}/>
            </div>
        </>
    )
}

export default Challengemode