import "./styles.scss";

import { Repository } from "api/models";
import { observer } from "mobx-react-lite";
import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import store from "store";
import { $fetch } from "utils/api";
import { isAuthorized } from "utils/auth";

const Main: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [repositories, setRepositories] = useState<Repository[]>([]);

  useEffect(() => {
    if (!store.user) {
      return;
    }

    const getRepositories = async () => {
      setIsLoading(true);
      const response = await $fetch(
        `/api/user/${store.user?.id}/repositories/`,
      );
      const data = await response?.json();
      setRepositories(data);
    };

    getRepositories().finally(() => {
      setIsLoading(false);
    });
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [store.user]);

  if (isLoading) {
    return <div />;
  }

  return (
    <div className="main-page">
      {isAuthorized() ? (
        <div className="main-page-sidebar">
          <div className="main-page-sidebar__account-link">
            {store.user?.username}
          </div>
          <div className="sidebar-repo-list main-page-sidebar__repo-list">
            {repositories.map((repository) => (
              <Link
                to={`/${store.user!.username}/${repository.name}`}
                key={repository.id}
                className="sidebar-repo-list__link"
              >
                {repository.name}
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div>Sign In to continue</div>
      )}
    </div>
  );
};

export default observer(Main);
