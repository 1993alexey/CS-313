select 'drop table if exists "' || tablename || '" cascade;'
    from pg_tables
    where schemaname = 'public';

drop table if exists "recipe_type" cascade;
drop table if exists "recipe" cascade;
drop table if exists "meal" cascade;
drop table if exists "user" cascade;
drop table if exists "meal_plan" cascade;