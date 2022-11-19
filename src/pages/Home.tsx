import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginButton from "../components/LoginButton";
import NavBar from "../components/NavBar";
import { useAccessTokenQuery } from "../hooks/useAccessTokenQuery";
import styled from "styled-components/macro";
import { useUserQuery } from "../hooks/useUserQuery";
import Logo from "../assets/pigeon_transparent.svg";

const StyledHomeContainer = styled.div`
  height: 100%;
  display: grid;
  place-content: center;
  margin: 0 1rem;
`;
const StyledLogo = styled.img`
  padding: 0;
  z-index: 5;
  height: 200px;
`;
const StyledFlex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  width: 100%;
`;
const StyledTextContainer = styled.div`
  width: 60%;
  text-align: left;
  @media (max-width: 768px) {
    width: 100%;
    overflow: hidden;
  }
  /* animation to bring in each paragraph from left to middle, with bounce effect, with a delay between each paragraph */
  /* apply slide in from left to odd p, slide in from right to even p */

  p:nth-child(odd) {
    animation: slide-in-from-left 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  }
  p:nth-child(even) {
    animation: slide-in-from-right 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  }
  p:nth-child(2) {
    animation-delay: 1s;
  }
  p:nth-child(3) {
    animation-delay: 2s;
  }
  p:nth-child(4) {
    animation-delay: 3s;
  }
  @keyframes slide-in-from-left {
    0% {
      transform: translateX(-100%);
      opacity: 0;
    }
    60% {
      transform: translateX(10%);
      opacity: 1;
    }
    100% {
      transform: translateX(0);
    }
  }
  @keyframes slide-in-from-right {
    0% {
      transform: translateX(100%);
      opacity: 0;
    }
    60% {
      transform: translateX(-10%);
      opacity: 1;
    }
    100% {
      transform: translateX(0);
    }
  }
`;
const Home = () => {
  const navigate = useNavigate();
  const { accessTokenQuery } = useAccessTokenQuery(undefined);
  const { addUserQuery } = useUserQuery();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    console.log("accessTokenQuery.data", accessTokenQuery.data);
    if (accessTokenQuery?.data) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      navigate("/");
    }
  }, [accessTokenQuery?.data]);

  console.log(import.meta.env.VITE_VITE_BACKEND_URL);
  return (
    <StyledHomeContainer>
      {!isAuthenticated ? (
        <StyledFlex>
          <StyledLogo src={Logo} />

          {/* explanation about pigeon post as a historical thing */}
          <StyledTextContainer>
            <p>
              Pigeons were used historically as a way of sending messages to far
              away places with almost no human intervention. Just write your
              message, attach it to a pigeon and let it fly.
            </p>
            <p>
              At pigeon, we are doing the same with your linkedin posts! just
              write up your desired post, set a date and time you want it to be
              posted at and hit submit. We will take care of the rest!
            </p>
            <p>
              Change your mind? no problem, you can delete or edit the post up
              until the scheduled time.
            </p>
            <p>To get started, sign in using linkedin with the button below.</p>
          </StyledTextContainer>
          <LoginButton />
        </StyledFlex>
      ) : (
        <NavBar isHome={true} />
      )}
    </StyledHomeContainer>
  );
};

export default Home;
