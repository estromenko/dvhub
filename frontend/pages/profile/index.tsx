import "./styles.scss";

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
      <ul>
        <li>{store.user!.username}</li>
        <li>Email: {store.user!.email}</li>
        <li>Joined at: {store.user!.date_joined}</li>
      </ul>
    </div>
  );
};

export default Profile;
