var jsPsychMLFlowchartButtonsTwo = (function (jsPsychModule) {
  'use strict';

  const info = {
    name: 'ml-flowchart',
    version: '1.0.0',
    parameters: {
      topImageSrc: {
        type: jsPsychModule.ParameterType.STRING,
        default: null,
        description: 'URL of the top-left input image.',
      },
      bottomImageSrc: {
        type: jsPsychModule.ParameterType.STRING,
        default: null,
        description: 'URL of the bottom-center salience image.',
      },
      states: {
        type: jsPsychModule.ParameterType.OBJECT,
        default: {
          trainedMLModel: [
            { text: 'Trained ML Model', background: 'lightblue' },
            { text: 'State 2: Description of Model', background: 'yellow' },
            { text: 'State 3: Details of Model', background: 'white' },
          ],
          pixelSalience: [
            { text: 'Pixel Salience Algorithm', background: 'lightblue' },
            { text: 'State 2: Explanation of Salience', background: 'yellow' },
            { text: 'State 3: Details of Salience', background: 'white' },
          ],
        },
        description: 'States for the clickable boxes with text and background changes.',
      },
      trustworthinessScore: {
        type: jsPsychModule.ParameterType.STRING,
        default: 'Trustworthy: 82',
        description: 'Trustworthiness score displayed on the right.',
      },
      flowchartTitle: {
        type: jsPsychModule.ParameterType.STRING,
        default: '',
        description: 'Title or description text displayed at the top.',
      },
    },
  };

  class MLFlowchartButtonsTwoPlugin {
    static info = info;

    constructor(jsPsych) {
      this.jsPsych = jsPsych;
    }

    trial(display_element, trial) {
      console.log("Using jsPsych Ml flowchart buttons")
      // Render the layout with buttons added
      display_element.innerHTML = `
        <div style="text-align: center; font-size: 12px; margin-bottom: 20px;">
          ${trial.flowchartTitle}
        </div>

        <div style="display: flex; justify-content: center; align-items: center; gap: 20px;">

          <!-- Left Image -->
          <div>
            <img src="${trial.topImageSrc}" style="width: 150px; height: auto; border: 1px solid black;">
          </div>

          <!-- ML Model Box with Buttons -->
          <div style="display: flex; flex-direction: column; align-items: center; gap: 10px;">
            <div id="ml-model-box" style="
              width: 200px;
              height: 200px;
              background: ${trial.states.trainedMLModel[0].background};
              display: flex;
              align-items: center;
              justify-content: center;
              text-align: center;
              border: 2px solid black;
            ">
              ${trial.states.trainedMLModel[0].text}
            </div>
            <div style="display: flex; gap: 5px;">
              <button id="model-blue-button" style="background-color: blue; color: white; padding: 5px; cursor: pointer;">Blue</button>
              <button id="model-yellow-button" style="background-color: yellow; padding: 5px; cursor: pointer;">Yellow</button>
              <button id="model-white-button" style="background-color: white; padding: 5px; cursor: pointer;">White</button>
            </div>
          </div>

          <!-- Output Trustworthiness Score -->
          <div style="margin-top: 10px; font-size: 12px !important; text-align: center; font-weight: regular;">
            ${trial.trustworthinessScore}
          </div>

          <!-- Pixel Salience Box with Buttons -->
          <div style="display: flex; flex-direction: column; align-items: center; gap: 10px;">
            <div id="pixel-salience-box" style="
              width: 300px;
              height: 300px;
              background: ${trial.states.pixelSalience[0].background};
              display: flex;
              align-items: center;
              justify-content: center;
              text-align: center;
              border: 2px solid black;
            ">
              ${trial.states.pixelSalience[0].text}
            </div>
            <div style="display: flex; gap: 5px;">
              <button id="salience-blue-button" style="background-color: blue; color: white; padding: 5px; cursor: pointer;">Blue</button>
              <button id="salience-white-button" style="background-color: white; padding: 5px; cursor: pointer;">White</button>
            </div>
          </div>

        </div>

        <!-- Bottom Image -->
        <div style="display: flex; justify-content: center; align-items: center; margin-top: 20px;">
          <img src="${trial.bottomImageSrc}" style="width: 300px; height: auto; border: 1px solid black;">
        </div>

        <!-- Continue Button -->
        <button id="continue-button" style="
          margin-top: 20px;
          padding: 10px 20px;
          font-size: 12px;
          background-color: #4CAF50;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;">
          Continue
        </button>
      `;

      // Helper function to update boxes
      const updateBox = (boxElement, state) => {
        boxElement.innerHTML = state.text || '';
        boxElement.style.background = state.background || '';
        boxElement.style.border = state.border || 'none';
      };

      // Event listeners for ML Model Box buttons
      document.getElementById('model-blue-button').addEventListener('click', () => {
        updateBox(document.getElementById('ml-model-box'), trial.states.trainedMLModel[0]);
      });
      document.getElementById('model-yellow-button').addEventListener('click', () => {
        updateBox(document.getElementById('ml-model-box'), trial.states.trainedMLModel[1]);
      });
      document.getElementById('model-white-button').addEventListener('click', () => {
        updateBox(document.getElementById('ml-model-box'), trial.states.trainedMLModel[2]);
      });

      // Event listeners for Pixel Salience Box buttons
      document.getElementById('salience-blue-button').addEventListener('click', () => {
        updateBox(document.getElementById('pixel-salience-box'), trial.states.pixelSalience[0]);
      });
      document.getElementById('salience-white-button').addEventListener('click', () => {
        updateBox(document.getElementById('pixel-salience-box'), trial.states.pixelSalience[1]);
      });

      // Continue button
      document.getElementById('continue-button').addEventListener('click', () => {
        this.jsPsych.finishTrial();
      });
    }
  }

  return MLFlowchartButtonsTwoPlugin;
})(jsPsychModule);
