const kroky = require('kroky-api');


async function fetchMeals() {
    await kroky.login("ČadLin", "hlamehhit");
    console.log(await kroky.getMeals(1));
  }
  
fetchMeals();

async function selectMeal(date, id, xl) {
  await kroky.login("ČadLin", "hlamehhit");
  await kroky.selectMeal(date, id, xl);
  console.log("narročeno");
}

selectMeal("2023-06-16", 30752, true);

