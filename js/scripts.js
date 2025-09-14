const main = document.getElementById("main");
const favs= document.getElementById("favs");
 // only used if api not respoding  and no backup on localStorage
const allData=document.getElementById("allData"); 
let child=undefined;
let clickSet=false;
//  Set the counters for the number of people per gender for each collection to 0
let mainMales=0;
let mainFemales=0;
let mainOthers=0;
let favMales=0;
let favFemales=0;
let favOthers=0;

// Display the counts
let mainMaleCont=document.querySelector('.mainMales');
let mainFemaleCont=document.querySelector('.mainFemales');
let mainOthersCont=document.querySelector('.mainOthers');
let favMaleCont=document.querySelector('.favMales');
let favFemaleCont=document.querySelector('.favFemales');
let favOthersCont=document.querySelector('.favOthers');
const countRender=() => {
  mainMaleCont.innerHTML=mainMales;
  mainFemaleCont.innerHTML=mainFemales;
  mainOthersCont.innerHTML=mainOthers;
  favMaleCont.innerHTML=favMales;
  favFemaleCont.innerHTML=favFemales;
  favOthersCont.innerHTML=favOthers;
}

// Move an item from/to Main and Favorite Collection and update counters
const updateCollections = (id, direction) => {
    const element = document.getElementById(id);
    const moveBtn=element.querySelector('.moveBtn');
    console.log(moveBtn);
    moveBtn.innerHTML=`Move to ${direction==='toFavs'?'Main':'Favs'}`;
       const toParent = direction==='toFavs'?favs:main;
          toParent.appendChild(element);
          element.classList.remove(direction=='toFavs'?'inMain':'inFavs');
          element.classList.add(direction=='toMain'?'inMain':'inFavs')
          if (element.classList.contains("male")) {
            if (direction=='toFavs') {
                favMales++;
                mainMales--;
            } else {
              favMales--;
                mainMales++;
            }
          } else if (element.classList.contains("female")) {
             if (direction=='toFavs') {
                favFemales++;
                mainFemales--;
            } else {
              favFemales--;
                mainFemales++;
            }
          } else {
                if (direction=='toFavs') {
                favOthers++;
                mainOthers--;
            } else {
              favOthers--;
                mainOthers++;
            }
          }
countRender();
          
}
 
// Get Numbers 1 to 83  (skipping 17)  the get 30 random numbbers of that list
// The api responds for characters "people" 1-83.  Except number 17 is missing.
 let data=[];
let parts=[];
let numbers=[];
for (let i=1; i<84;i++) {
    if (i !=17) {numbers.push(i);}
}
const shuffled = numbers.sort(() => Math.random() - 0.5);
const peopleIds=shuffled.slice(0, 30);

// Get 30 "People" URLs from Star Wars database and fetch data
const baseURL="https://www.swapi.tech/api/people/";
const dataURLS=peopleIds.map((value) => `${baseURL}${value}/`);

Promise.all(dataURLS.map(url => fetch(url).then(response => response.json())))
  .then(results => {
    results.forEach((value, index) => {
        data[index]={};
        data[index].byear=value.result.properties.birth_year;
        data[index].gender=value.result.properties.gender;
        data[index].hairColor=value.result.properties.hair_color;
        data[index].eyeColor=value.result.properties.eye_color;
        data[index].height=value.result.properties.height;
        data[index].mass=value.result.properties.mass;
        parts=value.result.properties.name.split(" ");
        data[index].fName=parts.length > 1 ? parts.slice(0, -1).join(' ') : '';
        data[index].lName=parts.length > 1 ? parts[parts.length - 1] : value.result.properties.name;
       data[index].fName=data[index].fName.replace(/I/g, 'i').replace(/O/g, 'o').replace(/Y/g, 'y');
        data[index].lName=data[index].lName.replace(/I/g, 'i').replace(/O/g, 'o').replace(/Y/g, 'y');
      });
   insertItems(data);
   addClick();
   // Stores data to local Stoage
localStorage.setItem('myData', JSON.stringify(data));
   countRender();
  }
)
    .catch(error => {
    console.error(error); // handle any errors
    const myDataRaw = localStorage.getItem('myData');
    if (myDataRaw) {
       data=JSON.parse(myDataRaw);
       insertItems(data);
        addClick();
        countRender();
    } else {
      allData.innerHTML="The Empire is currently occupied please try again in a while";
    }
  });

//  Adds the character card to the main collection
  const insertItems = (data) => {
 data.forEach((item) => {
      child=createItem(item);
      main.appendChild(child);
  
    });
  } 

// Creates the characher card
  const createItem = (info) => {
    const item = document.createElement('div');
    item.classList.add('item');
    item.classList.add('inMain');
    item.id=`${info.lName.toLowerCase()}${info.fName.toLowerCase()}`;
    item.innerHTML=`
      <div class="name">
      <div class="Title">Name: </div>
      <div class="data nameData">${info.fName} ${info.lName}</div></div>
      <div class="gender">
      <div class="Title">Gender: </div>
      <div class="data genderData">${info.gender}</div></div>
      <div class="birth">
      <div class="Title">Birth Year: </div>
      <div class="data birthData">${info.byear}</div></div>
      <div class="eyeColor">
      <div class="Title">Eye Color: </div>
      <div class="data eyeData">${info.eyeColor}</div></div>
      <div class="hairColor">
      <div class="Title">Hair Color: </div>
      <div class="data hairData">${info.hairColor}</div></div>
      <div class="height">
      <div class="Title">Height: </div>
      <div class="data heightData" date-units="metric" data-value="${info.height}">${info.height}${!isNaN(info.height)?"cm":""}</div></div>
       <div class="weight">
      <div class="Title">Weight: </div>
      <div class="data weightData date-units="metric" data-value="${info.mass}">${info.mass} ${!isNaN(info.mass)?"kg":""}</div></div>
     <button class="moveBtn" type="button">Move to Favs</button>
      `;
     let gender=info.gender;
     if (gender != "male" && gender != "female") gender="other";
     item.classList.add(gender);
     if (gender=="male") {mainMales++;}
      else if (gender=="female") {mainFemales++;}
      else {mainOthers++;}
     return item;
  }


  // Adds Click events to all the  charchter cards
  const addClick = () => {
const allItems = document.querySelectorAll('.item');
 for (const item of allItems) {
    item.addEventListener('click', () => {
const parentId = item.parentElement.id;
const myId=item.id;
const direction=parentId==='main'?"toFavs":"toMain";
updateCollections(myId,direction);

    }
);
};

  }