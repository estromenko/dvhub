import "./styles.scss";

import { SSHKey } from "api/models";
import { FC, useEffect, useState } from "react";

import { $fetch } from "../../utils/api";
import CreateSSHKeyModal from "../CreateSSHKeyModal";
import CreateTheFirstOneButton from "../CreateTheFirstOneButton";
import CreationButton from "../CreationButton";
import SubmitButton from "../SubmitButton";

const SSHKeysList: FC = () => {
  const [modalOpened, setModalOpened] = useState<boolean>(false);
  const [keys, setKeys] = useState<SSHKey[]>([]);

  useEffect(() => {
    const getKeys = async () => {
      const response = await $fetch("/api/ssh-keys/");
      const data = await response?.json();
      setKeys(data);
    };

    getKeys().finally();
  }, []);

  const onRemoveClick = (id: number) => () => {
    $fetch(`/api/ssh-keys/${id}/`, { method: "DELETE" }).then(() => {
      setKeys(keys.filter((key) => key.id !== id));
    });
  };

  return (
    <div className="ssh-keys-list">
      <h2>SSH Keys</h2>
      {keys.length === 0 ? (
        <div>
          No ssh keys found.&nbsp;
          <CreateTheFirstOneButton onClick={() => setModalOpened(true)} />
        </div>
      ) : (
        <>
          <CreationButton
            text="Add new ssh key"
            className="ssh-keys-list__add-button"
            onClick={() => setModalOpened(true)}
          />
          <div className="ssh-keys-list__values">
            {keys.map((sshKey) => (
              <div key={sshKey.id} className="ssh-keys-list__row">
                <b>{sshKey.name}:</b>
                <span className="ssh-keys-list__key" title={sshKey.key}>
                  {sshKey.key.replace("\n", "")}
                </span>
                <SubmitButton type="button" onClick={onRemoveClick(sshKey.id)}>
                  Remove
                </SubmitButton>
              </div>
            ))}
          </div>
        </>
      )}
      <CreateSSHKeyModal isOpen={modalOpened} setIsOpen={setModalOpened} />
    </div>
  );
};

export default SSHKeysList;
