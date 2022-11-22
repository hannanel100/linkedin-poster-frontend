// login button component
import { useState } from "react";
import { useLinkedIn } from "react-linkedin-login-oauth2";
import { useAccessTokenQuery } from "../hooks/useAccessTokenQuery";
import styled from "styled-components";
import LoadingSpinner from "./LoadingSpinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

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
  const [code, setCode] = useState<string | undefined>(undefined);

  const { accessTokenQuery } = useAccessTokenQuery(code);
  console.log(`${window.location.origin}/linkedin`);
  const { linkedInLogin } = useLinkedIn({
    clientId: import.meta.env.VITE_CLIENT_ID as string,
    redirectUri: `${window.location.origin}/linkedin`,
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
        <FontAwesomeIcon
          icon={faLinkedin as IconProp}
          size="3x"
          color="#242424"
        />
        Sign in with Linkedin
      </StyledButton>
    </StyledButtonContainer>
  );
};

export default LoginButton;
