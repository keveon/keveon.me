# GitLab CI - 入门篇

前段使用发过一篇文章，只是对 `GitLab CI` 做了简单的介绍，之后一直没时间写 `续集`，今天我们来聊聊怎么用.

## 执行器

首先，我们需要复习下 `Runner` 的概念，我先说说对这个 Runner 的理解，可以举一个简单的例子，GitLab CI 是个工头，而一个个的 Runner 就是一位位的工人，GitLab CI 负责收集和分发任务，Runner 负责执行。

Runner 有多种执行器(executor，我理解成不同的工种，工作环境和能力不同)：

- ssh
- virtualbox
- docker-ssh+machine
- docker
- shell
- docker+machine
- kubernetes
- docker-ssh
- parallels

每一种不同的执行都有不同的能力，比如 `ssh` 通过 `shell` (俗称黑窗口) + `ssh`(一种支持远程免密登录、远程执行命令的方式) 远程执行命令来达到自动构建、远程部署等功能; 而 `docker`（有关 docker 的概念 ADC 内有很多帖子，就不在探讨了）则是通过运行一些 docker 容器(如: maven:3-jdk8 等) 来达到构建、部署的目的。多种执行器可以相互配合使用。我们团队目前就采用 docker 执行器跑 maven 构建打包, 然后通过 ssh 远程部署达到 CI + CD 的目的.

::: tip 友情提示

- 本人不建议使用 Windows Server + SSH 方式, 一个原因是 `*Unix` 比 Windows 更适合做服务器，我是属于亲 `Unix` 和 `Unix Like`派（这个能算一个理由么？我认为算^\_^）；
- 另一个是因为 Windows 系统的 `cmd` 或者 `PowerShell` 对 `ssh` 支持不好，远程执行命令较麻烦（也可能是本人能力有限），比较适合 `Local` 部署；
- 另外，不论是 cmd 还是 powerShell，极容易中文乱码（哪怕服务器本身就是中文系统），需要修改一些配置（网上很多，不赘述了，需要的自行谷歌，没梯子的可以用必应），不过即便是改了配置，在 `maven` 打包项目依然乱码，这种情况我翻了无数帖子，目前仍然无解，如果有知道的希望可以分享出来。

:::

说了这么多，大家对 GitLab CI 和 Runner 有了更深一步的了解了吧？ 接下来我们上点干货.

## 快速开始

### 下载安装 gitlab-ci-multi-runner

首先，要下载安装 gitlab-ci-multi-runner，上一篇文章已经讨论过了，不在复述，还没看过的小伙伴们可以参考 [开发过程中使用 GitLab CI 进行持续部署(简介及安装)](http://artery.thunisoft.com/form/5f31836588723b4adbe808c2d4434c1a/insert?id=2f187196be6d467db87ba1a0f004ba58).

### Register

`GitLab CI` 与 `Jenkins` 的最大的区别（自认为的哈，非官方说法），就是 GitLab CI 需要下载安装 Runner， 并在项目根目录加入 `.gitlab-ci.yml` 配置文件，GitLab CI 会解析此文件的内容，分配对应的 Runner 进行执行；而 Jenkins 则不需要对项目做任何修改，所有配置在 Jenkins 提供的 UI 完成，对项目没有任何 `侵入性`。

1. 安装好 Runner 后，可以先运行 `gitlab-runner -v` 或者 `gitlab-ci-multi-runner -v`，查看下版本，目前公司的 GitLab 版本不支持太新的 Runner，GitLab 9.0+ 之后，对 Runner 的版本进行了调整，加入了大量新的特性，并且不向下兼容，目前使用 1.x 基本不会有问题，以下是我们使用的 Runner 的版本信息.

   ![GitLab Runner 版本信息](http://ww1.sinaimg.cn/large/006nQ2IFly1g0x6ugk0awj30fg074gmr.jpg)

2. 确认版本后，打开 [GitLab](http://gitlab.thunisoft.com) 页面，进入到对应的项目设置(我们此次注册的 Runner 为 `Specific Runner`，不了解的请参考我上一篇文章)，找到 `Runners` 一项，可以看到对应的注册时需要的信息.

   ![注册Runner信息获取](http://ww1.sinaimg.cn/large/006nQ2IFly1g0x6v6jczyj317q0diac1.jpg)

3. 在命令行执行命令 `gitlab-runner register`（此处需要注意，可以*不*使用 `root` 权限执行，不同用户执行注册，Runner 的配置文件存放位置不同，root 权限注册后，配置文件在 `/etc/gitlab-runner/config.toml`，不同用户执行，配置文件在当前用户主目录下，此处的配置文件 _不是_ 项目中的那个，后续我们会聊到，暂时不用太过关注）。

   ![Register](http://ww1.sinaimg.cn/large/006nQ2IFly1g0x6vrpy9sj310707vab1.jpg)

- 输入 Gitlab CI 地址, (e.g. http://gitlab.thunisoft.com/ci)，上一步获取的 `链接` 的值.
- 输入项目 CI token，上一步获取到的 `注册授权码` 的值.
- 输入 Runner 描述（e.g. home.xl9.xunlei.com 测试 runner），给 Runner 起个名字，可以包含空格（没试过中文）
- 输入 Runner 标签，可以多个，用逗号隔开（e.g. 10.10.34.91-dev），给 Runner 打个标签，在 `.gitlab-ci.yml` 指定 某个任务由指定 `tag` 的 Runner 运行.
- 指定此 Runner 是否可以运行无 `tag` 的任务，先填 `false`，稍后我们我说到.
- 输入 Runner 执行器 (e.g. shell)，此处我们选 `shell`，下次再讲 `docker`.

注册完成之后，GitLab-CI 立刻就会多出一条 Runner 记录, 刷新刚才步骤二的页面看到，如果刚才新增的 runner 显示为红色或灰黑色，鼠标悬浮提示 `Stoped`，回到 `黑窗口` 执行 `gitlab-runner install && gitlab-runner start`，需要和 `register` 用同一个用户.

至此， Register 阶段结束.

### 新建 .gitlab-ci.yml

准备工作做了这么多，还是没说到底怎么用？别急，磨刀不误砍柴工，我是一个啰嗦的人，啰嗦起来没完没了……好了，言归正传，接下来我们来了解下配置文件的语法.

.gitlab-ci.yml 使用 `yaml` 语法，你需要格外注意缩进格式，要用空格来缩进，不能用 `tab` 键来缩进. 不知道什么是 `yaml` ，自行谷歌必应.

.gitlab-ci.yml 用来配置 CI 用你的项目中做哪些操作，这个文件位于仓库的根目录。当有新内容 `push` 到仓库后，GitLab 会查找是否有 `.gitlab-ci.yml` 文件，如果文件存在，Runners 将会根据该文件的内容开始根据文件中的配置执行.

先来一段简单的配置，在项目根目录新建 `.gitlab-ci.yml` 文件，内容如下：

```yaml
stages:
  - test
test:
  stage: test
  script:
    - echo "Hello!"
	- echo 'This is a test stage'
```

其中：

- stages: 可以自定义流程，比如： test -> build -> deploy，值为数组，yaml 中使用 `-` 标记为一个数组元素.
- 第二行的 test 就是自定义的流程的名, 可以随便写，本人建议避免使用汉字.
- 第三行的 test 可以不和第二行一样，也是可以随便写，这个名字将会显示在 gitlab 的 build 或者 pipelines 页面的.
- 第四行语法为 stage: stage-name，此处的 stage-name 必须为 stage 里边已经定义的值才行.
- script： 要执行的脚本（或命令），如： `mvn test`、 `mvn install -DskipTests` 等.

### 推送构建配置文件

配置好 `.gitlab-ci.yml` 文件之后，只要把它加入 `git` 后然后推送到远程仓库，CI 就会开始自动化构建及自动部署.

### 查看可视化的构建过程

Gitlab CI 提供了可视化的构建过程的显示可以随时查看，在 gitlab 页面中，有 `build（构建`）、 `pipelines（管道）` 两个子页面，进入可以看到对应的视图.

- build: 每一条 stages 都会有单独的一条记录，此处是查看单个构建流程的情况的.

  ![build list](http://ww1.sinaimg.cn/large/006nQ2IFly1g0x6wxcyo8j317n08mab8.jpg)

点击 `状态` 下方的按钮可以跳转到详情，此处不贴图了.

- pipelines: 每一次提交代码需要执行的所有 stages 都会在此处生成一条记录。

  ![pipelines](http://ww1.sinaimg.cn/large/006nQ2IFly1g0x6xalbeaj317q07ygm8.jpg)

- `ID` 下方按钮可以点击，效果同 `build`，按钮颜色表示此次提交所执行的所有 stages 的结果： `绿色` 为全部成功，`红色` 为存在失败的任务，`灰色`为取消任务，`橙色`为等待执行或正在运行（此标记会在 GitLab 9.0+ 之后分开为两种不同的颜色）

现在只表述部分常用的，GitLab 9.0+ 之后会进行 UI 调整，更美观、直观，也更简洁一些，部分功能会调整位置，所以不再赘述。

今天的内容就这么多，下次我们继续聊 `docker executor` 和 `.gitlab-ci.yml` 语法进阶.

本人文笔较糙，也比较啰嗦，但是分享精神很强啊[害羞]，希望我的水文能对大家有点用处；有什么疑问、意见或者建议都可以提出来，欢迎批评(ｖ＾＿＾)ｖ
