// import fontawesome brand icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

const About = () => {
  return (
    <div>
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

      <a href="https://github.com/hannanel100">
        <FontAwesomeIcon icon={faGithub} />
      </a>
      <a href="https://www.linkedin.com/in/hannanel-gershinsky/">
        <FontAwesomeIcon icon={faLinkedin} />
      </a>
      <a href="https://twitter.com/hannanel100">
        <FontAwesomeIcon icon={faTwitter} />
      </a>
    </div>
  );
};

export default About;
