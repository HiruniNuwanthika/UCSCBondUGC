import React, {Component} from "react";
import UniDataBarChart from './UniDataBarChart';
import StatusWisePieChart from "./StatusWisePieChart";


export default class Reports extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>.
                <div>
                    <UniDataBarChart/>
                </div>
                <br></br>
                <div>
                    <StatusWisePieChart/>
                </div>
             </div>
            
            
        )
    }
}