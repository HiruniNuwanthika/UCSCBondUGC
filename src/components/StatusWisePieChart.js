import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {Pie} from 'react-chartjs-2';

const StatusWisePieChart =() =>{
    const[ chartData, setChartData]= useState({});
  //  const[ universityCount, setUniversityCount] = useState({});


  function getRandomColor() {
    let color1 =Math.floor((Math.random() * 890) + 1);
    let color2 =Math.floor((Math.random() * 999) + 1);
    let color3 =Math.floor((Math.random() * 991) + 1);
    let rgbArray =[color1, color2, color3];
    let str='';
    str += 'rgb(' +  rgbArray[0].toString()+','+ rgbArray[1].toString()+',' + rgbArray[2].toString() +')';
    return str;
  }

    function createColorArray(count){
        let colorArray = [];
        for(let i=0;i<count.length;i++){
            let color=getRandomColor();
            colorArray.push(color);
    }
    return colorArray; 
}


    const chart =() =>{
        let status =[];
        let count =[];

        axios
        .get('http://192.168.22.130/getByStatus.php')
        .then(response=>{
           // console.log('data')
           // console.log(response.data);
            for(const dataObj of response.data ){
                status.push(dataObj.status);
                count.push(dataObj.count);
            }
            console.log(status, count);
            setChartData({
                labels:status,
                datasets: [
                    {
                        label:'Total bonds',
                        data:count,
                        backgroundColor: createColorArray(count),
                        borderColor:[
                            'gray'
                        ],
                        borderWidth:1
                    }
                ]
            })
        
            
        })

           
        .catch(function(error){
            console.log(error);
        })
      //  console.log('dataaaaa===.>');
      //  console.log(uniName,uniCount);
    }

    useEffect(() =>{
        chart()
    },[])
    return(
        <div className="charts">
            <div style={{textAlign:'center', }}>
                <h2>Status Wise Total Bonds</h2>
            </div>
            <div>
                <Pie    data={chartData} 
                        height={400}
                        width={600}
                        options={{
                            plugins: {
                                legend: {
                                    labels: {
                                        // This more specific font property overrides the global property
                                        font: {
                                            size: 14,
                                            family:'monospace'
                                        }
                                    }
                                }
                            },
                            maintainAspectRatio: false, 
                            resposive:true,
                            scales:{ticks:{
                                display: false,
                                maxTicksLimit: 0
                            },
                            x: {
                                display: false,
                                ticks:{
                                    display: false
                                }
                            },
                            y: {
                                display: false,
                                ticks:{
                                    display: false
                                },   
                            }
                        }
                          
                        }}/>
            </div>
        </div>
    )
}

export default StatusWisePieChart;