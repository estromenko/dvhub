import "./styles.scss";

import { Repository } from "api/models";
import useFetch from "hooks/useFetch";
import { FC, useState } from "react";
import store from "store";

import CreateRepositoryModal from "../../components/CreateRepositoryModal";
import CreateTheFirstOneButton from "../../components/CreateTheFirstOneButton";
import CreationButton from "../../components/CreationButton";

const Repositories: FC = () => {
  const url = `/api/repositories/${store.user?.username}/`;
  const { data, loading } = useFetch<Repository[]>(url);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  if (loading) {
    return <div />;
  }

  if (!data || data.length === 0) {
    return (
      <div className="repositories-page">
        No repositories found.&nbsp;
        <CreateTheFirstOneButton onClick={() => setIsModalOpen(true)} />
        <CreateRepositoryModal
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
        />
      </div>
    );
  }

  return (
    <div className="repositories-page">
      <CreationButton
        text="Create new repository"
        className="repositories-page__creation-button"
        onClick={() => setIsModalOpen(true)}
      />
      {data.map((repository) => (
        <div key={repository.id} className="repositories-page__repository">
          <a
            href={`/${repository.owner.username}/${repository.name}`}
            className="repositories-page__repository-name"
          >
            {repository.name}
          </a>
          <div className="repositories-page__repository-public">
            ({repository.public ? "Public" : "Private"})
          </div>
          <a
            href={`/${repository.owner.username}/${repository.name}?page=pulls`}
            className="repositories-page__repository-link"
          >
            Pulls
          </a>
          <a
            href={`/${repository.owner.username}/${repository.name}?page=issues`}
            className="repositories-page__repository-link"
          >
            Issues
          </a>
        </div>
      ))}
      <CreateRepositoryModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </div>
  );
};

export default Repositories;
