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

export type PullRequestComment = {
  id: number;
  text: string;
  owner: User;
  created_at: string;
};

export type PullRequest = {
  created_at: string;
  id: number;
  name: string;
  owner: User;
  branch_from: Branch;
  branch_to: Branch;
  repository: Repository;
  comments: PullRequestComment[];
  status: string;
};
