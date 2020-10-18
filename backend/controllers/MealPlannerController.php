<?php
require "services/dbConnect.php";

class MealPlannerController extends Controller { 

    protected $controller;  
    private $db;

    public function process($params) {
        if (session_status() == PHP_SESSION_NONE) {
            session_start();
        }

        header('Content-Type: application/json');
        $method = $params[0];
        $this->$db = get_db();
        
        if ($_SERVER['REQUEST_METHOD'] === 'GET') {
            if ($method === 'getPlan')
                $this->getPlan();
            else if ($method === 'getRecipes')
                $this->getRecipes();
            else if ($method === 'getRecipeTypes')
                $this->getRecipeTypes();
            else 
                $this->notFound();
        } else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            if ($method === 'savePlan')
                $this->savePlan();
            else if ($method === 'addRecipe')
                $this->addRecipe();
            else 
                $this->notFound();
        } else {
            $this->notFound();
        }
    }

    private function getPlan() {
        if (!isset($_SESSION["user"])) 
            $this->notAuthorized();

        $sql = "SELECT id, user_id, monday, tuesday, wednesday, thursday, friday, saturday, sunday 
                FROM public.meal_plan
                WHERE user_id = ?";

        $stm = $this->$db->prepare($sql);
        $stm->bindParam(1, $_SESSION["user"]["id"]);
        $stm->execute();  
        $plan = $stm->fetch(PDO::FETCH_ASSOC);
        if (isset($plan["monday"])) 
            $plan["monday"] = $this->getDbMeal($plan["monday"]);
        else
            $plan["monday"] = $this->getEmptyDay();

        if (isset($plan["tuesday"])) 
            $plan["tuesday"] = $this->getDbMeal($plan["tuesday"]);
        else
            $plan["tuesday"] = $this->getEmptyDay();

        if (isset($plan["wednesday"])) 
            $plan["wednesday"] = $this->getDbMeal($plan["wednesday"]);
        else
            $plan["wednesday"] = $this->getEmptyDay();

        if (isset($plan["thursday"])) 
            $plan["thursday"] = $this->getDbMeal($plan["thursday"]);
        else
            $plan["thursday"] = $this->getEmptyDay();

        if (isset($plan["friday"])) 
            $plan["friday"] = $this->getDbMeal($plan["friday"]);
        else
            $plan["friday"] = $this->getEmptyDay();

        if (isset($plan["saturday"])) 
            $plan["saturday"] = $this->getDbMeal($plan["saturday"]);
        else
            $plan["saturday"] = $this->getEmptyDay();

        if (isset($plan["sunday"])) 
            $plan["sunday"] = $this->getDbMeal($plan["sunday"]);
        else
            $plan["sunday"] = $this->getEmptyDay();

        echo json_encode($plan);
    }

    private function getRecipes() {
        if (!isset($_SESSION["user"])) 
            $this->notAuthorized();

        $sql = "SELECT r.id, r.name, ingredients, rt.type, instructions FROM public.recipe AS r
                INNER JOIN public.recipe_type AS rt on rt.id = r.type_id";
        $stm = $this->$db->prepare($sql);
        $stm->execute();
        
        $recipes = [];
        while ($row = $stm->fetch(PDO::FETCH_ASSOC)) 
            array_push($recipes, $row);

        echo json_encode($recipes);
    }

    private function getRecipeTypes() {
        if (!isset($_SESSION["user"])) 
            $this->notAuthorized();

        $stm = $this->$db->prepare("SELECT id, type from public.recipe_type");
        $stm->execute();

        $recipeTypes = [];
        while ($row = $stm->fetch(PDO::FETCH_ASSOC)) 
            array_push($recipeTypes, $row);

        echo json_encode($recipeTypes);
    }

    private function savePlan() {
        if (!isset($_SESSION["user"])) 
            $this->notAuthorized();

        $body = file_get_contents('php://input');
        $plan = json_decode($body, true);


        if (isset($plan["monday"]['meal_id'])) 
            $this->updateDbMeal($plan["monday"]);
        else
            $plan["monday"]['meal_id'] = $this->createDbMeal($plan["monday"]);

        if (isset($plan["tuesday"]['meal_id'])) 
            $this->updateDbMeal($plan["tuesday"]);
        else
            $plan["tuesday"]['meal_id'] = $this->createDbMeal($plan["tuesday"]);

        if (isset($plan["wednesday"])) 
            $this->updateDbMeal($plan["wednesday"]);
        else
            $plan["wednesday"]['meal_id'] = $this->createDbMeal($plan["wednesday"]);

        if (isset($plan["thursday"]['meal_id'])) 
            $this->updateDbMeal($plan["thursday"]);
        else
            $plan["thursday"]['meal_id'] = $this->createDbMeal($plan["thursday"]);

        if (isset($plan["friday"]['meal_id'])) 
            $this->updateDbMeal($plan["friday"]);
        else
            $plan["friday"]['meal_id'] = $this->createDbMeal($plan["friday"]);

        if (isset($plan["saturday"]['meal_id'])) 
            $this->updateDbMeal($plan["saturday"]);
        else
            $plan["saturday"]['meal_id'] = $this->createDbMeal($plan["saturday"]);

        if (isset($plan["sunday"]['meal_id'])) 
            $this->updateDbMeal($plan["sunday"]);
        else
            $plan["sunday"]['meal_id'] = $this->createDbMeal($plan["sunday"]);

        $this->updatePlan($plan);
        $this->getPlan();
    }

    private function addRecipe() {
        if (!isset($_SESSION["user"])) 
            $this->notAuthorized();

        $body = file_get_contents('php://input');
        $body = json_decode($body, true);
            

        $sql = "INSERT INTO public.recipe
                    (name, ingredients, type_id, instructions)
                VALUES
                    (?,?,?,?);";

        try {
            $stm = $this->$db->prepare($sql);
            $stm->bindParam(1, $body['name']);
            $stm->bindParam(2, $body['ingredients']);
            $stm->bindParam(3, $body['typeId']);
            $stm->bindParam(4, $body['instructions']);
            $stm->execute();
        } catch(Exception $ex) {
            $this->badRequest();
        }

        $this->noContent();
    }

    private function updatePlan($plan) {
        $sql = "UPDATE public.meal_plan
                SET monday = ?, tuesday = ?, wednesday = ?, thursday = ?, friday = ?, saturday = ?, sunday = ?
                WHERE id = ?;";

        $stm = $this->$db->prepare($sql);
        $stm->bindParam(1, $plan["monday"]["meal_id"]);
        $stm->bindParam(2, $plan["tuesday"]["meal_id"]);
        $stm->bindParam(3, $plan["wednesday"]["meal_id"]);
        $stm->bindParam(4, $plan["thursday"]["meal_id"]);
        $stm->bindParam(5, $plan["friday"]["meal_id"]);
        $stm->bindParam(6, $plan["saturday"]["meal_id"]);
        $stm->bindParam(7, $plan["sunday"]["meal_id"]);
        $stm->bindParam(8, $_SESSION["user"]["id"]);
        $stm->execute();  
    }

    private function getDbMeal($id) {
        $sql = "SELECT m.id AS meal_id, r_breakfast.id AS breakfast_id, r_breakfast.name AS breakfast_name,r_lunch.id AS lunch_id, r_lunch.name AS lunch_name, r_dinner.id AS dinner_id, r_dinner.name AS dinner_name 
                FROM public.meal AS m
                LEFT JOIN public.recipe AS r_breakfast on r_breakfast.id = m.breakfast
                LEFT JOIN public.recipe AS r_lunch on r_lunch.id = m.lunch
                LEFT JOIN public.recipe AS r_dinner on r_dinner.id = m.dinner
                WHERE m.id = ?";
        $stm = $this->$db->prepare($sql);
        $stm->bindParam(1, $id);
        $stm->execute();  
        return $stm->fetch(PDO::FETCH_ASSOC);
    }

    private function createDbMeal($meal) {
        $sql = "INSERT INTO public.meal
	                (breakfast, lunch, dinner)
                VALUES
                    (?, ?, ?)
                RETURNING id";

        $stm = $this->$db->prepare($sql);
        $stm->bindParam(1, $meal["breakfast_id"]);
        $stm->bindParam(2, $meal["lunch_id"]);
        $stm->bindParam(3, $meal["dinner_id"]);
        $stm->execute();  
        return $stm->fetch(PDO::FETCH_ASSOC)['id'];
    }

    private function updateDbMeal($meal) {
        $sql = "UPDATE public.meal
                SET breakfast = ?, lunch = ?, dinner = ?
                WHERE id = ?;";

        $stm = $this->$db->prepare($sql);
        $stm->bindParam(1, $meal["breakfast_id"]);
        $stm->bindParam(2, $meal["lunch_id"]);
        $stm->bindParam(3, $meal["dinner_id"]);
        $stm->bindParam(4, $meal["meal_id"]);
        $stm->execute();  
    }

    private function getEmptyDay() {
        return [
                "breakfast_id" => null,
                "breakfast_name" => null,
                "lunch_id" => null,
                "lunch_name" => null,
                "dinner_id" => null,
                "dinner_name" => null
        ];
    }
}
?>  