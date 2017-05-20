primus = Primus.connect("", {
    reconnect: {
        max: Infinity // Number: The max delay before we try to reconnect.
        , min: 500 // Number: The minimum delay before we try reconnect.
        , retries: 10 // Number: How many times we should try to reconnect.
    }
});


var elem = document.createElement("img");
elem.setAttribute("src", "images/logo.png");
elem.setAttribute("height", "768");
elem.setAttribute("width", "1024");
elem.setAttribute("alt", "Flower");

primus.on("data", function (data) {
    if(data.message != undefined) {
        if(data.message == 'function1') {
            document.querySelector("#functionShow").append(elem);
        } else {
            console.log('i fucked up');
        }
    }
});