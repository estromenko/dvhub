import "./styles.scss";

import SSHKeysList from "components/SSHKeysList";
import { FC, useEffect } from "react";

import store from "../../store";
import { isAuthorized } from "../../utils/auth";

const Profile: FC = () => {
  useEffect(() => {
    if (!isAuthorized()) {
      window.location.assign("/auth");
    }
  }, []);

  return (
    <div className="profile-page">
      <div className="profile-page__row">
        <ul>
          <li>{store.user!.username}</li>
          <li>Email: {store.user!.email}</li>
          <li>Joined at: {store.user!.date_joined}</li>
        </ul>
        <SSHKeysList />
      </div>
    </div>
  );
};

export default Profile;
