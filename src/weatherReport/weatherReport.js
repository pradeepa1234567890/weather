import React, { Component } from 'react';
import axios from "axios";
class weatherReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
           dropdowndata:[],
           weather_report:[]
        }       
    }

    componentDidMount(){
        axios.get("data/city_list.json")
        .then((res) => {
            this.setState({
                dropdowndata:res.data 
            })
       })
      .catch((error) => {
            return error;
        });
    }
    handaleChange=(data)=>{
        axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${data.target.value}&appid=63e8abae923af02e78dcfe5f23c972bd`)
        .then((res) => {
            this.setState({
                weather_report:res.data.list 
            },()=>console.log(this.state.weather_report))
       })
      .catch((error) => {
            return error;
        });
    }
    render() {
        return (
            <div>
               <h1>Weather Report </h1>
               <br/>
              <span>City Name</span> <select name="city" id="citys" onChange={(e)=>this.handaleChange(e)}>
                   {
                     this.state.dropdowndata && this.state.dropdowndata.map((val, i) => {
                        return (
                        <option value={val.name} >{val.name}</option>
                        )})
                   }
                </select>
                <br/><br/>
                <h3>Report</h3>
                <br/>
                <div  style={{"padding" : "10px"}}> <span style={{"paddingLeft" : "90px"}}>Time</span> <span style={{"paddingLeft" : "68px"}}>Description</span></div>
                {
                    this.state.weather_report &&  this.state.weather_report.map((val, i) => {
                        return (
                            <>
                            <div style={{"padding" : "10px"}}>
                                <span style={{"padding" : "20px"}}>
                                {val.dt_txt}
                                    </span>
                                  
                                    <span>
                                        {val.weather[0].description}
                                    </span>
                                </div>
                            </>
                            )})
                       }
            </div>
        );
    }
}

export default weatherReport;