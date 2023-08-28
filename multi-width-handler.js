// ====================================================
// jQuery, IIFE, global width breakpoint var
// Threshold width-change events for an array of breakpoints
// Repeat speed controlled by setTimeout
// ====================================================

let windowWidthBreakpoint;

(function() {
	let windowWidth = $(window).width();
	const widths = [480, 992, 767, 1200, Infinity];
	const repeatSpeed = 200;
	const newBreakpoint = new Event('newBreakpoint');

	const widthUpdater = {
		start() {
			if (this.timeoutID) {
				clearTimeout(this.timeoutID);
			}

			this.timeoutID = setTimeout(() => {
				const newWindowWidth = $(window).width();
				let breakpointChanged;

				for (i = 0; i < widths.length; i++) {
					if (newWindowWidth < widths[i]) {
						if (widths[i] !== windowWidthBreakpoint) {
							breakpointChanged = true;
							windowWidthBreakpoint = widths[i];
						}
						break;
					}
				}
				windowWidth = newWindowWidth;
				if (breakpointChanged) {
					window.dispatchEvent(newBreakpoint);
				}
				this.timeoutID = null;
			}, repeatSpeed);
		}
	}

	$(window).resize(() => widthUpdater.start());
}());

$(window).on("newBreakpoint", () => console.log(windowWidthBreakpoint));
