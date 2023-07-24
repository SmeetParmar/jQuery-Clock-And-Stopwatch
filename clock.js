"use strict";

// to do things after page is rendered.
$(document).ready(function () {

    //calling displayCurrentTime function
    displayCurrentTime();

    //calling displayCurrentTime after 1 second
    setInterval(displayCurrentTime, 1000);

    //calling statStopwatch function on clicking start link and preventing default action.
    $("#start").click(function(e){
        // prevent default action of link
        e.preventDefault();
        startStopwatch();
    });

    //calling stopStopWatch function on clicking stop link and preventing default action.
    $("#stop").click(function(e){
        // prevent default action of link
        e.preventDefault();
        stopStopwatch();
    });

    //calling resetStopWatch function on clicking reset link and preventing default action.
    $("#reset").click(function(e){
        // prevent default action of link
        e.preventDefault();
        resetStopwatch();
    });
});

// function to add 0 to single digit number.
const padSingleDigit = num => num.toString().padStart(2, "0");

//funtion to display current time
const displayCurrentTime = () => {

    //getting system time
    const currentTime = new Date();

    //declaring hours, mins, seconds and meridiem
    let hours = currentTime.getHours(), 
    seconds = padSingleDigit(currentTime.getSeconds()), 
    minutes = padSingleDigit(currentTime.getMinutes()), 
    meridiem = "AM";

    // correct hours and AM/PM value for display
    if (hours > 12) 
    {
        hours -= 12;
        meridiem = "PM";
    } 
    else 
    { 
        // adjust 12 noon and 12 midnight
        switch (hours) 
        {
            case 12: // noon
                meridiem = "PM";
                break;
            case 0:  // midnight
                hours = 12;
                meridiem = "AM";
        }
    }

    //displaying time
    $("#hours").text(hours);
    $("#minutes").text(minutes);
    $("#seconds").text(seconds);
    $("#meridiem").text(meridiem);

};


//global stop watch timer variable and elapsed time object
let stopwatchTimer = null;
let elapsedMinutes = 0;
let elapsedSeconds = 0;
let elapsedMilliseconds = 0;


//function to update time of stopwatch
const tickStopwatch = () => {    

    // increment milliseconds by 10 milliseconds
    elapsedMilliseconds += 10;
    
    // if milliseconds total 1000, increment seconds by one and reset milliseconds to zero
    if(elapsedMilliseconds>=1000)
    {
        elapsedSeconds++;
        elapsedMilliseconds=0;
    }
    
    // if seconds total 60, increment minutes by one and reset seconds to zero
    if(elapsedSeconds >= 60)
    {
        elapsedMinutes++;
        elapsedSeconds=0;
    }
    
    //display new stopwatch time
    $("#s_minutes").text(padSingleDigit(elapsedMinutes));
    $("#s_seconds").text(padSingleDigit(elapsedSeconds));
    $("#s_milliseconds").text(padSingleDigit(elapsedMilliseconds));

};


//function to start stopwatch
const startStopwatch = () => {

    //if stopwatchTimer is not null, it will call tickstopwatch() function after every 10 milliseconds.
    if(!stopwatchTimer)
    {
        stopwatchTimer=setInterval(tickStopwatch,10);
    }

};


//function to stop the stopwatch
const stopStopwatch = () => {

    // stop timer
    clearInterval(stopwatchTimer);
    stopwatchTimer=null;
    
};


//function to reset the stopwatch
const resetStopwatch = () => {

    // stop timer
    stopStopwatch();

    // reset elapsed variables
    elapsedMilliseconds=0;
    elapsedSeconds=0;
    elapsedMinutes=0;
    
    //clear stopwatch display
    $("#s_minutes").text(padSingleDigit(elapsedMinutes));
    $("#s_seconds").text(padSingleDigit(elapsedSeconds));
    $("#s_milliseconds").text(padSingleDigit(elapsedMilliseconds));

};
