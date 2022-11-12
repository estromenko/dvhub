import "./styles.scss";

import { PullRequest } from "api/models";
import PullRequestsList from "components/PullRequestsList";
import { observer } from "mobx-react-lite";
import { FC, useEffect, useState } from "react";
import store from "store";
import { $fetch } from "utils/api";

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
  }, []);

  return (
    <div className="pulls-page">
      <PullRequestsList pulls={pulls} />
    </div>
  );
};

export default observer(Pulls);
