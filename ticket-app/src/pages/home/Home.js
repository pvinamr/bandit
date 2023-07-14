import React, { useState } from "react";
import styles from "./Home.module.css";
import SearchResult from "./SearchResult";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setInputValue(event.target.value);
      handleSearch();
    }
  };

  const handleSearch = () => {
    // Perform search logic here using the inputValue
    // For demonstration purposes, I'll just add a dummy search result
    const newItem = [
      {
        name: "Test Name",
        date: "Test Date",
        location: "Test Location",
      },
      {
        name: "Test Name 2",
        date: "Test Date 2",
        location: "Test Location 2",
      },
    ];

    setSearchResults(newItem);
    setInputValue("");
  };

  return (
    <div className={styles.page}>
      <div>
        <h1 className={styles.header}>bandit</h1>
        <input
          type="text"
          className={styles.inputBox}
          placeholder="find events"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        {searchResults.map((result, index) => (
          <React.Fragment key={index}>
            <SearchResult
              name={result.name}
              date={result.date}
              location={result.location}
            />
            {index !== searchResults.length - 1 && (
              <div className={styles.resultPadding} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
