primus = Primus.connect("", {
    reconnect: {
        max: Infinity // Number: The max delay before we try to reconnect.
        , min: 500 // Number: The minimum delay before we try reconnect.
        , retries: 10 // Number: How many times we should try to reconnect.
    }
});

var image ="images/logo.png";

primus.on("data", function (data) {
    if(data.message != undefined) {
        if(data.message == 'function1') {
            document.querySelector("#functionShow").append("<img src="+image+"/>");
        } else {
            console.log('i fucked up');
        }
    }
});