// import React, {useRef,useEffect, useState} from "react";
// // useReft는 내부에 있는 값을 변경해도 제 랜더링이 되지않기에 용이함
// import styled from "styled-components";
// import ApexCharts from 'apexcharts';
// import axios from 'axios';

// const Body = styled.div`
//     width: ${(props) => (props.isOpen ? "calc(100% - 250px)" : "calc(100% - 100px)")};
//     height: 100vh;
//     background: #eee;
//     padding: 10px;
//     overflow-y: scroll;
// `;

// const ChartContainer = styled.div`
//   width: ${(props) => (props.isOpen ? "calc(100% - 250px)" : "calc(100% - 100px)")};
//   height: 80%;
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: start;
//   align-items: center;
// `

// const DonutChart = styled.div`
//   width: 40%;
//   height: 40%;
//   padding: 10px;
// `


// const MainDashBoard = ({isOpen}) => {
//   const chartRef = useRef(null);
//   const [chart, setChart] = useState(null);

//   useEffect(() => {
//     const ChartData = async () => {
//       try {
//         const res = await axios.get(`${process.env.REACT_APP_API_URL}/admin/genderAmount`);
//         const {male, female, otherCount} = res.data;

//         console.log(male,female,otherCount)
      
//         const options = {
//           chart: {
//             type: 'donut'
//           },
//           series: [male,female,otherCount],
//           labels: ['남성','여성','기타'],
//           plotOptions: {
//             pie: {
//               donut: {
//                 background: '#eee',
//                 labels: {
//                   show: true,
//                   name: {
//                     show: true,
//                     // color: '#aaa'
//                   },
//                   value: {
//                     show: true,
//                     color: '#111'
//                   },
//                   total: {
//                     show: true,
//                     label: '총 회원 수',
//                     color: '#111',
//                     fontWeight: 'bold',
//                     fontSize: '20px'
//                   }
//                 }
//               }
//             }
//           },
//           responsive: [{
//             breakpoint: 480,
//             options: {
//               chart: {
//                 width: 200
//               },
//               legend: {
//                 position: 'bottom'
//               }
//             }
//           }]
//         };

//         if (chartRef.current) {
//         const newChart = new ApexCharts(chartRef.current, options);
//         newChart.render();
//         setChart(newChart);
//       } else {
//         console.error("chartRef.current is not available");
//       }
      
//         const newChart = new ApexCharts(chartRef.current, options);
//         newChart.render();
//         setChart(newChart);
//       } catch(err) {
//         console.error(err);
//       }
//     };

//     ChartData();

//     return () => {
//       // 라이브러리 함수로 차트의 인스턴스를 정리 후 이벤트 리스너 제거
//       if(chart) {
//         chart.destroy();
//         setChart(null)
//       }
//     }
//   }, [])

//     return (
//         <>
//             <Body isOpen={isOpen}>
//                 <h1>대시보드</h1>
//                 <ChartContainer>
//                   <DonutChart ref={chartRef}></DonutChart>
//                 </ChartContainer>
//             </Body>
//         </>
//     )
// }

// export default MainDashBoard;

import React, {useRef,useEffect, useState} from "react";
// // useReft는 내부에 있는 값을 변경해도 제 랜더링이 되지않기에 용이함
import styled from "styled-components";

const MainDashBoard = () => {
  return (
    <>
      <h1>대시보드 실패</h1>
    </>
  ) 
}

export default MainDashBoard;