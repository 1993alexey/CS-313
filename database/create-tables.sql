CREATE TABLE public.recipe_type
(
    id SERIAL NOT NULL PRIMARY KEY,
    type VARCHAR(100) NOT NULL
);

CREATE TABLE public.user
(
    id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE public.recipe
(
    id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    ingridients VARCHAR (200) NOT NULL,
    type_id INT NOT NULL REFERENCES public.recipe_type(id),
    instructions TEXT NOT NULL
);

CREATE TABLE public.meal
(
    id SERIAL NOT NULL PRIMARY KEY,
    breakfast INT REFERENCES public.recipe(id),
    lunch INT REFERENCES public.recipe(id),
    dinner INT REFERENCES public.recipe(id)
);

CREATE TABLE public.meal_plan
(
    id SERIAL NOT NULL PRIMARY KEY,
    user_id INT REFERENCES public.user(id),
    monday INT REFERENCES public.meal(id),
    tuesday INT REFERENCES public.meal(id),
    wednsday INT REFERENCES public.meal(id),
    thursday INT REFERENCES public.meal(id),
    friday INT REFERENCES public.meal(id),
    saturday INT REFERENCES public.meal(id),
    sunday INT REFERENCES public.meal(id)
);

