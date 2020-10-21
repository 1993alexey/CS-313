import React, {useEffect, useState} from 'react'
import PlannerHeader from '../meal-planner-header/MealPlannerHeader'
import {getRecipeTypes, addRecipe} from '../service'

export default function NewRecipe() {
    const [types, setTypes] = useState([])
    const [newRecipe, setNewRecipe] = useState({
        name:"",
        ingredients:"",
        typeId: 1,
        instructions:""
    })
    useEffect(() => {
        getRecipeTypes().then(setTypes)
    }, [])

    function handleIngredientChange(e) {
        const val = e.target.value
        const recipe = {...newRecipe}
        recipe.ingredients = val
        setNewRecipe(recipe)
    }

    function handleNameChange(e) {
        const val = e.target.value
        const recipe = {...newRecipe}
        recipe.name = val
        setNewRecipe(recipe)
    }

    function handleInstructionsChange(e) {
        const val = e.target.value
        const recipe = {...newRecipe}
        recipe.instructions = val
        setNewRecipe(recipe)
    }

    function handleTypeChange(e) {
        const val = e.target.value
        const recipe = {...newRecipe}
        recipe.typeId = val
        setNewRecipe(recipe)
    }

    function handleAdd() {
        addRecipe(newRecipe).then(res => {
            if (!res.ok) {
                alert('failed to add your recipe')
            } else {
                setNewRecipe({
                    name:"",
                    ingredients:"",
                    typeId: 1,
                    instructions:""
                })
            }
        })
    }

    const typeOptions = types.map(type => {
        const selected = type.id == newRecipe.typeId ? true : false
        return <option value={type.id} selected={selected}>{type.type}</option>
    })
    return (
        <React.Fragment>
            <PlannerHeader />
            <div className="container">
                <div className="row">
                    <div className="col-25">
                        <label for="name">Name</label>
                    </div>
                    <div className="col-75">
                        <input type="text" id="name" name="name" placeholder="Recipe Name" 
                        value={newRecipe.name} onInput={handleNameChange}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-25">
                        <label for="ingredient">Ingredient</label>
                    </div>
                    <div className="col-75">
                        <input type="text" id="ingredient" name="ingredient" placeholder="Recipe Ingredient" value={newRecipe.ingredients} 
                        onInput={handleIngredientChange}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-25">
                        <label for="country">Type</label>
                    </div>
                    <div className="col-75">
                        <select id="type" name="type" onChange={handleTypeChange} defaultValue="1">
                            {typeOptions}
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="col-25">
                        <label for="instruction">Instruction</label>
                    </div>
                    <div className="col-75">
                        <textarea id="instruction" name="instruction" placeholder="Write down the steps of how to make the meal" style={{ height: "200px" }}
                        value={newRecipe.instructions} onInput={handleInstructionsChange}></textarea>
                    </div>
                </div>
                <div className="row">
                    <button className="submit-btn" id="addBtn" value="Add" onClick={handleAdd}>Add</button>
                </div>
            </div>
        </React.Fragment>
    )
}