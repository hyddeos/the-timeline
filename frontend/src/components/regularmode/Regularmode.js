import React from 'react';
import Header from '../header/Header';
import Gamechoise from '../gamechoise/Gamechoise';
import Gameboard from '../gameboard/Gameboard';
import { BASE_URL } from '../../constants';





function Regularmode(props) {

    const [mainCategory, setMainCategory] = React.useState();
    const [mainCategories, setMainCategories] = React.useState();
    const [categories, setCategories] = React.useState([]);
    const [persons, setPersons] = React.useState([]);
    const [category, setCategory] = React.useState();
    const [isLoading, setIsLoading] = React.useState(true);




    React.useEffect(function () {
        async function fetchMainCategories() { // Gets all Maincategories
            setIsLoading(true);
            try {
                const res_maincategories = await fetch(`${BASE_URL}/maincategories/ `);
                const maincategories = await res_maincategories.json();
                setMainCategories(maincategories);
                // If there user visit from a /MainCategory get that info aswell 
                if (props.mainCategoryID != null) {
                    const res_maincategory = await fetch(`${BASE_URL}/maincategories/${props.mainCategoryID}/ `);
                    const maincategory = await res_maincategory.json();
                    setMainCategory(maincategory);

                    const res_categories = await fetch(`${BASE_URL}/filterdcategories/${props.mainCategoryID}/`);
                    const categories = await res_categories.json();
                    setCategories(categories);
                } else { // Get all categories
                    const res_categories = await fetch(`${BASE_URL}/categories/`);
                    const categories = await res_categories.json();
                    setCategories(categories);
                }

            } catch (e) {
                console.log(e);
            } finally {
                setIsLoading(false);
            }
        }
        fetchMainCategories();
    }, [])


    React.useEffect(function () {
        async function fetchData() { // Get the random persons for the choosen category 
            setIsLoading(true);

            try {
                if (category) {
                    const res_persons = await fetch(`${BASE_URL}/random/${category}`);
                    const persons = await res_persons.json();
                    setPersons(persons);
                }

            } catch (e) {
                console.log(e);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, [category])


    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <>
            <Header mainCategories={mainCategories && mainCategories} mainCategory={mainCategory && mainCategory.categoryname} />
            <div className='container'>
                {!category ?
                    <>
                        <Gamechoise categories={categories} setCategory={setCategory} mainCategory={mainCategory}/>
                    </>
                    :
                    <Gameboard persons={persons} setPersons={setPersons} category={category} />
                }
            </div>
        </>
    );


}

export default Regularmode;
