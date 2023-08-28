// ====================================================
// jQuery, IIFE, global width var
// Threshold width-change events for desktop / mobile
// Repeat speed controlled by setTimeout
// "Binary" version - accomodates one breakpoint
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
					window.dispatchEvent(resizedToDesktop);
				} else if ((windowWidth >= thresholdWidth) && newWindowWidth < thresholdWidth) {
					window.dispatchEvent(resizedToMobile);
				}
				windowWidth = newWindowWidth;
				this.timeoutID = null;
			}, repeatSpeed);
		}
	}

	$(window).resize(() => widthUpdater.start());
}());

$(window).on("resizedToMobile", () => console.log(windowWidth));
$(window).on("resizedToDesktop", () => console.log(windowWidth));
