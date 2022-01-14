/* custom scripts go here */

(function()
{

	// initialization function. Made it asynchronous so the text files can be loaded asynchronously
	async function Start()
	{
		// sending this message on the console just to know that this file has been loaded correctly and it's executing JavaScript
		console.log("App started...");

		// asynchronous function that loads a text file and returns the content as a string
		async function loadPostalCodes(fileLocation) {
			let response = await fetch(fileLocation);
			if( response.status != 200 ) {
				throw new Error("Couldn't fetch the file: " + fileLocation);
			}
			let retrievedString = await response.text();
			return retrievedString;
		}

		// load the zip codes from the source files
		console.log("Starting to load postal codes...");
		let fileName = "./Content/canadiens.csv";
		let text_data = await loadPostalCodes(fileName);
		let codesCanadiens = text_data.split('\n').map(elem => elem.trim()); // splits the text into array elements and trims each one of the elements
		fileName = "./Content/jets.csv";
		text_data = await loadPostalCodes(fileName);
		let codesJets = text_data.split('\n').map(elem => elem.trim()); // splits the text into array elements and trims each one of the elements
		fileName = "./Content/leafs.csv";
		text_data = await loadPostalCodes(fileName);
		let codesLeafs = text_data.split('\n').map(elem => elem.trim()); // splits the text into array elements and trims each one of the elements
		fileName = "./Content/senators.csv";
		text_data = await loadPostalCodes(fileName);
		let codesSenators = text_data.split('\n').map(elem => elem.trim()); // splits the text into array elements and trims each one of the elements

		console.log("Finished loading postal codes.");

		// function that checks if a zip code is valid or not (only the first 3 digits)
		let validZipCode = function(zipCode) {
			let regex = new RegExp(/^[A-Z]\d[A-Z]$/i);
			if ( zipCode.length == 3 && regex.test(zipCode))
				return true;  // returns true only when the zipCode complies with the regular expression
			else
				return false;
		};

		// function that checks if a zipCode is in blackout or not
		let checkBlackout = function(zipCode, team) {
			
			// get a reference to the HTML element with id=result
			let result = document.getElementById("result");

			if ( validZipCode(zipCode) ) {
				let textBlocked = "blocked.<br>Due to NHL blackout rules, you are not authorized to view this game in your current location. If you want to view games out of your local region and are a BellTV subscriber, please contact BellTV to subscribe to NHL Centre Ice.</p>";
				let textNotBlocked = "NOT blocked.<br>Check the customer's IP address if they are still unable to view the game. Lookup the IP to make sure that it is within the team's local region.</p>";
				
				messageTxt = "<p>For the zip code: <b>" + zipCode + "</b></p><p>The <b>" + team + "</b> games are ";

				// check the blackout constraint according to the selected team
				switch( team ) {
					case "Leafs":
						if ( codesLeafs.includes(zipCode) ) {
							result.className = "alert alert-warning";
							messageTxt += textBlocked;
						} else {
							result.className = "alert alert-success";
							messageTxt += textNotBlocked;
						}
						break;
					case "Canadiens":
						if ( codesCanadiens.includes(zipCode) ) {
							result.className = "alert alert-warning";
							messageTxt += textBlocked;
						} else {
							result.className = "alert alert-success";
							messageTxt += textNotBlocked;
						}
						break;
					case "Senators":
						if ( codesSenators.includes(zipCode) ) {
							result.className = "alert alert-warning";
							messageTxt += textBlocked;
						} else {
							result.className = "alert alert-success";
							messageTxt += textNotBlocked;
						}
						break;
					case "Jets":
						if ( codesJets.includes(zipCode) ) {
							result.className = "alert alert-warning";
							messageTxt += textBlocked;
						} else {
							result.className = "alert alert-success";
							messageTxt += textNotBlocked;
						}
						break;
				}
				result.innerHTML = messageTxt;
			}
			else {
				result.className = "alert alert-danger";
				result.innerHTML = "<p>The zip code '<b>" + zipCode + "</b>' is not valid.</p>";
			}
		}; // end of checkBlackout

		// get a reference to the HTML element with id=zipCode
		let zipCodeTxtField = document.getElementById("zipCode");

		let isZipCodeComplete = function(zipCode) {
			if (zipCode.length >= 3)
				return true;
			else
				return false;
		}

		// add an event listener for every key pressed on the zipCode text field
		zipCodeTxtField.addEventListener("keyup", () => {
			// get the value from the zipCode txt field, and change it to uppercase
			let zipCode = document.getElementById("zipCode").value.toUpperCase();

			if( zipCode.length>2 ) {
				// get a reference to the HTML element with id=team
				let team = document.getElementById("team").value;

				checkBlackout(zipCode, team);
			}
			else {
				// get a reference to the HTML element with id=result
				let result = document.getElementById("result");

				// clear the result box
				result.className = "";
				result.innerHTML = "";
			}
		});

		// get a reference to the HTML element with id=team
		let teamInputSelect = document.getElementById("team");

		// add an event listener for every change on the team select
		teamInputSelect.addEventListener("change", () => {
			// get the value from the zipCode txt field, and change it to uppercase
			let zipCode = document.getElementById("zipCode").value.toUpperCase();

			if( zipCode.length>2 ) {
				// get a reference to the HTML element with id=team
				let team = document.getElementById("team").value;

				checkBlackout(zipCode, team);
			}
		});

		
	} // end of Start()

	// event listener, when the window has finished loading, it calls the Start function
	window.addEventListener("load", Start)

})();
