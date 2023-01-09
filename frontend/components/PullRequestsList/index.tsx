import "./styles.scss";

import { PullRequest } from "api/models";
import { FC } from "react";
import { Link } from "react-router-dom";

type Properties = {
  pulls: PullRequest[];
};

const PullRequestsList: FC<Properties> = ({ pulls }) => (
  <div className="pulls-list">
    {pulls.map((pullRequest) => (
      <div key={pullRequest.id} className="pulls-list__pull">
        <div className="pulls-list__row">
          <Link
            to={`/${pullRequest.owner.username}/${pullRequest.repository.name}`}
            className="pulls-list__link"
          >
            {pullRequest.owner.username}/{pullRequest.repository.name}
          </Link>
          <Link to={`/pulls/${pullRequest.id}`} className="pulls-list__pull-link">
            {pullRequest.name}
          </Link>
        </div>
        <div className="pulls-list__pull-created-at">
          #{pullRequest.id} opened at {pullRequest.created_at} by &nbsp;
          {pullRequest.owner.username}
        </div>
      </div>
    ))}
  </div>
);

export default PullRequestsList;
