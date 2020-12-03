# 使用 GitLab CI 的持续集成(简介及安装)

## 持续集成介绍

### 概念

要了解 GitLab CI 与 GitLab Runner，我们得先了解持续集成是什么。

::: tip

软件集成是软件开发过程中的一个环节，这个环节的工作一般会包括以下流程：合并代码 -> 安装依赖 -> 编译 -> 测试 -> 发布。

软件集成的工作一般会比较细碎繁琐，为了不影响开发效率，以前软件集成这个环节一般不会经常进行或者只会等到项目后期再进行。但是有些问题，如果等到后期才发现，解决问题的代价很大，有可能导致项目延期或者失败。因此，为了尽早发现软件集成错误，鼓励团队成员应该经常集成他们的工作，通常每个成员每天应该至少集成一次。这就是所说的持续集成。

所以说，持续集成是一种软件开发实践。软件集成的工作细碎繁琐，以前是由人工完成的。但是现在鼓励持续集成，那岂不是要累死人，还影响开发效率。所以，应该考虑将软件集成这个工作自动化，这就出现了所谓的持续集成系统。

:::

持续集成详情见 [百度百科-持续集成](http://baike.baidu.com/link?url=juSMz10zJo0hOiXgDOOdaMJGk2zoQqcXyDSE6f27iXZ_GbQA75jS6ky473H982csWAPVkjKtRRIEdXHspk3x8K)

### 持续集成的好处

1. **快速发现错误**。每完成一点更新，就集成到主干，可以快速发现错误，定位错误也比较容易。
2. **防止分支大幅偏离主干**。如果不是经常集成，主干又在不断更新，会导致以后集成的难度变大，甚至难以集成。

## GitLab CI（Continuous Integration）

GitLab-CI 就是一套配合 `GitLab` 使用的持续集成系统（当然，还有其它的持续集成系统，同样可以配合 Gitlab 使用，比如 Jenkins、TeamCity）。而且 GitLab8.0 以后的版本是默认集成了 GitLab-CI 并且默认启用的。

## GitLab Runner

### 简介

GitLab-Runner 是配合 GitLab-CI 进行使用的。一般地，GitLab 里面的每一个工程都会定义一个属于这个工程的软件集成脚本，用来自动化地完成一些软件集成工作。当这个工程的仓库代码发生变动时，比如有人 push 了代码，GitLab 就会将这个变动通知 GitLab-CI。这时 GitLab-CI 会找出与这个工程相关联的 Runner，并通知这些 Runner 把代码更新到本地并执行预定义好的执行脚本。

所以，GitLab-Runner 就是一个用来执行软件集成脚本的东西。你可以想象一下：Runner 就像一个个的工人，而 GitLab-CI 就是这些工人的一个管理中心，所有工人都要在 GitLab-CI 里面登记注册，并且表明自己是为哪个工程服务的。当相应的工程发生变化时，GitLab-CI 就会通知相应的工人执行软件集成脚本。如下图所示：

![GitLab-CI与GitLab-Runner关系示意图](http://artery.thunisoft.com/resFile?name=img/201707/f295fc51f4fc48bc9a82d21cb4110e42.png)

### Runner 类型

GitLab-Runner 可以分类两种类型：Shared Runner（共享型）和 Specific Runner（指定型）。

- `Shared Runner`：这种 Runner（工人）是所有工程都能够用的。只有系统管理员能够创建 Shared Runner。

- `Specific Runner`：这种 Runner（工人）只能为指定的工程服务。拥有该工程访问权限的人都能够为该工程创建 Specific Runner。

### GitLab-Runner 的安装与使用

::: tip

GitLab Runner 支持 Windows、 Unix 及 Unix-Like 系统.

:::

#### 使用官方 GitLab 存储库

- 目前支持：
- Debian
- Ubuntu
- RHEL
- CentOS

- 添加 GitLab 的官方存储库

```bash
# For Debian/Ubuntu
curl -L https://packages.gitlab.com/install/repositories/runner/gitlab-ci-multi-runner/script.deb.sh | sudo bash

# For RHEL/CentOS
curl -L https://packages.gitlab.com/install/repositories/runner/gitlab-ci-multi-runner/script.rpm.sh | sudo bash
```

- 安装 gitlab-ci-multi-runner

```bash
# For Debian/Ubuntu
sudo apt-get install gitlab-ci-multi-runner

# For RHEL/CentOS
sudo yum install gitlab-ci-multi-runner
```

- 升级 gitlab-ci-multi-runner

```bash
# For Debian/Ubuntu
sudo apt-get update
sudo apt-get install gitlab-ci-multi-runner

# For RHEL/CentOS
sudo yum update
sudo yum install gitlab-ci-multi-runner
```

::: warning

注意由于 GitLab CI 9.0+ 仅支持 GitLab 9.0+，请注意选择版本.

:::

#### 手动下载安装包

<https://packages.gitlab.com/runner/gitlab-ci-multi-runner>

由于 GitLab Runner 种类繁多, 本篇文章就先介绍到这, 更多细节会在后续文章介绍, 敬请关注.
