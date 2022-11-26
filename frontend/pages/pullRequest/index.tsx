import "./styles.scss";

import { PullRequest } from "api/models";
import NotFoundMessage from "components/NotFoundMessage";
import SubmitButton from "components/SubmitButton";
import useFetch from "hooks/useFetch";
import { FC, useState } from "react";
import { Link, useParams } from "react-router-dom";

import store from "../../store";
import { $fetch } from "../../utils/api";

const PullRequest: FC = () => {
  const { id } = useParams();
  const [commentText, setCommentText] = useState<string>("");

  const {
    data: pullRequest,
    error,
    loading,
  } = useFetch<PullRequest>(`/api/pulls/${id}/`);

  const onClick = async () => {
    if (!commentText) {
      return;
    }

    const response = await $fetch(`/api/pulls/${id}/comments/`, {
      method: "POST",
      body: JSON.stringify({
        text: commentText,
        owner: store.user!.id,
        pull_request: id,
      }),
    });

    if (response?.status === 201) {
      window.location.reload();
    }
  };

  if (loading) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  if (!pullRequest) {
    return <NotFoundMessage />;
  }

  return (
    <div className="pull-request-page">
      <div className="pull-request-page__info">
        <div className="pull-request-page__info-row">
          <span className="pull-request-page__status">
            ({pullRequest.status})
          </span>
          <Link
            to={`/${pullRequest.owner.username}/${pullRequest.repository.name}`}
            className="pull-request-page__repository-link"
          >
            {pullRequest.owner.username}/{pullRequest.repository.name}
          </Link>
          &nbsp;{pullRequest.name}
        </div>
        <div className="pull-request-page__branches">
          From
          <div className="pull-request-page__branch">
            {pullRequest.branch_from}
          </div>
          to
          <div className="pull-request-page__branch">
            {pullRequest.branch_to}
          </div>
        </div>
        <div className="pull-request-page__created-at">
          Created at {pullRequest.created_at}
        </div>
      </div>
      <div className="pull-request-page__actions">
        Actions:
        <button type="button" className="pull-request-page__action">
          Merge
        </button>
        <button type="button" className="pull-request-page__action">
          Approve
        </button>
      </div>
      <div>
        {pullRequest.comments.map((comment) => (
          <div key={comment.id} className="pull-request-page__comment">
            <div className="pull-request-page__comment-info">
              <span className="pull-request-page__comment-owner">
                {comment.owner.username}
              </span>{" "}
              at {comment.created_at}
            </div>
            {comment.text}
          </div>
        ))}
      </div>
      <div className="pull-request-page__new-comment-area">
        <textarea
          className="pull-request-page__new-comment-field"
          placeholder="Write comment"
          onChange={(event) => setCommentText(event.target.value)}
        />
        <SubmitButton onClick={onClick}>Send Comment</SubmitButton>
      </div>
    </div>
  );
};

export default PullRequest;
