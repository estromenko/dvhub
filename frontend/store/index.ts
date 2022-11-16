import { User } from "api/models";
import Cookie from "js-cookie";
import { makeAutoObservable } from "mobx";
import { $fetch } from "utils/api";
import { accessTokenKey, refreshTokenKey } from "utils/auth";

export class Store {
  user?: User = undefined;

  constructor() {
    makeAutoObservable(this);
  }

  setUser(user?: User) {
    this.user = user;
  }

  async init() {
    if (Cookie.get(accessTokenKey) && Cookie.get(refreshTokenKey)) {
      const response = await $fetch("/api/user/current/");
      this.setUser(await response?.json());
    }
  }
}

const store = new Store();

export default store;
