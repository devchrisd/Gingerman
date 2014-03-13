var gingerMan = {

	status: 'ready',
	level: 0,
	saying: "....    You can't catch me. I'm the Ginger Bread Man. ",

	// Actions of gingerMan
	run: function (){
		return "Haha! Run as fast as I can...<br />";
	},

	jump: function (){
		return "Haha! Jump as high as I can...<br />";
	},

	miss: function ()
	{
		return "Oops, You missed it...<br />" ;
	},

	fail: function(act)
	{
		this.level++;
		return "Uhhhhh, You " + act + ". You win level " + eval(this.level-1) + ". Let's go to next level! \n";
	},

	response: function(desp){

		win = false;
		// get user's action
		gameAction = $('#myAction').val();
		
		if (gameAction !== '')
		{
			// Create random action for gingerMan after user submit something
			gingerAct = Math.random() * 10;
			if (gingerAct > 7)
			{
				message = this.run();
			}
			else if (gingerAct > 5)
			{
				message = this.jump();
			}
			else if (gingerAct > 2)
			{
				message = this.miss();
			}
			else
			{
				message =  this.fail(gameAction);
				win = true;
			}
			
			message += this.saying;

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
				desp_str = "You " + gameAction + ". " + message + "<br />";
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

$(function(){
	$('#go').hover (
		function(){
			$(this).toggleClass('ovr', 'btn');
		}
	);
});
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
