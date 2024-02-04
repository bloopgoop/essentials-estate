import githubLight from "assets/github-light.svg";
import githubDark from "assets/github-dark.svg";
import Logo from "components/Logo";
import linkedinLight from "assets/linkedin-light.svg";
import linkedinDark from "assets/linkedin-dark.svg";
import "./Footer.css";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "components/ui/accordion";

const Footer = () => {
  return (
    <footer id="footer" className="border-t border-border">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>About us</AccordionTrigger>
          <AccordionContent>
            This is a demo website created to showcase a real estate website
            based on requirements given by a Systems Analysis and Design course.
            Built using Django, React, and PostgreSQL.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>Collaborators</AccordionTrigger>
          <AccordionContent>
            <h1 className="text-xl font-bold">Kevin Zhu</h1>
            <ul>
              <li className="hover:bg-accent hover:rounded-lg">
                <a href="https://github.com/bloopgoop">
                  <Logo light={githubLight} dark={githubDark} />
                  GitHub
                </a>
              </li>
              <li className="hover:bg-accent hover:rounded-lg">
                <a href="https://www.linkedin.com/in/kevin-zhu-8b1741238/">
                  <Logo light={linkedinLight} dark={linkedinDark} />
                  LinkedIn
                </a>
              </li>
              <li>
                <div>zhu.kevin12@gmail.com</div>
              </li>
            </ul>

            <h1 className="text-xl font-bold mt-10">Joan Guzman</h1>
            <ul>
              <li className="hover:bg-accent hover:rounded-lg">
                <a href="https://github.com/JoanG5">
                  <Logo light={githubLight} dark={githubDark} />
                  GitHub
                </a>
              </li>
              <li className="hover:bg-accent hover:rounded-lg">
                <a href="https://www.linkedin.com/in/jguzman5/">
                  <Logo light={linkedinLight} dark={linkedinDark} />
                  LinkedIn
                </a>
              </li>
              <li>
                <div>Joanguzman553@gmail.com</div>
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>Github Repository</AccordionTrigger>
          <AccordionContent>
            <ul>
              <li className="hover:bg-accent hover:rounded-lg">
                <a href="https://github.com/bloopgoop/property-management">
                  <Logo light={githubLight} dark={githubDark} />
                  Essentials Estate
                </a>
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="mt-20">
        <p>&copy; 2021 Property. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
