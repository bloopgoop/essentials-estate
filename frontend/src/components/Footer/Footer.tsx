import githubIcon from "assets/github-icon.svg";
import linkedinIcon from "assets/linkedin-icon.svg";
import "./Footer.css";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>About Us</h4>
          <p>
            This is a demo website created to showcase a real estate website
            based on requirements given by a Systems Analysis and Design course.
            Built using Django, React, and PostgreSQL.
          </p>
        </div>
        <div className="footer-section">
          <h4>Collaborators</h4>
          <p>Kevin Zhu</p>
          <p>Joan Guzman</p>
        </div>
        <div className="footer-section">
          <h4>Kevin Zhu</h4>
          <ul>
            <li>
              <a href="https://github.com/bloopgoop" className="hover:bg-accent">
                <img src={githubIcon} alt="github icon" />
                GitHub
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/kevin-zhu-8b1741238/">
                <img src={linkedinIcon} alt="linkedin icon" />
                LinkedIn
              </a>
            </li>
            <li>
              <div>zhu.kevin12@gmail.com</div>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Joan Guzman</h4>
          <ul>
            <li>
              <a href="https://github.com/JoanG5">
                <img src={githubIcon} alt="github icon" />
                GitHub
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/jguzman5/">
                <img src={linkedinIcon} alt="linkedin icon" />
                LinkedIn
              </a>
            </li>
            <li>
              <div>Joanguzman553@gmail.com</div>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>GitHub Repository</h4>
          <ul>
            <li>
              <a href="https://github.com/bloopgoop/property-management">
                <img src={githubIcon} alt="github icon" />
                Essentials Estate
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2021 Property. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
