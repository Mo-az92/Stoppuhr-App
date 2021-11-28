$(document).ready(function(){
    // define variables
    var mode = 0;// App mode
    var timeCounter = 0; // time counter
    var lapCounter = 0; // lap counter
    var action; //for setInterval
    var lapNumber = 0; //Number of laps
    var timeMinutes, timeSeconds, timeCentiseconds, lapMinutes, lapSeconds, lapCentiseconds;// minutes, seconds, centiseconds for Time and Lap

    // on App load show start and lap Buttons
    hideshowButtons("#startButton","#lapButton");

    // click on Start Button
    $("#startButton").click(function(){
        //mode on
        mode = 1;
        // show stop and lap buttons
        hideshowButtons("#stopButton","#lapButton");
        // start counter
        startAction();

    });

    // click on stop button
    $("#stopButton").click(function(){
        // show Resume and lap buttons
        hideshowButtons("#resumeButton","#resetButton");
        // stop counter
        clearInterval(action);

    });
    // click on resume button
    $("#resumeButton").click(function(){
        // show Resume and lap buttons
         hideshowButtons("#stopButton","#lapButton");
        // start counter
        startAction();
    
    });
    // click on reset button
    $("#resetButton").click(function(){
       // reload the page
       location.reload();
        
    });
    // click on lap button
    $("#lapButton").click(function(){
        //if mode on
        if(mode){
            //stop action
            clearInterval(action);
            //resetLap and print lap details
            lapCounter = 0 ;
            addLap();
            //start action
            startAction();
        }

    });


    //functions

    // show two buttons
    function hideshowButtons(x,y){

        $(".control").hide();
        $(x).show();
        $(y).show();
        
    }
    // start the counter
    function startAction(){
        action = setInterval(function(){
            timeCounter++;
            if(timeCounter == 100*60*100){
                timeCounter = 0;
            };
            lapCounter++;
            if(lapCounter == 100*60*100){
                lapCounter = 0;
            };
            updateTime();}, 10);
    }

    // update time: converts counters to min, sec, centsec
    function updateTime(){
        //1min= 60*100centiseconds=6000centiseconds
        timeMinutes = Math.floor(timeCounter/6000);
        //1sec= 100xentiseconds
        timeSeconds = Math.floor((timeCounter%6000)/100);
        timeCentiseconds  = (timeCounter%6000)%100;

        $("#timeminute").text(format(timeMinutes));
        $("#timesecond").text(format(timeSeconds));
        $("#timecentisecond").text(format(timeCentiseconds));

        //1min= 60*100centiseconds=6000centiseconds
        lapMinutes = Math.floor(lapCounter/6000);
        //1sec= 100xentiseconds
        lapSeconds = Math.floor((lapCounter%6000)/100);
        lapCentiseconds  = (lapCounter%6000)%100;

        $("#lapminute").text(format(lapMinutes));
        $("#lapsecond").text(format(lapSeconds));
        $("#lapcentisecond").text(format(lapCentiseconds));
    }

    //Format Numbers
    function format(number){
        if(number<10){
            return '0'+number;
        }else{
            return number;
        }

    }

    //add Lap
    function addLap(){
        lapNumber++;
        var myLapDetails = 
           '<div class="lap">'+
                '<div class="laptimetitle">'+
                   'Lap'+ lapNumber +
                '</div>'+
                '<div class="laptime">'+
                   '<span>'+ format(lapMinutes) +'</span>'+
                   ':<span>'+ format(lapSeconds) +'</span>'+
                   ':<span>'+ format(lapCentiseconds) +'</span>'+
               '</div>'+
            '</div>';              
        $(myLapDetails).prependTo("#laps");
    }



});