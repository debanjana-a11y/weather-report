
unit = document.getElementsByClassName("unit");
for (let u = 0; u < unit.length; u++) {
    console.log(unit[0]);
}

unit[1].onclick = change_to_farenheit;

function change_to_farenheit() {
    let temparature = document.getElementsByClassName("temperature_value")[0].innerText;
    // console.log((document.getElementsByClassName("temperature_value"))[0].innerHTML);
    document.getElementsByClassName("temperature_value")[0].innerText = (parseInt(temparature) * (9/5))+32;
    unit[0].style.fontWeight = "normal";
    unit[1].style.fontWeight = "bold";
};


unit[0].onclick = change_to_celcius;

function change_to_celcius() {
    let temparature = document.getElementsByClassName("temperature_value")[0].innerText;
    // console.log((document.getElementsByClassName("temperature_value"))[0].innerHTML);
    document.getElementsByClassName("temperature_value")[0].innerText = (parseInt(temparature) - 32) * (5/9);
    unit[0].style.fontWeight = "bold";
    unit[1].style.fontWeight = "normal";
};

