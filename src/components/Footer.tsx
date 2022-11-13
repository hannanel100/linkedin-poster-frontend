import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import styled from "styled-components";

const StyledFooter = styled.footer`
  height: 50px;
  background-color: #242424;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
`;
const StyledCopyright = styled.div`
  font-size: 0.8rem;
  color: #fff;
  flex: 1 1 0;
`;
const StyledLinks = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 3rem;
  flex: 1 1 0;
  a {
    color: white;
  }
`;
const StyledHeartEmoji = styled.span`
  color: red;
`;

const Footer = () => {
  return (
    // footer
    <StyledFooter>
      {/* heart emoji */}
      <StyledCopyright>
        Made with <StyledHeartEmoji> &#10084; </StyledHeartEmoji> by Hannanel
        Gershinsky
      </StyledCopyright>
      <StyledLinks>
        <a href="https://github.com/hannanel100">
          <FontAwesomeIcon icon={faGithub} />
        </a>
        <a href="https://www.linkedin.com/in/hannanel-gershinsky/">
          <FontAwesomeIcon icon={faLinkedin} />
        </a>
        <a href="https://twitter.com/hannanel100">
          <FontAwesomeIcon icon={faTwitter} />
        </a>
      </StyledLinks>
    </StyledFooter>
  );
};

export default Footer;
