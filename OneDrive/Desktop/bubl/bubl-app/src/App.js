import logo from './logo.svg';
import { useEffect, useState } from "react"; 
import axios from 'axios';
import './App.css';

function App() {
  const CLIENT_ID = "1a42144f24bf43c89e115c24c12ae60c";
  const REDIRECT_URL = "http://localhost:3000/callback";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  const [token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1];
      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }

    setToken(token);
  }, []);

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  const searchArtists = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get("https://api.spotify.com/v1/search", {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          q: searchKey,
          type: "artist"
        }
      });
      setArtists(data.artists.items);
    } catch (error) {
      console.error("Error fetching artists", error);
    }
  };

  const renderArtists = () => {
    return artists.map((artist) => (
      <div key={artist.id}>
        {artist.images.length ? (
          <img width={"50%"} src={artist.images[0].url} alt="" />
        ) : (
          <div>No Image</div>
        )}
        {artist.name}
      </div>
    ));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>spotsearch</h1>
        {!token ? (
          <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&response_type=${RESPONSE_TYPE}`}>
            Log into Spotify
          </a>
        ) : (
          <button onClick={logout}>Logout</button>
        )}
        {token ? (
          <form onSubmit={searchArtists}>
            <input type="text" onChange={e => setSearchKey(e.target.value)} />
            <button type="submit">Search</button>
          </form>
        ) : (
          <h2>Please log in</h2>
        )}
        {renderArtists()}
      </header>
    </div>
  );
}

export default App;
