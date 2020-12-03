# 巧用 Maven/Gradle 和 Git 命令简化开发流程

在这个风和日丽、阳光明媚、多云转晴的普普通通的夜晚…咳咳，走错片场了，其实我就是想刷刷存在，赶在今天最后半小时发出来，看看有没有 **单身 🐶**…不对，是 **孤 🐺** 和我一样沉迷学习无法自拔。

今天的内容很少（嗯哼，骗你们的，我还是发扬我的优良传统：**废话连篇**），也比较简单（此话不假），就是把平时相对比较繁琐的事情进行自动化，如果配合 CI 系统使用，效果更佳。

## 扯皮：本文初衷

> 可以略过这节，直接往后看。

正式开始之前，我想先问大家几个问题：

1. 你们（团队）的开发模式是什么样的，采用的哪种开发流程呢？[Git Flow](https://www.gitflow.com/) 还是？
   > 如果是 Git Flow，那么请往下看，如果不是，也往下看。
   >
   > 其实这个问题与今天的内容没有太大关系。 **这是一段废话**。

2) 你们用的是 [Maven](http://maven.apache.org) 还是 [Gradle](https://gradle.org)？

   > **这还是一段废话**。
   >
   > 如果是 Maven，那么恭喜你，这篇文章适合你；
   >
   > 如果是 Gradle，你可以考虑关掉页面了，今天的主要内容是针对 Maven 的。

3) 正经的问题来了，你有没有觉得每次发版要修改 pom.xml 很烦，尤其是多模块的项目？发版的时候还要把代码合并回主分支，然后打 Tag…然后…累么？

   > 如果你觉得烦，觉得累，是正常的。
   >
   > 如果没啥感觉、不累…那只有两个可能：
   >
   > > 1. 你们已经使用了各种自动化来简化体力劳动。
   > > 2. 这活不是你干。

## 正文：解放生产力

### Before

我们先来回顾一下开发写作文到发版的流程（排除开发、测试详细说明）：

1. 略去开发、分支测试阶段。
2. 本次需要发版的需求已经都合并完毕，准备进入 release 测试。
3. 新建 release 分支，同时将应用版本改为稳定（也可以等 release 测试接近尾声再改版本）。如：1.0.0-SNAPSHOT ==> 1.0.0。
4. 修改主分支上应用版本号到下一版本。如：1.0.0-SNAPSHOT ==> 1.0.1-SNAPSHOT。
5. release 测试接近尾声，准备发版。新建 release 分支的时候如果没改版本，可以在这里修改。
6. 基于 release 打一个 tag，作为发版的标记。
7. 发布版本。
8. 将 release 分支合并回主分支。
9. 一个发版流程结束。

::: tip 友情提示

第 6 步应该基于 master 分支打 tag。

实际的 Git Flow 中，步骤 6 - 8 的顺序应该为：8 --> 6 --> 7

:::

看了这个简化版的发布流程，你有没有觉得哪里是可以简化（自动化）的呢？没看出来也别担心，接着往下看。

### 优化流程

1. 新建 release 分支和修改主分支的版本（步骤 3、4）是不是可以 简化/合并 呢？
2. 6、7、8 是不是也可以合并呢？

> 到底能不能呢？让我们拭目以待。

#### 合并 3、4

- pom.xml

  ```xml
   <project>
       <groupId>com.keveon</groupId>
       <artifactId>demo</artifactId>
       <version>1.0.0-SNAPSHOT</version>
       <scm>
          <connection>scm:git:git://git@github.com/keveon/demo.git</connection>
          <developerConnection>scm:git:ssh://git@github.com/keveon/demo.git</developerConnection>
          <url>http://github.com/keveon/demo</url>
          <tag>master</tag>
       </scm>
       <!-- 此处省略属性定义、依赖管理等 -->
       <build>
           <plugins>
               <plugin>
                   <groupId>org.apache.maven.plugins</groupId>
                   <artifactId>maven-release-plugin</artifactId>
                   <configuration>
                       <!-- 定义 tag 格式 -->
                       <tagNameFormat>v@{project.version}</tagNameFormat>

                       <!-- 自动处理子模块 -->
                       <autoVersionSubmodules>true</autoVersionSubmodules>
                   </configuration>
               </plugin>
           </plugins>
       </build>
   </project>
  ```

- 新建 release 分支：

  > 因为 release 插件不支持直接创建 release 分支，所以配合其他命令完成这些操作

  ```bash
  ## 检出主分支，这里用了 gitlab-ci 的变量
  git checkout ${CI_COMMIT_REF_NAME}

  ## 定义 maven opts 变量
  MAVEN_CLI_OPTS=" ${MAVEN_CLI_OPTS} -Pfast -Ddisable.git-hooks"

  ## 执行 maven 命令，获取当前版本号，并去掉 `-SNAPSHOT` 字样
  version=$(mvn ${MAVEN_CLI_OPTS} exec:exec -q -N -Dexec.executable="echo" -Dexec.args='${project.version}' | awk -F '-' '{print $1}')

  ## 执行 maven 命令，检出一个 release 分支，并自动推送到服务器端
  mvn ${MAVEN_CLI_OPTS} release:branch -DbranchName=release/v${version}
  ```

#### 合并 6、7、8

> 在 [上一步](#合并-3、4) 的基础上，修改命令即可完成这部分流程的合并。

```bash
## 截取当前分支名，获取版本号
version=${CI_COMMIT_REF_NAME/release\//}

## 执行 git 命令，打 tag 并推送到服务器
git tag -a ${version} -m "Releasing ${version}" && git push --no-verify --tags

## 执行 git 命令，将 release 分支合并到主分支，并推送到服务器。
git checkout master && git merge origin/${CI_COMMIT_REF_NAME} && git push --no-verify
```

::: warning 注意

将 release 合并到主分支这一步，命令只是乐观的认为合并会成功，没有冲突。

实际上这一步允许失败，可能需要人工介入，手动合并分支。

:::

### After

最终我们的流程如下：

1. 略去开发、分支测试阶段。
2. 本次需要发版的需求已经都合并完毕，准备进入 release 测试。
3. 在 `某处` 点一个按钮（如：CI 系统中），触发新建 release 分支，同时修改主分支的版本号。
4. release 测试接近尾声，再去 `某处` 点另一个按钮，CI 会自动打 tag、自动合并 release 到主分支。
5. 发布版本。
6. 一个发版流程结束。

## 总结 & 扩展

- 经过优化之后，我们的流程虽然只是少了三个步骤，但是其中一个个繁琐重复的任务（如：检出主分支、新建 release、修改主分支版本……）都合并成了一个按钮，孰好孰坏，一看便知。
- 除了简化流程之外，还使开发测试的分工更为明确：
  - 以前：测试人员测试通过后，需要找开发去搞分支、改版本。（_如果你想抬杠，就没必要了哈_）
  - 现在：测试人员测试通过后，点一个按钮就可以进入下一阶段，再也不用找开发了。

在这个不起眼的角落里悄悄地贴上 `.gitlab-ci.yml` 内容：

```yaml
stages:
  - prepare
  - prebuild
  - test
  - build
  - deploy
  - cleanup
  - perform

#<editor-fold desc="Predefined only refs">
.only-default: &only-default
  only:
    refs:
      - master
      - merge_requests
      - /^release\/v.*$/
      - /^feature\/.*$/
      - /^bugfix\/.*$/
      - /^hotfix\/.*$/
.only-feature: &only-feature
  only:
    refs:
      - merge_requests
      - /^feature\/.*$/
      - /^bugfix\/.*$/
      - /^hotfix\/.*$/
.only-master: &only-master
  only:
    refs:
      - master
.only-release: &only-release
  only:
    refs:
      - /^release\/v.*$/
.only-merge_requests: &only-merge_requests
  only:
    refs:
      - merge_requests
.only-tags: &only-tags
  only:
    refs:
      - tags
#</editor-fold>

.before_script: &before_script
  before_script:
    - which ssh-agent || apk add openssh-client
    - eval $(ssh-agent -s)
    - echo "$SSH_PRIVATE_KEY" | tr -d '\r' | ssh-add - > /dev/null
    - mkdir -p ~/.ssh
    - chmod 700 ~/.ssh
    - echo -e "Host *\n\tStrictHostKeyChecking no\n\n" > ~/.ssh/config
    - git config --global user.name "CI Bot"
    - git config --global user.email "ci-bot@keveon.com"
    - sed -i 's/url = .*@/url = git@/' ${CI_PROJECT_DIR}/.git/config
    - sed -i 's/com\//com:/' ${CI_PROJECT_DIR}/.git/config

#<editor-fold desc="Release">
release:branch:
  <<: *only-master
  <<: *before_script
  stage: perform
  cache: {}
  dependencies: []
  when: manual
  script:
    - git checkout ${CI_COMMIT_REF_NAME}
    - MAVEN_CLI_OPTS=" ${MAVEN_CLI_OPTS} -Pfast -Ddisable.git-hooks"
    - version=$(mvn ${MAVEN_CLI_OPTS} exec:exec -q -N -Dexec.executable="echo" -Dexec.args='${project.version}' | awk -F '-' '{print $1}')
    - mvn ${MAVEN_CLI_OPTS} release:branch -DbranchName=release/v${version}
  tags:
    - maven
release:perform:
  <<: *only-release
  <<: *before_script
  stage: perform
  cache: {}
  dependencies: []
  when: manual
  allow_failure: true
  script:
    - version=${CI_COMMIT_REF_NAME/release\//}
    - git tag -a ${version} -m "Releasing ${version}" && git push --no-verify --tags
    - git checkout master && git merge origin/${CI_COMMIT_REF_NAME} && git push --no-verify
  tags:
    - git
#</editor-fold>
```

这篇文章其实只是一个开头，也是一一种思路的引导。

试想一下，如果 CI/CD 做的好，测试人员通过 `点点点` 就可以自己维护各种阶段的环境，同时也能一键式的控制进度，他们会减轻多少工作？

> 开发们别说我向着测试奥，测试有事没事的总得找你，改个版本吧、拉个分支吧，对你来说是好事？手里没活了？还做不做需求了？

文中其实留了两个坑，其中一个留一个留给大家来解决，有多种解决方式：

> 别担心，另一个坑是 unused，不会影响正常的流程，知道我说的是哪里的可以贴出给告诉大家奥[猥琐坏笑]。

问：如果我想跨版本发布，比如：1.0.0 --> 2.0.0，使用上边的说的这些插件、命令，能不能实现呢？要怎么实现？要尽量避免人工干预奥！

欢迎大家在留言区展开讨论，看看谁的方案更优雅。
