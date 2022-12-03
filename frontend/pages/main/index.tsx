import "./styles.scss";

import { Repository } from "api/models";
import useFetch from "hooks/useFetch";
import { observer } from "mobx-react-lite";
import { FC } from "react";
import { Link } from "react-router-dom";
import store from "store";
import { isAuthorized } from "utils/auth";

import Landing from "../../components/Landing";

const Main: FC = () => {
  const url = `/api/repositories/${store.user?.username}/`;
  const { data, loading } = useFetch<Repository[]>(url);

  if (loading) {
    return <div />;
  }

  const repositories = data || [];

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
        <Landing />
      )}
    </div>
  );
};

export default observer(Main);
