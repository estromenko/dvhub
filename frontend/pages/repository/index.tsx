import "./styles.scss";

import { Repository } from "api/models";
import NotFoundMessage from "components/NotFoundMessage";
import { FC, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import RepositoryNavbarLink from "../../components/RepositoryNavbarLink";
import useFetch from "../../hooks/useFetch";
import Code from "./code";
import Issues from "./issues";
import PullRequests from "./pulls";

const Repository: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { username, name } = useParams();

  const startPage = new URLSearchParams(location.search).get("page");
  const [page, setPage] = useState<string>(startPage || "");

  const url = `/api/repositories/?owner__username=${username}&name=${name}`;
  const { data, loading } = useFetch<Repository[]>(url);

  const repository = data?.at(0);

  const getPage = () => {
    switch (page) {
      case "code":
        return <Code />;
      case "issues":
        return <Issues />;
      case "pulls":
        return <PullRequests repository={repository!} />;
      default:
        return <Code />;
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    searchParams.delete("page");
    searchParams.set("page", page);

    navigate(`${location.pathname}?${searchParams.toString()}`);
  }, [location.pathname, location.search, navigate, page]);

  if (loading) {
    return <div />;
  }

  if (!repository) {
    return <NotFoundMessage />;
  }

  return (
    <div className="repository-page">
      <div className="repository-head">
        <h1 className="repository-head__name">
          {repository.owner.username}/{repository.name}
        </h1>
        <span>{repository.public ? "Public" : "Private"}</span>
      </div>
      <div className="repository-content">
        <nav className="repository-content__navbar">
          <RepositoryNavbarLink
            text="Code"
            selected={!page || page === "code"}
            onClick={() => {
              setPage("code");
            }}
          />
          <RepositoryNavbarLink
            text="Issues"
            selected={page === "issues"}
            onClick={() => {
              setPage("issues");
            }}
          />
          <RepositoryNavbarLink
            text="Pull Requests"
            selected={page === "pulls"}
            onClick={() => {
              setPage("pulls");
            }}
          />
        </nav>
      </div>
      <div>{getPage()}</div>
    </div>
  );
};

export default Repository;
