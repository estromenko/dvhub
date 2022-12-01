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

const CreateIssueModal: FC<Properties> = ({
  isOpen,
  setIsOpen,
  repository,
}) => {
  const [name, setName] = useState<string>("");
  const [error, setError] = useState<string>("");

  const createIssue = async () => {
    const response = await $fetch("/api/issues/", {
      method: "POST",
      body: JSON.stringify({
        name,
        repository_id: repository!.id,
        owner_id: repository!.owner.id,
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

    createIssue()
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
      <div className="create-issue-modal">
        <h3 className="create-issue-modal__title">Create new issue</h3>
        <label>
          Name
          <Input
            className="create-issue-modal__name"
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <div className="create-issue-modal__error">{error}</div>
        <SubmitButton type="button" onClick={onClick}>
          Create
        </SubmitButton>
      </div>
    </CustomModal>
  );
};

CreateIssueModal.defaultProps = {
  repository: undefined,
};

export default CreateIssueModal;
