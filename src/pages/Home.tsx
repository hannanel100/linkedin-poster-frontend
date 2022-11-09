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
`;
const StyledLogo = styled.img`
  padding: 0;
  z-index: 5;
  height: 500px;
`;
const StyledFlex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  width: 100%;
`;

const Home = () => {
  const { accessTokenQuery } = useAccessTokenQuery(undefined);
  const { addUserQuery } = useUserQuery();
  console.log(addUserQuery?.data);
  return (
    <StyledHomeContainer>
      {!accessTokenQuery.data ? (
        <StyledFlex>
          <StyledLogo src={Logo} />
          <LoginButton />
        </StyledFlex>
      ) : (
        <NavBar isHome={true} />
      )}
    </StyledHomeContainer>
  );
};

export default Home;
