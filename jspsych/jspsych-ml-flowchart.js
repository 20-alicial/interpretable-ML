var jsPsychMLFlowchart = (function (jsPsychModule) {
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
            ],
            pixelSalience: [
              { text: 'Pixel Salience Algorithm', background: 'lightblue' },
              { text: 'State 2: Explanation of Salience', background: 'green' },
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
  
    class MLFlowchartPlugin {
      static info = info;
  
      constructor(jsPsych) {
        this.jsPsych = jsPsych;
      }
  
      trial(display_element, trial) {
        let modelClicks = 0;
        let salienceClicks = 0;
  
        // Render the layout
        display_element.innerHTML = `
          <!-- Header Text -->
          <div style="text-align: center; font-size: 18px; margin-bottom: 20px;">
            ${trial.flowchartTitle}
          </div>
          <!-- Flowchart -->
          <div style="display: flex; justify-content: center; align-items: center; gap: 20px;">
            <!-- Left Image -->
            <div>
              <img src="${trial.topImageSrc}" style="width: 150px; height: auto; border: 1px solid black;">
            </div>
            <!-- Center Box -->
            <div id="ml-model-box" style="
              width: 200px;
              height: 100px;
              background: ${trial.states.trainedMLModel[0].background};
              display: flex;
              align-items: center;
              justify-content: center;
              text-align: center;
              cursor: pointer;
              border: 2px solid black;
            ">
              ${trial.states.trainedMLModel[0].text}
            </div>
            <!-- Right Box -->
            <div>
              <div id="pixel-salience-box" style="
                width: 250px;
                height: 100px;
                background: ${trial.states.pixelSalience[0].background};
                display: flex;
                align-items: center;
                justify-content: center;
                text-align: center;
                cursor: pointer;
                border: 2px solid black;
              ">
                ${trial.states.pixelSalience[0].text}
              </div>
              <div style="margin-top: 10px; font-size: 16px; text-align: center; font-weight: bold;">
                ${trial.trustworthinessScore}
              </div>
            </div>
          </div>
          <!-- Bottom Image -->
          <div style="display: flex; justify-content: center; align-items: center; margin-top: 20px;">
            <img src="${trial.bottomImageSrc}" style="width: 300px; height: auto; border: 1px solid black;">
          </div>
          <!-- Navigation Buttons -->
            <button id="continue-button" style="
              padding: 10px 20px;
              font-size: 16px;
              background-color: #4CAF50;
              color: white;
              border: none;
              border-radius: 5px;
              cursor: pointer;">
              Continue
            </button>
          </div>
        `;
  
        // Add interactivity to the ML Model Box
        const mlModelBox = document.getElementById('ml-model-box');
        mlModelBox.addEventListener('click', () => {
          const states = trial.states.trainedMLModel;
          if (modelClicks < states.length) {
            const currentState = states[modelClicks];
            mlModelBox.innerHTML = currentState.text;
            mlModelBox.style.background = currentState.background;
            modelClicks++;
          }
        });
  
        // Add interactivity to the Pixel Salience Box
        const pixelSalienceBox = document.getElementById('pixel-salience-box');
        pixelSalienceBox.addEventListener('click', () => {
          const states = trial.states.pixelSalience;
          if (salienceClicks < states.length) {
            const currentState = states[salienceClicks];
            pixelSalienceBox.innerHTML = currentState.text;
            pixelSalienceBox.style.background = currentState.background;
            salienceClicks++;
          }
        });
  
        // Add functionality to Back and Continue buttons
        // const backButton = document.getElementById('back-button');
        // backButton.addEventListener('click', () => {
        //   this.jsPsych.finishTrial({ action: 'back' });
        // });
  
        const continueButton = document.getElementById('continue-button');
        continueButton.addEventListener('click', () => {
          const trialData = {
            modelBoxClicks: modelClicks,
            salienceBoxClicks: salienceClicks,
          };
          this.jsPsych.finishTrial(trialData);
        });
      }
    }
  
    return MLFlowchartPlugin;
  })(jsPsychModule);
  