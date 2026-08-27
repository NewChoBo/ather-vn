'use strict';
/* global Monogatari, monogatari */

const { $_ready } = Monogatari;

monogatari.debug.level(2);

$_ready(() => {
	const mainScreen = document.querySelector('main-screen');

	if (mainScreen && !mainScreen.querySelector('.aether-title-card')) {
		mainScreen.insertAdjacentHTML('afterbegin', `
			<section class="aether-title-card" aria-label="AETHER SIGNAL">
				<p>OPERATOR CONSOLE / PUBLIC BOOTSTRAP</p>
				<h1>AETHER SIGNAL</h1>
			</section>
		`);
	}

	monogatari.init('#monogatari');
});
