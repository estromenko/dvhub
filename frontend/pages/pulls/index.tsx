import "./styles.scss";

import { PullRequest } from "api/models";
import PullRequestsList from "components/PullRequestsList";
import { observer } from "mobx-react-lite";
import { FC, useEffect, useState } from "react";
import store from "store";
import { $fetch } from "utils/api";
import { isAuthorized } from "utils/auth";

const Pulls: FC = () => {
  const [pulls, setPulls] = useState<PullRequest[]>([]);

  useEffect(() => {
    if (!store.user) {
      return;
    }

    const getPullRequests = async () => {
      const response = await $fetch(`/api/user/${store.user?.id}/pulls/`);
      const data = await response?.json();
      setPulls(data);
    };

    getPullRequests().finally();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.user]);

  if (!isAuthorized()) {
    window.location.assign("/auth");
  }

  return (
    <div className="pulls-page">
      <PullRequestsList pulls={pulls} />
    </div>
  );
};

export default observer(Pulls);
