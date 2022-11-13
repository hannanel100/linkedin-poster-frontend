// Home page
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";

// types
type StyledNavProps = {
  isHome: boolean;
};
// create styled nav, flex column direction
const StyledNav = styled.nav<StyledNavProps>`
  flex: 3 2 0;
  display: flex;
  flex-direction: column;
  width: ${(props) => (props.isHome ? "100%" : "20%")};
  /* height: 100vh; */
  gap: 10rem;
  justify-content: space-evenly;
  align-items: ${(props) => (props.isHome ? "center" : "flex-start")};
  /* media query for mobile phones */
  ${(props) =>
    !props.isHome &&
    `@media (max-width: 768px) {
  flex-direction: row;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  height: 10vh;
  `}
`;

const StyledLink = styled(Link)<StyledNavProps>`
  text-decoration: none;
  color: white;
  /* make links bigger and add custom font satisfy*/
  font-size: ${(props) => (props.isHome ? "8rem" : "3rem")};
  font-family: "Bebas Neue", cursive;
  font-family: "Kalam", cursive;
  font-family: "Rubik", sans-serif;
  padding-left: 2rem;
  opacity: 0.5;
  transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);

  /* add hover effect to scale to 1.2, change font and lower opacity on rest of links, including animation of transition*/
  &:hover {
    /* transform: ${(props) => (props.isHome ? "scale(1.2)" : "scale(1.1)")}; */
    font-size: ${(props) => (props.isHome ? "12rem" : "6rem")};
    opacity: 1;
    color: white;
    text-shadow: -3px -3px 0 #ffffff, 3px -3px 0 #ffffff, -3px 3px 0 #ffffff,
      3px 3px 0 #ffffff;
  }
  /* media query for mobile phones */
  ${(props) =>
    !props.isHome
      ? `@media (max-width: 768px) {
    /* change text to icons */
    font-size: 1.5rem;
    padding: 0;
    /* remove hover */
    &:hover {
      font-size: 1.5rem;
      padding: 0;
      text-shadow: none;
    }
    &:active {
      color: white;
    }
  }`
      : `@media(max-width: 768px){
    font-size: 3rem;
  }`}/* reverse hover effect when leaving */
`;
const NavBar = ({ isHome }: StyledNavProps) => {
  return (
    <StyledNav isHome={isHome}>
      <StyledLink to="/post" isHome={isHome}>
        Add Post
      </StyledLink>
      <StyledLink to="/posts" isHome={isHome}>
        View Posts
      </StyledLink>
      <StyledLink to="/about" isHome={isHome}>
        About
      </StyledLink>
    </StyledNav>
  );
};

export default NavBar;
