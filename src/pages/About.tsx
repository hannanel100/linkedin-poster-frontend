import styled from "styled-components";
// import fontawesome brand icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faGithub,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
const StyledMain = styled.main`
  flex: 4 2 0;
`;
const StyledLinks = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 3rem;
  flex: 1 1 0;
  a {
    color: white;
  }
`;
const About = () => {
  return (
    <StyledMain>
      <h1>Welcome to pigeon</h1>
      <p>
        Hi, my name is Hannanel, and I am the creator of pigeon. You can check
        me out on socials or at my github account, checkout the links below.
      </p>
      <p>
        pigeon is a app designed to help schedule posts on linkedin, it uses the
        official linkedin api to achieve this. It is currently in development,
        and built using react, typescript, and nodejs.
      </p>
      <p>
        If you see any bugs, reach out to me and i'll get on to them real quick.
      </p>
      <StyledLinks>
        <a href="https://github.com/hannanel100">
          <FontAwesomeIcon icon={faGithub as IconProp} />
        </a>
        <a href="https://www.linkedin.com/in/hannanel-gershinsky/">
          <FontAwesomeIcon icon={faLinkedin as IconProp} />
        </a>
        <a href="https://twitter.com/hannanel100">
          <FontAwesomeIcon icon={faTwitter as IconProp} />
        </a>
      </StyledLinks>
    </StyledMain>
  );
};

export default About;
