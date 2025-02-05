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
              { text: 'test', background: 'white', outline: '2px dotted black'},
            ],
            pixelSalience: [
              { text: 'Pixel Salience Algorithm', background: 'lightblue' },
              { text: 'State 2: Explanation of Salience', background: 'yellow' },
              { text: 'test', background: 'white', outline: '2px dotted black'},
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
          <div style="text-align: center; font-size: inherit; margin-bottom: 20px;">
            ${trial.flowchartTitle}
          </div>
          
          <!-- Flowchart -->
          <div style="display: flex; justify-content: center; align-items: center; gap: 20px; ">
            <!-- Left Image -->
            <div>
              <img src="${trial.topImageSrc}" style="width: 150px; height: auto; border: 1px solid black;">
            </div>
            
            <!-- Horizontal Line -->
            <div style="width: 100px; border-top: 2px solid black; margin: 0px 0;"></div>
            
            <!-- Center Box -->
            <div id="ml-model-box" style="
              width: 200px;
              height: 200px;
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
            
            <!-- Horizontal Line 1 -->
            <div style="width: 100px; border-top: 2px solid black; margin: 0px 0;"></div>
            
            <!-- Trustworthy Score-->
            <div style="margin-top: 10px; font-size: 32px; text-align: center; font-weight: bold;">
                ${trial.trustworthinessScore}
              </div>
            
              <!-- Horizontal Line 2 -->
            <div style="width: 100px; border-top: 2px solid black; margin: 0px 0;"></div>
            <!-- Right Box -->
            <div>
              <div id="pixel-salience-box" style="
                width: 300px;
                height: 300px;
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

            </div>
          </div>
          <!-- Mirrored 'L' Elbow Connector -->
          <div style="position: absolute; top: 520px; left: 1450px; width: 2px; height: 200px; background-color: black;"></div> <!-- Vertical Line -->
          <div style="position: absolute; top: 720px; left: 1050px; width: 400px; height: 2px; background-color: black;"></div> <!-- Horizontal Line -->

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
              cursor: pointer;"
              margin: 20px 20px;">
              Continue
            </button>
          </div>
        `;
  
        // Add interactivity to the ML Model Box
        const mlModelBox = document.getElementById('ml-model-box');
        mlModelBox.addEventListener('click', () => {
          const states = trial.states.trainedMLModel;
          if (modelClicks < states.length) {
            const currentState = states[modelClicks + 1];
            mlModelBox.innerHTML = currentState.text;
            mlModelBox.style.background = currentState.background;

            // Update outline if defined
            if (currentState.outline) {
              mlModelBox.style.border = 'none';
              mlModelBox.style.outline = currentState.outline;
            }

            modelClicks++;
          }
        });

        // Add interactivity to the Pixel Salience Box
        const pixelSalienceBox = document.getElementById('pixel-salience-box');
        pixelSalienceBox.addEventListener('click', () => {
          const states = trial.states.pixelSalience;
          if (salienceClicks < states.length) {
            const currentState = states[salienceClicks + 1];
            pixelSalienceBox.innerHTML = currentState.text;
            pixelSalienceBox.style.background = currentState.background;

            // Update outline if defined
            if (currentState.outline) {
              pixelSalienceBox.style.border = 'none';
              pixelSalienceBox.style.outline = currentState.outline;
            }
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
  