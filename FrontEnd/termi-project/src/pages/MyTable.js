import ReactTable from 'react-table';
import React,{useState,useEffect,useContext} from "react";
function MyTable({ data }) {
  const columns = [
    {
      Header: 'Game Name',
      accessor: 'gameName'
    },
    {
      Header: 'Score',
      accessor: 'score'
    }
  ]
  return (
    <ReactTable
      data={data}
      columns={columns}
    />
  )
}


export default MyTable;
