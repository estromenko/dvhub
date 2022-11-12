import "./styles.scss";

import cn from "classnames";
import { FC } from "react";

type Properties = {
  text: string;
  selected: boolean;
  onClick?: () => void;
};

const RepositoryNavbarLink: FC<Properties> = ({ text, selected, onClick }) => (
  <div
    role="button"
    tabIndex={0}
    onKeyDown={() => ({})}
    className={cn("repository-navbar-link", {
      "repository-navbar-link_selected": selected,
    })}
    onClick={onClick}
  >
    {text}
  </div>
);

RepositoryNavbarLink.defaultProps = {
  onClick: () => ({}),
};

export default RepositoryNavbarLink;
