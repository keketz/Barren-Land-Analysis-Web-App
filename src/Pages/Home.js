import React, { Component } from 'react';
import '../StyleSheets/Home.css';

class App extends Component {
    render() {
        return (
            <div className="HomePageContainer">
                <p>This project was tested with Google Chrome. Please use Google Chrome when reviewing. Navigate to Barren Land to use the Barren Land Analysis App.</p>

                <h1>Project Directions</h1>
                <p>You have a farm of 400m by 600m where coordinates of the field are from (0, 0) to (399, 599). A portion of the farm is barren, and all the barren land is in the form of rectangles. Due to these rectangles of barren land, the remaining area of fertile land is in no particular shape. An area of fertile land is defined as the largest area of land that is not covered by any of the rectangles of barren land.</p>
                <p>Read input from STDIN. Print output to STDOUT</p>

                <h3>Input</h3>
                <p>You are given a set of rectangles that contain the barren land. These rectangles are defined in a string, which consists of four integers separated by single spaces, with no additional spaces in the string. The first two integers are the coordinates of the bottom left corner in the given rectangle, and the last two integers are the coordinates of the top right corner.</p>

                <h3>Output</h3>
                <p>Output all the fertile land area in square meters, sorted from smallest area to greatest, separated by a space.</p>

                <table className="ExampleInputOutputTable">
                    <thead>
                        <tr><th>Sample Input</th><th>Sample Output</th></tr>
                    </thead>
                    <tbody>
                        <tr><td>0 292 399 307</td><td>116800 116800</td></tr>
                        <tr><td>48 192 351 207, 48 392 351 407,120 52 135 547, 260 52 275 547</td><td>22816 192608</td></tr>
                    </tbody>
                </table>     

                <h1>Requirements</h1>
                <h3>Complete the exercise in the technical stack of your choice.</h3>
                <ul>
                    <li>When appropriate use a data store of your choice.</li>
                    <li>Use any external frameworks you desire</li>
                    <li>Be ready to discuss your recommendations to make your solution suitable for use in a production environment</li>
                </ul>

                <h3>Provide evidence of the result to the interviewers (choose one)</h3>
                <ul>
                    <li>Unit test results or other documented output</li>
                    <li>Hosted instance of the implementation</li>
                    <li>Runnable instance of the implementation on your computer</li>
                </ul>
                <h3>The end result should be a functional implementation of the problem preferably with associated tests</h3>
                <ul>
                    <li>Provide the working code either in a publicly accessible hosted repository or a zip file containing all necessary build steps and dependencies</li>
                    <li>Rename .js files to .js.txt if emailing code</li>
                    <li>Provide a README.md file with instructions for testing, running and interacting with your application and any details you feel are relevant to share</li>
                </ul>

                <h1>Built With</h1>
                <ul>
                	<li>react ^16.4.2 - JavaScript library for creating user interfaces.</li>
                    <li>gh-pages ^1.2.0 - Publish files to a gh-pages branch on GitHub</li>
                    <li>jquery ^3.3.1 - Fast, small, and feature-rich JavaScript library</li>
                    <li>jquery-ui-bundle ^1.12.1 - migrate - </li>
                    <li>react-dom ^16.4.2 - DOM and server renderers for React</li>
                    <li>react-router-dom ^4.3.1 - DOM bindings for React Router</li>
                    <li>react-scripts 1.1.1 - Scripts and configuration used by Create React App</li>
                </ul>
                
                <h1>Implementation</h1>
                <b><a href="https://en.wikipedia.org/wiki/Flood_fill" target="_blank">Flood Fill wiki page</a> listed a few pseudocode solutions. I tried a few after my initial solution destroyed everything in its path.</b>
                <ul>
                    <li>First tired the Stack-based recursive implementation(four-way). Results were better but it crashed with a larger area due to a StackOverflowError. Java was able to handle this algorithm but required more memory. Javascript could not.</li>
                    <li>Then the Forest Fire Algoithm which uses a loop to itterate through a queue of plots. I modified this version to group all adjacent plots and assign each a group number.</li>
                </ul>

                <b>Forest Fire Algorithm (node, target-color, replacement-color)</b>
                <ol>
                    <li>If target-color is equal to replacement-color, return.</li>
                    <li>If color of node is not equal to target-color, return.</li>
                    <li>Set Q to the empty queue.</li>
                    <li>Set the color of node to replacement - color.</li>
                    <li>Add node to the end of Q.</li>
                    <li>While Q is not empty:</li>
                    <li>Set n equal to the first element of Q.</li>
                    <li>Remove first element from Q.</li>
                    <li>If the color of the node to the west of n is target - color, set the color of that node to replacement - color and add that node to the end of Q.</li>
                    <li>If the color of the node to the east of n is target - color, set the color of that node to replacement - color and add that node to the end of Q.</li>
                    <li>If the color of the node to the north of n is target - color, set the color of that node to replacement - color and add that node to the end of Q.</li>
                    <li>If the color of the node to the south of n is target - color, set the color of that node to replacement - color and add that node to the end of Q.</li>
                    <li>Continue looping until Q is exhausted.</li>
                    <li>Return.</li>
                 </ol>


            </div>
        );
    }
}

export default App;
