/* custom scripts go here */

(function()
{

	// initialization function
	async function Start()
	{
		// sending this message on the console just to know that this file has been loaded correctly and it's executing JavaScript
		console.log("App started...");

		async function loadPostalCodes(myRequest) {
			let response = await fetch(myRequest);
			if( response.status != 200 ) {
				throw new Error("Couldn't fetch the file: " + myRequest);
			}
			let text_data = await response.text();
			return text_data;
		}
		// load the zip codes from a file
		console.log("Starting to load postal codes...");
		let fileName = "./Content/canadiens.csv";
		let text_data = await loadPostalCodes(fileName);
		let codesCanadiens = text_data.split('\n');
		fileName = "./Content/jets.csv";
		text_data = await loadPostalCodes(fileName);
		let codesJets = text_data.split('\n');
		fileName = "./Content/leafs.csv";
		text_data = await loadPostalCodes(fileName);
		let codesLeafs = text_data.split('\n');
		fileName = "./Content/senators.csv";
		text_data = await loadPostalCodes(fileName);
		let codesSenators = text_data.split('\n');

		console.log("Finished loading postal codes.");

		// get a reference to the HTML element with id=checkButton
		let checkButton = document.getElementById("checkButton");

		// add a callback function to the button when it's clicked
		checkButton.addEventListener("click", () => {
			// the functionality of the button goes here

			console.log("Check button was clicked!"); // checking that the click is being processed here

			// get a reference to the HTML element with id=result
			let result = document.getElementById("result");

			// get a reference to the HTML element with id=team
			let team = document.getElementById("team").value;

			// get a reference to the HTML element with id=zipCode and change it to uppercase
			let zipCode = document.getElementById("zipCode").value.toUpperCase();

			// function that checks if a zip code is valid or not
			let validZipCode = function(zipCode) {
				let regex = new RegExp(/^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ]$/i);
				if (regex.test(zipCode))
					return true;  // returns true only when the zipCode complies with the regular expression
				else
					return false;
			};

			// check if the user entered the 3 characters of the zip code
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
			
		
	} // end of Start()

	// event listener, when the window has finished loading, it calls the Start function
	window.addEventListener("load", Start)

})();
