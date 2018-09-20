Barren Land Analysis

Input barren land areas and return the total area of fertile land in ascending order. 

Barren land is input using 4 numbers separated by a space forming a rectangle representing bottom left x, bottom left y, top righht x, and tope right y. Fertile land is then listed below in ascending order, grouping adjacent fertile plots with one another and outputing the total area for each.

## Table of Contents

- [Project Instructions](#project-instructions)
- [Getting Started](#getting-started)
- [Prerequisites](#prerequisities)
- [Installing](#installing)
- [Built With](#built-with)
- [Implementation](#implementation)
	- [Personal Javascript Solution](#personal-javascript-solution)
	- [Flood Fill Algorithm](#flood-fill-algorithm)
	- [Forest Fire Algorithm](#forest-fire-algorithm)
	- [Extra Features Implemented](#extra-features-implemented)
	- [Input](#input)
	- [Removing Barren Land](#removing-barren-land)
	- [Output](#Output)
	- [Land Size](#land-size)

## Project Instructions
You have a farm of 400m by 600m where coordinates of the field are from (0, 0) to (399,
599). A portion of the farm is barren, and all the barren land is in the form of rectangles.
Due to these rectangles of barren land, the remaining area of fertile land is in no
particular shape. An area of fertile land is defined as the largest area of land that is not
covered by any of the rectangles of barren land.
Read input from STDIN. Print output to STDOUT

Input
You are given a set of rectangles that contain the barren land. These rectangles are
defined in a string, which consists of four integers separated by single spaces, with no
additional spaces in the string. The first two integers are the coordinates of the bottom
left corner in the given rectangle, and the last two integers are the coordinates of the
top right corner.

Output
Output all the fertile land area in square meters, sorted from smallest area to greatest,
separated by a space.

Sample Inputs

1. 0 292 399 307
2. 48 192 351 207,48 392 351 407,120 52 135 547,260 52 275 547

Sample Outputs

1. 116800 116800
2. 22816 192608

## Getting Started
You can view the project on [Git Hub Pages](https://keketz.github.io/target-tech-talent-day/)

or 

## Prerequisites
If you would like to run this project locally, you will need the following installed:
* Node
* Yarn

## Installing
* Open CMD and navigate to the project folder.
* Enter 'yarn' to install all dependencies locally
* Enter 'yarn start' and open your web browser to 'http://localhost:3000/'



## Built With
* react ^16.4.2 - JavaScript library for creating user interfaces.
* gh-pages ^1.2.0 - Publish files to a gh-pages branch on GitHub 
* jquery ^3.3.1 - Fast, small, and feature-rich JavaScript library
* jquery-ui-bundle ^1.12.1-migrate - 
* react-dom ^16.4.2 - DOM and server renderers for React
* react-router-dom ^4.3.1 - DOM bindings for React Router
* react-scripts 1.1.1 - Scripts and configuration used by Create React App

## Implementation
#### Personal Javascript Solution
The first solution I tried was my own which involved using javascripts array functions to filter, split, join, and push array values around. The solution worked for a small scale, but cause the website to overload at larger scales and crash. I tried the solution in java as well with similar results. Below is the solution:

```javascript
var land = this.state.land;
var plots = [];
for (var x = 0; x < land.length; x++) {
	for (var y = 0; y < land[x].length; y++) {
		if (land[x][y]) {plots.push(x + ' ' + y); }
	}
}

var filteredLand = [[plots[0]]];
plots.splice(0, 1);
for (x = 0; x < filteredLand.length; x++) {
	for (y = 0; y < filteredLand[x].length; y++) {
		filteredLand[x] = filteredLand[x].concat(plots.filter(plot =>
			(filteredLand[x][y].split(' ')[0] === plot.split(' ')[0] &&
			Math.abs(filteredLand[x][y].split(' ')[1] - plot.split(' ')[1]) === 1 ||
			Math.abs(filteredLand[x][y].split(' ')[0] - plot.split(' ')[0]) === 1 &&
			filteredLand[x][y].split(' ')[1] === plot.split(' ')[1])
		));

		filteredLand[x].forEach(plot =>
			(plots.indexOf(plot) !== -1) ? plots.splice(plots.indexOf(plot), 1) : null
		);
	}

	if (plots.length > 0) {
		filteredLand.push([plots[0]]);
		plots.splice(0, 1);
	}
}
```
#### Flood Fill Algorithm
After this I thought that maybe the solution used to fill areas in a paint program would be good. I found a wiki page explaining the [Flood Fill](https://en.wikipedia.org/wiki/Flood_fill) formula. I first tried the four-way Stack-based recursive implementation. Results were better than my original attempt but again a larger scale would be too much for the web app to handle. I built the solution in Java and received a stackOverflow Error.. If i increased the memory used for the solution to 10m, the results would display for a 400 by 600 area without any issues. But that memory requirement was only good for a 400 by 600 area and anything larger would result in a stackOverflow error again. This solution wasn’t exactly scaleable.

Flood-fill (node, target-color, replacement-color)
1. If target-color is equal to replacement-color, return.
2. If the color of node is not equal to target-color, return.
3. Set the color of node to replacement-color.
4. Perform Flood-fill (one step to the south of node, target-color, replacement-color).
5. Perform Flood-fill (one step to the north of node, target-color, replacement-color).
6. Perform Flood-fill (one step to the west of node, target-color, replacement-color).
7. Perform Flood-fill (one step to the east of node, target-color, replacement-color).
8. Return.

#### Forest Fire Algorithm
Next I tried an alternative flood fill algorithm sometimes called the ‘Forest Fire Algorithm’. A queue-based implementation similar to the recursive solution, except that it pushes nodes into a queue instead of using recursive calls. This solution worked for me and was scalable as far as I could tell. Javascript could handle it without any issues at 400 by 600 as well as at a greater scale 1000 x 1000. However, it is javascript starts to have trouble rendering the land area greater than a 1000 x 1000 area. This solution is not ideal for much larger scales and would require a scale limit.

Forest Fire Algorithm (node, target-color, replacement-color)
1. If target-color is equal to replacement-color, return.
2. If color of node is not equal to target-color, return.
3. Set Q to the empty queue.
4. Set the color of node to replacement - color.
5. Add node to the end of Q.
6. While Q is not empty:
7. Set n equal to the first element of Q.
8. Remove first element from Q.
9. If the color of the node to the west of n is target - color, set the color of that node to replacement - color and add that node to the end of Q.
10. If the color of the node to the east of n is target - color, set the color of that node to replacement - color and add that node to the end of Q.
11. If the color of the node to the north of n is target - color, set the color of that node to replacement - color and add that node to the end of Q.
12. If the color of the node to the south of n is target - color, set the color of that node to replacement - color and add that node to the end of Q.
13. Continue looping until Q is exhausted.
14. Return.

#### Extra Features Implemented
I added a few extra features I thought would be a nice addition to the solution using what I know. I’ve worked with react for the last year and thought react would be a fun inclusion to the case study to make it more interactive for the user.

#### Input
Originally, I had the input accept a JSON formatted string consisting of all the barren land areas then separating and parsing the information from there in one single go. This was faster, but it gave a lot of room for error. It was also very restrictive for the user. They would be limited to planning out their input and rereading it if there were any mistakes. So I switched to letting users input one area at a time. That allowed me to do a few interactive things as the user was inputting their areas. Each new barren land input would update the visual representation of the land. It would also update the fertile land area as new barren land was added or removed.

#### Removing Barren Land
Just below the input area is a list of all areas the user has already input. I thought it would be nice to give the user the option to remove areas at any time. If they hover over an area, the barren land is highlighted in both the list and the visual map. Removing the area will remove it from the map, the list, and update the available fertile land areas.

#### Output
The output area is just below the input area. It is listed in ascending order. The list updates as barren land is added or removed.

#### Land Size
I also added a way for users to update their land area. The land area will not update with a 0 or negative number, but it will update as the size is changed. The entered barren land will be cleared and the user will need to enter new areas.

Rajaram Shelar for their custom jQuery dialog box 'http://jsfiddle.net/eraj2587/Pm5Fr/14/'
