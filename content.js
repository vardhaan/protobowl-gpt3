OPENAI_API_KEY = "" //Insert your API Key here



const promptPrefix = '{"model": "text-davinci-002", "stop": ".", "prompt": "Q1: One character in this work misses her meeting with the DAR after stopping to check on her daughter’s  progress at typing school. Another character in this play earns the nickname “Shakespeare” for his avid love of literature. That character, Tom, goes to the movies every night, much to his mother’s  dismay. In this play, the central family awaits the arrival of Jim O’Connor, a potential suitor for a disabled girl who is concerned about the title objects. Name this play in which Amanda is worried about the well-being of her daughter Laura Wingfield, a work by Tennessee Williams. A1: The Glass Menagerie. Q2: '
const promptSuffix = ' A2:","max_tokens": 500,"temperature": 0}'

function selectQuestionBox() {
	return document.querySelector('[class$="active"]')
}

function selectTextChildren(questionBox) {
	let textParent = questionBox.querySelector('[class="well"]')
	return textParent.querySelectorAll(':not([class="unread"])')
}

function formatText(textChildren) {
	let questionString = ""
	for (let i=0;i<textChildren.length;i++) {
		questionString += textChildren[i].textContent
	}
	return questionString
}

function getQuestion() {
	let textChildrenNodes = selectTextChildren(selectQuestionBox())
	let questionString = formatText(textChildrenNodes)
	return questionString
}

function formatQuestion(questionString) {
	let sentences = questionString.split(".");
	sentences[sentences.length-1] = "";
	return sentences.join(".")
}

function sendRequest(question) {
	let xhr = new XMLHttpRequest();
	xhr.open("POST", "https://api.openai.com/v1/completions");
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.setRequestHeader("Authorization", "Bearer " + OPENAI_API_KEY);
	xhr.onload = () => {
		let json = JSON.parse(xhr.response)
		console.log(json.choices[0].text)
	}
	let prompt = promptPrefix + question + promptSuffix
	xhr.send(prompt)
}

document.addEventListener('keydown', event => {
	if (event.code == "Period") {
		questionString = formatQuestion(getQuestion())
		console.log(questionString)
		sendRequest(questionString)
	}
})


