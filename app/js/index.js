'use strict';

var soundButtons = document.querySelectorAll('.button-sound');

for (var i = 0; i < soundButtons.length; i++) {
	var soundButton = soundButtons[i];
	var soundName = soundButton.attributes['data-sound'].value;

	prepareButton(soundButton, soundName);
}

function prepareButton (buttonE1, soundName) {
	buttonE1.querySelector('span').style.backgroundImage = 'url("img/icons/' + soundName + '.png")';

	var audio = new Audio(__dirname + '/wav/' + soundName + '.wav');
	buttonE1.addEventListener('click', function () {
		audio.currentTime = 0;
		audio.play();
	});
}

var ipc = require('ipc');

var closeE1 = document.querySelector('.close');
closeE1.addEventListener('click', function () {
	ipc.send('close-main-window');
});

ipc.on('global-shortcut', function (arg) {
	var event = new MouseEvent('click');
	soundButtons[arg].dispatchEvent(event);
});

var settingsE1 = document.querySelector('.settings');
settingsE1.addEventListener('click', function () {
	ipc.send('open-settings-window');
});