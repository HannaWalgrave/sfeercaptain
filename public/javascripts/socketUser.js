primus = Primus.connect("", {
    reconnect: {
        max: Infinity // Number: The max delay before we try to reconnect.
        , min: 500 // Number: The minimum delay before we try reconnect.
        , retries: 10 // Number: How many times we should try to reconnect.
    }
});

/*
 * Author: Alex Gibson
 * https://github.com/alexgibson/shake.js
 * License: MIT license
 */

(function(global, factory) {
    if (typeof define === 'function' && define.amd) {
        define(function() {
            return factory(global, global.document);
        });
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = factory(global, global.document);
    } else {
        global.Shake = factory(global, global.document);
    }
} (typeof window !== 'undefined' ? window : this, function (window, document) {

    'use strict';

    function Shake(options) {
        //feature detect
        this.hasDeviceMotion = 'ondevicemotion' in window;

        this.options = {
            threshold: 15, //default velocity threshold for shake to register
            timeout: 1000 //default interval between events
        };

        if (typeof options === 'object') {
            for (var i in options) {
                if (options.hasOwnProperty(i)) {
                    this.options[i] = options[i];
                }
            }
        }

        //use date to prevent multiple shakes firing
        this.lastTime = new Date();

        //accelerometer values
        this.lastX = null;
        this.lastY = null;
        this.lastZ = null;

        //create custom event
        if (typeof document.CustomEvent === 'function') {
            this.event = new document.CustomEvent('shake', {
                bubbles: true,
                cancelable: true
            });
        } else if (typeof document.createEvent === 'function') {
            this.event = document.createEvent('Event');
            this.event.initEvent('shake', true, true);
        } else {
            return false;
        }
    }

    //reset timer values
    Shake.prototype.reset = function () {
        this.lastTime = new Date();
        this.lastX = null;
        this.lastY = null;
        this.lastZ = null;
    };

    //start listening for devicemotion
    Shake.prototype.start = function () {
        this.reset();
        if (this.hasDeviceMotion) {
            window.addEventListener('devicemotion', this, false);
        }
    };

    //stop listening for devicemotion
    Shake.prototype.stop = function () {
        if (this.hasDeviceMotion) {
            window.removeEventListener('devicemotion', this, false);
        }
        this.reset();
    };

    //calculates if shake did occur
    Shake.prototype.devicemotion = function (e) {
        var current = e.accelerationIncludingGravity;
        var currentTime;
        var timeDifference;
        var deltaX = 0;
        var deltaY = 0;
        var deltaZ = 0;

        if ((this.lastX === null) && (this.lastY === null) && (this.lastZ === null)) {
            this.lastX = current.x;
            this.lastY = current.y;
            this.lastZ = current.z;
            return;
        }

        deltaX = Math.abs(this.lastX - current.x);
        deltaY = Math.abs(this.lastY - current.y);
        deltaZ = Math.abs(this.lastZ - current.z);

        if (((deltaX > this.options.threshold) && (deltaY > this.options.threshold)) || ((deltaX > this.options.threshold) && (deltaZ > this.options.threshold)) || ((deltaY > this.options.threshold) && (deltaZ > this.options.threshold))) {
            //calculate time in milliseconds since last shake registered
            currentTime = new Date();
            timeDifference = currentTime.getTime() - this.lastTime.getTime();

            if (timeDifference > this.options.timeout) {
                window.dispatchEvent(this.event);
                this.lastTime = new Date();
            }
        }

        this.lastX = current.x;
        this.lastY = current.y;
        this.lastZ = current.z;

    };

    //event handler
    Shake.prototype.handleEvent = function (e) {
        if (typeof (this[e.type]) === 'function') {
            return this[e.type](e);
        }
    };

    return Shake;
}));

var standard = document.createElement("img");
standard.setAttribute("src", "images/EmptyState.gif");
standard.setAttribute("alt", "logo");

var emptyText = document.createElement("h1");
var t = document.createTextNode('geniet van de match');
emptyText.appendChild(t);

var elem = document.createElement("img");
elem.setAttribute("src", "images/klappen.gif");
elem.setAttribute("alt", "logo");

var elem2 = document.createElement("img");
elem2.setAttribute("src", "images/voetballer.gif");
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

            var seconds_left = 10;
            var interval = setInterval(function() {
                navigator.vibrate(1000);
                document.getElementById('timertext').innerHTML = "We beginnen in: ";
                document.getElementById('timer_div').innerHTML = --seconds_left;
                document.querySelector("#functionShow").append(elem2);
                if (seconds_left <= 0)
                {
                    document.querySelector("#functionShow").removeChild(elem2);
                    document.querySelector("header").style.visibility = "hidden";
                    document.getElementById('timer_div').innerHTML = "";
                    document.getElementById('timertext').innerHTML = "";


                    var myShakeEvent = new Shake({
                        threshold: 1
                    });
                    myShakeEvent.start();
                    window.addEventListener('shake', shakeEventDidOccur, false);
                    function shakeEventDidOccur () {
                        //put your own code here etc.
                        /*var x;

                        function changecolors() {
                            x = 1;
                            var c =setInterval(change, 1000);
                        }
                        function change() {
                            if (x === 1) {
                                color = "red";
                                x = 2;
                            }
                            if (x === 2){
                                color = "yellow";
                                x = 1;
                            }
                            else {
                                color = "#FFFFFF";
                            }

                            document.body.style.background = color;
                        }
                        changecolors(); */

                        var colors = ['yellow', 'red'];
                        var random_color = colors[Math.floor(Math.random() * colors.length)];
                        document.body.style.color = random_color;
                    }

                    setTimeout(function () {
                        document.querySelector("#functionShow").append(emptyText);
                        document.querySelector("#functionShow").append(standard);
                        document.querySelector("header").style.visibility = "visible";
                        //changecolors();
                        myShakeEvent.stop();
                        document.body.style.background = "#FFFFFF";
                    }, 15000);

                    clearInterval(interval);
                }

            }, 1000);

        }
        else {
            console.log('i fucked up');
        }
    }
});