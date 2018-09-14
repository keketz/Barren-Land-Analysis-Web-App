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
You can view the project on [Git Hub Pages]('https://keketz.github.io/target-tech-talent-day/)

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
[Flood Fill wiki page](https://en.wikipedia.org/wiki/Flood_fill) listed a few pseudocode solutions. I tried a few after my initial solution destroyed everything in its path.
* First tired the Stack-based recursive implementation(four-way). Results were better but it crashed with a larger area due to a StackOverflowError. Java was able to handle this algorithm but required more memory. Javascript could not.
* Then the Forest Fire Algorithm which uses a loop to iterate through a queue of plots. I modified this version to group all adjacent plots and assign each a group number.

Forest Fire Algorithm (node, target-color, replacement-color):
  1. If target-color is equal to replacement-color, return.
  2. If color of node is not equal to target-color, return.
  3. Set Q to the empty queue.
  4. Set the color of node to replacement-color.
  5. Add node to the end of Q.
  6. While Q is not empty:
  7. Set n equal to the first element of Q.
  8. Remove first element from Q.
  9. If the color of the node to the west of n is target-color, set the color of that node to replacement-color and add that node to the end of Q.
 10. If the color of the node to the east of n is target-color, set the color of that node to replacement-color and add that node to the end of Q.
 11. If the color of the node to the north of n is target-color, set the color of that node to replacement-color and add that node to the end of Q.
 12. If the color of the node to the south of n is target-color, set the color of that node to replacement-color and add that node to the end of Q.
 13. Continue looping until Q is exhausted.
 14. Return.

Rajaram Shelar for their custom jQuery dialog box 'http://jsfiddle.net/eraj2587/Pm5Fr/14/'


