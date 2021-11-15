import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";
import Table from "./Table";
import "./App.css";
function App() {
 // data state to store the TV Maze API data. Its initial value is an empty array
 const [data, setData] = useState([]);

 // Using useEffect to call the API once mounted and set the data
 useEffect(() => {
   (async () => {
     const result = await axios("https://api.tvmaze.com/search/shows?q=snow");
     setData(result.data);
   })();
 }, []);

  const Genres = ({ values }) => {
    // Loop through the array and create a badge-like component instead of a comma-separated string
    return (
      <>
        {values.map((genre, idx) => {
          return (
            <span key={idx} className="badge">
              {genre}
            </span>
          );
        })}
      </>
    );
  };


  const columns = useMemo(
    () => [
      {
        // first group - TV Show
        Header: "TV Show",
        // First group columns
        columns: [
          {
            Header: "Name",
            accessor: "show.name"
          },
          {
            Header: "Type",
            accessor: "show.type"
          }
        ]
      },
  
      {
        Header: "Details",
        columns: [
          {
            Header: "Language",
            accessor: "show.language"
          },
          {
            Header: "Genre(s)",
            accessor: "show.genres",
            // Cell method will provide the cell value; we pass it to render a custom component
            Cell: ({ cell: { value } }) => <Genres values={value} />
          },
          {
            Header: "Runtime",
            accessor: "show.runtime",
            // Cell method will provide the value of the cell; we can create a custom element for the Cell        
            Cell: ({ cell: { value } }) => {
              const hour = Math.floor(value / 60);
              const min = Math.floor(value % 60);
              return (
                <>
                  {hour > 0 ? `${hour} hr${hour > 1 ? "s" : ""} ` : ""}
                  {min > 0 ? `${min} min${min > 1 ? "s" : ""}` : ""}
                </>
              );
            }
            }
    ],
  
  },
],[]
  );

  return (
    <div className="App">
      <Table columns={columns} data={data} />
    </div>
  );

  }
export default App;