import React, { Component } from 'react';
import '../StyleSheets/Home.css';

class App extends Component {
    render() {
        return (
            <div className="HomePageContainer">
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
            </div>
        );
    }
}

export default App;
