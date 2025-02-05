var jsPsychMLFlowchartModularDev = (function (jsPsychModule) {
  'use strict';

  const info = {
    name: 'ml-flowchart-modular-dev',
    version: '1.1.2',
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
            { text: 'State 3: Detailed Analysis', background: 'white', outline: '2px dotted black' },
          ],
          facialHue: [
            { text: 'Facial Hue Analysis', background: 'lightblue' },
            { text: 'State 2: Explanation of Hue', background: 'yellow' },
            { text: 'State 3: Breakdown of Hue Factors', background: 'white', outline: '2px dotted black' },
          ],
          facialText: [
            { text: 'Facial Text Analysis', background: 'lightblue' },
            { text: 'State 2: Explanation of Text Analysis', background: 'yellow' },
            { text: 'State 3: Summary of Findings', background: 'white', outline: '2px dotted black' },
          ],
          decisionModule: [
            { text: 'Decision Module', background: 'lightblue' },
            { text: 'State 2: Explanation of Decision Making', background: 'yellow' },
            { text: 'State 3: Detailed Explanation', background: 'white', outline: '2px dotted black' },
          ],
        },
        description: 'States for the interactive modules with text and background changes.',
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
      // Render the layout with proper styling
      display_element.innerHTML = `
      
        <!-- Header Text -->
        <div style="text-align: center; font-size: 18px; margin-bottom: 20px;">
          ${trial.flowchartTitle}
        </div>

        <!-- Flowchart Layout -->
        <div style="display: flex; justify-content: center; align-items: center; gap: 20px;">

          <!-- Face Image -->
          <div>
            <img src="${trial.topImageSrc}" style="width: 150px; height: auto; border: 1px solid black;">
          </div>
          
          <p><i class="arrow right"></i></p>

          <!-- Facial Structure Box -->
          <div style="display: flex; flex-direction: column; align-items: center; gap: 10px;">
            <div id="facialStruct-box" class="flowchart-box" style="
              width: 200px; height: 200px; border: 2px solid black;
              display: flex; align-items: center; justify-content: center;
              text-align: center; font-size: 14px;
              background: ${trial.states.facialStruct[0].background};
            ">
              ${trial.states.facialStruct[0].text}
            </div>
            <div class="button-group">
              <button id="facialStruct-blue-button" style="background-color: blue; color: white; padding: 5px; cursor: pointer;">Blue</button>
              <button id="facialStruct-yellow-button" style="background-color: yellow; color black; padding: 5px; cursor: pointer;">Yellow</button>
              <button id="facialStruct-white-button" style="background-color: white; color: black; padding: 5px; cursor: pointer;">White</button>
            </div>
          </div>
          
          <p><i class="arrow right"></i></p>
          

          <!-- Facial Hue & Facial Text Boxes (Stacked Vertically) -->
            <div style="display: flex; flex-direction: column; align-items: center; gap: 20px;">
              
              <!-- Facial Hue Analysis Box -->
              <div id="facialHue-box" class="flowchart-box" style="
                width: 200px; height: 200px; border: 2px solid black;
                display: flex; align-items: center; justify-content: center;
                text-align: center; font-size: 14px;
                background: ${trial.states.facialHue[0].background};
              ">
                ${trial.states.facialHue[0].text}
              </div>
              <div class="button-group">
                <button id="facialHue-blue-button" style="background-color: blue; color: white; padding: 5px; cursor: pointer;">Blue</button>
                <button id="facialHue-white-button" style="background-color: white; color: black; padding: 5px; cursor: pointer;">White</button>
              </div>

              <!-- Facial Text Analysis Box -->
              <div id="facialText-box" class="flowchart-box" style="
                width: 200px; height: 200px; border: 2px solid black;
                display: flex; align-items: center; justify-content: center;
                text-align: center; font-size: 14px;
                background: ${trial.states.facialText[0].background};
              ">
                ${trial.states.facialText[0].text}
              </div>
              <div class="button-group">
                <button id="facialText-blue-button" style="background-color: blue; color: white; padding: 5px; cursor: pointer;">Blue</button>
                <button id="facialText-yellow-button" style="background-color: yellow; color black; padding: 5px; cursor: pointer;">Yellow</button>
                <button id="facialText-white-button" style="background-color: white; color: black; padding: 5px; cursor: pointer;">White</button>
              </div>
            </div>
            <p><i class="arrow right"></i></p>
          
          <!-- Decision Module Box -->
          <div style="display: flex; flex-direction: column; align-items: center; gap: 10px;">
            <div id="decisionModule-box" class="flowchart-box" style="
              width: 300px; height: 200px; border: 2px solid black;
              display: flex; align-items: center; justify-content: center;
              text-align: center; font-size: 14px;
              background: ${trial.states.decisionModule[0].background};
            ">
              ${trial.states.decisionModule[0].text}
            </div>
            <div class="button-group">
              <button id="decisionModule-blue-button" style="background-color: blue; color: white; padding: 5px; cursor: pointer;">Blue</button>
              <button id="decisionModule-yellow-button" style="background-color: yellow; color black; padding: 5px; cursor: pointer;">Yellow</button>
              <button id="decisionModule-white-button" style="background-color: white; color: black; padding: 5px; cursor: pointer;">White</button>
            </div>
          </div>
          <p><i class="arrow right"></i></p>
          
          <div style="display: flex; flex-direction: column; align-items: center; gap: 20px;">
            <!-- Explanatory Diagram -->
            <img src="${trial.bottomImageSrc}" style="width: 500px; height: auto; outline: 1px solid">
            
            <p> <i class="arrow down"></i></p>
            
            <!-- Output Trustworthiness Score -->
            <div style="font-weight: light; font-size: 18px; margin-top: 0px; text-align: center; border: dotted 2px; padding: 10px;"
            <br> Output: Trustworthiness Score
            </div>
          </div>

        </div>
        
  

        <!-- Continue Button -->
        <button id="continue-button" class="continue-button" style="
              padding: 10px 20px;
              font-size: 16px;
              background-color: #4CAF50;
              color: white;
              border: none;
              border-radius: 5px;
              cursor: pointer;"
              margin: 20px 20px;">Continue</button>
      `;

      // Helper function to update boxes
      const updateBox = (boxElement, state) => {
        if (!boxElement || !state) return;

        boxElement.innerHTML = state.text || '';
        boxElement.style.background = state.background || '';
        boxElement.style.border = state.border || 'none';
      };

      // Logging function for tracking button clicks
      const logClickTime = (clickLog, buttonID) => {
        const timeElapsed = performance.now();
        clickLog.push({ button: buttonID, time: timeElapsed });
        console.log(`Button Clicked: ${buttonID}, Time: ${timeElapsed}`);
      };

      // Initialize click logs for each box
      const structClickTimes = [];
      const hueClickTimes = [];
      const textClickTimes = [];
      const decisionClickTimes = [];

      // **Event Listeners for Facial Structure Box Buttons**
      document.getElementById('facialStruct-blue-button').addEventListener('click', () => {
        logClickTime(structClickTimes, 'facialStruct-blue');
        updateBox(document.getElementById('facialStruct-box'), trial.states.facialStruct[0]);
      });
      document.getElementById('facialStruct-yellow-button').addEventListener('click', () => {
        logClickTime(structClickTimes, 'facialStruct-yellow');
        updateBox(document.getElementById('facialStruct-box'), trial.states.facialStruct[1]);
      });
      document.getElementById('facialStruct-white-button').addEventListener('click', () => {
        logClickTime(structClickTimes, 'facialStruct-white');
        updateBox(document.getElementById('facialStruct-box'), trial.states.facialStruct[2]);
      });

      // **Event Listeners for Facial Hue Analysis Box Buttons**
      document.getElementById('facialHue-blue-button').addEventListener('click', () => {
        logClickTime(hueClickTimes, 'facialHue-blue');
        updateBox(document.getElementById('facialHue-box'), trial.states.facialHue[0]);
      });
      document.getElementById('facialHue-white-button').addEventListener('click', () => {
        logClickTime(hueClickTimes, 'facialHue-white');
        updateBox(document.getElementById('facialHue-box'), trial.states.facialHue[1]);
      });

      // **Event Listeners for Facial Text Analysis Box Buttons**
      document.getElementById('facialText-blue-button').addEventListener('click', () => {
        logClickTime(textClickTimes, 'facialText-blue');
        updateBox(document.getElementById('facialText-box'), trial.states.facialText[0]);
      });
      document.getElementById('facialText-yellow-button').addEventListener('click', () => {
        logClickTime(textClickTimes, 'facialText-yellow');
        updateBox(document.getElementById('facialText-box'), trial.states.facialText[1]);
      });
      document.getElementById('facialText-white-button').addEventListener('click', () => {
        logClickTime(textClickTimes, 'facialText-white');
        updateBox(document.getElementById('facialText-box'), trial.states.facialText[2]);
      });

      // **Event Listeners for Decision Module Box Buttons**
      document.getElementById('decisionModule-blue-button').addEventListener('click', () => {
        logClickTime(decisionClickTimes, 'decisionModule-blue');
        updateBox(document.getElementById('decisionModule-box'), trial.states.decisionModule[0]);
      });
      document.getElementById('decisionModule-yellow-button').addEventListener('click', () => {
        logClickTime(decisionClickTimes, 'decisionModule-yellow');
        updateBox(document.getElementById('decisionModule-box'), trial.states.decisionModule[1]);
      });
      document.getElementById('decisionModule-white-button').addEventListener('click', () => {
        logClickTime(decisionClickTimes, 'decisionModule-white');
        updateBox(document.getElementById('decisionModule-box'), trial.states.decisionModule[2]);
      });


      // Continue button functionality
      document.getElementById('continue-button').addEventListener('click', () => {
        this.jsPsych.finishTrial();
      });
    }
  }

  return MLFlowchartPlugin;
})(jsPsychModule);
