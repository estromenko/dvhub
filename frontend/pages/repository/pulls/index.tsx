import "./styles.scss";

import { PullRequest, Repository } from "api/models";
import CreatePullRequestModal from "components/CreatePullRequestModal";
import CreationButton from "components/CreationButton";
import PullRequestsList from "components/PullRequestsList";
import { FC, useState } from "react";
import { useParams } from "react-router-dom";

import CreateTheFirstOneButton from "../../../components/CreateTheFirstOneButton";
import useFetch from "../../../hooks/useFetch";

type Properties = {
  repository: Repository;
};

const PullRequests: FC<Properties> = ({ repository }) => {
  const { name } = useParams();
  const [modalOpened, setModalOpened] = useState<boolean>(false);
  const { data, loading } = useFetch<PullRequest[]>(
    `/api/pulls/?repository__name=${name}`,
  );

  const pullRequests = data || [];

  if (loading) {
    return <div />;
  }

  return (
    <div className="repository-page-pull-requests">
      {pullRequests.length > 0 && (
        <>
          <CreationButton
            text="Create new pull request"
            className="repository-page-pull-requests__creation-button"
            onClick={() => setModalOpened(true)}
          />
          <PullRequestsList pulls={pullRequests} />
        </>
      )}
      {pullRequests.length <= 0 && (
        <h3>
          No pull requests found.&nbsp;
          <CreateTheFirstOneButton onClick={() => setModalOpened(true)} />
        </h3>
      )}
      <CreatePullRequestModal
        isOpen={modalOpened}
        setIsOpen={setModalOpened}
        repository={repository}
      />
    </div>
  );
};

export default PullRequests;
