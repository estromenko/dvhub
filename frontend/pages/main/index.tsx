import "./styles.scss";

import { Repository } from "api/models";
import CreateRepositoryModal from "components/CreateRepositoryModal";
import Landing from "components/Landing";
import useFetch from "hooks/useFetch";
import { observer } from "mobx-react-lite";
import { FC, useState } from "react";
import { Link } from "react-router-dom";
import store from "store";
import { isAuthorized } from "utils/auth";

import CreateTheFirstOneButton from "../../components/CreateTheFirstOneButton";

const Main: FC = () => {
  const url = `/api/repositories/${store.user?.username}/`;
  const { data, loading } = useFetch<Repository[]>(url);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  if (loading) {
    return <div />;
  }

  const repositories = data || [];

  if (!isAuthorized()) {
    return <Landing />;
  }

  return (
    <div className="main-page">
      <div className="main-page-sidebar">
        <div className="main-page-sidebar__account-link">{store.user?.username}</div>
        <div className="sidebar-repo-list main-page-sidebar__repo-list">
          {repositories.length > 0 ? (
            <>
              {repositories.map((repository) => (
                <Link
                  to={`/${store.user!.username}/${repository.name}`}
                  key={repository.id}
                  className="sidebar-repo-list__link"
                >
                  {repository.name}
                </Link>
              ))}
            </>
          ) : (
            <div>
              No repositories found.
              <CreateTheFirstOneButton onClick={() => setIsModalOpen(true)} />
              <CreateRepositoryModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default observer(Main);
