import "./styles.scss";

import { Repository } from "api/models";
import useFetch from "hooks/useFetch";
import { FC } from "react";
import store from "store";

const Repositories: FC = () => {
  const url = `/api/repositories/${store.user?.username}/`;
  const { data, loading } = useFetch<Repository[]>(url);

  if (loading) {
    return <div />;
  }

  return (
    <div className="repositories-page">
      {data?.map((repository) => (
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
    </div>
  );
};

export default Repositories;
