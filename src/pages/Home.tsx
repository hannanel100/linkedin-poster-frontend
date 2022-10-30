// Home page
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import NavBar from "../components/NavBar";

const Home = () => {
  return <NavBar isHome={true} />;
};

export default Home;
