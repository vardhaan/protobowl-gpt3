/* Code to receive question from content script
var question;

chrome.extension.onRequest.addListener(function(request, sender) {
	question = request.message
	console.log(question)
})*/


/* Code to send API request to GPT-3 */

const promptPrefix = `{"model": "text-davinci-002", "stop": ".", "prompt": "Q1: One character in this work misses her meeting with the DAR after stopping to check on her daughter’s  progress at typing school. Another character in this play earns the nickname 'Shakespeare' for his avid love of literature. That character, Tom, goes to the movies every night, much to his mother’s  dismay. In this play, the central family awaits the arrival of Jim O’Connor, a potential suitor for a disabled girl who is concerned about the title objects. Name this play in which Amanda is worried about the well-being of her daughter Laura Wingfield, a work by Tennessee Williams. A1: The Glass Menagerie. Q2: `
const promptSuffix = ` A2:","max_tokens": 500,"temperature": 0}`

const promptPrefix2 = `Q1: One character in this work misses her meeting with the DAR after stopping to check on her daughter’s  progress at typing school. Another character in this play earns the nickname 'Shakespeare' for his avid love of literature. That character, Tom, goes to the movies every night, much to his mother’s  dismay. In this play, the central family awaits the arrival of Jim O’Connor, a potential suitor for a disabled girl who is concerned about the title objects. Name this play in which Amanda is worried about the well-being of her daughter Laura Wingfield, a work by Tennessee Williams. A1: The Glass Menagerie. Q2: `
const promptSuffix2 = ` A2:`

function sendRequest(question) {
	var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest
	let xhr = new XMLHttpRequest();
	xhr.open("POST", "https://api.openai.com/v1/completions");
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.setRequestHeader("Authorization", "Bearer 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"); //API KEY HERE
	xhr.onload = () => {
		console.log(xhr.status)
		console.log(xhr.readyState)
		let json = JSON.parse(xhr.response)
		//console.log(json)
	}
	let prompt = promptPrefix2 + question + promptSuffix2
	console.log(prompt)
	var data = {
		"model": "text-davinci-002",
		"stop": ".",
		"prompt": prompt,
		"max_tokens": 500,
		"temperature": 0
	}
	data_string = JSON.stringify(data)
	console.log(data_string)
	//let prompt = promptPrefix + question + promptSuffix
	xhr.send(data_string)
}

//sendRequest('One part of this location, mysteriously called "where the flags wave," contains a mystical lizard symbolizing the earth.')
//sendRequest('The hilum of this organ is delineated from the insertion of the fold of the broad ligament from which this organ is suspended by the Farre line.')
let example1 = `One part of this location, mysteriously called "where the flags wave," contains a mystical lizard symbolizing the earth.`
let mod = example1.replaceAll(`"`,`'`)
sendRequest(mod)
