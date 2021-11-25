/* custom scripts go here */



(function()
{

	// initialization function
	function Start()
	{
		// sending this message on the console just to know that this file has been loaded correctly and it's executing JavaScript
		console.log("App started...");

		// get a reference to the HTML element with id=checkButton
		let checkButton = document.getElementById("checkButton");

		// add a callback function to the button when it's clicked
		checkButton.addEventListener("click", () => {
			// the functionality of the button goes here
			console.log("Check button was clicked!");
		});
			
		
	}

	// event listener, when the window has finished loading, it calls the Start function
	window.addEventListener("load", Start)

})();
