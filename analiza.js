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
  const conjunctions = ["s", "z", "v", "na", "in", "pa", "k", "h", "ob"];
  const other = [",", ".", ";", ":"];
  
  for (let j = 0; j < conjunctions.length; j++) {
    var regex = new RegExp(`\\s${conjunctions[j]}\\s`, "g");
    data = data.replaceAll(regex, " ");
  }
  
for (let j = 0; j < other.length; j++) {
  const regex = new RegExp(`\\${other[j]}`, "g");
  data = data.replaceAll(regex, "");
}
  return data;
}

function DataTokenizer(data) {
  data = data.replace(/\n|\r|\t/g, " ").toLowerCase();
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
  
  for (i = 35; i < weekDiff()+1; i++) {
    
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

async function main(){
  data = await getFullMenu("ČadLin", "hlamehhit");
  data = ClearData(data);
  data = DataTokenizer(data);
  data = CountData(data);

  console.log(data);


}
main();