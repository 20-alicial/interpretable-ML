var jsPsychClickableBox = (function (jsPsychModule) {
  'use strict';
  const info = {
      name: 'clickable-box',
      version: '1.0.0',
      parameters: {
        boxID: {
          type: jsPsychModule.ParameterType.STRING,
          default: 'clickable-box',
          description: 'Unique ID for the clickable box.',
        },
        initialText: {
          type: jsPsychModule.ParameterType.STRING,
          default: 'Clickable Box',
          description: 'Text displayed inside the box.',
        },
        states: {
          type: jsPsychModule.ParameterType.OBJECT,
          default: [
            {
              background: 'yellow',
              outline: 'solid',
              displayText: 'First click message',
              imageSrc: null, // Default to null if no image is provided
            },
            {
              background: 'white',
              outline: 'dotted',
              displayText: 'Second click message',
              imageSrc: null,
            },
          ],
          description: 'Array of states for the box, defining appearance, text updates, and optional images.',
        },
        width: {
          type: jsPsychModule.ParameterType.STRING,
          default: '150px',
          description: 'Width of the box.',
        },
        height: {
          type: jsPsychModule.ParameterType.STRING,
          default: '100px',
          description: 'Height of the box.',
        },
      },
      data: {
        clicks: {
          type: jsPsychModule.ParameterType.INT,
          description: 'The number of times the box was clicked during the trial.',
        },
        boxID: {
          type: jsPsychModule.ParameterType.STRING,
          description: 'The ID of the box that was clicked.',
        },
      },
    };

  class ClickableBoxPlugin {
    static info = info;

    constructor(jsPsych) {
      this.jsPsych = jsPsych;
    }
    trial(display_element, trial) {
      // Initialize click count
      let clicks = 0;

      // Calculate max width (1/4th of the screen width)
      const maxWidth = `${window.innerWidth / 4}px`;

      // Create the full-width line of text and box HTML
      const boxHTML = `
        <!-- Full-Width Line of Text -->
        <div id="${trial.boxID}-line-text" style="
          max-width: 1500px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          font-size: 18px;
          margin-bottom: 20px;">
          ${trial.lineText || 'This is a default line of text across the screen.'}
        </div>

        <!-- Clickable Box -->
        <div id="${trial.boxID}" style="
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          margin: 0 auto;
          cursor: pointer;
          padding: 10px;
          word-wrap: break-word;
          white-space: normal;
          min-height: 100px;
          background: lightblue;
          border: 2px solid black;
          max-width: ${maxWidth};">
          ${trial.initialText}
        </div>
        <div style="display: flex; justify-content: flex-end; margin-top: 20px;">
        <button id="continue-button" style="
          padding: 10px 20px;
          font-size: 16px;
          background-color: #4CAF50;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        ">Continue</button>
      </div>
      `;
    
      // Append HTML to display element
      display_element.innerHTML = boxHTML;
    
      // Select the main box element
      const boxElement = document.getElementById(trial.boxID);
    
      // Add event listener for clicks
      boxElement.addEventListener('click', () => {
        if (clicks < trial.states.length) {
          // Get the current state
          const state = trial.states[clicks];
    
          // Update box appearance
          boxElement.style.background = state.background;
          boxElement.style.borderStyle = state.outline;
    
          // Update the content inside the box
          if (state.imageSrc) { // If an image is provided
                  // Create an image element to calculate its aspect ratio
                  const img = new Image();
                  img.src = state.imageSrc;

                  // Wait for the image to load
                  img.onload = function () {
                      // Calculate the aspect ratio (height / width)
                      const aspectRatio = img.naturalHeight / img.naturalWidth;

                      // Adjust box to maintain the image's aspect ratio
                      boxElement.innerHTML = `
                      <div style="
                          position: relative;
                          width: 100%;
                          max-width: 800px; /* Set a maximum width for responsiveness */
                          padding-bottom: ${aspectRatio * 100}%; /* Maintain aspect ratio */
                          background: url('${state.imageSrc}') center center / contain no-repeat;
                      ">
                      </div>
                      `;

                      // Dynamically adjust the box width and height
                      boxElement.style.width = '100%';
                      boxElement.style.maxWidth = '800px';
                      boxElement.style.height = 'auto'; // Height is dictated by aspect ratio
                  };
          } else {
            // Otherwise, display text
            boxElement.innerHTML = state.displayText;
          }
    
          // Dynamically adjust box size again after content update
          boxElement.style.height = 'auto';
          boxElement.style.width = 'auto';
          boxElement.style.padding = '5px';
          boxElement.style.whiteSpace = 'normal';
          boxElement.style.textAlign = 'center';
    
          // Retain maxWidth
          boxElement.style.maxWidth = maxWidth;
    
          // Force reflow (optional if needed)
          boxElement.offsetHeight;
        }
        clicks++;
      });

    // Get the button and attach the event listener
    const continueButton = document.getElementById('continue-button');

    // Add a fallback check
    if (continueButton) {
      continueButton.addEventListener('click', () => {
        // Collect trial data
        const trialData = {
          clicks: clicks,
          boxID: trial.boxID,
        };

        // Finish the trial
        this.jsPsych.finishTrial(trialData);
      });
    } else {
      console.error('Continue button not found in the DOM!');
    }
    }
  }
  return ClickableBoxPlugin;
})(jsPsychModule);