primus = Primus.connect("", {
    reconnect: {
        max: Infinity // Number: The max delay before we try to reconnect.
        , min: 500 // Number: The minimum delay before we try reconnect.
        , retries: 10 // Number: How many times we should try to reconnect.
    }
});

var standard = document.createElement("img");
standard.setAttribute("src", "images/EmptyState.gif");
standard.setAttribute("alt", "logo");

var emptyText = document.createElement("h1");
var t = document.createTextNode('geniet van de match');
emptyText.appendChild(t);

var elem = document.createElement("img");
elem.setAttribute("src", "images/logo.png");
elem.setAttribute("alt", "logo");

var elem2 = document.createElement("img");
elem2.setAttribute("src", "images/header.png");
elem2.setAttribute("alt", "logo");

document.querySelector("#functionShow").append(emptyText);
document.querySelector("#functionShow").append(standard);

primus.on("data", function (data) {
    if(data.message != undefined) {
        document.querySelector("#functionShow").removeChild(emptyText);
        document.querySelector("#functionShow").removeChild(standard);
        if(data.message == 'function1') {
            var seconds_left = 10;
            var interval = setInterval(function() {
                navigator.vibrate(1000);
                document.getElementById('timertext').innerHTML = "We beginnen in: ";
                document.getElementById('timer_div').innerHTML = --seconds_left;
                if (seconds_left <= 0)
                {
                    document.getElementById('timer_div').innerHTML = "";
                    document.getElementById('timertext').innerHTML = "";
                    document.querySelector("#functionShow").append(elem);
                    setTimeout(function () {
                        document.querySelector("#functionShow").removeChild(elem);
                        document.querySelector("#functionShow").append(emptyText);
                        document.querySelector("#functionShow").append(standard);
                    }, 5000);
                    clearInterval(interval);
                }
            }, 1000);



        }if(data.message == 'function2') {
            document.querySelector("#functionShow").append(elem2);


        }
        else {
            console.log('i fucked up');
        }
    }
});