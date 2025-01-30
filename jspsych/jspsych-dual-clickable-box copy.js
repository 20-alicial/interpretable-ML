var jsPsychDualClickableBox = (function (jsPsychModule) {
  'use strict';

  const info = {
    name: 'dual-clickable-box',
    version: '1.1.0',
    parameters: {
      lineText: {
        type: jsPsychModule.ParameterType.STRING,
        default: 'This is the default line of text above the boxes and image.',
        description: 'The line of text displayed above the boxes and the image.',
      },
      leftBox: {
        type: jsPsychModule.ParameterType.OBJECT,
        default: {
          text: 'Top Box',
          background: 'lightblue',
          width: '150px',
          height: '100px',
          states: [
            { text: 'Top Box State 1', background: 'lightblue' },
            { text: 'Top Box State 2', background: 'yellow' },
            { text: 'Top Box State 3', background: 'orange', border: none },
          ],
        },
        description: 'Parameters for the top box, including states.',
      },
      rightBox: {
        type: jsPsychModule.ParameterType.OBJECT,
        default: {
          text: 'Bottom Box',
          background: 'lightblue',
          width: '150px',
          height: '100px',
          states: [
            { text: 'Bottom Box State 1', background: 'lightblue' },
            { text: 'Bottom Box State 2', background: 'green' },
            { text: 'Bottom Box State 3', background: 'red', outline: '2px dotted black' },
          ],
        },
        description: 'Parameters for the bottom box, including states.',
      },
      imageSrc: {
        type: jsPsychModule.ParameterType.STRING,
        default: null,
        description: 'URL of the image displayed to the right of the boxes.',
      },
      imageWidth: {
        type: jsPsychModule.ParameterType.STRING,
        default: '300px',
        description: 'Width of the large image displayed to the right of the boxes.',
      },
      imageHeight: {
        type: jsPsychModule.ParameterType.STRING,
        default: 'auto',
        description: 'Height of the large image displayed to the right of the boxes.',
      },
    },
    data: {
      topBoxClicks: {
        type: jsPsychModule.ParameterType.INT,
        default: 0,
        description: 'The number of clicks on the top box.',
      },
      bottomBoxClicks: {
        type: jsPsychModule.ParameterType.INT,
        default: 0,
        description: 'The number of clicks on the bottom box.',
      },
      topBoxFinalState: {
        type: jsPsychModule.ParameterType.STRING,
        default: null,
        description: 'The final state of the top box (text or color).',
      },
      bottomBoxFinalState: {
        type: jsPsychModule.ParameterType.STRING,
        default: null,
        description: 'The final state of the bottom box (text or color).',
      },
    },
  };

  class DualClickableBoxPlugin {
    static info = info;

    constructor(jsPsych) {
      this.jsPsych = jsPsych;
    }

    trial(display_element, trial) {
      let leftClicks = 0; // Track clicks for the top box
      let rightClicks = 0; // Track clicks for the bottom box

      // Render the content
      display_element.innerHTML = `
        <div style="text-align: center; font-size: 18px; max-width: 1500px; margin-bottom: 20px;">
          ${trial.lineText}
        </div>
        <div style="display: flex; justify-content: center; align-items: center;">
          <div style="display: flex; flex-direction: column; gap: 20px; margin-right: 20px;">
            <div id="top-box" style="
              width: ${trial.leftBox.width};
              height: ${trial.leftBox.height};
              background: ${trial.leftBox.background};
              display: flex;
              align-items: center;
              justify-content: center;
              text-align: center;
              cursor: pointer;
              border: 2px solid black;
            ">
              ${trial.leftBox.text}
            </div>
            <div id="bottom-box" style="
              width: ${trial.rightBox.width};
              height: ${trial.rightBox.height};
              background: ${trial.rightBox.background};
              display: flex;
              align-items: center;
              justify-content: center;
              text-align: center;
              cursor: pointer;
              border: 2px solid black;
            ">
              ${trial.rightBox.text}
            </div>
          </div>
          <div>
            <img src="${trial.imageSrc}" style="max-width: ${trial.imageWidth}; height: ${trial.imageHeight};">
          </div>
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

      // Top Box Event Listener
      const topBoxElement = document.getElementById('top-box');
      topBoxElement.addEventListener('click', () => {
        const states = trial.leftBox.states;
        if (states && leftClicks < states.length) {
          const currentState = states[leftClicks];
          topBoxElement.innerHTML = currentState.text;
          topBoxElement.style.background = currentState.background;
          if (currentState.outline) {
            topBoxElement.style.outline = currentState.outline;
          } else {
            topBoxElement.style.outline = 'none';
          }
          leftClicks++;
        }
      });

      // Bottom Box Event Listener
      const bottomBoxElement = document.getElementById('bottom-box');
      bottomBoxElement.addEventListener('click', () => {
        const states = trial.rightBox.states;
        if (states && rightClicks < states.length) {
          const currentState = states[rightClicks];
          bottomBoxElement.innerHTML = currentState.text;
          bottomBoxElement.style.background = currentState.background;
          if (currentState.outline) {
            bottomBoxElement.style.outline = currentState.outline;
          } else {
            bottomBoxElement.style.outline = 'none';
          }
          rightClicks++;
        }
      });

      // Get the button and attach the event listener
      const continueButton = document.getElementById('continue-button');

      // Add a fallback check
      if (continueButton) {
        continueButton.addEventListener('click', () => {
          // Collect trial data
          const trialData = {
            topBoxClicks: leftClicks,
            bottomBoxClicks: rightClicks,
            topBoxFinalState:
              trial.leftBox.states && leftClicks > 0
                ? trial.leftBox.states[leftClicks - 1].text
                : trial.leftBox.text,
            bottomBoxFinalState:
              trial.rightBox.states && rightClicks > 0
                ? trial.rightBox.states[rightClicks - 1].text
                : trial.rightBox.text,
          };

          // Finish the trial
          this.jsPsych.finishTrial(trialData);
        });
      } else {
        console.error('Continue button not found in the DOM!');
      }
    }
  }

  return DualClickableBoxPlugin;
})(jsPsychModule);
