var jsPsychMLFlowchartModularDev = (function (jsPsychModule) {
  'use strict';

  const info = {
    name: 'ml-flowchart-modular-dev',
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
          facialStruct: [
            { text: 'Facial Structure', background: 'lightblue' },
            { text: 'State 2: Description of Structure', background: 'yellow' },
            { text: 'test', background: 'white', outline: '2px dotted black' },
          ],
          facialText: [
            { text: 'Facial Text Analysis', background: 'lightblue' },
            { text: 'State 2: Explanation of Analysis', background: 'yellow' },
            { text: 'test', background: 'white', outline: '2px dotted black' },
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
      let structClicks = 0;
      let textClicks = 0;

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
          
          <!-- Horizontal Line 0-->
          <div style="width: 50px; border-top: 2px solid black; margin: 0px 0;"></div>
          
          <!-- Leftmost Box -->
          <div id="facial-struct-box" style="
            width: 200px;
            height: 200px;
            background: ${trial.states.facialStruct[0].background};
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            cursor: pointer;
            border: 2px solid black;
            font-size: 14px;
          ">
            ${trial.states.facialStruct[0].text}
          </div>
          
          <!-- Horizontal Line 1 -->
          <div style="width: 50px; border-top: 2px solid black; margin: 0px 0;"></div>

          <!-- Vertically Stack the Extractors -->
          <div style="display: flex; flex-direction: column; align-items: center; gap: 20px;">
            <!-- Extractor Top -->
            <div id="facial-hue-box" style="
              width: 300px;
              height: 150px;
              background: ${trial.states.facialHue[0].background};
              display: flex;
              align-items: center;
              justify-content: center;
              text-align: center;
              cursor: pointer;
              border: 2px solid black;
              font-size: 14px;">
              ${trial.states.facialHue[0].text}
            </div>

            <!-- Extractor Middle -->
            <div id="facial-text-box" style="
              width: 300px;
              height: 150px;
              background: ${trial.states.facialText[0].background};
              display: flex;
              align-items: center;
              justify-content: center;
              text-align: center;
              cursor: pointer;
              border: 2px solid black;
              font-size: 14px;
            ">
              ${trial.states.facialText[0].text}
            </div>
          </div>

          <!-- Horizontal Line 2 -->
          <div style="width: 50px; border-top: 2px solid black; margin: 0px 0;"></div>
          
          <!-- Right Box -->
          <div>
            <div id="decision-module-box" style="
              width: 300px;
              height: 200px;
              background: ${trial.states.decisionModule[0].background};
              display: flex;
              align-items: center;
              justify-content: center;
              text-align: center;
              cursor: pointer;
              border: 2px solid black;
              font-size: 14px;
            ">
              ${trial.states.decisionModule[0].text}
          </div>

          <!-- Trustworthy Score-->
          <div style="margin-top: 10px; font-size: 12px !important; text-align: center; font-weight: bold;">
              ${trial.trustworthinessScore}
            </div>

          </div>
        </div>
        <!-- Mirrored 'L' Elbow Connector -->
        <div style="position: absolute; top: 420px; left: 1350px; width: 2px; height: 150px; background-color: black;"></div> <!-- Vertical Line -->
        <div style="position: absolute; top: 570px; left: 1200px; width: 150px; height: 2px; background-color: black;"></div> <!-- Horizontal Line -->

        <!-- Bottom Image -->
        <div style="display: flex; justify-content: center; align-items: center; margin-top: 20px;">
          <img src="${trial.bottomImageSrc}" style="width: 600px; height: auto;">
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

      // Add interactivity to the Facial Struct Box
      const facialStructBox = document.getElementById('facial-struct-box');
      facialStructBox.addEventListener('click', () => {
        const states = trial.states.facialStruct; 
        if (structClicks < states.length - 1) {
          const currentState = states[structClicks + 1];

          // Apply state changes
          facialStructBox.innerHTML = currentState.text;
          facialStructBox.style.background = currentState.background;

          // Update outline if defined
          if (currentState.outline) {
            facialStructBox.style.border = 'none'; // Remove border to avoid overlap
            facialStructBox.style.outline = currentState.outline;
          } else {
            facialStructBox.style.outline = 'none'; // Reset outline if not defined
          }

          // Increment click counter after applying changes
          structClicks++;
        }
      });

      // Add interactivity to the Facial Text Box
      const facialTextBox = document.getElementById('facial-text-box');
      // let textClicks = 0;
      facialTextBox.addEventListener('click', () => {
        const states = trial.states.facialText;
        if (textClicks < states.length - 1) {
          const currentState = states[textClicks + 1];
          facialTextBox.innerHTML = currentState.text;
          facialTextBox.style.background = currentState.background;

          // Update outline if defined
          if (currentState.outline) {
            facialTextBox.style.border = 'none';
            facialTextBox.style.outline = currentState.outline;
          }
          textClicks++;
        }
      });

      // Add interactivity for FacialHue
      const facialHueBox = document.getElementById('facial-hue-box');
      let hueClicks = 0;
      facialHueBox.addEventListener('click', () => {
        const states = trial.states.facialHue;
        if (hueClicks < states.length - 1) {
          const currentState = states[hueClicks + 1];
          facialHueBox.innerHTML = currentState.text;
          facialHueBox.style.background = currentState.background;

          if (currentState.outline) {
            facialHueBox.style.border = 'none';
            facialHueBox.style.outline = currentState.outline;
          } else {
            facialHueBox.style.outline = 'none';
          }
          hueClicks++;
        }
      });

      // Add interactivity to decisionModuleBox
      const decisionModuleBox = document.getElementById('decision-module-box');
      let decisionClicks = 0;
      decisionModuleBox.addEventListener('click', () => {
        const states = trial.states.decisionModule;
        if (decisionClicks < states.length - 1) {
          const currentState = states[decisionClicks + 1];
          decisionModuleBox.innerHTML = currentState.text;
          decisionModuleBox.style.background = currentState.background;

          if (currentState.outline) {
            decisionModuleBox.style.border = 'none';
            decisionModuleBox.style.outline = currentState.outline;
          } else {
            decisionModuleBox.style.outline = 'none';
          }
          decisionClicks++;
        }
      });


      // Add functionality to Back and Continue buttons
      const continueButton = document.getElementById('continue-button');
      continueButton.addEventListener('click', () => {
        const trialData = {
          structBoxClicks: structClicks,
          textBoxClicks: textClicks,
        };
        this.jsPsych.finishTrial(trialData);
      });
    }
  }

  return MLFlowchartPlugin;
})(jsPsychModule);
