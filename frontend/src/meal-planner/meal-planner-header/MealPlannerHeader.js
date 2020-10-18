import React from "react";
import { Link, useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import "./header.css";
import { logout } from "../../shared/login/login-service";

export default function MealPlannerHeader() {

  const history = useHistory()
  const user = JSON.parse(sessionStorage.getItem("user"));
  const username = user.name[0].toUpperCase() + user.name.substring(1);
  function logMeOut() {
    logout().then(res => {
      if (res) history.push("/assignment4");
    })
  }


  return (
    <div id="myDIV" className="header">
      <p id="logout-btn" onClick={logMeOut}>
        Logout
      </p>
      <h2>{username}'s Meal Planner</h2>
      <Link id="weeklyMeal" to="/assignment4">
        Weekly Meal
      </Link>
      <Link to="/assignment4/recipe-list" id="recipesList">
        Recipes List
      </Link>
      <Link to="/assignment4/new-recipe" id="addRecipe">
        Add Recipe
      </Link>
    </div>
  );
}
