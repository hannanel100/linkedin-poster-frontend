// Header component, with name if logged in, and login/logout button
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAccessTokenQuery } from "../hooks/useAccessTokenQuery";
import { useUserQuery } from "../hooks/useUserQuery";
import Logo from "../assets/pigeon_transparent.svg";
import styled from "styled-components";
import LoadingSpinner from "./LoadingSpinner";
import { usePostQuery } from "../hooks/usePostQuery";
import { useDelayUnmount } from "../hooks/useDelayUnmount";

type StyledNameProps = {
  open: boolean;
};
const StyledLogo = styled.img`
  margin-left: 25px;
  padding: 0;
  z-index: 5;
  cursor: pointer;
`;
const StyledHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex: 1 1 auto;
  gap: 1rem;
  width: 100%;
  height: 90px;
  position: relative;
  box-shadow: 0px 4px 9px 5px rgba(0, 0, 0, 0.82);
  z-index: 1;
  &::before {
    background-image: url("/header-background.jpeg");
    opacity: 0.7;
    content: "";
    background-size: cover;
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    transform: scaleX(-1);
  }
`;
const StyledSideContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
  width: 100%;
  height: 100%;
`;
const StyledImageContainer = styled.div`
  width: 55px;
  height: 55px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 25px;
  background: linear-gradient(180deg, #02c7c8 0%, #bc3cc5 100%);
  position: relative;
  cursor: pointer;
  transition: transform 0.7s cubic-bezier(0.075, 0.82, 0.165, 1);

  &:hover {
    /* spin cubic-bezier */
    /* bounce and spin animation */
    transform: scale(1.2) rotate(360deg);
    transition: transform 0.7s cubic-bezier(0.075, 0.82, 0.165, 1);
  }
`;
const StyledImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: absolute;
  top: 2.5px;
  left: 2.5px;
`;
const StyledName = styled.div<StyledNameProps>`
  font-family: "Roboto", sans-serif;
  background-color: #fff;
  color: #000;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  z-index: 5;
  /* animation to slide to the left */
  opacity: ${(props) => (props.open ? "1" : "0")};
  transition: ${(props) =>
    props.open
      ? `opacity 0.5s cubic-bezier(.7,.04,1,.84)`
      : `opacity 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)`};
`;
const Header = () => {
  const { accessTokenQuery } = useAccessTokenQuery(undefined);
  const { userQuery } = useUserQuery();
  const { postQuery } = usePostQuery();
  const [open, setOpen] = useState(false);
  const shouldRenderChild = useDelayUnmount(open, 500);

  const navigate = useNavigate();
  console.log(userQuery.data);
  const logoutHandler = () => {
    accessTokenQuery.remove();
    userQuery.remove();
    postQuery.remove();
    console.log(accessTokenQuery.data);
    navigate("/");
  };
  const firstName = userQuery.data?.localizedFirstName;
  const lastName = userQuery.data?.localizedLastName;
  const imageUrl = userQuery.data?.profilePicture
    ? userQuery.data?.profilePicture["displayImage~"].elements[0].identifiers[0]
        .identifier
    : "/user-ninja-solid.svg";
  if (userQuery.isInitialLoading) {
    return (
      <StyledHeader>
        <StyledLogo src={Logo} />
        <StyledImageContainer>
          <LoadingSpinner width="40" height="40" />
        </StyledImageContainer>
      </StyledHeader>
    );
  }
  return (
    <StyledHeader>
      <StyledLogo onClick={() => navigate("/")} src={Logo} />
      <StyledSideContainer>
        {accessTokenQuery.data ? (
          <>
            {shouldRenderChild && (
              <>
                <StyledName open={open}>
                  Hello, {firstName} {lastName}!
                </StyledName>
              </>
            )}
            <StyledImageContainer onClick={() => setOpen(!open)}>
              <StyledImage src={imageUrl} />
            </StyledImageContainer>
            <button onClick={logoutHandler} style={{ zIndex: 5 }}>
              Logout
            </button>
          </>
        ) : null}
      </StyledSideContainer>
    </StyledHeader>
  );
};

export default Header;
