// Focus div based on nav button click
focusHomeMethod = function focusHome() {
    document.getElementById("home").focus()
    document.getElementById("home").classList.remove("hidden")
    document.getElementById("single").classList.add("hidden")
    document.getElementById("multi").classList.add("hidden")
    document.getElementById("guess").classList.add("hidden")
    console.log('went home')
}

focusSingleMethod = function focusSingle() {
    document.getElementById("single").focus()
    document.getElementById("single").classList.remove("hidden")
    document.getElementById("home").classList.add("hidden")
    document.getElementById("multi").classList.add("hidden")
    document.getElementById("guess").classList.add("hidden")
    console.log('went single')
}

focusMultiMethod = function focusMulti() {
    document.getElementById("multi").focus()
    document.getElementById("multi").classList.remove("hidden")
    document.getElementById("home").classList.add("hidden")
    document.getElementById("single").classList.add("hidden")
    document.getElementById("guess").classList.add("hidden")
    console.log('went multi')
}

focusGuessMethod = function focusGuess() {
    document.getElementById("guess").focus()
    document.getElementById("guess").classList.remove("hidden")
    document.getElementById("home").classList.add("hidden")
    document.getElementById("single").classList.add("hidden")
    document.getElementById("multi").classList.add("hidden")
    console.log('went guess')
}
// Flip one coin and show coin image to match result when button clicked
// Button coin flip element
const coin = document.getElementById("coin")
// Add event listener for coin button
			coin.addEventListener("click", flipCoin)
			function flipCoin() {
                fetch('http://localhost:5000/app/flip/', {mode: 'cors'})
  				.then(function(response) {
    			  return response.json();
  				})
				.then(function(result) {
					console.log(result);
					document.getElementById("result").innerHTML = result.flip;
					document.getElementById("quarter").setAttribute("src", "./assets/img/" +result.flip+".png");
				})
            }
// Flip multiple coins and show coin images in table as well as summary results
// Enter number and press button to activate coin flip series

    // Our flip many coins form
    const coins = document.getElementById("coins")
    // Add event listener for coins form
    coins.addEventListener("submit", flipCoins)
    // Create the submit handler
    async function flipCoins(event) {
        event.preventDefault();
        
        const endpoint = "app/flip/coins/"
        const url = document.baseURI+endpoint

        const formEvent = event.currentTarget

        try {
            const formData = new FormData(formEvent);
            const flips = await sendFlips({ url, formData });

            console.log(flips);
            document.getElementById("heads").innerHTML = "Heads: "+flips.summary.heads;
            document.getElementById("tails").innerHTML = "Tails: "+flips.summary.tails;
        } catch (error) {
            console.log(error);
        }
    }
    // Create a data sender
			async function sendFlips({ url, formData }) {
				const plainFormData = Object.fromEntries(formData.entries());
				const formDataJson = JSON.stringify(plainFormData);
				console.log(formDataJson);

				const options = {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Accept: "application/json"
					},
					body: formDataJson
				};

				const response = await fetch(url, options);
				return response.json()
			}
// Guess a flip by clicking either heads or tails button
// Our guess the flip form
const guessform = document.getElementById("guessform")
// Add event listener for coins form
guessform.addEventListener("submit", guessCoins)
// Create the submit handler
async function guessCoins(event) {
    event.preventDefault();
    
    const endpoint = "app/flip/call/"
    const url = document.baseURI+endpoint

    const formEvent = event.currentTarget
    try {
        const formData = new FormData(formEvent);
        const flips = await sendFlips({ url, formData });

        console.log(flips)
        document.getElementById("guessresult").innerHTML = "Result: "+flips.flip;
        document.getElementById("winorlose").innerHTML = "You "+flips.result;
        document.getElementById("blankcoin").setAttribute("src", "./assets/img/" +flips.flip+".png");
    } catch (error) {
        console.log(error);
    }
}
// Create a data sender
async function sendFlips({ url, formData }) {
    const plainFormData = Object.fromEntries(formData.entries());
    const formDataJson = JSON.stringify(plainFormData);
    console.log(formDataJson);

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: formDataJson
    };

    const response = await fetch(url, options);
    return response.json()
}