import React, { Component } from 'react';
import '../StyleSheets/BarrenLandAnalysis.css';
import { ShowDialogBox } from './CustomDialog';

var multiplier= 0.8333333333;

class BarrnLandAnalysis extends Component {
    constructor(props) {
        super(props);
        
        //'["0 292 399 307"]'     '["48 192 351 207","48 392 351 407","120 52 135 547","260 52 275 547"]'

        this.state = {
            land: this.SetupDefaultLand(400, 600), 
            barrenLand: [],
            landWidth: 400,
            landLength: 600,            
            landWidthValue: "400",
            landLengthValue: "600"
        };
    }

    onChange(changeValue, e) {
        var value = e.target.value;
        if (changeValue === 'width') {
            if (value > 0) {
                this.setState({ landWidth: value, landWidthValue: value, land: this.SetupDefaultLand(value, this.state.landLength), barrenLand: [] });
                if (value < 500 && value >= this.state.landLength) {
                    multiplier = 1;
                }
                else if (value > 500 && value >= this.state.landLength) {
                    multiplier = 500 / value;
                }
            }
            else if (value > -1 || value === "" || value === 0) {
                this.setState({ landWidthValue: value});
            }
        }
        else if (changeValue === 'length') {
            if (value > 0) {
                this.setState({ landLength: value, landLengthValue: value, land: this.SetupDefaultLand(this.state.landWidth, value), barrenLand: [] });  
                if (value < 500 && value >= this.state.landWidth) {
                    multiplier = 1;
                }
                else if (value > 500 && value >= this.state.landWidth) {
                    multiplier = 500 / value;
                }
            }
            else if (value > -1 || value === "" || value === 0) {
                this.setState({ landLengthValue: value });
            }
        }
    }

    SetupDefaultLand(width, length) {
        var land = [];
        for (var x = 0; x < width; x++) {
            land[x] = [];
            for (var y = 0; y < length; y++) {
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
            if (n.x < this.state.landWidth - 1) {
                if (land[n.x + 1][n.y] === targetPlot) {//10.     If the color of the node to the east of n is target - color, set the color of that node to replacement - color and add that node to the end of Q.
                    land[n.x + 1][n.y] = newPlot;
                    queue.push({ x: n.x + 1, y: n.y });
                }
            }
            if (n.y < this.state.landLength - 1) {
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
        if (barrenLand.indexOf(plot) > -1) { ShowDialogBox('Invalid Input', 'Area already exists.'); return false; }  //alert("Invalid Input: Area already exists.");

        var c = plot.split(" ");
        if (c.length !== 4) { ShowDialogBox('Invalid Input', "Input requires four numbers seperated by a space."); return false;}
        if (isNaN(c[0]) || isNaN(c[1]) || isNaN(c[2]) || isNaN(c[3])) { ShowDialogBox('Invalid Input', "Input is not a number."); return false; }
        if (parseInt(c[0], 10) >= parseInt(c[2], 10) || parseInt(c[1], 10) >= parseInt(c[3], 10)) { ShowDialogBox('Invalid Input', "Input does not contain the bottom left and the top right coordinates in the correct order. Each number is seperated by a space and contains the Bottom Left X, Bottom Left Y, Top Right X, Top Right Y."); return false;}
        if (parseInt(c[0], 10) < 0 || parseInt(c[1], 10) < 0 || parseInt(c[2], 10) >= this.state.landWidth || parseInt(c[3], 10) >= this.state.landLength) { ShowDialogBox('Invalid Input', "Input exceeds farm area."); return false; }
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
            document.getElementById(id + "Plot").style.backgroundColor = "#D72E10";
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
        for (var x = 0; x < this.state.landWidth; x++) {
            for (var y = 0; y < this.state.landLength; y++) {
                if (land[x][y] === 0) {
                    land = this.ForestFireAlgorithm(land, x, y, 0, newPlot);
                    newPlot++;
                }
                plots[land[x][y]] === undefined ? plots[land[x][y]] = 1 : plots[land[x][y]] += 1; //Counts how many plots there are in each group. 
            }
        }        
        plots.splice(0, 2); //Removes the first two groups, 0 and 1, leaving the group assigned fertile plots to be sorted least to greatest below. 
        plots.sort(function sortNumber(a, b) { return a - b; });

        var list = [];
        plots.forEach(plot => list.push(<li>{plot}</li>));
        //plots.join()
        return <ul className="FertileLandList" style={{ width: '240px', height: '150px', overflowY: 'auto' }}>{list}</ul>;
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

        return <tbody>{list}</tbody>;
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
                <p style={{fontSize: '11px'}}>Input each barren land area as a string consisiting of 4 numbers seperated by a space. The numbers represent the Bottom Left X, Bottom Left Y, Top Right X, and Top Right Y coordinates of an area. Example: 0 292 399 307. Entered areas will be listed and rendered in the land area. The results will list the area of adjacent fertile plots in ascending order.</p>

                <div className="BarrenLandUXControl">
                    <div>
                        <h3>Barren Land</h3>
                        <table style={{width: '225px'}}>
                            <thead>
                                <tr>
                                    <th style={{ width: '160px' }}><input className="BarrenLandInput" id="BarrenLandAreaInput" placeholder="Barren Land Coordinates" type="text" onKeyDown={function (e) { if (e.keyCode === 13) { document.getElementById("AddBarrenLandBtn").click(); } }} /></th>
                                    <th><button className="BarrenLandButton" id="AddBarrenLandBtn" onClick={this.AddBarrenLand.bind(this)}>ADD</button></th>
                                </tr>
                            </thead>
                                                   
                        </table>

                        <div style={{ width: '240px', height: '150px', overflowY: 'auto' }}>
                            <table style={{ width: '225px' }}>
                                 {this.RenderBarrenLandList(this)}                                                  
                            </table>
                        </div>

                        <h3>Fertile Land</h3>
                        {this.RenderFertileLandAreas(this)}
                    </div>
                    <div style={{ flex: '1', marginLeft: '5px'}}>
                        <div style={{ margin: '5px' }}>
                            <input className="BarrenLandInput" id="BarrenLandWidthInput" placeholder="WIDTH" type="number" value={this.state.landWidthValue} onChange={this.onChange.bind(this, "width")} /> X <input className="BarrenLandInput" id="BarrenLandLengthInput" placeholder="LENGTH" type="number" value={this.state.landLengthValue} onChange={this.onChange.bind(this, "length")}/>
                        </div>
                        <div className="LandGraph" style={{ width: this.state.landWidth * multiplier + 'px', height: this.state.landLength * multiplier + 'px'}}>
                            {this.RenderBarrenLandArea(this)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default BarrnLandAnalysis;
