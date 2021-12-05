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
		ctx.fillStyle = "#FFF";
		ctx.fill();
		ctx.fillStyle = "#000";
	}
}

document.addEventListener('DOMContentLoaded', init);
