import React, { useEffect, useState } from 'react'
import PlannerHeader from '../meal-planner-header/MealPlannerHeader'
import './recipe-list.css'
import {getRecipes} from '../service'

export default function NewRecipe() {
    const [recipes, setRecipes] = useState([])

    useEffect(() => {
        getRecipes().then(res => setRecipes(res))
    }, []);

    useEffect(() => {
        const days = document.getElementsByClassName('recipe-name')
        for (let day of days) {
            day.parentElement.addEventListener('click', (e) => {
                if (day.classList.contains('hide-body'))
                    day.classList.remove('hide-body')
                else
                    day.classList.add('hide-body')
            })
        }
    }, [recipes.length]);

    const recipesLi = recipes.map(recipe => {
        return (
            <li>
                <div class="recipe-name hide-body">{recipe.name}</div>
                <div class="recipe-body">
                    <div><span>Ingredient:</span> {recipe.ingredients}</div>
                    <div><span>Type:</span> {recipe.type}</div>
                    <div><span>Instruction:</span> {recipe.instructions}</div>
                </div>
            </li>
        )
    }) 

    return (
        <React.Fragment>
            <PlannerHeader />
            <ul id="myUL">
                {recipesLi}
            </ul>
        </React.Fragment>
    )
}