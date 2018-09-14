import React, { Component } from 'react';
import '../StyleSheets/BarrenLandAnalysis.css';
import { ShowDialogBox } from './CustomDialog';

var landLength = 600;
var landWidth = 400;

var multiplier= 0.8333333333;

class BarrnLandAnalysis extends Component {
    constructor(props) {
        super(props);
        
        //'["0 292 399 307"]'     '["48 192 351 207","48 392 351 407","120 52 135 547","260 52 275 547"]'

        this.state = {
            land: this.SetupDefaultLand(400, 600), 
            barrenLand: []
        };
    }

    SetupDefaultLand(landWidth, landLength) {
        var land = [];
        for (var x = 0; x < landWidth; x++) {
            land[x] = [];
            for (var y = 0; y < landLength; y++) {
                land[x][y] = 0;
            }
        }
        return land;
    }

    /*
    FloodFill(land, x, y, prevC, newC) {
        // Base cases
        if (x < 0 || x >= landWidth || y < 0 || y >= landLength) { return; }
        if (land[x][y] !== prevC) { return; }

        land[x][y] = newC;

        // Recur for north, east, south and west
        this.FloodFill(land, x + 1, y, prevC, newC);
        this.FloodFill(land, x - 1, y, prevC, newC);
        this.FloodFill(land, x, y + 1, prevC, newC);
        this.FloodFill(land, x, y - 1, prevC, newC);
    }

    AreaOfPlots(land) {
        var plots = {0: 0, 1: 0, 2: 0, 3: 0};
        for (var x = 0; x < landWidth; x++) {
            for (var y = 0; y < landLength; y++) {
                plots[land[x][y]] += 1;
            }
        }
        return plots;
    }

    FloodFillAlgorithm() { 
        var newCounter = 2;
        for (var x = 0; x < landWidth; x++) {
            for (var y = 0; y < landLength; y++) {
                if (this.state.land[x][y] === 0) {
                    this.FloodFill(this.state.land, x, y, this.state.land[x][y], newCounter);
                    newCounter++;
                }
            }
        }

        console.log(this.AreaOfPlots(this.state.land));
    }
    */

    //Less expeensive algoithm to check for adjacent plots.
    ForestFireAlgorithm(land, x, y, targetPlot, newPlot) {
        if (targetPlot === newPlot) { return; }         //1. If target-color is equal to replacement-color, return
        if (land[x][y] !== targetPlot) { return; }      //2. If color of node is not equal to target-color, return.
        var queue = [];	                                //3. Set Q to the empty queue.
        land[x][y] = newPlot;   	                    //4. Set the color of node to replacement-color.
        queue.push({ x: x, y: y });                     //5. Add node to the end of Q.
        while (queue.length > 0) {  	                //6. While Q is not empty:
            var n = queue[0];                           //7.     Set n equal to the first element of Q.
            queue.splice(0, 1);                         //8.     Remove first element from Q.
            if (n.x > 0) {
                if (land[n.x - 1][n.y] === targetPlot) {//9.     If the color of the node to the west of n is target - color, set the color of that node to replacement - color and add that node to the end of Q.
                    land[n.x - 1][n.y] = newPlot;
                    queue.push({ x: n.x - 1, y: n.y });
                }
            }
            if (n.x < landWidth - 1) {
                if (land[n.x + 1][n.y] === targetPlot) {//10.     If the color of the node to the east of n is target - color, set the color of that node to replacement - color and add that node to the end of Q.
                    land[n.x + 1][n.y] = newPlot;
                    queue.push({ x: n.x + 1, y: n.y });
                }
            }
            if (n.y < landLength - 1) {
                if (land[n.x][n.y + 1] === targetPlot) {//11.     If the color of the node to the north of n is target - color, set the color of that node to replacement - color and add that node to the end of Q.
                    land[n.x][n.y + 1] = newPlot;
                    queue.push({ x: n.x, y: n.y + 1 });
                }
            }
            if (n.y > 0) {
                if (land[n.x][n.y - 1] === targetPlot) {//12.     If the color of the node to the south of n is target - color, set the color of that node to replacement - color and add that node to the end of Q.
                    land[n.x][n.y - 1] = newPlot;
                    queue.push({ x: n.x, y: n.y - 1 });
                }
            }
        }
        return land;
    }

    //This checks if a plot is within another intersecting barren area before setting it to fertile. If it is, nothing is changed at this plot.
    PlotIsWithinBarrenLand(barrenLand, x, y) {
        for (var p = 0; p < barrenLand.length; p++) {
            var coords = barrenLand[p].split(" ");
            if (x >= parseInt(coords[0], 10) &&
                x <= parseInt(coords[2], 10) &&
                y >= parseInt(coords[1], 10) &&
                y <= parseInt(coords[3], 10)) {
                return true;
            }
        }

        return false;
    }

    //Checks input for any errors and if it is a valid input. 
    IsValidInput(plot) {
        var barrenLand = this.state.barrenLand;
        if (barrenLand.indexOf(plot) > -1) { ShowDialogBox('Invalid Input', 'Area already exists.', 'Ok', '', 'GoToAssetList', null); return false; }  //alert("Invalid Input: Area already exists.");

        var c = plot.split(" ");
        if (c.length !== 4) { alert("Invalid Input: Input requires four numbers seperated by a space."); return false;}
        if (isNaN(c[0]) || isNaN(c[1]) || isNaN(c[2]) || isNaN(c[3])) { alert("Invalid Input: Input is not a number."); return false; }
        if (parseInt(c[0], 10) >= parseInt(c[2], 10) || parseInt(c[1], 10) >= parseInt(c[3], 10)) { alert("Invalid Input: Bottom Left X, Bottom Left Y, Top Right X, Top Right Y."); return false;}
        if (parseInt(c[0], 10) < 0 || parseInt(c[1], 10) < 0 || parseInt(c[2], 10) >= landWidth || parseInt(c[3], 10) >= landLength) { alert("Invalid Input: Input exceeds farm area."); return false; }
        return true;
    }

    //When a plot coordinate is added to the Barren Land List
    AddBarrenLand() {
        var barrenLand = this.state.barrenLand;
        var land = this.state.land;

        var plot = document.getElementById("BarrenLandAreaInput").value;
        if (this.IsValidInput(plot)) {
            barrenLand.push(plot);
            var coords = plot.split(" ");
            for (var x = parseInt(coords[0], 10); x <= parseInt(coords[2], 10); x++) {
                for (var y = parseInt(coords[1], 10); y <= parseInt(coords[3], 10); y++) {
                    land[x][y] = 1;
                }
            }
            this.setState({ barrenLand: barrenLand, land: land });
        }
    }

    //When a plot coordinate is removed from the Barren Land List
    RemoveBarrenLand(e) {
        var barrenLand = this.state.barrenLand;
        var land = this.state.land;

        var plot = e.target.id;
        barrenLand.splice(barrenLand.indexOf(plot), 1);

        var coords = plot.split(" ");
        for (var x = parseInt(coords[0], 10); x <= parseInt(coords[2], 10); x++) {
            for (var y = parseInt(coords[1], 10); y <= parseInt(coords[3], 10); y++) {
                if (!this.PlotIsWithinBarrenLand(barrenLand, x, y)) { land[x][y] = 0; }
            }
        }

        this.setState({ barrenLand: barrenLand, land: land });
    }

    //Highlights visual Plot when mouse moves over plot coordinates in the barren land list
    HighlightBarrenLand(e) {
        if (e.target.className === "BarrenLandListItem" || e.target.parentElement.className === "BarrenLandListItem") {
            var id;
            e.target.className === "BarrenLandListItem" ? id = e.target.id : id = e.target.parentElement.id;
            document.getElementById(id + "Plot").style.backgroundColor = "#A8A359";
        }
    }

    //Returns visual Plot to unhighlighted color when mouse moves off plot coordinates in the barren land list
    UnHighlightBarrenLand(e) {
        if (e.target.className === "BarrenLandListItem" || e.target.parentElement.className === "BarrenLandListItem") {
            var id;
            e.target.className === "BarrenLandListItem" ? id = e.target.id : id = e.target.parentElement.id;
            document.getElementById(id + "Plot").style.backgroundColor = "#56290A";
        }
    }

    //Allows the user to set land area
    SetLandArea() {
        var width = parseInt(document.getElementById("BarrenLandWidthInput").value, 10);
        var length = parseInt(document.getElementById("BarrenLandLengthInput").value, 10);

        multiplier = 1;

        if (width > 575) { multiplier = 575/width; }
        if (length > 500 && length > width) { multiplier = 500/length; }

        width > 0 ? landWidth = width : null;
        length > 0 ? landLength = length : null;
        
        console.log(landWidth + " X " + landLength);
        this.setState({ land: this.SetupDefaultLand(landWidth, landLength), barrenLand: [] });
    }

    //Counts the number of adjacent fertile lands and returns the area of each sorted from least to greatest.
    RenderFertileLandAreas() {
        var land = JSON.parse(JSON.stringify(this.state.land)); //Copt of Land array, not a reference. 
        var newPlot = 2; //First group number set.
        var plots = [];

        //Starting at plot 0,0.
        //This will itterate through until a fertile plot is found. 
        //That fertile plot will then be sent to the ForestFireFillAlgorithm where it and all adjacent plots are set to a newPlot group number.
        //A newPlot group number is set and the itteration continues until all fertile plots have been assigned a group number
        //0 = unsigned fertile plots, 1 = barren plots, 2 and above = assigned fertile plot group numbers
        for (var x = 0; x < landWidth; x++) {
            for (var y = 0; y < landLength; y++) {
                if (land[x][y] === 0) {
                    land = this.ForestFireAlgorithm(land, x, y, 0, newPlot);
                    newPlot++;
                }
                plots[land[x][y]] === undefined ? plots[land[x][y]] = 1 : plots[land[x][y]] += 1; //Counts how many plots there are in each group. 
            }
        }        
        plots.splice(0, 2); //Removes the first two groups, 0 and 1, leaving the group assigned fertile plots to be sorted least to greatest below. 
        plots.sort(function sortNumber(a, b) { return a - b; });

        return <label>{plots.join()}</label>;
    }

    //Interactive list to view, highlight, or remove added areas of barren land.
    RenderBarrenLandList() {
        var list = [];
        var barrenLand = this.state.barrenLand;
        for (var i = 0; i < barrenLand.length; i++){
            list.push(
                <tr className="BarrenLandListItem" id={barrenLand[i] + "Div"} key={i} onMouseOver={this.HighlightBarrenLand.bind(this)} onMouseLeave={this.UnHighlightBarrenLand.bind(this)}>
                    <td onMouseOver={this.HighlightBarrenLand.bind(this)} onMouseLeave={this.UnHighlightBarrenLand.bind(this)}>{barrenLand[i]}</td>
                    <td className="BarrenLandButton" id={barrenLand[i]} onClick={this.RemoveBarrenLand.bind(this)} onMouseOver={this.HighlightBarrenLand.bind(this)} onMouseLeave={this.UnHighlightBarrenLand.bind(this)}>REMOVE</td>
                </tr>);
        }

        return<tbody>{list}</tbody>;
    }

    //Visual representation of the barren land user inputs.
    RenderBarrenLandArea() {
        var barrenLand = this.state.barrenLand;
        var plots = [];
        for (var i = 0; i < barrenLand.length; i++) {
            var coords = barrenLand[i].split(" ");
            plots.push(<div className="BarrenLandAreaDiv" id={barrenLand[i] + "DivPlot"} key={i} style={{ left: coords[0] * multiplier + "px", bottom: coords[1] * multiplier + "px", width: (coords[2] - coords[0] + 1) * multiplier + "px", height: (coords[3] - coords[1] + 1) * multiplier + "px" }} />);
        }
        return plots;
    }

    render() {
        return (
            <div className="BarrenLandAnalysisContainer">
                <h1>Barren Land Analysis</h1>

                {this.RenderFertileLandAreas(this)}

                <div className="BarrenLandUXControl">
                    <table style={{width: '225px'}}>
                        <thead>
                            <tr>
                                <th style={{ width: '160px' }}><input className="BarrenLandInput" id="BarrenLandAreaInput" placeholder="0 292 399 307" type="text" onKeyDown={function (e) { if (e.keyCode === 13) { document.getElementById("AddBarrenLandBtn").click(); } }} /></th>
                                <th><button className="BarrenLandButton" id="AddBarrenLandBtn" onClick={this.AddBarrenLand.bind(this)}>ADD</button></th>
                            </tr>
                        </thead>
                        {this.RenderBarrenLandList(this)}
                    </table>
                    <div style={{ flex: '1', marginLeft: '5px'}}>
                        <div style={{ margin: '5px' }}>
                            <input className="BarrenLandInput" id="BarrenLandWidthInput" placeholder="WIDTH" type="number" /> X <input className="BarrenLandInput" id="BarrenLandLengthInput" placeholder="LENGTH" type="number" />
                            <button className="BarrenLandButton" onClick={this.SetLandArea.bind(this)} style={{ marginLeft: '5px'}}>SAVE</button>
                        </div>
                        <div className="LandGraph" style={{ width: landWidth * multiplier + 'px', height: landLength * multiplier + 'px'}}>
                            {this.RenderBarrenLandArea(this)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default BarrnLandAnalysis;
