import React from 'react'
import PlannerHeader from '../meal-planner-header/MealPlannerHeader'

export default function NewRecipe() {
    return (
        <React.Fragment>
            <PlannerHeader />
            <div className="container">
                <div className="row">
                    <div className="col-25">
                        <label for="name">Name</label>
                    </div>
                    <div className="col-75">
                        <input type="text" id="name" name="name" placeholder="Recipe Name" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-25">
                        <label for="ingredient">Ingredient</label>
                    </div>
                    <div className="col-75">
                        <input type="text" id="ingredient" name="ingredient" placeholder="Recipe Ingredient" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-25">
                        <label for="country">Type</label>
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
                        <label for="instruction">Instruction</label>
                    </div>
                    <div className="col-75">
                        <textarea id="instruction" name="instruction" placeholder="Write down the steps of how to make the meal" style={{ height: "200px" }}></textarea>
                    </div>
                </div>
                <div className="row">
                    <button className="submit-btn" id="addBtn" value="Add">Add</button>
                </div>
            </div>
        </React.Fragment>
    )
}