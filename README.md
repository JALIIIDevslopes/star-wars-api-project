# Star Wars ApI project
A project for Devslopes.


-This site displays data on 30 characters from Star Wars.  The data includes the following information name, gender, date of birth, eye color, hair color, height and weight
-To use site click [here!](https://jaliiidevslopes.github.io/star-wars-api-project/)
-males are displayed with an aqua border, females with a purple border, and anything else with an orange border
-Cick on A-Z or Z-A buttons to sort by names (last name + first name) in asscending or descending order respectively
-Click on Metric<->USA to toggle between metric units (default) for height and weight and us units.  Metric used cm for height and kg for weight.  US uses ft & in for height and lb for weight.  No fractional amounts are given
-Click on "Move to Favs" to move an item from Main Collection to Favorite Collection and "Move to Main" to move it back.
-There is a limit to how often data can be retrieved from resource so a data backup is stored to localstorage.  If there is an error fetching new data, it checks localstorage for backed up data  if there is any it will use that. If there is no backup an error will be displayed. 
