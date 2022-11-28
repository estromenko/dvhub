import "./styles.scss";

import CustomModal from "components/CustomModal";
import { FC, useState } from "react";

import { $fetch } from "../../utils/api";
import Input from "../Input";
import SubmitButton from "../SubmitButton";

type Properties = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => unknown;
};

const CreateSSHKeyModal: FC<Properties> = ({ isOpen, setIsOpen }) => {
  const [name, setName] = useState<string>("");
  const [key, setKey] = useState<string>("");

  const onSave = async () => {
    const response = await $fetch("/api/ssh-keys/", {
      method: "POST",
      body: JSON.stringify({ name, key }),
    });

    if (response?.status === 201) {
      setIsOpen(false);
      window.location.reload();
    }
  };

  return (
    <CustomModal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="create-ssh-key-modal">
        New SSH key
        <label className="create-ssh-key-modal__label">
          Name
          <Input onChange={(event) => setName(event.target.value)} />
        </label>
        <label className="create-ssh-key-modal__label">
          Key
          <textarea
            onChange={(event) => setKey(event.target.value)}
            className="create-ssh-key-modal__key-textarea"
          />
        </label>
        <SubmitButton onClick={onSave}>Save</SubmitButton>
      </div>
    </CustomModal>
  );
};

export default CreateSSHKeyModal;
