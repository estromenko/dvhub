import "./styles.scss";

import logoImage from "assets/logo.png";
import { FC } from "react";

const Landing: FC = () => (
  <div className="landing">
    <h1 className="landing__title">
      <img src={logoImage} alt="Logo" />
      DVHub
    </h1>
    <div className="landing__subtitle">Damn vulnerable development platform</div>
  </div>
);

export default Landing;
