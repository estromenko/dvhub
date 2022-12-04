import "./styles.scss";

import { Issue } from "api/models";
import IssuesList from "components/IssuesList";
import useFetch from "hooks/useFetch";
import { FC } from "react";
import store from "store";

const Issues: FC = () => {
  const { data } = useFetch<Issue[]>(
    `/api/issues/owner__username${store.user!.username}`,
  );

  return (
    <div className="issues-page">
      {data && data.length > 0 ? (
        <IssuesList issues={data || []} />
      ) : (
        <div>No issues found.</div>
      )}
    </div>
  );
};

export default Issues;
