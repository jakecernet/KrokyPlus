const kroky = require('kroky-api');
const fs = require('fs');
const { Console } = require('console');
username = "";
password = "";

var FullMenu=[]
var meni=[]

function extractSelectedDishes(data) {
  const selectedDishes = [];

  for (const week of data) {
    for (const dish of week) {
      if (dish.selected) {
        selectedDishes.push(dish.name);
      }
    }
  }

  return selectedDishes;
}




async function fetchMeals(username, password, week) {
  kroky.login(username, password);
  return await kroky.getMeals(week);
}
  

async function selectMeal(date, id, xl) {
  await kroky.login(username, password);
  await kroky.selectMeal(date, id, xl);
  //console.log("naročeno");
}

//poišče koliko tednov je minilo od začetka šolskega leta do danes
function weekDiff(){
  const d = new Date();
if (d.getMonth() < 8) {
  var year = d.getFullYear() - 1;
}
else {
  let year = d.getFullYear();
  }
  var start = new Date(year, 9, 1);

const today = new Date();
const diffTime = Math.abs(today - start);
const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
const week = Math.ceil(diffDays/7);
return week;

}

async function getFullMenu(){
  var meni= await kroky.login(username, password);
  
  for (i = 1; i < weekDiff()+1; i++) {
    
    var x=parseInt("-"+i);
    data =await kroky.getMeals(x);
    let selectedDishes = extractSelectedDishes(data);
    FullMenu = [...FullMenu, ...selectedDishes];

  }
  console.log(FullMenu);
  var out = FullMenu.join('\n');
    fs.writeFile('menu.txt', out, function (err) {
      if (err) throw err;
      console.log('Saved!');
    }
    );

}
getFullMenu();









