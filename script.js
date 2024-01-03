var text,
	msg,
	btns = document.querySelectorAll('button'),
	textBox = document.querySelector('.text'),
	msg = new SpeechSynthesisUtterance(),
	voice = speechSynthesis
function GenerateJoke() {
	voice.cancel()
	fetch('https://icanhazdadjoke.com/slack')
		.then(response => {
			return response.json()
		})
		.then(res => {
			text = res.attachments[0].fallback
			textBox.innerHTML = text
			console.log(text)
			btns[0].setAttribute('onclick', `speak('${text}')`)
			btns[1].setAttribute('onclick', `copy('${text}')`)
		})
		.catch(err => {
			console.error(err)
		})
}

function copy(text) {
	navigator.clipboard.writeText(text)
}

function speak(text) {
	if ('speechSynthesis' in window) {
		if (!voice.speaking) {
			msg.text = text
			voice.speak(msg)
		} 
	} else {
		alert("Sorry, your browser doesn't support this")
	}
}
