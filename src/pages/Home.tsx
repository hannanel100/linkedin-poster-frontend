import LoginButton from "../components/LoginButton";
import NavBar from "../components/NavBar";
import { useAccessTokenQuery } from "../hooks/useAccessTokenQuery";
import styled from "styled-components";

const StyledHomeContainer = styled.div`
  height: 100%;
  display: grid;
  place-content: center;
`;
const Home = () => {
  const { accessTokenQuery } = useAccessTokenQuery(undefined);

  return (
    <StyledHomeContainer>
      {!accessTokenQuery.data ? <LoginButton /> : <NavBar isHome={true} />}
    </StyledHomeContainer>
  );
};

export default Home;
