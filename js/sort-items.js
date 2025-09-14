/**
 * SORTING NODES WITHIN A CONTAINER
*/
// Both the Main and Favorites collections are sorted indivually
const mainDiv = document.getElementById('main');
const favsDiv = document.getElementById('favs');



const sortBtn = document.querySelectorAll('.sortBtn');


/* Sorts the data
Note: It sorts by id,  which is last name followed by first name
*/
const sortData = (direction) => {
const mainItems = document.querySelectorAll('.inMain');
const favItems = document.querySelectorAll('.inFavs');
const newArr = Array.from(mainItems);
const favArr= Array.from (favItems);
newArr.sort((a,b) => {
   if (direction==="desc" && a.id<b.id ||
     direction==="asc" && a.id > b.id ) return 1;
  else if (direction==="desc" && a.id > b.id ||
    direction==="asc" && a.id < b.id
  ) return -1;
  else return 0;
});
favArr.sort((a,b) => {
   if (direction==="desc" && a.id<b.id ||
     direction==="asc" && a.id > b.id ) return 1;
  else if (direction==="desc" && a.id > b.id ||
    direction==="asc" && a.id < b.id
  ) return -1;
  else return 0;
});
newArr.forEach((item) => {
  mainDiv.append(item);
});
favArr.forEach((item) => {
  favsDiv.append(item);
});
};

/**
 * Iterate through the every item in sortBtn NodeList and apply the
 * addEventListener click event to each item.
 * The item click must execute/call the following:
 * * Make the sortData function call, assign the item's dataset sortdir property
 */

for (const btn of sortBtn) {
    btn.addEventListener('click', () => {
   sortData(btn.dataset.sortdir);
    }
);
}



