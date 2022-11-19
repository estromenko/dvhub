import git


def _tree_to_list(list_, tree):
    updated_list = list_.copy()

    for index, file in enumerate(tree):
        if isinstance(file, git.Blob):
            updated_list.append(file.path)
        else:
            return _tree_to_list(updated_list, file)

    return updated_list


def tree_to_list(tree):
    return _tree_to_list([], tree)
