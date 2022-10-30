// Home page
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

// types
type StyledNavProps = {
  isHome: boolean;
};
// create styled nav, flex column direction
const StyledNav = styled.nav<StyledNavProps>`
  flex: 5 2 0;
  display: flex;
  flex-direction: column;
  width: ${(props) => (props.isHome ? "100%" : "20%")};
  height: 100vh;
  justify-content: space-evenly;
  align-items: ${(props) => (props.isHome ? "center" : "flex-start")};
`;

const StyledLink = styled(Link)<StyledNavProps>`
  text-decoration: none;
  color: white;
  /* make links bigger and add custom font satisfy*/
  font-size: ${(props) => (props.isHome ? "8rem" : "4rem")};
  font-family: "Bebas Neue", cursive;
  font-family: "Kalam", cursive;
  padding-left: 2rem;
  opacity: 0.5;
  transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);

  /* add hover effect to scale to 1.2, change font and lower opacity on rest of links, including animation of transition*/
  &:hover {
    /* transform: ${(props) => (props.isHome ? "scale(1.2)" : "scale(1.1)")}; */
    font-size: ${(props) => (props.isHome ? "12rem" : "8rem")};
    opacity: 1;
    color: white;
    text-shadow: -5px -5px 0 #ffffff, 5px -5px 0 #ffffff, -5px 5px 0 #ffffff,
      5px 5px 0 #ffffff;
  }

  /* reverse hover effect when leaving */
`;
const NavBar = ({ isHome }: StyledNavProps) => {
  return (
    <StyledNav isHome={isHome}>
      {/* links to pages /post, /posts, /about */}
      {!isHome && (
        <StyledLink to="/" isHome={isHome}>
          Home
        </StyledLink>
      )}
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
