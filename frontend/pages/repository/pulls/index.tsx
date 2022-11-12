import "./styles.scss";

import { PullRequest, Repository } from "api/models";
import CreatePullRequestModal from "components/CreatePullRequestModal";
import CreationButton from "components/CreationButton";
import PullRequestsList from "components/PullRequestsList";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { $fetch } from "utils/api";

type Properties = {
  repository: Repository;
};

const PullRequests: FC<Properties> = ({ repository }) => {
  const { name } = useParams();

  const [pullRequests, setPullRequests] = useState<PullRequest[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [modalOpened, setModalOpened] = useState<boolean>(false);

  useEffect(() => {
    const getPullRequests = async () => {
      setIsLoading(true);

      const response = await $fetch(`/api/pulls/?repository__name=${name}`);
      const data = await response?.json();

      setPullRequests(data);
    };

    getPullRequests().finally(() => {
      setIsLoading(false);
    });
  }, [name]);

  if (isLoading) {
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
          <button
            type="button"
            onClick={() => setModalOpened(true)}
            className="repository-page-pull-requests__create-first-pull-request"
          >
            Create first one!
          </button>
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
