import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
import React from 'react';
import DataTable from 'react-data-table-component';
import 'bootstrap/dist/css/bootstrap.min.css';

// const ContextDetails = () => {
//   const data = [
//     {
//       label: 'Email',
//       value: 'johndoe@acme.com',
//     },
//     {
//       label: 'Signup',
//       value: '01.01.2023',
//     },
//     {
//       label: 'Last Interaction',
//       value: '40 minutes ago',
//     },
//     {
//       label: 'Web Session',
//       value: 63,
//     },
//     {
//       label: 'First Interaction',
//       value: '4 months ago',
//     },
//     {
//       label: 'Language',
//       value: 'en-US',
//     },
//     {
//       label: 'Browser',
//       value: 'Chrome',
//     },
//   ];

//   const columns = [
//     {
//       name: '',
//       selector: row => row.label,
//       cell: row => <span className="text-muted font-weight-bold">{row.label}</span>,
//     },
//     {
//       name: '',
//       selector: row => row.value,
//     },
//   ];

//   return (
//     <div className="container mt-4">
//       <DataTable
//         columns={columns}
//         data={data}
//         noHeader
//         pointerOnHover
//         highlightOnHover
//         customStyles={customStyles}
//       />
//     </div>
//   );
// };

// const customStyles = {
//   tableWrapper: {
//     style: {
//       width: '40%', // Set the table width to 50%
//       margin: '0 auto', // Center the table horizontally
//     },
//   },
//   rows: {
//     style: {
//       minHeight: '48px',
//     },
//   },
//   cells: {
//     style: {
//       paddingLeft: '12px', 
//       paddingRight: '12px',
//     },
//   },
// };

// export default ContextDetails;
