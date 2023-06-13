const kroky = require('kroky-api');
const fs = require('fs');
const { Console } = require('console');


var meni=[]

function CountData(data) {
  var counts = {};
  for (var i = 0; i < data.length; i++) {
    var num = data[i];
    counts[num] = counts[num] ? counts[num] + 1 : 1;
  }
  return counts;
}



function ClearData(data) {
  NotFood=["malica", "s", "in", "v", "z", "ali", "h", "k", "na", "plastenki"]

  for (const key in data) {
    if (NotFood.includes(key)) {
      delete data[key];
    }
    }

  return data;

}

function DataTokenizer(data) {
  data = data.replace(/\n|\r|\t|,/g, " ").toLowerCase();
  const tokens = data.split(" ");
  var dishes = [];
  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i].length > 0) {
      dishes.push(tokens[i]);
    }
  }
  dishes=dishes.filter(item => item.trim() !== "").filter(item => item.trim() !== " ");
  return dishes;
}


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


function AutoSelectCheck(list) {
  for (let i = 1; i < list.length; i++) {
    if (list[i] !== list[i - 1] + 14) {
      return false;
    }
  }
  return true;
}


async function selectMeal(date, id, xl) {
  await kroky.login(username, password);
  await kroky.selectMeal(date, id, xl);
  //console.log("naročeno");
}

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

async function getFullMenu(username, password){
  var FullMenu=[];
  var meni= await kroky.login(username, password);
  
  for (i = 1; i < weekDiff()+2; i++) {
    
    var x=parseInt("-"+i);
    data =await kroky.getMeals(x);

    const temp = [];
for (const week of data) {
  for (const dish of week) {
    if (dish.selected) {
      temp.push(dish.id);
    }
  }
}

if (AutoSelectCheck(temp)!= true) {
  var selectedDishes = extractSelectedDishes(data);  
    FullMenu=FullMenu.concat(selectedDishes);

} 

  }

  var out = FullMenu.join('\n');
  return out;
}

async function main(username, password){
  data = await getFullMenu(username, password);
  data = DataTokenizer(data);
  data = CountData(data);
  data = ClearData(data);

  
  var max = 0;
  var maxKey = "";
  for (const key in data) {
    if (data[key] > max) {
      max = data[key];
      maxKey = key;
    }
  }
  console.log(maxKey);
  return maxKey;
}
