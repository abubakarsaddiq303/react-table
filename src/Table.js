import React, { useMemo, useState, useEffect } from "react";

import { useTable,useFilters,setFilter } from "react-table";

export default function Table({ columns, data }) {

  const [filterInput, setFilterInput] = useState("");

  // Update the state when input changes
 
  
  // Use the useTable Hook to send the columns and data to build the table
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setFilter // The useFilter Hook provides a way to set the filter
  } = useTable(
    {
      columns,
      data
    },
    useFilters // Adding the useFilters Hook to the table
    // You can add as many Hooks as you want. Check the documentation for details. You can even add custom Hooks for react-table here
  );


  const handleFilterChange = e => {
    const value = e.target.value || undefined;
    setFilter("show.name", value); // Update the show.name filter. Now our table will filter and show only the rows which have a matching value
    setFilterInput(value);
  };
console.log(filterInput
  )

  /* 
    Render the UI for your table
    - react-table doesn't have UI, it's headless. We just need to put the react-table props from the Hooks, and it will do its magic automatically
  */
  return (
<>
<input
  value={filterInput}
  onChange={handleFilterChange}
  placeholder={"Search name"}
/>


    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    
    </table>
    </>
  );
}