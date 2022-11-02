// login button component
import { useState } from "react";
import { useLinkedIn } from "react-linkedin-login-oauth2";
// import useQuery
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAccessTokenQuery } from "../hooks/useAccessTokenQuery";
import styled from "styled-components";
import LoadingSpinner from "./LoadingSpinner";
// axios with body to https://www.linkedin.com/oauth/v2/accessToken'
type accessToken = {
  access_token: string;
  expires_in: number;
};
const StyledButtonContainer = styled.div`
  width: 260px;
  height: 70px;
  display: grid;
  place-content: center;
  overflow: hidden;
  border-radius: 1rem;
  background: linear-gradient(180deg, #02c7c8 0%, #BC3CC5 100%);
`;
const StyledButton = styled.button`
  background-color: inherit;
  transition: none;
  /* scale button when clicked */
  transform: scale(1);
  transition: transform 0.2s ease-in-out;
  &:hover {
    border: none;
  }
`;
const LoginButton = () => {
  const [accessToken, setAccessToken] = useState<accessToken | undefined>(
    undefined
  );
  const [code, setCode] = useState<string | undefined>(undefined);
  // query to get user details
  const userQuery = useQuery(
    ["user"],
    async () => {
      const { data } = await axios.get(
        `http://localhost:5000/api/users/linkedin/user/${accessToken?.access_token}`
      );
      return data;
    },
    {
      enabled: !!accessToken?.access_token,
    }
  );
  const { accessTokenQuery } = useAccessTokenQuery(code);
  // setAccessToken(accessTokenQuery.data);
  const { linkedInLogin } = useLinkedIn({
    clientId: "77oz8xd2w9jzop",
    redirectUri: `http://localhost:5173/linkedin`,
    scope: "r_liteprofile",
    state: "123456",
    onSuccess: async (code) => {
      console.log(code);
      setCode(code);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  if (accessTokenQuery.isLoading && !!code) {
    return <LoadingSpinner />;
  }

  if (accessTokenQuery.error instanceof Error) {
    return <span>{accessTokenQuery.error.message}</span>;
  }
  return (
    <StyledButtonContainer>
      <StyledButton onClick={linkedInLogin}>
        <img src="/Sign-in-Large.png" />
      </StyledButton>
    </StyledButtonContainer>
  );
};

export default LoginButton;
