import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route, NavLink } from "react-router-dom";
import "../Styles/NavBarStyle.css";

import { HiSearch } from "react-icons/hi";
import Movies from "./Movies";
import Login from "./Login";

import { NavDropdown } from "react-bootstrap";

import ImgAsc from "../assets/text-sort-ascending.svg";
import ImgDsc from "../assets/text-sort-descending.svg";


export const Container = React.createContext();

function Navbar() {
  const [toggle] = useState(true);
  const [moviesData, setMoviesData] = useState([]);
  const [genresData, setGenresData] = useState([]);
  const [isDesc, setisDesc] = useState(false);

  const Api = "https://api.themoviedb.org/3";

  const SearchMovies = async (search) => {
    const data = await axios.get(Api + "/search/movie", {
      params: {
        api_key: "ba8f4caa4e6ebec49f8c6b8ba603ed04",
        query: search,
      },

    });
    const results = data.data.results;
    setMoviesData(results);
  };
  const getGenres = async () => {
    const data = await axios.get(Api + "/genre/movie/list", {
      params: {
        api_key: "ba8f4caa4e6ebec49f8c6b8ba603ed04",
      },

    });
    const results = data.data.genres;
    setGenresData(results);
  };

  const MovieCall = async () => {
    const data = await axios.get(Api + "/discover/movie", {
      params: {
        api_key: "ba8f4caa4e6ebec49f8c6b8ba603ed04",
      },
    });
    const results = data.data.results;
    setMoviesData(results);
  };

  const sortAscending = () => {
    let newValue = [...moviesData];
    let sortAsc = newValue.sort((a, b) => a.title.localeCompare(b.title));
    setMoviesData(sortAsc)
  }

  const sortDescending = () => {
    let newValue = [...moviesData];
    const sortDsc = newValue.sort((a, b) => b.title.localeCompare(a.title));
    setMoviesData(sortDsc)
  }

  const handleSort = () => {
    if (isDesc) {
      sortDescending();
    } else {
      sortAscending();
    }
    setisDesc(!isDesc)
  }

  useEffect(() => {
    MovieCall();
    getGenres();
  }, []);

  return (
    <Container.Provider value={toggle}>
      <Fragment>
        <nav className="navBarColor nav-bar">
          <div className="nav-options">
            <h1 id="heading">7Flix</h1>
            <NavLink to="">
              <span id="MoviesLight">Movies</span>
            </NavLink>
            <NavDropdown
              id="nav-dropdown-dark-example"
              title="KATEGORI"
              menuVariant="dark"
            >
              {genresData.map((item) => (
                <div key={item} onClick={() => SearchMovies(item.name)}>
                  <NavDropdown.Item>{item.name}</NavDropdown.Item>
                </div>
              ))}
            </NavDropdown>
            <span style={{ marginLeft: "-5px" }} onClick={handleSort}>{isDesc ? <img alt='' src={ImgDsc} className="color-white" /> : <img alt='' src={ImgAsc} className="color-white" />}</span>
          </div>
          <div className="input-grouped">
            <div className="nav-options">
              <Login>
                  <span id="MoviesLight">Login</span>
              </Login>
              <input
                type="text"
                placeholder="Search movies"
                onChange={(e) => SearchMovies(e.target.value)}
              ></input>
              <HiSearch fontSize={21} color="grey" id="search" />
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="" element={<Movies data={moviesData} />} />
        </Routes>
      </Fragment>
    </Container.Provider>
  );
}

export default Navbar;
