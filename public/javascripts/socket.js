primus = Primus.connect("", {
    reconnect: {
        max: Infinity // Number: The max delay before we try to reconnect.
        , min: 500 // Number: The minimum delay before we try reconnect.
        , retries: 10 // Number: How many times we should try to reconnect.
    }
});

document.querySelector('#Function1').addEventListener("click", function (e) {
    primus.write({message: 'function1'});
    //console.log(id);
    e.preventDefault;
});

primus.on("data", function (data) {
    console.log(data);
});