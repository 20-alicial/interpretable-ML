# interpretable-ML

This is an interactive JsPsyh user study for aninterpretable ML project (work in progress). This project uses custom jsPsych plugins to create an interactive task where the participant can click on buttons to reveal more and more information. The project saves reaction time and keystroke data to enable analysis of user interactivity and insight into the degree of information preferred by participants. It can be modified to perform many similiar tasks that are based around adapatively revealing more information to the participant.

There are three base custom plugins which most of the functionalities consist of: 

  * jspsych-clickable-box.js
  * jspsych-dual-clickable-box.js
  * jspsych-ml-flowchart.js

Open `experiment.html` in browser (tested in Chrome) to run the experiment.

## Example of functionality
Users are presented with the least degree of detail first. Under each box are multiple buttons, representing different levels of information.
![Modular development explanation example at initial state](/example1.png?raw=true "Example 1")
The user can toggle the buttons to reveal different levels of information. Here, the user has revealed more information in two boxes.
![Modular development explanation example with more information revealed](/example2.png?raw=true "Example 2")
