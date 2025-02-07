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
       <div style="text-align: center; margin-bottom: 10px; font-size: 18px;">${trial.descriptionText || ''}</div>
        <div id="${trial.boxID}" style="
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          margin: 20px auto;
          padding: 10px;
          background: lightblue;
          border: 2px solid black;
          width: ${trial.width};
          height: ${trial.height};
        ">
          ${trial.states[0].displayText || ''}
        </div>
        <div style="display: flex; justify-content: center; gap: 10px;">
          <button id="blue-button" style="
              padding: 10px 20px;
              font-size: 16px;
              background-color: blue;
              color: white;
              border: 1px solid black;
              cursor: pointer;
            ">Blue</button>
          <button id="white-button" style="
            padding: 10px 20px;
            font-size: 16px;
            background-color: white;
            border: 1px solid black;
            cursor: pointer;
          ">White</button>
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