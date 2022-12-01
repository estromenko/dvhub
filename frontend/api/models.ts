export type User = {
  email: string;
  id: number;
  is_staff: boolean;
  username: string;
  date_joined: string;
};

export type Repository = {
  branches: string[];
  id: number;
  name: string;
  owner: User;
  public: boolean;
  files: string[];
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
  branch_from: string;
  branch_to: string;
  repository: Repository;
  comments: PullRequestComment[];
  status: string;
};

export type IssueComment = {
  id: number;
  text: string;
  owner: User;
  created_at: string;
};

export type Issue = {
  created_at: string;
  id: number;
  name: string;
  owner: User;
  repository: Repository;
  comments: IssueComment[];
  status: string;
};

export type SSHKey = {
  id: number;
  name: string;
  created_at: string;
  key: string;
};
