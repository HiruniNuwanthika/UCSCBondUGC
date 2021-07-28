import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {Bar} from 'react-chartjs-2';

const UniDataBarChart =() =>{
    const[ chartData, setChartData]= useState({});
  //  const[ universityCount, setUniversityCount] = useState({});

    const chart =() =>{
        let uniName =[];
        let uniCount =[];
        let uniActiveNames =[];
        let uniActiveCount =[];
        let uniActiveCount2 =[];
        let uniViolatedNames =[];
        let uniViolatedCount =[];
        let uniViolatedCount2 =[];
        let uniInactiveNames =[];
        let uniInactiveCount =[];
        let uniInactiveCount2 =[];

        axios
        .get('http://localhost/ugc/getUniversityCount.php')
        .then(response=>{
           // console.log('data')
           // console.log(response.data);
            for(const dataObj of response.data ){
                uniName.push(dataObj.university);
                uniCount.push(dataObj.count);
            }

           // console.log(uniName, uniCount);

            return axios.get('http://localhost/ugc/getUniversityActiveCount.php')
        })
        .then(response =>{
          for(const dataObj of response.data ){
            uniActiveNames.push(dataObj.university);
            uniActiveCount.push(dataObj.activeCount);
        }

            for(let i = 0; i < uniActiveNames.length; i++ ){
                let ii = uniName.indexOf(uniActiveNames[i])
                uniActiveCount2.length=uniName.length;
                uniActiveCount2[i]=uniActiveCount[ii];
            }
        
            return axios.get('http://localhost/ugc/getUniversityViolatedCount.php')
        })
        .then(response =>{    
        for(const dataObj of response.data ){
            uniViolatedNames.push(dataObj.university);
            uniViolatedCount.push(dataObj.violatedCount);
        }

        for(let i = 0; i < uniViolatedNames.length; i++ ){
            let ii = uniName.indexOf(uniViolatedNames[i])
            uniViolatedCount2.length=uniName.length;
            uniViolatedCount2[ii]=uniViolatedCount[i];
            
        }

        return axios.get('http://localhost/ugc/getUniversityInactiveCount.php')
    })
    .then (response =>{
        for(const dataObj of response.data ){
            uniInactiveNames.push(dataObj.university);
            uniInactiveCount.push(dataObj.inactiveCount);
        }

        for(let i = 0; i < uniInactiveNames.length; i++ ){
            let ii = uniName.indexOf(uniInactiveNames[i])
            uniInactiveCount2.length=uniName.length;
            uniInactiveCount2[ii]=uniInactiveCount[i];
            
        }
            setChartData({
                labels:uniName,
                datasets: [
                    {
                        label:'Total bonds',
                        data:uniCount,
                        backgroundColor:[
                            'rgba(10, 219, 219,0.5)'
                        ],
                        borderColor:[
                            'rgba(10, 219, 219,1)'
                        ],
                        borderWidth:2
                    },
                    {
                        label:'Total Active bonds',
                        data:uniActiveCount2,
                        backgroundColor:[
                            'rgba(10, 219, 111,0.5)'
                        ],
                        borderColor:[
                            'rgba(10, 219, 111,1)'
                        ],
                        borderWidth:2
                    },
                    {
                        label:'Total Violated bonds',
                        data:uniViolatedCount2,
                        backgroundColor:[
                            'rgba(238, 92, 95,0.5)'
                        ],
                        borderColor:[
                            'rgba(238, 92, 95,1)'
                        ],
                        borderWidth:2
                    },
                    {
                        label:'Total Inactive bonds',
                        data:uniInactiveCount2,
                        backgroundColor:[
                            'rgba(181, 170, 170,0.5)'
                        ],
                        borderColor:[
                            'rgba(181, 170, 170,1)'
                        ],
                        borderWidth:2
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
            <div style={{textAlign:'center'}}>
                <h2>Universty Wise Total Bonds</h2>
            </div>
            <div>
                <Bar    data={chartData} 
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
                            //title:{text:"jvhjjhj", display:true},
                            scales:{
                                x: {
                                    display: false
                                },
                                y: {
                                    display: true,
                                    ticks:{
                                        beginAtZero: true
                                    }   
                                }
                            }
                          
                        }}/>
            </div>
        </div>
    )
}

export default UniDataBarChart;