/**
 * Created by Mad Martigan on 1/27/2016.
 */

data = {
    the_number: null,
    chomping: false,
    chompTime: 0,
    lives: 1
}

controller = {
    getTheNumber : function () { return data.the_number},
    getChompTime : function () { return data.chompTime},
    setChompTime : function (num) { data.chompTime = num},
    getLives : function () { return data.lives},
    setLives : function (num) { data.lives = num}
}

view = {
    pick_number: function (){
        var random_number = Math.floor(Math.random() * 10) + 1;
        //for cheat testing
        console.log(random_number);
        data.the_number = random_number;
    },

    make_guess: function(){
    //          disable delay against double clicks;
        the_number = controller.getTheNumber();
        setTimeout('$("#guess_button").removeAttr("disabled")', 500);
        var the_guess = $('#guess_input').val();
        console.log(the_guess);
        var refined = parseInt(the_guess);
    //                Compare the numbers switch
        if(isNaN(refined))
            view.actionPhase("That wasn't even a number! haha", false, the_guess);
        else if(the_guess == the_number)
            view.actionPhase("You guessed it!", true, the_guess);
        else if(the_guess > the_number)
            view.actionPhase("Too High!", false, the_guess);
        else if(the_guess < the_number)
            view.actionPhase("Too Low!", false, the_guess);
        else
            view.actionPhase(" is not a number dummy", false, the_guess);
    },

    actionPhase: function(text, win, guess){
        //focus back on guess input
        var lives = controller.getLives()
        $('#guess_input').val("").focus();
    //      Lose Condition

    //      WIN Condition
        if(win){
          //  $("#response_div").text("nooo");
            $("#eyebrow").show();
            view.toggleBtnAndSay("u win!");
    //      Face win animation
            $("#lower_face").addClass("hinge").delay(8000).queue(function(next){

                $(this).removeClass("hinge");
                // $(this).hide();
                next();
            });

        }
    //       Missed Number Condition
        else{
    //                    take away lives
            --lives
            controller.setLives(lives);
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
                controller.setChompTime(2)
                view.chomp();
                $(".press").removeClass("background");
                // $(this).hide();
                next();
            });
            if(lives <= 0) {
                view.toggleBtnAndSay("You lose!");
            }
        }
    },
    // toggle the buttons and say in monster dialogue
    toggleBtnAndSay: function(say){
        $("#response_div").text(say);
        $("#guess_button").toggle();
        $("#again_button").toggle();
    },
    //     create  more soliders in army div
    createDudes: function(num) {
        for (var i = 0; i < num; i++) {
            var body = $("<div>");
            var head = $("<div>");
            $(head).appendTo(body);
            $(body).appendTo("#army");
        }
    },
    addClassTemp: function(targ, val){
        $(targ).addClass(val).delay(300).queue(function(next){
            $(this).removeClass(val);
            next();
        });
    },
    // animate munching
    chomp: function(){
        console.log("chomping");
        $("#lower_face").effect("bounce");
        var chomps = controller.getChompTime();
        chomps == 0 ? console.log("done"): setTimeout(view.chomp, 300); controller.setChompTime(chomps - 1);
    },
    restart: function(){
        console.log("restarting");
        controller.setLives(3);
        view.createDudes(controller.getLives());
//                hide replay button and reset game
        view.toggleBtnAndSay("Guess my number if you wish to live!");
        view.pick_number();
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
    $("#again_button").click(view.restart);

    //      guess button, disables on click delay
    $("#guess_button").on("click", function() {
        $(this).attr("disabled", "disabled");
        view.make_guess(); //this method contains your logic
    });
});