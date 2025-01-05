'use client'
import { Chart as ChartJS, ArcElement, Legend, Tooltip } from 'chart.js';
import React from 'react'
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend)

const DoughtnutChart = ({accounts} : DoughnutChartProps) => {
    const data = {
        datasets : [
            {
                label: 'banks',
                data: [1250, 2500],
                backgroundColor : [`#0747b6`, '#2265d8', '#2f91fa']
            }
        ],
        labels: ['Bank1','Bank2','Bank3']
    }
    return (
            <Doughnut data={data} options={{
                cutout: '60%',
                plugins: {
                    legend:{
                        display: false
                    }
                }
            }}/>
    )
}

export default DoughtnutChart