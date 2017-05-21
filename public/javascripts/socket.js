primus = Primus.connect("", {
    reconnect: {
        max: Infinity // Number: The max delay before we try to reconnect.
        , min: 500 // Number: The minimum delay before we try reconnect.
        , retries: 10 // Number: How many times we should try to reconnect.
    }
});


var div = document.querySelectorAll(".container");

function color () {
div[0].style.display = "none";
div[1].style.display = "none";
div[2].style.display = "none";
div[3].style.display = "none";
div[4].style.display = "none";
div[5].style.display = "none";
div[6].style.display = "none";
div[7].style.display = "none";
div[8].style.display = "none";

}

function colorshow () {
    div[0].style.display = "flex";
    div[1].style.display = "flex";
    div[2].style.display = "flex";
    div[3].style.display = "flex";
    div[4].style.display = "flex";
    div[5].style.display = "flex";
    div[6].style.display = "flex";
    div[7].style.display = "flex";
    div[8].style.display = "flex";
}




document.querySelector('#Function1').addEventListener("click", function (e) {
    primus.write({message: 'function1'});
    navigator.vibrate(1000);
    color();
    setTimeout(function () {
        colorshow();
    },15000);
    e.preventDefault;
});

document.querySelector('#Function2').addEventListener("click", function (e) {
    primus.write({message: 'function2'});
    //console.log(id);
    e.preventDefault;
});

primus.on("data", function (data) {
    console.log(data);
});