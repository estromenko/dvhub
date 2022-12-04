import "./styles.scss";

import CustomModal from "components/CustomModal";
import Input from "components/Input";
import { FC, useState } from "react";

import store from "../../store";
import { $fetch } from "../../utils/api";
import SubmitButton from "../SubmitButton";

type Properties = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => unknown;
};

const CreateRepositoryModal: FC<Properties> = ({ isOpen, setIsOpen }) => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isPublic, setIsPublic] = useState<boolean>(false);
  const [error, setError] = useState("");

  const onSubmit = async () => {
    setError("");

    const response = await $fetch("/api/repositories/", {
      method: "POST",
      body: JSON.stringify({
        name,
        description,
        public: isPublic,
        owner: store.user!.id,
      }),
    });

    if (response?.status === 201) {
      setIsOpen(false);
      window.location.reload();
    } else {
      setError("Failed to create repository");
    }
  };

  return (
    <CustomModal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="create-repository-modal">
        <h3 className="create-repository-modal__title">
          Create new repository
        </h3>
        <label className="create-repository-modal__input">
          Name
          <Input
            onChange={(event) => setName(event.target.value)}
            value={name}
          />
        </label>
        <label className="create-repository-modal__input">
          Description
          <Input
            onChange={(event) => setDescription(event.target.value)}
            value={description}
          />
        </label>
        <label className="create-repository-modal__input">
          Public
          <input
            type="checkbox"
            checked={isPublic}
            onChange={(event) => setIsPublic(event.target.checked)}
          />
        </label>
        {error ? (
          <div className="create-repository-modal__error">{error}</div>
        ) : (
          ""
        )}
        <div className="create-repository-modal__submit">
          <SubmitButton onClick={onSubmit}>Create</SubmitButton>
        </div>
      </div>
    </CustomModal>
  );
};

export default CreateRepositoryModal;
