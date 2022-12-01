import "./styles.scss";

import { Issue } from "api/models";
import IssuesList from "components/IssuesList";
import useFetch from "hooks/useFetch";
import { FC } from "react";

const Issues: FC = () => {
  const { data } = useFetch<Issue[]>("/api/issues/");

  return (
    <div className="issues-page">
      <IssuesList issues={data || []} />
    </div>
  );
};

export default Issues;
