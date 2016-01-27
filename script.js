/**
 * Created by Mad Martigan on 1/27/2016.
 */
//set global var;
    console.log("script");
var the_number = null;
var chomper;
var lives;
lives = 1;

//assign random number to the number;
function pick_number(){
    var random_number = Math.floor(Math.random() * 10) + 1;
    //for cheat testing
    console.log(random_number);
    the_number = random_number;
}

function make_guess(){
//          disable delay against double clicks;
    setTimeout('$("#guess_button").removeAttr("disabled")', 500);
    if (chomper) clearInterval(chomper);
    var the_guess = $('#guess_input').val();
    var refined = parseInt(the_guess);
//                Compare the numbers switch
    if(isNaN(refined))
        actionPhase("is not even a number! haha", false, the_guess);
    else if(the_guess == the_number)
        actionPhase("You guessed it!", true, the_guess);
    else if(the_guess > the_number)
        actionPhase("Too High!", false, the_guess);
    else if(the_guess < the_number)
        actionPhase("Too Low!", false, the_guess);
    else
        actionPhase(" is not a number dummy", false, the_guess);
}

function actionPhase(text, win, guess){
    //focus back on guess input
    $('#guess_input').val("").focus();
//      Lose Condition
    if(lives <= 0) {
        toggleBtnAndSay("You lose!");
    }
//      WIN Condition
    else if(win){
        toggleBtnAndSay("You win!");
//      Face win animation
        $("#lower_face").effect("hinge").delay(1200).queue(function(next){
            $("#eyebrow").show();
            // $(this).hide();
            next();
        });
        $("#lower_face").addClass("hinge");
    }
//       Missed Number Condition
    else{
//                    take away lives
        lives--;
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
//                  display dialogue
        $("#response_div").text("Nooooo!  " + guess + "  " + text);
//                    animate tongue
        $("#tongue").show().delay(500).animate({height: "+=240px"}).delay(300).animate({height: "-=240px"});
//                  animate soldier
        $("#army > div:first-child").delay(1200).animate({top: "-205px"}).queue(function(next){
            $(this).css("z-index", -1);
            $("#army > div:first-child").remove();
            $("#eyebrow").hide();
            chomper = setInterval(chomp(), 1000);
            // $(this).hide();
            next();
        });
    }
}
// toggle the buttons and say in monster dialogue
function toggleBtnAndSay(say){
    $("#response_div").text(say);
    $("#guess_button").toggle();
    $("#again_button").toggle();
}
//     create  more soliders in army div
function createDudes(num){
    for(var i = 0; i < num; i++){
        var body = $("<div>");
        var head = $("<div>");
        $(head).appendTo(body);
        $(body).appendTo("#army");
    }
}
// animate munching
function chomp(){
    console.log("chomping");
    $("#lower_face").effect("bounce");
};
// initialize game
$(document).ready(function(){
    pick_number();
    createDudes(lives);
//            hide replay btn and eyebrows
    $("#again_button").toggle();
    $("#eyebrow").hide();
//            replay button
    $("#again_button").click( function restart() {
        console.log("restarting");
        lives = 3;
        createDudes(lives);
//                hide replay button and reset game
        toggleBtnAndSay("Guess my number if you wish to live!");
        pick_number();
    });

    //      guess button, disables on click delay
    $("#guess_button").on("click", function() {
        $(this).attr("disabled", "disabled");
        make_guess(); //this method contains your logic
    });
});