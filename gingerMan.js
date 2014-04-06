// document ready
// $(document).ready (function(){})
$(function(){

    // toggle button style
    $('#go').hover (
        function(){
            $(this).toggleClass('ovr', 'btn');
        }
    );

    $('#game').submit (
        function(){
            response = gingerMan.response($('#description'));

            return false;
        });

    $('#gingerman_icon').draggable();

    $(window).load (
        function()
        {
            if (gingerMan.status == 'ready')
            {
                $('#start').html(gingerMan.saying);
                $('#level').text( 'Level 1' );
            }
            $('#myAction').focus();
        });
});

function get_random_num(length)
{
    return parseInt(Math.random() * length);
}

var gingerMan = {

    level   :   1,
    win     :   false,
    status  :   'ready',
    saying  :   "... You can't catch me. I'm the Ginger Bread Man. ",

    highest_level:  100, // for difficulty setting
    
    pre_response: new Array
                    (
                        "Haha ! ", "Hoho ! ", "Aha ! ",
                        "Yooho..", "Duh! ", "Hohoho", "wadaBooda ! ",
                        " Bro, ", " Bingo ! "
                    ),

    disgusting: new Array
                    (
                        "fart", "poo", "pee"
                    ),

    disgusting_response: new Array
                    (
                        "Yuck ! ", "That's disgusting. ", "Nasty ",
                        "Ugh...", "What Da ?!",
                        "Ma'am, I think your behaviour is improper to this game.",
                        "AAh. Look at you! ", "Uhh, I feel uncomfortable. ",
                        "Sorry, I have an uncomfortable feeling deep in my throat."
                    ),

    /*
        blind
        bounce
        clip
        drop
        explode
        fade
        fold
        highlight
        puff
        pulsate
        scale
        shake
        size
        slide
        transfer
    */
    effectType : '',

    response_msg : {
        'format'    : [' msg ',                             'effectType'],

        'fail'      : [" Let's go to next level! \n",       'pulsate'],
        'run'       : [' Run as fast as I can...',    'drop'],
        'jump'      : [' Jump as high as I can...',   'bounce'],
        'miss'      : [' Oops, You missed it...',     'clip'],
        'rollover'  : [' Yeah! I roll over.',         'clip'],
        'swim'      : [" I swim in the river. Oh. I don't like the water. ", 'explode'],
    },

    response: function(desp)
    {
        // get user's action
        gameAction = $('#myAction').val();

        if (gameAction === '')
        {
            this.effectType = 'shake';
            // set effect from action
            this.runEffect();
            
            //delay(500);
            alert("Yo ! Dude! You do something ! \n" + gingerMan.saying);
            return true;
        }

        if (this.level === this.highest_level)
        {
            alert("Congratulations! You have get the highest level. You are OWESOME !");
            //desp.html(desp_str);
            return true;
        }

        this.win = false;

        if (gameAction !== '')
        {
            message = '';
            // Create random action for gingerMan after user submit something
            random_action = get_random_num(this.highest_level);
            difficult_index = this.level / this.highest_level * 10;
            if (random_action > 80)
            {
                message += this.response_msg['run'][0];
                this.effectType = this.response_msg['run'][1];
            }
            else if (random_action > 70)
            {
                message += this.response_msg['jump'][0];
                this.effectType = this.response_msg['jump'][1];
            }
            else if (random_action > 50)
            {
                message += this.response_msg['miss'][0];
                this.effectType = this.response_msg['miss'][1];
            }
            else if (random_action > 35)
            {
                message += this.response_msg['swim'][0];
                this.effectType = this.response_msg['swim'][1];
            }
            else if (random_action > 22-difficult_index)
            // it gets lower when level goes up. So less chance to win.
            {
                message += this.response_msg['rollover'][0];
                this.effectType = this.response_msg['rollover'][1];
            }
            else
            {
                this.win = true;
                this.level++;
                message = this.response_msg['fail'][0];
                this.effectType = this.response_msg['fail'][1];
            }
 
            // set effect from action
            this.runEffect();

            // message += this.saying + ' My mark is ' + random_action;
            message += ' My mark is ' + random_action;

            // desp = document.getElementById('description');
            // gingerMan say something here
            if (this.win === true)
            {
                message = "Uhhhhh, You " + gameAction + ". You win level " + eval(this.level-1) + ". " + message;
                alert(message);
                $('#level').text( "Level " + this.level + ". HOHA HO ! ! " );
                desp_str = '';
                desp.fadeOut(500)
                    .html(desp_str)
                    .fadeIn(1000);

                position = 0;
                $('html, body').animate({
                     scrollTop: position
                     },1000);
            }
            else
            {
                // special treat to disgusting player
                if ($.inArray(gameAction, this.disgusting) !== -1)
                {
                    inx = get_random_num(this.disgusting_response.length);
                    prefix = this.disgusting_response[inx];
                }
                else
                {
                    // get random pre_response msg from gameAction
                    inx =  get_random_num(this.pre_response.length);
                    prefix = this.pre_response[inx];
                }
                desp_str = prefix+ " You " + gameAction + ". " + message + "<br /> <br />";
                desp.append(desp_str);

                if ($('#myAction').position().top > $(window).height())
                {
                    position = $(document).height()-16;
                    $('html, body').animate({
                         scrollTop: position
                         },1000);
                }
            }

                // var pageHeight = document.body.scrollHeight;
                // window.scrollTo(0, pageHeight/2);

            // reset user input and scroll up page.
            $('#myAction').val('')
                          .focus();
        }
        return true;
    },

    // run the currently selected effect
    runEffect : function ()
    {
        // most effect types need no options passed by default
        var options = {};

        // some effects have required parameters
        if ( this.effectType === "scale" ) {
            options = { percent: 0 };
        } else if ( this.effectType === "transfer" ) {
            options = { to: "#button", className: "ui-effects-transfer" };
        } else if ( this.effectType === "size" ) {
            options = { to: { width: 200, height: 60 } };
        }

        // run the effect
        $( "#gingerman_icon" ).effect( this.effectType, options, 300, this.callback );
    },

    // callback function to bring a hidden box back
    callback: function() {
        setTimeout
        (
            function() {
                $( "#gingerman_icon" ).fadeIn();
            },
            300
        );
    },

};

/*
var untilities = {
    printAllMembers: function (targetObj) {
        for(var i in targetObj) {
            document.write(targetObj[i]  + "<br />" );
        }
    }
};

//untilities.printAllMembers(gingerMan);


    // anonymous function
    a=1; b=2; inside='outside';
    var result = (function(){
        var sum = 0;
        var inside = 'in';
        for (i=0; i<arguments.length; i++)
        {
            sum += arguments[i];
        }
        return sum;
    })(a,b,3,5);

    alert(inside);
*/
