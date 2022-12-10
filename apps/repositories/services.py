import shutil

import git
from django.conf import settings
from git import NoSuchPathError


class RepositoryService:
    @staticmethod
    def initialize_repository(user, name, add_readme=True):
        repo_path = settings.REPOSITORIES_DIR / user.username / name
        repo = git.Repo.init(repo_path)

        with repo.config_writer() as config:
            config.set_value('user', 'email', user.email)
            config.set_value('user', 'username', user.username)

        if add_readme:
            with open(repo_path / 'README.md', 'w', encoding='utf-8') as file:
                file.write(f'## {name}')

            repo.git.add(repo_path / 'README.md')
            repo.git.commit(m='Initial commit')

        git_command = git.cmd.Git(repo.working_dir)
        git_command.update_server_info()

        return repo

    @staticmethod
    def get_repository(username, name):
        try:
            return git.Repo(settings.REPOSITORIES_DIR / username / name)
        except (git.InvalidGitRepositoryError, NoSuchPathError):
            return None

    @staticmethod
    def delete_repository(username, name):
        shutil.rmtree(settings.REPOSITORIES_DIR / username / name)
