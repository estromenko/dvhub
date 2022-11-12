export type Branch = {
  id: number;
  name: string;
};

export type User = {
  email: string;
  id: number;
  is_staff: boolean;
  username: string;
};

export type Repository = {
  branches: Branch[];
  id: number;
  name: string;
  owner: User;
  public: boolean;
};

export type PullRequest = {
  created_at: string;
  id: number;
  name: string;
  owner: User;
  repository: Repository;
};
