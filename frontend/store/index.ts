import { User } from "api/models";
import { makeAutoObservable } from "mobx";
import { $fetch } from "utils/api";

export class Store {
  user?: User = undefined;

  constructor() {
    makeAutoObservable(this);
  }

  setUser(user?: User) {
    this.user = user;
  }

  async init() {
    const response = await $fetch("/api/user/current/");
    this.setUser(await response?.json());
  }
}

const store = new Store();

export default store;
