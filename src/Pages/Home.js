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
                <h3>Personal Javascript Solution</h3>
                <p>The first solution I tried was my own which involved using javascripts array functions to filter, split, join, and push array values around. The solution worked for a small scale, but cause the website to overload at larger scales and crash. I tried the solution in java as well with similar results. Below is the solution: </p>
                <p>
                    <div>{"var land = this.state.land;"}</div>
                    <div>{"var plots = [];"}</div>
                    <div>{"for (var x = 0; x < land.length; x++) {"}</div>
                    <div style={{ textIndent: '10px' }}>{"for (var y = 0; y < land[x].length; y++) {"}</div>
                    <div style={{ textIndent: '20px' }}>{"if (land[x][y]) {plots.push(x + ' ' + y); }" }</div>
                    <div style={{ textIndent: '10px' }}>{"}"}</div>
                    <div>{"}"}</div>
                    <br />
                    <div>{"var filteredLand = [[plots[0]]];"}</div>
                    <div>{"plots.splice(0, 1);" }</div>
                    <div>{"for (x = 0; x < filteredLand.length; x++) {"}</div>
                    <div style={{ textIndent: '10px' }}>{"for (y = 0; y < filteredLand[x].length; y++) {" }</div>
                    <div style={{ textIndent: '20px' }}>{"filteredLand[x] = filteredLand[x].concat(plots.filter(plot =>"}</div>
                    <div style={{ textIndent: '30px' }}>{"(filteredLand[x][y].split(' ')[0] === plot.split(' ')[0] &&" }</div>
                    <div style={{ textIndent: '30px' }}>{"Math.abs(filteredLand[x][y].split(' ')[1] - plot.split(' ')[1]) === 1 ||"}</div>
                    <div style={{ textIndent: '30px' }}>{"Math.abs(filteredLand[x][y].split(' ')[0] - plot.split(' ')[0]) === 1 &&" }</div>
                    <div style={{ textIndent: '30px' }}>{"filteredLand[x][y].split(' ')[1] === plot.split(' ')[1])"}</div>
                    <div style={{ textIndent: '20px' }}>{"));" }</div>
                    <br />
                    <div style={{ textIndent: '20px' }}>{"filteredLand[x].forEach(plot =>"}</div>
                    <div style={{ textIndent: '30px' }}>{"(plots.indexOf(plot) !== -1) ? plots.splice(plots.indexOf(plot), 1) : null" }</div>
                    <div style={{ textIndent: '20px' }}>{");"}</div>
                    <div style={{ textIndent: '10px' }}>{"}" }</div>
                    <br/>
                    <div style={{ textIndent: '10px' }}>{"if (plots.length > 0) {"}</div>
                    <div style={{ textIndent: '20px' }}>{"filteredLand.push([plots[0]]);" }</div>
                    <div style={{ textIndent: '20px' }}>{"plots.splice(0, 1);"}</div>
                    <div style={{ textIndent: '10px' }}>{"}" }</div>
                    <div>{"}"}</div>
                
                </p>

                <h3>Flood Fill Algorithm</h3>
                <p>After this I thought that maybe the solution used to fill areas in a paint program would be good. I found a wiki page explaining the <a href="https://en.wikipedia.org/wiki/Flood_fill" target="_blank">Flood Fill</a> formula. I first tried the four-way Stack-based recursive implementation. Results were better than my original attempt but again a larger scale would be too much for the web app to handle. I built the solution in Java and received a stackOverflow Error.. If i increased the memory used for the solution to 10m, the results would display for a 400 by 600 area without any issues. But that memory requirement was only good for a 400 by 600 area and anything larger would result in a stackOverflow error again. This solution wasn’t exactly scaleable.</p>
                <b>Flood-fill (node, target-color, replacement-color)</b>
                <ol>
                    <li>If target-color is equal to replacement-color, return.</li>
                    <li>If the color of node is not equal to target-color, return.</li>
                    <li>Set the color of node to replacement-color.</li>
                    <li>
                        Perform Flood-fill (one step to the south of node, target-color, replacement-color).<br />
                        Perform Flood-fill (one step to the north of node, target-color, replacement-color).<br/>
                        Perform Flood-fill (one step to the west of node, target-color, replacement-color).<br/>
                        Perform Flood-fill (one step to the east of node, target-color, replacement-color).
                    </li>
                    <li>Return.</li>
                </ol>

                <h3>Forest Fire Algorithm</h3>
                <p>Next I tried an alternative flood fill algorithm sometimes called the ‘Forest Fire Algorithm’. A queue-based implementation similar to the recursive solution, except that it pushes nodes into a queue instead of using recursive calls. This solution worked for me and was scalable as far as I could tell. Javascript could handle it without any issues at 400 by 600 as well as at a greater scale 1000 x 1000. However, it is javascript starts to have trouble rendering the land area greater than a 1000 x 1000 area.  This solution is not ideal for much larger scales and would require a scale limit. </p>
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

                <h3>Extra Features Implemented</h3>
                <p>I added a few extra features I thought would be a nice addition to the solution using what I know. I’ve worked with react for the last year and thought react would be a fun inclusion to the case study to make it more interactive for the user. </p>

                <h3>Input</h3>
                <p>Originally, I had the input accept a JSON formatted string consisting of all the barren land areas then separating and parsing the information from there in one single go. This was faster, but it gave a lot of room for error. It was also very restrictive for the user. They would be limited to planning out their input and rereading it if there were any mistakes. So I switched to letting users input one area at a time. That allowed me to do a few interactive things as the user was inputting their areas. Each new barren land input would update the visual representation of the land. It would also update the fertile land area as new barren land was added or removed.</p>

                <h3>Removing Barren Land</h3>
                <p>Just below the input area is a list of all areas the user has already input. I thought it would be nice to give the user the option to remove areas at any time. If they hover over an area, the barren land is highlighted in both the list and the visual map. Removing the area will remove it from the map, the list, and update the available fertile land areas. </p>

                <h3>Output</h3>
                <p>The output area is just below the input area. It is listed in ascending order.  The list updates as barren land is added or removed. </p>

                <h3>Land Size</h3>
                <p>I also added a way for users to update their land area. The land area will not update with a 0 or negative number, but it will update as the size is changed. The entered barren land will be cleared and the user will need to enter new areas. </p>
            </div>
        );
    }
}

export default App;
