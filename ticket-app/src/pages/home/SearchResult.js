import React from "react";
import styles from "./SearchResult.module.css";

export default function SearchResult({ id, name, date, location }) {
  const handleClick = () => {
    const eventDetails = `${name} | ${date} | ${location}`;
    alert(eventDetails);
  };

  return (
    <div>
      <button className={styles.searchResult} onClick={handleClick}>
        <span>{name}</span> | <span>{date}</span> | <span>{location}</span>
      </button>
    </div>
  );
}
