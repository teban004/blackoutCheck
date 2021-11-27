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

			console.log("Check button was clicked!"); // checking that the click is being processed here

			let result = document.getElementById("result");

			let team = document.getElementById("team").value;

			// check if the user entered the 3 characters of the zip code
			let zipCode = document.getElementById("zipCode").value.toUpperCase();

			let validZipCode = function(zipCode) {
				let regex = new RegExp(/^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ]$/i);
				if (regex.test(zipCode))
					return true;
				else
					return false;
			};

			if (zipCode.length < 3) {
				result.className = "alert alert-danger";
				result.innerHTML = "<p>Please enter the first 3 characters of the zip code.</p>";
			}
			else {
				if ( validZipCode(zipCode) ) {
					result.className = "alert alert-info";
					result.innerHTML = "<p>The result goes here!</p><p>The zip code is: <b>" + zipCode + "</b></p><p>The selected team is: <b>" + team + "</b></p><p>Zip code validation: <b>" + validZipCode(zipCode) + "</b></p>";
				}
				else {
					result.className = "alert alert-danger";
					result.innerHTML = "<p>The zip code <b>" + zipCode + "</b> is not valid.</p>";
				}
			}
		});
			
		
	}

	// event listener, when the window has finished loading, it calls the Start function
	window.addEventListener("load", Start)

})();
