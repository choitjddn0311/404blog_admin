// import React from "react";
// import styled from "styled-components";

// const Body = styled.div`
//     width: ${(props) => (props.isOpen ? "calc(100% - 250px)" : "calc(100% - 100px)")};
//     height: 100vh;
//     background: #eee;
//     padding: 10px;
// `;

// const MainDashBoard = ({isOpen}) => {
//     return (
//         <>
//             <Body isOpen={isOpen}>
//                 <h1>대시보드</h1>
//             </Body>
//         </>
//     )
// }

// export default MainDashBoard;


import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

export function Charts() {
  return <Doughnut data={data} />;
}

