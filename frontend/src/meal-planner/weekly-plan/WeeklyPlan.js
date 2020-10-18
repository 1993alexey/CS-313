import React, { useEffect, useState } from 'react'
import PlannerHeader from '../meal-planner-header/MealPlannerHeader'
import './weekly-plan.css'
import {getPlan, getRecipes} from '../service'

export default function WeeklyPlan() {
    const [plan, setPlan] = useState({})
    const [recipes, setRecipes] = useState([])

    useEffect(() => {
        getPlan().then(res => setPlan(res))
        getRecipes().then(res => setRecipes(res))
    }, []);

    useEffect(() => {
        const days = document.getElementsByClassName('day')
        for (let day of days) {
            day.parentElement.addEventListener('click', (e) => {
                if (e.target.tagName == 'SELECT')
                    return
                if (day.classList.contains('hide-body'))
                    day.classList.remove('hide-body')
                else
                    day.classList.add('hide-body')
            })
        }

    }, [Object.keys(plan).length])

    const meals = Object.keys(plan).filter(key => key != 'id' && key != 'user_id').map(key => {

        const day = key[0].toUpperCase() + key.substring(1)
        const breakfastOptions = recipes.map(recipe => {
            const selected = plan[key].breakfast_id == recipe.id ? true : false
            return <option value={recipe.id} selected={selected}>{recipe.name}</option>
        })
        const lunchOptions = recipes.map(recipe => {
            const selected = plan[key].lunch_id == recipe.id ? true : false
            return <option value={recipe.id} selected={selected}>{recipe.name}</option>
        })
        const dinnerOptions = recipes.map(recipe => {
            const selected = plan[key].dinner_id == recipe.id ? true : false
            return <option value={recipe.id} selected={selected}>{recipe.name}</option>
        })
        return (
                <li>
                    <div className="day hide-body"><b>{day}</b></div>
                    <div className="day-body">
                        <div className="row">
                            <div className="col-25">
                                <label>Breakfas</label>
                            </div>
                            <div className="col-75">
                                <select id="type" name="type">
                                    <option value="0">=== Select a recipe ===</option>
                                    {breakfastOptions}
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-25">
                                <label>Lunch</label>
                            </div>
                            <div className="col-75">
                                <select id="type" name="type">
                                    <option value="0">=== Select a recipe ===</option>
                                    {lunchOptions}
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-25">
                                <label>Dinner</label>
                            </div>
                            <div className="col-75">
                                <select id="type" name="type">
                                    <option value="0">=== Select a recipe ===</option>
                                    {dinnerOptions}
                                </select>
                            </div>
                        </div>
                    </div>
                </li>
        )
    })

    return (
        <React.Fragment>
            <PlannerHeader />
            <ul id="myUL">
                {meals}
                {/* <li>
                    <div className="day hide-body"><b>Monday</b></div>
                    <div className="day-body">
                        <div className="row">
                            <div className="col-25">
                                <label for="country">Breakfas</label>
                            </div>
                            <div className="col-75">
                                <select id="type" name="type">
                                    <option value="desert">Desert</option>
                                    <option value="Meaty">Meaty</option>
                                    <option value="Veggie">Veggie</option>
                                    <option value="Soup">Soup</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-25">
                                <label for="country">Lunch</label>
                            </div>
                            <div className="col-75">
                                <select id="type" name="type">
                                    <option value="desert">Desert</option>
                                    <option value="Meaty">Meaty</option>
                                    <option value="Veggie">Veggie</option>
                                    <option value="Soup">Soup</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-25">
                                <label for="country">Dinner</label>
                            </div>
                            <div className="col-75">
                                <select id="type" name="type">
                                    <option value="desert">Desert</option>
                                    <option value="Meaty">Meaty</option>
                                    <option value="Veggie">Veggie</option>
                                    <option value="Soup">Soup</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </li>

                <li>
                    <div className="day hide-body"><b>Tuesday</b></div>
                    <div className="day-body">
                        <div className="row">
                            <div className="col-25">
                                <label for="country">Breakfas</label>
                            </div>
                            <div className="col-75">
                                <select id="type" name="type">
                                    <option value="desert">Desert</option>
                                    <option value="Meaty">Meaty</option>
                                    <option value="Veggie">Veggie</option>
                                    <option value="Soup">Soup</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-25">
                                <label for="country">Lunch</label>
                            </div>
                            <div className="col-75">
                                <select id="type" name="type">
                                    <option value="desert">Desert</option>
                                    <option value="Meaty">Meaty</option>
                                    <option value="Veggie">Veggie</option>
                                    <option value="Soup">Soup</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-25">
                                <label for="country">Dinner</label>
                            </div>
                            <div className="col-75">
                                <select id="type" name="type">
                                    <option value="desert">Desert</option>
                                    <option value="Meaty">Meaty</option>
                                    <option value="Veggie">Veggie</option>
                                    <option value="Soup">Soup</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </li>

                <li>
                    <div className="day hide-body"><b>Wednesday</b></div>
                    <div className="day-body">
                        <div className="row">
                            <div className="col-25">
                                <label for="country">Breakfas</label>
                            </div>
                            <div className="col-75">
                                <select id="type" name="type">
                                    <option value="desert">Desert</option>
                                    <option value="Meaty">Meaty</option>
                                    <option value="Veggie">Veggie</option>
                                    <option value="Soup">Soup</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-25">
                                <label for="country">Lunch</label>
                            </div>
                            <div className="col-75">
                                <select id="type" name="type">
                                    <option value="desert">Desert</option>
                                    <option value="Meaty">Meaty</option>
                                    <option value="Veggie">Veggie</option>
                                    <option value="Soup">Soup</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-25">
                                <label for="country">Dinner</label>
                            </div>
                            <div className="col-75">
                                <select id="type" name="type">
                                    <option value="desert">Desert</option>
                                    <option value="Meaty">Meaty</option>
                                    <option value="Veggie">Veggie</option>
                                    <option value="Soup">Soup</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </li>

                <li>
                    <div className="day hide-body"><b>Thursday</b></div>
                    <div className="day-body">
                        <div className="row">
                            <div className="col-25">
                                <label for="country">Breakfas</label>
                            </div>
                            <div className="col-75">
                                <select id="type" name="type">
                                    <option value="desert">Desert</option>
                                    <option value="Meaty">Meaty</option>
                                    <option value="Veggie">Veggie</option>
                                    <option value="Soup">Soup</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-25">
                                <label for="country">Lunch</label>
                            </div>
                            <div className="col-75">
                                <select id="type" name="type">
                                    <option value="desert">Desert</option>
                                    <option value="Meaty">Meaty</option>
                                    <option value="Veggie">Veggie</option>
                                    <option value="Soup">Soup</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-25">
                                <label for="country">Dinner</label>
                            </div>
                            <div className="col-75">
                                <select id="type" name="type">
                                    <option value="desert">Desert</option>
                                    <option value="Meaty">Meaty</option>
                                    <option value="Veggie">Veggie</option>
                                    <option value="Soup">Soup</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </li>

                <li>
                    <div className="day hide-body"><b>Friday</b></div>
                    <div className="day-body">
                        <div className="row">
                            <div className="col-25">
                                <label for="country">Breakfas</label>
                            </div>
                            <div className="col-75">
                                <select id="type" name="type">
                                    <option value="desert">Desert</option>
                                    <option value="Meaty">Meaty</option>
                                    <option value="Veggie">Veggie</option>
                                    <option value="Soup">Soup</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-25">
                                <label for="country">Lunch</label>
                            </div>
                            <div className="col-75">
                                <select id="type" name="type">
                                    <option value="desert">Desert</option>
                                    <option value="Meaty">Meaty</option>
                                    <option value="Veggie">Veggie</option>
                                    <option value="Soup">Soup</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-25">
                                <label for="country">Dinner</label>
                            </div>
                            <div className="col-75">
                                <select id="type" name="type">
                                    <option value="desert">Desert</option>
                                    <option value="Meaty">Meaty</option>
                                    <option value="Veggie">Veggie</option>
                                    <option value="Soup">Soup</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </li>

                <li>
                    <div className="day hide-body"><b>Saturday</b></div>
                    <div className="day-body">
                        <div className="row">
                            <div className="col-25">
                                <label for="country">Breakfas</label>
                            </div>
                            <div className="col-75">
                                <select id="type" name="type">
                                    <option value="desert">Desert</option>
                                    <option value="Meaty">Meaty</option>
                                    <option value="Veggie">Veggie</option>
                                    <option value="Soup">Soup</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-25">
                                <label for="country">Lunch</label>
                            </div>
                            <div className="col-75">
                                <select id="type" name="type">
                                    <option value="desert">Desert</option>
                                    <option value="Meaty">Meaty</option>
                                    <option value="Veggie">Veggie</option>
                                    <option value="Soup">Soup</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-25">
                                <label for="country">Dinner</label>
                            </div>
                            <div className="col-75">
                                <select id="type" name="type">
                                    <option value="desert">Desert</option>
                                    <option value="Meaty">Meaty</option>
                                    <option value="Veggie">Veggie</option>
                                    <option value="Soup">Soup</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </li>

                <li> 
                    <div className="day hide-body"><b>Sunday</b></div>
                    <div className="day-body">
                        <div className="row">
                            <div className="col-25">
                                <label for="country">Breakfas</label>
                            </div>
                            <div className="col-75">
                                <select id="type" name="type">
                                    <option value="desert">Desert</option>
                                    <option value="Meaty">Meaty</option>
                                    <option value="Veggie">Veggie</option>
                                    <option value="Soup">Soup</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-25">
                                <label for="country">Lunch</label>
                            </div>
                            <div className="col-75">
                                <select id="type" name="type">
                                    <option value="desert">Desert</option>
                                    <option value="Meaty">Meaty</option>
                                    <option value="Veggie">Veggie</option>
                                    <option value="Soup">Soup</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-25">
                                <label for="country">Dinner</label>
                            </div>
                            <div className="col-75">
                                <select id="type" name="type">
                                    <option value="desert">Desert</option>
                                    <option value="Meaty">Meaty</option>
                                    <option value="Veggie">Veggie</option>
                                    <option value="Soup">Soup</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </li>*/}
    </ul>
        </React.Fragment>
    )
}