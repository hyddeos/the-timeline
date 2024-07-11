import "./footer.css";
import React from "react";

const Footer = (props) => {
  return (
    <footer className="footerFrame">
      <p className="footerP">
        <a href="https://eshtropy.se">Eshtropy</a> {new Date().getFullYear()} |{" "}
      </p>
      <p className="footerP">
        Contact me or feel free to contribute at{" "}
        <a href="https://github.com/hyddeos/the-timeline">Github</a> |
      </p>
      <p className="footerP">
        <a href="https://www.buymeacoffee.com/eshtropy">
          <img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=❤️&slug=eshtropy&button_colour=FFDD00&font_colour=000000&font_family=Lato&outline_colour=000000&coffee_colour=ffffff" />
        </a>
      </p>
    </footer>
  );
};

export default Footer;
