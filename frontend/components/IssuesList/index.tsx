import "./styles.scss";

import { Issue } from "api/models";
import { FC } from "react";
import { Link } from "react-router-dom";

type Properties = {
  issues: Issue[];
};

const IssuesList: FC<Properties> = ({ issues }) => (
  <div className="issues-list">
    {issues.map((issue) => (
      <div key={issue.id} className="issues-list__issue">
        <div className="issues-list__row">
          <Link
            to={`/${issue.owner.username}/${issue.repository.name}`}
            className="issues-list__link"
          >
            {issue.owner.username}/{issue.repository.name}
          </Link>
          <Link to={`/issues/${issue.id}`} className="issues-list__issue-link">
            {issue.name}
          </Link>
        </div>
        <div className="issues-list__issue-created-at">
          #{issue.id} opened at {issue.created_at} by &nbsp;
          {issue.owner.username}
        </div>
      </div>
    ))}
  </div>
);

export default IssuesList;
