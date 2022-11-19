import "./styles.scss";

import { Repository } from "api/models";
import { FC } from "react";

type Properties = {
  repository: Repository;
};

const Code: FC<Properties> = ({ repository }) => (
  <div className="code-page">
    {repository.files.map((file) => (
      <a key={file} href="/">
        {file}
      </a>
    ))}
  </div>
);

export default Code;
