import React, { Component } from 'react';
import '../StyleSheets/BarrenLandAnalysis.css';

class BarrnLandAnalysis extends Component {
    constructor(props) {
        super(props);

        var land = [];
        var landLength = 60;
        var landWidth = 40;
        for (var x = 0; x < landWidth; x++) {
            land[x] = [];
            for (var y = 0; y < landLength; y++) {
                land[x][y] = true;
            }
        }

        this.state = {
            land: land,
            testInput: '["0 20 39 20"]'//'["0 292 399 307"]'//'["48 192 351 207","48 392 351 407","120 52 135 547","260 52 275 547"]'
        };
    }

    SubmitBarrenLandCoordiantes() {
        var coordinates = JSON.parse(document.getElementById("BarrenLandInput").value);
        var land = this.state.land;        

        for (var c = 0; c < coordinates.length; c++) {
            var coords = coordinates[c].split(" ");
			for (var x = coords[0]; x <= coords[2]; x++) {
				for (var y = coords[1]; y <= coords[3]; y++) {
					land[x][y] = false;
				}
			}
        }
        //console.log( land);
        //this.setState({ land: land });

        this.RenderFertileLandArea(land);
    }    


    RenderFertileLandArea() {
        var land = this.state.land;        

        var plots = [];
        //land.forEach(plot => (plot.land === 'fertile') ? plots.push(plot.x + " " + plot.y) : null);
        for (var x = 0; x < land.length; x++) {
            for (var y = 0; y < land[x].length; y++) {
                if (land[x][y]) { plots.push(x + " " + y); }
            }
        }

        var filteredLand = [[plots[0]]];
        plots.splice(0, 1);
        for (x = 0; x < filteredLand.length; x++) {
            for (y = 0; y < filteredLand[x].length; y++) {
                //console.log(x + " " + y);
                filteredLand[x] = filteredLand[x].concat(plots.filter(plot =>
                    (filteredLand[x][y].split(" ")[0] === plot.split(" ")[0] && Math.abs(filteredLand[x][y].split(" ")[1] - plot.split(" ")[1]) === 1 ||
                        Math.abs(filteredLand[x][y].split(" ")[0] - plot.split(" ")[0]) === 1 && filteredLand[x][y].split(" ")[1] === plot.split(" ")[1])
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
        console.log(filteredLand);
    }   

    render() {
        return (
            <div className="BarrenLandAnalysis">            
                <h1>BarrenLandAnalysis</h1>
                <input id='BarrenLandInput' type='text' placeholder='Enter Barren Land Coordinates' value={this.state.testInput}/><button onClick={this.SubmitBarrenLandCoordiantes.bind(this)}>Submit</button>
                <div className="LandGraph">
                    {/*this.RenderFertileLandArea(this)*/}
                </div>
            </div>
        );
    }
}



export default BarrnLandAnalysis;
