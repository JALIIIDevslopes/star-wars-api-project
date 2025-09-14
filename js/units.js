let inches=0;
let feet=0;
let lbs=0;


const changeBtn= document.querySelectorAll('.changeBtn');


/*  Toggle between  metric (height in centimeters(cm)  and weight in kilograms(kg) and
usa (height in feet and inches (ft in) and weigh in pounds (lb)) 
THERE ARE NO FRACTIONAL AMOUNTS GIVEN */
const toggleUnits = () => {
    const heights=document.querySelectorAll('.heightData');
   heights.forEach(height => {
        if (height.dataset.units=="metric") {
            if (!isNaN(height.dataset.value)) {
            inches=height.dataset.value/2.54;
            feet=Math.trunc(inches/12)
            inches=Math.trunc(inches%12);
            height.innerHTML=`${feet} ft ${inches} in`;
            }
            height.dataset.units="usa";
        }
        else {
              if (!isNaN(height.dataset.value)) {
            height.innerHTML=`${height.dataset.value} cm`;
              }
            height.dataset.units="metric";
        }
    });
    const weights=document.querySelectorAll('.weightData');
   weights.forEach(weight => {
        if (weight.dataset.units=="metric") {
             if (!isNaN(weight.dataset.value)) {
                lbs=Math.trunc(weight.dataset.value* 2.20462);
                weight.innerHTML=`${lbs} lb`;
            }

        weight.dataset.units="usa"
        } else {
            if (!isNaN(weight.dataset.value)) {
                weight.innerHTML=`${weight.dataset.value} kg`;
            }

            weight.dataset.units="metric"
        }
    });

}


// Adds Click event to the unit change button
for (const btn of changeBtn) {
    btn.addEventListener('click', () => {
   toggleUnits();
    }
);
}



