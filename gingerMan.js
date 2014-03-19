// document ready
// $(document).ready (function(){})
$(function(){

	$('#go').hover (
		function(){
			$(this).toggleClass('ovr', 'btn');
		}
	);

	$('#game').submit (
		function(){
			if ($('#myAction').val() === '')
			{
				alert("Yo ! Dude! You do something !" + gingerMan.saying);
			}
			else
			{
				gingerMan.response($('#description'));
			}
			return false;
		});
});


function get_random_num(length)
{
	return parseInt(Math.random() * length);
}

var gingerMan = {

	status: 'ready',
	level: 1,
	highest_level: 100,	// for difficulty setting

	saying: "....    You can't catch me. I'm the Ginger Bread Man. ",
	
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
	// Actions of gingerMan
	run: function (){
		return " Run as fast as I can...<br />";
	},

	jump: function (){
		return " Jump as high as I can...<br />";
	},

	miss: function ()
	{
		return " Oops, You missed it...<br />" ;
	},

	rollover: function ()
	{
		return " Yeah! I roll over.<br />" ;
	},

	swim: function ()
	{
		return " I swim in the river. Oh. I don't like the water. <br />";
	},

	fail: function(act)
	{
		this.level++;
		return "Uhhhhh, You " + act + ". You win level " + eval(this.level-1) + ". Let's go to next level! \n";
	},

	response: function(desp){

		if (this.level === this.highest_level)
		{
			alert("Congratulations! You have get the highest level. You are OWESOME !");
			desp.html(desp_str);
			return true;
		}

		win = false;
		// get user's action
		gameAction = $('#myAction').val();
		
		if (gameAction !== '')
		{
			message = '';
			// Create random action for gingerMan after user submit something
			random_action = get_random_num(this.highest_level);
			difficult_index = this.level / this.highest_level * 10;
			if (random_action > 80)
			{
				message += this.run();
			}
			else if (random_action > 70)
			{
				message += this.jump();
			}
			else if (random_action > 50)
			{
				message += this.miss();
			}
			else if (random_action > 35)
			{
				message += this.swim();
			}
			else if (random_action > 22-difficult_index)	// it will getting lower when level goes up. So less chance to win.
			{
				message += this.rollover();
			}
			else
			{
				message = this.fail(gameAction);
				win = true;
			}
			
			message += this.saying + ' My mark is ' + random_action;

			// desp = document.getElementById('description');
			// gingerMan say something here
			if (win === true)
			{
				alert(message);
				desp_str = "Level " + this.level + ". HOHA HO ! ! <br />";
				desp.html(desp_str);
			}
			else
			{
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
				desp_str = prefix+ " You " + gameAction + ". " + message + "<br />";
				desp.append(desp_str);
			}

			// reset user input and scroll up page.
			$('#myAction').val('');
			$('html, body').animate({
                     scrollTop: $(document).height()
                 },1500);
//			$('#myAction').scrollTop();
			// var pageHeight = document.body.scrollHeight;
			// window.scrollTo(0, pageHeight/2);
		}
		return true;
	}
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
