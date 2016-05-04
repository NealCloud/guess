/**
 * Created by Mad Martigan on 1/27/2016.
 */
var data = new Data();
var control = new Controller();
var view = new View();
function Data(){
    this.the_number = null;
    this.chomping = false;
    this.chompTime = 0;
    this.lives = 1;
}

function Controller(){
    this.getTheNumber = function () { return data.the_number};
    this.setTheNumber = function (num) { data.the_number = num};
    this.getChompTime = function () { return data.chompTime};
    this.setChompTime = function (num) { data.chompTime = num};
    this.getLives = function () { return data.lives};
    this.setLives = function (num) { data.lives = num};
};

function View() {
    var self = this;

    function pick_number(){
        var random_number = Math.floor(Math.random() * 10) + 1;
        //for cheat testing
        console.log(random_number);
        control.setTheNumber(random_number);
    };

    this.make_guess = function(){
    //          disable delay against double clicks;
        var the_number = control.getTheNumber();
        setTimeout('$("#guess_button").removeAttr("disabled")', 500);
        var the_guess = $('#guess_input').val();
        console.log(the_guess);
        var refined = parseInt(the_guess);
    //                Compare the numbers switch
        if(isNaN(refined))
            actionPhase("That wasn't even a number! haha", false, the_guess);
        else if(the_guess == the_number)
            actionPhase("You guessed it!", true, the_guess);
        else if(the_guess > the_number)
            actionPhase("Too High!", false, the_guess);
        else if(the_guess < the_number)
            actionPhase("Too Low!", false, the_guess);
        else
            actionPhase(" is not a number dummy", false, the_guess);
    };

    function actionPhase(text, win, guess){
        //focus back on guess input
        var lives = control.getLives()
        $('#guess_input').val("").focus();
    //      Lose Condition

    //      WIN Condition
        if(win){
          //  $("#response_div").text("nooo");
            $("#eyebrow").show();
            view.disableBtn("button", 8000);
            toggleBtnAndSay("u win!");
    //      Face win animation
            $("#lower_face").addClass("hinge").delay(8000).queue(function(next){
                $(this).removeClass("hinge");
                $("#army").html("");
                $("#eyebrow").hide();
                next();
            });
        }
    //       Missed Number Condition
        else{
    //                    take away lives
            --lives;
            control.setLives(lives);
    //                    animate upperface
            $("#upper_face").addClass("angry").effect("shake").delay(800).animate({top: "-20px"}).queue(function(next){
                $(this).animate({top: "0px"}).removeClass("angry");
                next();
            });
    //                  animate lowerface
            $("#lower_face").addClass("angry").effect("bounce").animate({top: "20px"}).delay(350).animate({top: "0px"}).queue(function(next){
                $(this).removeClass("angry");
                next();
            });
    //                  displays angry eyebrow
            $("#eyebrow").show();
            $(".press").addClass("background");
    //                  display dialogue
            $("#response_div").text("Nooooo!  " + guess + "  " + text);
    //                    animate tongue
            $("#tongue").show().delay(500).animate({height: "+=240px"}).delay(300).animate({height: "-=240px"});
    //                  animate soldier
            $("#army > div:first-child").delay(1200).animate({top: "-205px"}).queue(function(next){
                $(this).css("z-index", -1);
                $("#army > div:first-child").remove();
                $("#eyebrow").hide();
                control.setChompTime(2);
                chomp();
                $(".press").removeClass("background");
                // $(this).hide();
                next();
            });
            if(lives <= 0) {
                toggleBtnAndSay("You lose!");

                view.disableBtn("button", 5000);
                //view.chomp();
            }
        }
    };
    // toggle the buttons and say in monster dialogue
    function toggleBtnAndSay(say){
        $("#response_div").text(say);
        $("#guess_button").toggle();
        $("#again_button").toggle();
    };
    this.disableBtn = function(targ, time){
        $(targ).attr("disabled", "disabled").delay(time).queue(function(next){
            $(this).removeAttr("disabled");
            next();
        });
    };
    //     create  more soldiers in army div
    function createDudes(num) {
        for (var i = 0; i < num; i++) {
            var body = $("<div>");
            var head = $("<div>");
            $(head).appendTo(body);
            $(body).appendTo("#army");
        }
    };
    function addClassTemp(targ, val){
        $(targ).addClass(val).delay(300).queue(function(next){
            $(this).removeClass(val);
            next();
        });
    };
    // animate munching
    function chomp(){
        console.log("chomping");
        $("#lower_face").effect("bounce");
        var chomps = control.getChompTime();
        var chmp;
        chomps == 0 ? clearTimeout(chmp): chmp = setTimeout(view.chomp, 300);
        control.setChompTime(chomps - 1);
    };
    this.restart = function(){
        console.log("restarting");
        control.setLives(3);
        createDudes(control.getLives());
//                hide replay button and reset game
        toggleBtnAndSay("Guess my number if you wish to live!");
        pick_number();
    }
}

// initialize game
$(document).ready(function(){
   // view.pick_number();
   // view.createDudes(controller.getLives());
//            hide replay btn and eyebrows
    $("#guess_button").toggle();
    $("#eyebrow").hide();
//            replay button
    $("#again_button").click(function() {
            view.restart();
            view.disableBtn("button", 1000);
        });

    //      guess button, disables on click delay
    $("#guess_button").on("click", function() {
        view.disableBtn("button", 2000);
        view.make_guess(); //this method contains your logic
    });
});