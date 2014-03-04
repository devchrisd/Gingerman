var gingerMan = {
	status: 'ready',
	level: 0,
	text: "....    You can't catch me. I'm the Ginger Bread Man. ",

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
		gameAction = document.getElementById('myAction').value;
		if (gameAction !== '')
		{
			gingerAct = Math.random() * 10;
			if (gingerAct > 7)
			{
				message = this.run() + this.text;
			}
			else if (gingerAct > 5)
			{
				message = this.jump() + this.text;
			}
			else if (gingerAct > 2)
			{
				message = this.miss() + this.text;
			}
			else
			{
				message =  this.fail(gameAction) + this.text;
				win = true;
			}
			
			// desp = document.getElementById('description');
			if (win === true)
			{
				alert(message);
				desp.innerHTML = "Level " + this.level + ". HOHA HO ! !<br />";
			}
			else
			{
				desp.innerHTML += "You " + gameAction + ". " + message + "<br />";
			}
			document.getElementById('myAction').value = '';
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
