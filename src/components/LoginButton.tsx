// login button component
import { useState } from "react";
import { useLinkedIn } from "react-linkedin-login-oauth2";
// import useQuery
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAccessTokenQuery } from "../hooks/useAccessTokenQuery";
import styled from "styled-components/macro";
import LoadingSpinner from "./LoadingSpinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { useUserQuery } from "../hooks/useUserQuery";

// axios with body to https://www.linkedin.com/oauth/v2/accessToken'
type accessToken = {
  access_token: string;
  expires_in: number;
};
const StyledButtonContainer = styled.div`
  width: 300px;
  height: 70px;
  display: grid;
  place-content: center;
  overflow: hidden;
  border-radius: 1rem;
  background: var(--gradient);
  transform: scale(1);
  transition: transform 0.8s cubic-bezier(0.075, 0.82, 0.165, 1);
  &:hover {
    transform: scale(1.2);
    transition: transform 0.8s cubic-bezier(0.075, 0.82, 0.165, 1);
  }
`;
const StyledButton = styled.button`
  display: flex;
  align-items: center;
  gap: 1rem;
  background-color: inherit;
  transition: none;
  color: #242424;
  font-weight: 700;
  font-size: 1.1rem;
  /* scale button when clicked */

  &:hover {
    border: none;
    outline: none;
  }
`;

const LoginButton = () => {
  const [accessToken, setAccessToken] = useState<accessToken | undefined>(
    undefined
  );
  const [code, setCode] = useState<string | undefined>(undefined);
  // query to get user details
  // const userQuery = useQuery(
  //   ["user"],
  //   async () => {
  //     const { data } = await axios.get(
  //       `http://localhost:5000/api/users/linkedin/user/${accessToken?.access_token}`
  //     );
  //     return data;
  //   },
  //   {
  //     enabled: !!accessToken?.access_token,
  //   }
  // );
  const { accessTokenQuery } = useAccessTokenQuery(code);
  // setAccessToken(accessTokenQuery.data);
  // console.log(tokenIntrospectQuery.data);
  const { linkedInLogin } = useLinkedIn({
    clientId: "77oz8xd2w9jzop",
    redirectUri: `http://localhost:5173/linkedin`,
    scope: "r_liteprofile w_member_social",
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
        <FontAwesomeIcon icon={faLinkedin} size="3x" color="#242424" />
        Sign in with Linkedin
      </StyledButton>
    </StyledButtonContainer>
  );
};

export default LoginButton;
