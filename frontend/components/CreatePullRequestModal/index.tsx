import "./styles.scss";

import { Repository } from "api/models";
import CustomModal from "components/CustomModal";
import Input from "components/Input";
import SubmitButton from "components/SubmitButton";
import { FC, useState } from "react";
import { $fetch } from "utils/api";

type Properties = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => unknown;
  repository?: Repository;
};

const CreatePullRequestModal: FC<Properties> = ({ isOpen, setIsOpen, repository }) => {
  const [name, setName] = useState<string>("");
  const [branchFrom, setBranchFrom] = useState<string | undefined>(repository?.branches[0]);
  const [branchTo, setBranchTo] = useState<string | undefined>(repository?.branches[0]);
  const [error, setError] = useState<string>("");

  const createPullRequest = async () => {
    const response = await $fetch("/api/pulls/", {
      method: "POST",
      body: JSON.stringify({
        name,
        repository_id: repository!.id,
        branch_from: branchFrom,
        owner_id: repository!.owner.id,
        branch_to: branchTo,
      }),
    });

    const status = response?.status || 500;

    if (status >= 500) {
      throw Error("Internal server error");
    }

    const data = await response?.json();

    if (status === 400) {
      const errorMessage = Object.entries(data)
        .map((key, value) => `${key}: ${value}`)
        .join("\n");

      throw Error(errorMessage);
    }
  };

  const onClick = () => {
    if (!name) {
      setError("Name must be provided");
      return;
    }

    createPullRequest()
      .then(() => {
        setIsOpen(false);
        window.location.reload();
      })
      .catch((err) => {
        setError(err.cause);
      });
  };

  return (
    <CustomModal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="create-pull-request-modal">
        <h3 className="create-pull-request-modal__title">Create new pull request</h3>
        <label>
          Name
          <Input
            className="create-pull-request-modal__name"
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <div className="create-pull-request-modal__branch-selectors">
          <label>
            From
            <select value={branchFrom} onChange={(event) => setBranchFrom(event.target.value)}>
              {repository?.branches.map((branch) => (
                <option key={branch}>{branch}</option>
              ))}
            </select>
          </label>
          <label>
            To
            <select value={branchTo} onChange={(event) => setBranchTo(event.target.value)}>
              {repository?.branches.map((branch) => (
                <option key={branch}>{branch}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="create-pull-request-modal__error">{error}</div>
        <SubmitButton type="button" onClick={onClick}>
          Create
        </SubmitButton>
      </div>
    </CustomModal>
  );
};

CreatePullRequestModal.defaultProps = {
  repository: undefined,
};

export default CreatePullRequestModal;
