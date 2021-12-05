function init(){
	// Class definition
	class slider {
		constructor(inputID,outputID){
			this.range = document.getElementById(inputID);
			this.output = document.getElementById(outputID);
			// Print the intital value in output
			this.output.innerHTML = this.range.value;
			// When we change the slider, change the output value
			this.range.oninput = function(input) {
				update(input.originalTarget.id.toString(), this.value);
			}
		}
	}

	// Grab the canvas how we want it
	const canvas = document.getElementById('Canvas');
	const ctx = canvas.getContext('2d');

	// Attach to all the slider and output values
	let radius = new slider("radin","radout");
	let highOrb = new slider("uporbin","uporbout");
	let lowOrb = new slider("loworbin","loworbout");

	// Create initial drawing
	update();

	// Function Definitions
	function update(output = null,input = null){
		// Change values if we need
		if(output != null){
			output = output.slice(0,output.length - 2) + "out";
			updateOutput = document.getElementById(output);
			updateOutput.innerHTML = input;
		}
		// Clear the canvas to start again
		ctx.clearRect(0,0,canvas.width, canvas.height);
		ctx.beginPath();
		ctx.rect(0,0,canvas.width,canvas.height);
		ctx.fillStyle = "#000";
		ctx.strokeStyle = "#FFF";
		ctx.lineWidth = 4;
		ctx.fill();

		// Calculate scale
		rad = 300;
		high = highOrb.range.value * rad / radius.range.value;
		low = lowOrb.range.value * rad / radius.range.value;
		console.log(rad, high, low)

		// Draw the planet
		drawCircle(rad, true);

		// Draw the high orbit
		drawCircle(rad + high, false);

		// Draw the transfer orbit
		drawOrbit(rad + low, rad + high);
	}

	function drawCircle(r,f){
		ctx.beginPath();
		ctx.arc(canvas.width / 2, canvas.height / 2, r, 0, 2 * Math.PI);
		if(f){
			ctx.fillStyle = "#A99465";
			ctx.fill();
			ctx.fillStyle = "#000";
		} else {
			ctx.stroke();
		}
	}

	function drawOrbit(rlow, rhigh){
		console.log(rlow,rhigh);
		e = (rhigh - rlow) / (rhigh + rlow);
		ry = rlow / (1 - e)
		rx = ry * Math.sqrt(1 - Math.pow(e,2));
		ctx.beginPath();
		ctx.ellipse(canvas.width / 2, canvas.height / 2 - ry * e, rx, ry, Math.PI / 2, 0, Math.PI)
		ctx.stroke();
	}
}

document.addEventListener('DOMContentLoaded', init);
