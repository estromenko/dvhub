import "./styles.scss";

import { Repository } from "api/models";
import CustomModal from "components/CustomModal";
import Input from "components/Input";
import SubmitButton from "components/SubmitButton";
import { FC } from "react";

type Properties = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => unknown;
  repository?: Repository;
};

const CreatePullRequestModal: FC<Properties> = ({
  isOpen,
  setIsOpen,
  repository,
}) => (
  <CustomModal isOpen={isOpen} setIsOpen={setIsOpen}>
    <div className="create-pull-request-modal">
      <h3 className="create-pull-request-modal__title">
        Create new pull request
      </h3>
      <label>
        Name
        <Input className="create-pull-request-modal__name" />
      </label>
      <div className="create-pull-request-modal__branch-selectors">
        <label>
          From
          <select>
            {repository?.branches.map((branch) => (
              <option key={branch.id}>{branch.name}</option>
            ))}
          </select>
        </label>
        <label>
          To
          <select>
            {repository?.branches.map((branch) => (
              <option key={branch.id}>{branch.name}</option>
            ))}
          </select>
        </label>
      </div>
      <SubmitButton type="button" onClick={() => setIsOpen(false)}>
        Create
      </SubmitButton>
    </div>
  </CustomModal>
);

CreatePullRequestModal.defaultProps = {
  repository: undefined,
};

export default CreatePullRequestModal;
