var jsPsychClickableBoxWithButtonsTwo = (function (jsPsychModule) {
  'use strict';

  const info = {
    name: 'clickable-box-buttons',
    version: '1.0.1',
    parameters: {
      boxID: {
        type: jsPsychModule.ParameterType.STRING,
        default: 'clickable-box',
        description: 'Unique ID for the box.',
      },
      initialText: {
        type: jsPsychModule.ParameterType.STRING,
        default: 'Clickable Box',
        description: 'Text displayed inside the box initially.',
      },
      states: {
        type: jsPsychModule.ParameterType.OBJECT,
        default: [
          {
            background: 'lightblue',
            outline: 'solid',
            displayText: 'Blue button message',
            imageSrc: null,
          },  
          {
            background: 'white',
            outline: 'dotted',
            displayText: 'White button message',
            imageSrc: null,
          },
        ],
        description: 'Array of states for the box, defining appearance, text, and optional images.',
      },
      width: {
        type: jsPsychModule.ParameterType.STRING,
        default: '500px',
        description: 'Width of the box.',
      },
      height: {
        type: jsPsychModule.ParameterType.STRING,
        default: '150px',
        description: 'Height of the box.',
      },
    },
    data: {
      clicks: {
        type: jsPsychModule.ParameterType.INT,
        description: 'The number of button clicks during the trial.',
      },
      boxID: {
        type: jsPsychModule.ParameterType.STRING,
        description: 'The ID of the box.',
      },
    },
  };

  class ClickableBoxWithButtonsTwoPlugin {
    static info = info;

    constructor(jsPsych) {
      this.jsPsych = jsPsych;
    }

    trial(display_element, trial) {
      console.log('States (Two Buttons):', trial.states);
      // HTML for the box and buttons
      const boxHTML = `
        <!-- Title Section -->
        <div style="text-align: center; font-size: 18px; margin-bottom: 20px;">
          ${trial.flowchartTitle}
        </div>

        <div style="display: flex; justify-content: center; align-items: center; gap: 20px;">
          
          <!-- Top Image (Face Image) -->
          <div>
            <img src="${trial.topImageSrc}" style="width: 150px; height: auto; border: 1px solid black;">
          </div>

          <p><i class="arrow right"></i></p>

          <!-- Clickable Box with Buttons -->
          <div style="display: flex; flex-direction: column; align-items: center; gap: 10px;">
            <div id="${trial.boxID}" style="
              width: 200px;
              height: 200px;
              background: ${trial.states[0].background};
              display: flex;
              align-items: center;
              justify-content: center;
              text-align: center;
              border: 2px solid black;
            ">
              ${trial.states[0].displayText}
            </div>
            <div style="display: flex; gap: 5px;">
              <button id="blue-button" style="background-color: blue; color: white; padding: 5px; cursor: pointer;">Blue</button>
              <button id="white-button" style="background-color: white; padding: 5px; cursor: pointer;">White</button>
            </div>
          </div>

          <p><i class="arrow right"></i></p>

          <!-- Trustworthiness Score -->
          <div style="margin-top: 10px; font-size: 12px !important; text-align: center; font-weight: regular;">
            ${trial.trustworthinessScore}
          </div>

          <p><i class="arrow right"></i></p>

          <!-- Pixel Salience Box with Buttons -->
          <div style="display: flex; flex-direction: column; align-items: center; gap: 10px;">
            <div id="pixel-salience-box" style="
              width: 300px;
              height: 300px;
              background: ${trial.states[1].background};
              display: flex;
              align-items: center;
              justify-content: center;
              text-align: center;
              border: 2px solid black;
            ">
              ${trial.states[1].displayText}
            </div>
            <div style="display: flex; gap: 5px;">
              <button id="salience-blue-button" style="background-color: blue; color: white; padding: 5px; cursor: pointer;">Blue</button>
              <button id="salience-white-button" style="background-color: white; padding: 5px; cursor: pointer;">White</button>
            </div>
          </div>

          <p><i class="arrow right"></i></p>

          <!-- Bottom Image (Pixel Salience Heatmap) -->
          <div style="display: flex; justify-content: center; align-items: center; margin-top: 20px;">
            <img src="${trial.bottomImageSrc}" style="width: 300px; height: auto; border: 1px solid black;">
          </div>

        </div>
      `;

      // Add HTML to display element
      display_element.innerHTML = boxHTML;

      // Box element
      const boxElement = document.getElementById(trial.boxID);

      // Button elements
      // const yellowButton = document.getElementById('yellow-button');
      const blueButton = document.getElementById('blue-button');
      const whiteButton = document.getElementById('white-button');
      const continueButton = document.getElementById('continue-button');

      // Initialize click counter
      let clicks = 0;

      // Function to update the box
      const updateBox = (state) => {
        boxElement.style.background = state.background;
        boxElement.style.borderStyle = state.outline;

        if (state.imageSrc) {
          // Handle image content
          const img = new Image();
          img.src = state.imageSrc;
          img.onload = function () {
            const aspectRatio = img.naturalHeight / img.naturalWidth;
            boxElement.innerHTML = `
              <div style="
                position: relative;
                width: 100%;
                padding-bottom: ${aspectRatio * 100}%;
                background: url('${state.imageSrc}') center center / contain no-repeat;
              "></div>`;
          };
        } else {
          // Handle text content
          boxElement.innerHTML = state.displayText;
        }
      };

      // Add event listeners to buttons
      // yellowButton.addEventListener('click', () => {
      //   updateBox(trial.states[1]);
      //   clicks++;
      // });

      blueButton.addEventListener('click', () => {
        updateBox(trial.states[0]);
        clicks++;
      });

      whiteButton.addEventListener('click', () => {
        updateBox(trial.states[1]);
        clicks++;
      });

      // Continue button functionality
      continueButton.addEventListener('click', () => {
        const trialData = {
          clicks: clicks,
          boxID: trial.boxID,
        };
        this.jsPsych.finishTrial(trialData);
      });
    }
  }

  return ClickableBoxWithButtonsTwoPlugin;
})(jsPsychModule);
