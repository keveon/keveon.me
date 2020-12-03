---
sidebarDepth: 3
---

# 工具篇

继上一篇的 [别人家的帖子](Introduction.md) 开场之后，这一篇给大家分享一些提升代码质量的工具。

> 从这篇开始是原创喽。

今天的内容大致分为两部分：[Jetbrains 插件](#jetbrains-插件) 和 [Maven 插件](#maven-插件)，期间会穿插一些 C/S 架构 [^cs] 的代码扫描工具。

[^cs]: C/S 架构: 即有 `服务端` 和 `客户端` 之分的应用架构，比如我们平时使用的手机 APP：QQ、微信、浏览器等。类似的还有 B/S 架构，即不需要单独安装，直接用浏览器访问的应用，比如你现在看到的这个页面。

## Jetbrains 插件

> 这里我就默认大家都是使用 Jetbrains 家族的 IDE [^ide] 了哈，这里介绍的插件基本适用于 Jetbrains 全家桶的所有 IDE。

[^ide]: IDE: 即: `Integrated Development Environment`，全称 `集成开发环境`，用于提供程序开发环境的应用程序，一般包括代码编辑器、编译器、调试器和图形用户界面等工具。集成了代码编写功能、分析功能、编译功能、调试功能等一体化的开发软件服务套。所有具备这一特性的软件或者软件套（组）都可以叫集成开发环境。

Jetbrains 系列 IDE 中插件的搜索安装就不再赘述，不知道的可以查看 [附录 A：Jetbrains 插件安装](#附录-a：jetbrains-插件安装)

### Sonar Lint

第一个必须是 `SonarLint` 了，我知道的大部分公司用来检查代码规范的工具, 就是 [SonarQube](https://www.sonarqube.org/)，对于 SonarQube 我就不过多介绍了，这里主要聊一聊 `Sonar Lint` 这款 IDEA 插件，理论上 Jetbrains 全家桶都可以用。

1. 安装部分就省略掉了，直接进入配置环节。
2. 安装插件并重启后，打开系统设置，找到如图所示的选项：

   ![](https://files.keveon.com/images/wvwcr.png)

3. 点击 `+` 新增一个后端服务。

   > 1. 如果你们公司不是用 SonarQube 扫描代码，或者没有一个公共的后端，可以省略步骤 3 - 5，SonarLint 可以独立使用。
   > 2. 绑定服务端的好好处是可以统一管理规则，方便自定义一些检查规则，如果是独立运行（单机版），是享受不到规则实时更新、统一管理等特性的。

   ![](https://files.keveon.com/images/on8je.png)

4. 选择 `token` 或 `username/password` 进行认证，填入必要的信息后，服务器配置完成。

   ![](https://files.keveon.com/images/pxilb.png)

   ![](https://files.keveon.com/images/mlqrg.png)

5. 切换至项目配置，将当前项目与服务端项目进行绑定：

   ![](https://files.keveon.com/images/qw90k.png)

6. 当我们编写了不规范的代码时，效果大致如图所示：

   ![](https://files.keveon.com/images/yfbsv.png)

7. 还可以配置成在提交代码之前先检查一遍修改了的文件：

   ![](https://files.keveon.com/images/8925x.png)

   ![](https://files.keveon.com/images/bjuu3.png)

### CheckStyle

CheckStyle 也是我们经常会用到的插件之一，贴心的社区大佬们贡献了 IDEA 版本的插件，名叫 `CheckStyle-IDEA`。

1. 我们搜索安装这个插件，安装完成后重启 IDE 即可使用：

   ![](https://files.keveon.com/images/dx2pk.png)

2. 默认情况下，直接使用默认配置即可。如果想定制规则，直接修改配置即可。

   ![](https://files.keveon.com/images/sxa6d.png)

3. 这个插件也支持在提交代码前进行检查：

   ![](https://files.keveon.com/images/sq848.png)

### FindBugs

除了 CheckStyle 以外，我们也经常需要检测代码的安全性，这时候就用到了 FindBugs 插件，同样是 IDEA 版本的，名叫 `FindBugs-IDEA`。

1. 同上，我们搜索安装这个插件，安装完成后重启 IDE 即可使用：

   ![](https://files.keveon.com/images/ntov2.png)

2. 默认情况下，直接使用默认配置即可。如果想定制规则，直接修改配置即可。

   ![](https://files.keveon.com/images/rp2r8.png)

3. 这个插件也支持在提交代码前进行检查：

   ![](https://files.keveon.com/images/trm43.png)

### Alibaba Java Coding Guidelines

论代码检查插件，怎么说也不能少了 `Alibaba Java Coding Guidelines`，再怎么说，阿里巴巴也是目前国内最大的，将 Java 作为主语言的公司（没有之一，不接受反驳），同时也是 `阿里巴巴代码规约` 发起者，在代码质量方面，必然是要参考下人家的意见的。

这个插件和另外几个插件有个区别：另外几个都是不针对某种语言的，支持检查多种语言，而 `Alibaba Java Coding Guidelines` 主攻 Java，附带查点其他的。

1. 第一步依然是啰里八嗦的安装了：

   ![](https://files.keveon.com/images/jvj27.png)

2. 安装完成后，可以在系统工具栏（Toolbar）看到相关的按钮：![](https://files.keveon.com/images/zn1sm.png)

3. 这个插件会自动扫描代码，当然也可以手动触发：点击左边那个绿色的按钮就行了。

4. 当然也支持提交代码前扫描：

   ![](https://files.keveon.com/images/gxc00.png)

5. 更多的细节我就不再多说了，看官方文档就行了：<https://github.com/alibaba/p3c/blob/master/idea-plugin/README_cn.md>

## Maven 插件

说了这个多 Jetbrains/IDEA 的插件，再来说说 Maven 插件。

> 为什么选择 Maven 而不是 Gradle 呢？（虽然 Gradle 要强大的多，而且我也比较喜欢 Gradle）。原因很简单，公司里用的都是 Maven。我的小伙伴们基本都是对 Maven 比较熟悉。

### CheckStyle & FindBugs

一上来肯定是两大代码质量检查的插件咯。

这两个插件口碑还不错，使用人群应该也比较多（毫无依据的说…），主要是年代久远，都存在了好些年了。

前者配置比较复杂（其实就是麻烦，懒得弄），也没什么界面可言，这里就不配图了，啰嗦几句就得了。

后者呢基本已经不维护了，且有替代品，所有也不配图了，我们直接进入下一步。

### SpotBugs

- 作为 `FindBugs` 的替代者，[SpotBugs](https://spotbugs.github.io/) 提供了对 FB 的完整兼容，同时扩展了一些其他规则，并且支持以插件的方式附加规则.
- 同时提供了 `Ant`、`Maven`、`Gradle`、`Eclipse` 的支持，`IDEA` 版本插件是由于 `FindBugs` 插件的版权等问题，还在与 Jetbrains 等相关机构协商中。希望不久的将来可以正常使用。
- 更多细节请参考官网：<https://spotbugs.github.io/>
- 话不多说，直接上配置：

```xml
<plugins>
    <plugin>
        <groupId>com.github.spotbugs</groupId>
        <artifactId>spotbugs-maven-plugin</artifactId>
        <version>${spotbugs-maven-plugin.version}</version>
        <executions>
            <execution>
                <id>spotbugs-check-verify</id>
                <phase>verify</phase>
                <goals>
                    <goal>check</goal>
                </goals>
            </execution>
            <execution>
                <id>spotbugs-spotbugs-site</id>
                <phase>site</phase>
                <goals>
                    <goal>spotbugs</goal>
                </goals>
            </execution>
        </executions>
        <configuration>
            <plugins>
                 <plugin>
                     <groupId>com.h3xstream.findsecbugs</groupId>
                     <artifactId>findsecbugs-plugin</artifactId>
                     <version>LATEST</version>
                 </plugin>
                 <plugin>
                     <groupId>com.mebigfatguy.fb-contrib</groupId>
                     <artifactId>fb-contrib</artifactId>
                     <version>7.4.3.sb</version>
                 </plugin>
            </plugins>
        </configuration>
        <dependencies>
            <dependency>
                <groupId>com.github.spotbugs</groupId>
                <artifactId>spotbugs</artifactId>
                <version>4.0.0-beta1</version>
            </dependency>
        </dependencies>
    </plugin>
</plugins>
```

### PMD & P3C

说完了 `FindBugs` 和 `SpotBugs` 的爱恨情仇，再来谈谈 `PMD` 和 `P3C` 的前世今生。

- [PMD](http://maven.apache.org/plugins/maven-pmd-plugin/) 插件允许您在项目的源代码上自动运行 PMD 代码分析工具，并生成包含其结果的站点报告。该插件接受可用于自定义 PMD 工具执行的配置参数。
- [P3C](https://github.com/alibaba/p3c) 阿里云栖大会最新开源的 Java 代码规范检查工具 p3c， 作用类似于 CheckStyle, 是《阿里巴巴 Java 开发手册》的有效补充， 形成了 Java 代码规范的闭环。
  > P3C 是老美的先进反潜侦察机，新闻里经常能看到； 阿里将代码规范检查插件命名为 p3c，大概就是取其先进、监测的意思吧。
- 还是直接上配置，不懂得可以去官网寻求帮助：

```xml
<plugins>
    <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-pmd-plugin</artifactId>
        <version>${maven-pmd-plugin.version}</version>
        <configuration>
            <skip>${disable.checks}</skip>
            <sourceEncoding>${project.build.sourceEncoding}</sourceEncoding>
            <targetJdk>${java.version}</targetJdk>
            <printFailingErrors>true</printFailingErrors>
            <rulesets>
                <ruleset>rulesets/java/ali-comment.xml</ruleset>
                <ruleset>rulesets/java/ali-concurrent.xml</ruleset>
                <ruleset>rulesets/java/ali-constant.xml</ruleset>
                <ruleset>rulesets/java/ali-exception.xml</ruleset>
                <ruleset>rulesets/java/ali-flowcontrol.xml</ruleset>
                <ruleset>rulesets/java/ali-naming.xml</ruleset>
                <ruleset>rulesets/java/ali-oop.xml</ruleset>
                <ruleset>rulesets/java/ali-orm.xml</ruleset>
                <ruleset>rulesets/java/ali-other.xml</ruleset>
                <ruleset>rulesets/java/ali-set.xml</ruleset>
            </rulesets>
        </configuration>
        <executions>
            <execution>
                <id>pmd-check-verify</id>
                <phase>verify</phase>
                <goals>
                    <goal>check</goal>
                </goals>
            </execution>
            <execution>
                <id>pmd-pmd-site</id>
                <phase>site</phase>
                <goals>
                    <goal>pmd</goal>
                </goals>
            </execution>
        </executions>
        <dependencies>
            <dependency>
                <groupId>com.alibaba.p3c</groupId>
                <artifactId>p3c-pmd</artifactId>
                <version>${p3c-pmd.version}</version>
            </dependency>
        </dependencies>
    </plugin>
</plugins>
```

```xml
<!-- 用于生成错误到代码内容的链接 -->
<reporting>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-jxr-plugin</artifactId>
            <version>2.3</version>
        </plugin>
    </plugins>
</reporting>
```

### Git Hook

上边说到，IDEA 有提交代码前检查的机制，Maven 有么？当然没有，Maven 只是个包管理器，又不是版本管理器…，不过 Git 有，Git 提供了一种叫做 Hook 的机制（中文名叫钩子）。

- 简单来讲，Git 允许在提交代码前、后等时机，对代码进行一些操作（或者可以执行一些命令之类的操作）。

- 对于 Git Hook 的能力，我们不深入展开，不过我们利用这种能力，可以在提交代码前进行检查，比如可以执行上边说的几个 Maven 插件。

- 由于 Git Hook 的一些限制[^git-hook-limit]，我们需要用到 `Git Hook`，这个插件可以在执行任意 Maven 命令时，将我们配置的命令生成脚本，安装在 `.git/hooks` 目录下。

- `pre-commit` 代表 `commit` 之前, `pre-push` 代表 `push` 之前，其他阶段请参考 Git 官方文档：<https://git-scm.com/book/zh/v2/%E8%87%AA%E5%AE%9A%E4%B9%89-Git-Git-%E9%92%A9%E5%AD%90>

- 我们还是直接上代码：

```xml
<plugins>
    <plugin>
        <groupId>io.github.phillipuniverse</groupId>
        <artifactId>githook-maven-plugin</artifactId>
        <version>${githook-maven-plugin.version}</version>
        <executions>
            <execution>
                <goals>
                    <goal>install</goal>
                </goals>
                <configuration>
                    <hooks>
                        <pre-commit>
                            echo "==========================="
                            echo ""
                            echo ""
                            echo "Checking code style and security."
                            echo ""
                            echo ""
                            echo "==========================="
                            exec mvn -B -e -ff -Dfile.encoding=UTF-8 clean compile pmd:check spotbugs:check
                        </pre-commit>
                        <pre-push>
                            echo "==========================="
                            echo ""
                            echo ""
                            echo "Running unit tests."
                            echo ""
                            echo ""
                            echo "==========================="
                            exec mvn -B -e -ff -Dfile.encoding=UTF-8 clean install
                        </pre-push>
                    </hooks>
                </configuration>
            </execution>
        </executions>
    </plugin>
</plugins>
```

- 最后，`commit` 和 `push` 的时候会有如下选项（默认选中状态）（即便是使用命令行提交也是默认会执行 hook）：

  ![](https://files.keveon.com/images/1zl2v.png)

  ![](https://files.keveon.com/images/fezul.png)

[^git-hook-limit]: Git Hook 大致分为两种，一个在服务端，一种放在本地。其中，本地的 hook 不受版本控制器的管理，也就是说我们没办法把写好的 hook 脚本放在仓库里，供小伙伴们下载、使用（人工干预除外）。

## 附录 A：Jetbrains 插件安装

Jetbrains 家的软件，都有一个很强大的插件系统，除了官方会给出的一系列非常实用的插件，还有活跃的社区里的大佬们贡献的非常有用(或者有趣)的插件。

插件仓库的使用也比较简单：

1. 使用快捷键呼出系统设置，在 Windows/Linux 下使用 [[Ctrl]] + [[Alt]] + [[S]]，在 Mac 下使用 [[Command]] + [[,]]，设置页如下图所示：

   ![](https://files.keveon.com/images/5jkb5.png)

2. 选择 `Plugins`，看到如下图所示界面。其中两个页签分别代表了插件仓库（或者叫插件市场也行）、已安装/待更新。如果你用的不是最新版本(19.2)，应该是三个页签，已安装和待更新是分开的。

   ![](https://files.keveon.com/images/601fi.png)

   ![](https://files.keveon.com/images/manon.png)

3. 在 `Marketplace` 页签的搜索框中输入我们想要的插件，可以看到如下图所示的结果（老版本需要手动回车执行搜索）：

   ![](https://files.keveon.com/images/18oah.png)

4. 找到我们想要安装的插件，点击对应的 `Install` 按钮，即可开始安装。安装完成后点击 `Restart IDE` 进行重启，重启后插件生效。

   ![](https://files.keveon.com/images/rz3f7.png)

   ![](https://files.keveon.com/images/lz06y.png)

## 附录 B：其他好用的效率插件

按说这部分内容不应该放在这里，毕竟严格意义上讲，这些内容不算是代码复查相关的，不过既然已经说了这么多插件相关的，也不差这几个了。

### JavaDoc2

上边说的都是阻止提交代码的，是不是感觉有点嫌弃？现在开始缓缓口味，生成代码的你喜不喜欢？

1. 搜索安装 `JavaDoc2`，一键生成 JavaDoc，老大再也不用担心我的代码没有注释了。一般不建议使用，除非你的代码本身就可以表意，写文档注释只是为了改 Sonar 问题。

   ![](https://files.keveon.com/images/p2uv9.png)

2. 在顶部菜单栏找到对应选项，一键生成或移除文档注释。

   ![](https://files.keveon.com/images/h9py2.png)

3. 不同系统快捷键各不相同，自行发掘吧。

   ::: tip 友情提示

   这个插件的快捷键会很容易和其他软件冲突，如果发现快捷键不好使，检查一下你是不是开了有道云笔记、有道翻译、网易云等软件，必要时请自行修改快捷键。

   :::

   ![](https://files.keveon.com/images/acwb8.png)

### Custom Postfix Templates

只是生成文档注释不过瘾？别担心，`Custom Postfix Templates` 可以生成大量的模版代码。

1. 插件的安装还是老套路：

   ![](https://files.keveon.com/images/v1n5m.png)

2. 使用也比较简单，直接上图：

   :::: theorem

   ![Custom Postfix Templates](https://raw.githubusercontent.com/xylo/intellij-postfix-templates/master/videos/vid1/vid1.png)

   ::: center

   Custom Postfix Templates for Intellij IDEA（图片来源于[插件官网](https://github.com/xylo/intellij-postfix-templates)）

   :::

   ::::
