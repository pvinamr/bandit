import React, { useState } from "react";
import axios from "axios";
import styles from "./Home.module.css";
import SearchResult from "./SearchResult";
import { TM_KEY } from "../../config";

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

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  const handleSearch = () => {
    const url = `https://app.ticketmaster.com/discovery/v2/events.json?keyword=${inputValue}&apikey=${TM_KEY}`;

    axios
      .get(url)
      .then((response) => {
        const newItem = response.data._embedded.events.map((event) => ({
          id: event.id,
          name: event.name,
          date: formatDate(event.dates.start.localDate),
          location: event._embedded.venues[0].name,
        }));
        setSearchResults(newItem);
      })
      .catch((error) => {
        console.error("Error fetching search results:", error);
        setSearchResults([]);
      });

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
              id={result.id}
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
