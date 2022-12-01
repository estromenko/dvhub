import "./styles.scss";

import { Issue } from "api/models";
import NotFoundMessage from "components/NotFoundMessage";
import SubmitButton from "components/SubmitButton";
import useFetch from "hooks/useFetch";
import { FC, useState } from "react";
import { Link, useParams } from "react-router-dom";

import store from "../../store";
import { $fetch } from "../../utils/api";

const Issue: FC = () => {
  const { id } = useParams();
  const [commentText, setCommentText] = useState<string>("");

  const { data: issue, error, loading } = useFetch<Issue>(`/api/issues/${id}/`);

  const onWriteCommentClick = async () => {
    if (!commentText) {
      return;
    }

    const response = await $fetch(`/api/issues/${id}/comments/`, {
      method: "POST",
      body: JSON.stringify({
        text: commentText,
        owner: store.user!.id,
        issue: id,
      }),
    });

    if (response?.status === 201) {
      window.location.reload();
    }
  };

  const onCloseClick = async () => {
    const response = await $fetch(`/api/issues/${id}/`, {
      method: "PUT",
      body: JSON.stringify({
        ...issue,
        repository_id: issue!.repository.id,
        status: "closed",
      }),
    });

    if (response?.status !== 400) {
      window.location.reload();
    }
  };

  if (loading) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  if (!issue) {
    return <NotFoundMessage />;
  }

  return (
    <div className="issue-page">
      <div className="issue-page__info">
        <div className="issue-page__info-row">
          <span className="issue-page__status">({issue.status})</span>
          <Link
            to={`/${issue.owner.username}/${issue.repository.name}`}
            className="issue-page__repository-link"
          >
            {issue.owner.username}/{issue.repository.name}
          </Link>
          &nbsp;{issue.name}
        </div>
        <div className="issue-page__created-at">
          Created at {issue.created_at}
        </div>
      </div>
      <div className="issue-page__actions">
        Actions:
        <button
          type="button"
          className="issue-page__action"
          onClick={onCloseClick}
          disabled={issue!.status === "closed"}
        >
          Close
        </button>
      </div>
      <div>
        {issue.comments.map((comment) => (
          <div key={comment.id} className="issue-page__comment">
            <div className="issue-page__comment-info">
              <span className="issue-page__comment-owner">
                {comment.owner.username}
              </span>{" "}
              at {comment.created_at}
            </div>
            {comment.text}
          </div>
        ))}
      </div>
      <div className="issue-page__new-comment-area">
        <textarea
          className="issue-page__new-comment-field"
          placeholder="Write comment"
          onChange={(event) => setCommentText(event.target.value)}
        />
        <SubmitButton onClick={onWriteCommentClick}>Send Comment</SubmitButton>
      </div>
    </div>
  );
};

export default Issue;
