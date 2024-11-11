import {FileController} from './FileController.js';

const BASE_PATH = './data';

type Meal = {
    name: string
}

type Category = {
    name: string,
    meals: [Meal]
}

type Day = {
    breakfast?: string
    dinner?: string
    supper?: string
}

type Week = {
    Monday: Day,
    Tuesday: Day,
    Wednesday: Day,
    Thursday: Day,
    Friday: Day,
    Saturday: Day,
    Sunday: Day
}


const categories: Category[] = await FileController.readJSON<Category[]>(`${BASE_PATH}/meals.json`);

const getRandomMealsForWeek = (category: Category, variants: number): string[] => {
    const meals = [...category.meals];
    const repeatSize = Math.floor(7 / variants);
    let repeatRest = 7 % variants;

    const chosenMeals: Meal[] = [];

    for (let i = 0; i < variants; i++) {
        const randomIndex = Math.floor(Math.random() * meals.length);
        chosenMeals.push(meals[randomIndex]);
        meals.splice(randomIndex, 1);
    }
    return chosenMeals.flatMap((chosenMeal) => {
        const arr = new Array(repeatSize + (repeatRest > 0 ? 1 : 0))
            .fill(chosenMeal.name)
        repeatRest--;
        return arr
    });
};

console.log(getRandomMealsForWeek(categories[0], 3))
console.log(getRandomMealsForWeek(categories[1], 3))
