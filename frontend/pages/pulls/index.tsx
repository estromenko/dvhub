import "./styles.scss";

import { PullRequest } from "api/models";
import PullRequestsList from "components/PullRequestsList";
import { observer } from "mobx-react-lite";
import { FC, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import store from "store";
import { $fetch } from "utils/api";
import { isAuthorized } from "utils/auth";

const Pulls: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [pulls, setPulls] = useState<PullRequest[]>([]);

  const period = new URLSearchParams(location.search).get("period");

  useEffect(() => {
    if (!store.user) {
      return;
    }

    const getPullRequests = async () => {
      let url = `/api/user/${store.user?.id}/pulls/`;

      const date = new Date();
      const value = period === "year" ? date.getFullYear() : date.getMonth() + 1;

      if (period) {
        url += `?period=${period}&value=${value}`;
      }

      const response = await $fetch(url);
      const data = await response?.json();
      setPulls(data);
    };

    getPullRequests().finally();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.user, period]);

  if (!isAuthorized()) {
    window.location.assign("/auth");
  }

  return (
    <div className="pulls-page">
      <div className="pulls-page__filters">
        Period:
        <button
          type="button"
          className="pulls-page__filter"
          onClick={() => {
            navigate("/pulls/?period=month");
          }}
        >
          This month
        </button>
        <button
          type="button"
          className="pulls-page__filter"
          onClick={() => {
            navigate("/pulls/?period=year");
          }}
        >
          This year
        </button>
      </div>
      {pulls && pulls.length > 0 ? (
        <PullRequestsList pulls={pulls} />
      ) : (
        <div>No pull requests found.</div>
      )}
    </div>
  );
};

export default observer(Pulls);
