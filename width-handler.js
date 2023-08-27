// ====================================================
// jQuery, IIFE, global width var
// Threshold width-change events for desktop / mobile
// Repeat speed controlled by setTimeout
// TO DO: make this accomodate more breakpoints
// ====================================================

let windowWidth = $(window).width();

(function() {
	const thresholdWidth = 992;
	const repeatSpeed = 200;
	const resizedToDesktop = new Event('resizedToDesktop');
	const resizedToMobile = new Event('resizedToMobile');

	const widthUpdater = {
		start() {
			if (this.timeoutID) {
				clearTimeout(this.timeoutID);
			}

			this.timeoutID = setTimeout(() => {
				const newWindowWidth = $(window).width();
				if ((windowWidth < thresholdWidth) && newWindowWidth >= thresholdWidth) {
					document.dispatchEvent(resizedToDesktop);
				} else if ((windowWidth >= thresholdWidth) && newWindowWidth < thresholdWidth) {
					document.dispatchEvent(resizedToMobile);
				}
				windowWidth = newWindowWidth;
				this.timeoutID = null;
			}, repeatSpeed);
		}
	}

	$(window).resize(() => widthUpdater.start());
}());
