import "./styles.scss";

import { Issue, Repository } from "api/models";
import CreateIssueModal from "components/CreateIssueModal";
import CreationButton from "components/CreationButton";
import IssuesList from "components/IssuesList";
import useFetch from "hooks/useFetch";
import { FC, useState } from "react";
import { useParams } from "react-router-dom";

import CreateTheFirstOneButton from "../../../components/CreateTheFirstOneButton";

type Properties = {
  repository: Repository;
};

const Issues: FC<Properties> = ({ repository }) => {
  const { name } = useParams();
  const [modalOpened, setModalOpened] = useState<boolean>(false);
  const { data } = useFetch<Issue[]>(`/api/issues/?repository__name=${name}`);

  const issues = data || [];

  return (
    <div className="repository-page-issues">
      {issues.length > 0 ? (
        <>
          <CreationButton
            text="Create new issue"
            className="repository-page-issues__creation-button"
            onClick={() => setModalOpened(true)}
          />
          <IssuesList issues={data || []} />
        </>
      ) : (
        <h3>
          No issues found.&nbsp;
          <CreateTheFirstOneButton onClick={() => setModalOpened(true)} />
        </h3>
      )}
      <CreateIssueModal isOpen={modalOpened} setIsOpen={setModalOpened} repository={repository} />
    </div>
  );
};

export default Issues;
