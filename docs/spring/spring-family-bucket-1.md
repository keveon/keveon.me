# 万字长文带你领略 Spring 全家桶带来的极速开发体验

::: warning 郑重声明

本文及配套源码，均出自本人原创，转载请注明出处，本文永久链接：<https://keveon.me/spring/spring-family-bucket-1.html>

:::

::: tip 友情提示

本文篇幅较长，算上一些凑数的，全文共 `27798` 字，同时包含大量的图片，阅读时间可能较长。为保证良好的阅读体验，建议使用谷歌等现代化浏览器打开。

:::

本人做为一名后台开发，正如博客首页的描述，我很懒，懒得写一些看起来没啥意义还不得不写的样板代码。直到有一天，尝试了下我们今天的主角：`Spring` 全家桶，就一发不可收拾，这是极速开发该有的感觉，我确信，我爱上了 `Spring` 全家桶。俗话说，独乐乐不如众乐乐，今天把这些新的写下来，希望更多的人看到，同时也希望能极大的解放大家的劳动力。

> 一直给老大安利这一套的东西，老大让我写个教程或者 Demo 推广一下，一直欠着呢，这下算是还清了。

## 技术选型

既然说是全家桶，那用到的技术都有哪些呢？

::: upgrade Spring & Spring Boot

- [Spring](https://spring.io) 自不用多说，做 `Java` 应该都知道的。
- [Spring Boot](https://spring.io/projects/spring-boot) 是近几年火起来的，堪称 `Java WEB 开发颠覆者` 的框架，其核心还是 `Spring`，进一步的包装，引入 `约定大于配置` 的理念，提供一系列的默认配置，来达到 **开箱即用** + **几乎零配置** 的开发体验。既然是极速开发体验，自然少不了 Ta 了。

:::

::: upgrade Spring Data

[Spring Data](https://spring.io/projects/spring-data) 是 Spring 提供的对数据层统一访问的一套框架，简而言之，支持多种不同的数据层，提供的 API 还基本相似。致力于降低不同数据层的学习成本，达到 _换一套数据层也无需大改_ 的效果。同时，Spring Data 本身是基于 `DDD` 理念进行设计的，非常适合 `领域驱动设计` 的场景。这次我们主要用其中的一个：`Spring Data JPA`，其他的下次有机会再细说。

> DDD：中文名称叫 `领域驱动设计`或者 `领域驱动开发`。我更喜欢叫设计，因为 DDD 影响的更多的其实是设计阶段。

> 你造么？DDD 和 微服务可以说是天生一对了。

:::

::: upgrade Spring Data REST

大家是否有听过或者用过 `RESTful` 呢？如果没有，建议先去补补课，这里就不在细说了。[Spring Data REST](https://spring.io/projects/spring-data-rest) 还是 `Spring` 提供的，一套用于生成 `RESTful` 接口的框架，没错就是生成，使用起来也非常的方便：只需要在项目依赖中加入依赖即可，可以没有任何配置奥。

:::

::: upgrade Spring HATEOAS

[Spring HATEOAS](https://spring.io/projects/spring-hateoas) 提供了对 `RESTful` 的 _level3_ 的支持，方便开发者实现符合 `RESTful level3` 标准的 `RESTful` 接口。

:::

::: upgrade Spring REST Docs

[Spring REST Docs](https://spring.io/projects/spring-restdocs) 是 Spring 提供的一套 `生成统一格式的接口文档` 的框架，其设计理念是基于 `TDD` 的，也就是说，需要通过测试类来生成接口文档。而且，由于采用 `模板` 的概念，同时支持 `Markdown`、`Asciidoc` 等格式，你可以根据喜好自行选择，进一步增强了可扩展性和灵活性。

> TDD：中文名为 `测试驱动开发`，这个就没有类似 `测试驱动设计` 之类的名字了，其影响的就完全都是开发阶段了。今天就不再展开讨论了，有兴趣的可以自己搜搜。

:::

::: upgrade Asciidoc

[Asciidoc](https://asciidoctor.org/) 是一种轻量级标记语言，它可以让我们以纯文本的形式来书写笔记、文章、文档、书籍、网页、幻灯片和 man 帮助。如果你用过 `Markdown`，那就比较好理解，Asciidoc 是比 Markdown 更强大的的标记语言，当然学习成本也稍微比 Markdown 高一点点，毕竟 Markdown 语法比较少，功能也比较少。Asciidoc 比较适合写作，Markdown 更适合写写个人博客和一些比较简单的文档。

> 附上 [AsciiDoc 语法快速参考](https://asciidoctor.cn/docs/asciidoc-syntax-quick-reference/index.html)，中文版的奥，如果英语水平好，建议直接看 [官方文档](https://asciidoctor.org/docs/)，毕竟中文翻译的不是很全。

:::

::: upgrade 其他

- `Spring Boot Actuator` 用于产生指标信息。
- `Lombok` 用于简化代码。

:::

## 新建项目

建项目当然是用 [Spring Initializr](https://start.spring.io/) 和 `Jetbrains IntelliJ IDEA` 的插件喽。

> 想用网页版的也不是不可以。

1. 新建项目，选择 `Spring Initializr`。![](https://files.keveon.com/images/p93sp.png)

2. 填入一些项目基本信息。![](https://files.keveon.com/images/e82y8.png)

3. 勾选依赖，本次我选择的依赖如图所示。![](https://files.keveon.com/images/y358q.png)

::: tip

至此，我们的项目就算是创建好了。进行一波基本的 [配置](#基础配置) 吧。

:::

## 基础配置

可以参考下边这些配置，做一些其他调整，根据个人喜好或公司要求，也可以不做修改，直接进入[下一步](#正式开始)吧。

> 这些配置基本都是可复用的，可谓是 `一次修改，到处使用`，与 `Java` 设计的初衷不谋而合。  
> <small>纯属皮一下，请忽略哈。</small>

- 修改 `src/main/resources/application.properties` 的文件名为 `application.yml` 或 `application.yaml`。

- 修改配置文件，加入项目基本信息。

  ```yaml
  spring:
    application:
      name: spring-data-jpa-demo
  info:
    name: ${spring.application.name}
    title: Spring Data JPA Demo
    manual: https://github.com/keveon/spring-data-jpa-demo
    description: 一文带你领略 Spring 全家桶带来的极速开发体验。
    tags:
      environment: produce
    contact:
      name: keveon
      url: https://keveon.me
      email: keveon@keveon.com
  ```

- 配置 `JPA`、`Hibernate` 等杂项。

  ```yaml
  spring:
    application:
      name: spring-data-jpa-demo
    data:
      rest:
        ## 创建资源后，响应体中包含资源本身。默认不包含，只有响应头。
        return-body-on-create: true
        ## 修改资源后，响应体中包含资源本身。默认不包含，只有响应头。
        return-body-on-update: true
      jpa:
        repositories:
          ## 数据源懒加载
          bootstrap-mode: deferred
    datasource:
      hikari:
        connection-test-query: SELECT 1
    jackson:
      locale: zh_CN
      time-zone: 'GMT+8'
    jpa:
      ## 控制台打印 SQL 语句
      show-sql: true
      hibernate:
        ddl-auto: create-drop
        naming:
          physical-strategy: org.hibernate.boot.model.naming.PhysicalNamingStrategyStandardImpl
      properties:
        hibernate:
          ## 格式化输出 SQL
          format_sql: true
          ## 打印 SQL 注释，默认关闭，开启后方便定位问题。日志打印内容增多，所以不开启。
          use_sql_comments: false
  ```

- 修改日志输出位置和输出级别

  ```yaml
  logging:
    file: ${java.io.tmpdir}/logs/${spring.application.name}.log
    level:
      org:
        hibernate:
          type:
            descriptor:
              sql:
                BasicBinder: trace
  ```

- 如果是自己练手的项目，可以考虑修改配置文件：`application.yaml`，加入如下内容：

  ::: danger 警告

  永远不要在生产环境这么干！！！

  :::

  ```yaml
  management:
    endpoints:
      web:
        exposure:
          include: '*'
    endpoint:
      health:
        show-details: always
      shutdown:
        enabled: true
    info:
      git:
        mode: full
  ```

- 移除默认的 `Tomcat`，换成 `Jetty`。

  ```xml
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
    <exclusions>
        <exclusion>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-tomcat</artifactId>
        </exclusion>
    </exclusions>
  </dependency>
  ```

  ```xml
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-jetty</artifactId>
  </dependency>
  ```

- 排除 `Junit 4` 依赖，引入 `Junit 5`。

  ```xml
  <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-test</artifactId>
      <scope>test</scope>
      <exclusions>
          <exclusion>
              <groupId>junit</groupId>
              <artifactId>junit</artifactId>
          </exclusion>
      </exclusions>
  </dependency>
  ```

  ```xml
  <dependency>
      <groupId>org.junit.jupiter</groupId>
      <artifactId>junit-jupiter-api</artifactId>
      <scope>test</scope>
  </dependency>
  ```

  ```xml
  <dependency>
      <groupId>org.junit.jupiter</groupId>
      <artifactId>junit-jupiter-engine</artifactId>
      <scope>test</scope>
  </dependency>
  ```

- 添加 `git-commit-id` 插件，修改 `spring-boot` 插件，用于生成构建信息，与 `Spring Boot Actuator`配合使用。稍后详细说明。

  ```xml
  <plugin>
      <groupId>pl.project13.maven</groupId>
      <artifactId>git-commit-id-plugin</artifactId>
  </plugin>
  ```

  ```xml
  <plugin>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-maven-plugin</artifactId>
      <executions>
          <execution>
              <goals>
                  <goal>build-info</goal>
              </goals>
          </execution>
      </executions>
  </plugin>
  ```

- 添加并配置单元测试插件。

  ```xml
  <plugin>
      <groupId>org.apache.maven.plugins</groupId>
      <artifactId>maven-surefire-plugin</artifactId>
      <configuration>
          <includes>
              <include>**/*Test.java</include>
              <include>**/*Tests.java</include>
          </includes>
          <excludes>
              <exclude>**/*ITCase.java</exclude>
              <exclude>**/Abstract*.java</exclude>
          </excludes>
      </configuration>
  </plugin>
  ```

- 添加并配置集成测试插件

  ```xml
  <plugin>
      <groupId>org.apache.maven.plugins</groupId>
      <artifactId>maven-failsafe-plugin</artifactId>
      <configuration>
          <includes>
              <include>**/*ITCase.java</include>
          </includes>
          <excludes>
              <exclude>**/*Test.java</exclude>
              <exclude>**/*Tests.java</exclude>
              <exclude>**/Abstract*.java</exclude>
          </excludes>
      </configuration>
      <executions>
          <execution>
              <id>integration-test</id>
              <goals>
                  <goal>integration-test</goal>
              </goals>
          </execution>
          <execution>
              <id>verify</id>
              <goals>
                  <goal>verify</goal>
              </goals>
          </execution>
      </executions>
  </plugin>
  ```

- 添加并配置 `Jacoco` 插件，用于生成测试覆盖率。

  ::: warning 注意

  这里的配置仅适用于单元测试，集成测试暂未配置。

  :::

  ```xml
  <plugin>
      <groupId>org.jacoco</groupId>
      <artifactId>jacoco-maven-plugin</artifactId>
      <version>0.8.2</version>
      <executions>
          <execution>
              <id>agent</id>
              <goals>
                  <goal>prepare-agent</goal>
              </goals>
          </execution>
          <execution>
              <id>report</id>
              <phase>test</phase>
              <goals>
                  <goal>report</goal>
              </goals>
              <configuration>
                  <title>Spring Data JPA Demo Coverage Statistics</title>
                  <footer>Version: ${project.version}</footer>
                  <includes>
                      <include>**/*.class</include>
                  </includes>
              </configuration>
          </execution>
      </executions>
  </plugin>
  ```

- 添加 `resource` 插件，用于将我们生成的文档打包进发布包，方便查看。使用使用时不一定这么干，这里只是为了方便查看。

  ```xml
  <plugin>
      <artifactId>maven-resources-plugin</artifactId>
      <executions>
          <execution>
              <id>copy-resources</id>
              <phase>prepare-package</phase>
              <goals>
                  <goal>copy-resources</goal>
              </goals>
              <configuration>
                  <outputDirectory>${project.build.outputDirectory}/static/docs</outputDirectory>
                  <resources>
                      <resource>
                          <directory>${project.build.directory}/generated-docs</directory>
                      </resource>
                  </resources>
              </configuration>
          </execution>
      </executions>
  </plugin>
  ```

- 添加 `Google jib` 插件，用于构建 [Docker](https://www.docker.com/) 镜像。

  ```xml
  <properties>
      <image_version>latest</image_version>
      <jib-maven-plugin.version>1.0.2</jib-maven-plugin.version>
  </properties>
  ```

  ```xml
  <plugin>
      <!-- mvn compile package jib:build -Dimage_group=jib_demo -Dimage_version=1.0.0 -->
      <groupId>com.google.cloud.tools</groupId>
      <artifactId>jib-maven-plugin</artifactId>
      <version>${jib-maven-plugin.version}</version>
      <configuration>
          <from>
              <image>keveon/java:alpine</image>
          </from>
          <to>
              <image>keveon/${project.artifactId}:${image_version}</image>
          </to>
      </configuration>
  </plugin>
  ```

## 创建实体。

::: tip

如果你已经有数据库并且有表了，可以 [使用 IDEA 来生成实体](#附录-a-使用-idea-hibernate-生成实体)，我这里是直接创建实体，用来反向生成数据库和数据表的。

:::

```java
package com.keveon.demo.domain;

import com.fasterxml.jackson.annotation.JsonUnwrapped;
import lombok.*;
import lombok.experimental.Accessors;
import org.springframework.data.jpa.domain.AbstractPersistable;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.List;

/**
 * 部门信息
 *
 * @author keveon on 2019/04/07.
 * @version 1.0.0
 * @since 1.0.0
 */
@Setter
@Getter
@Entity
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "t_dept")
@Accessors(chain = true)
@EqualsAndHashCode(callSuper = true)
public class Dept extends AbstractPersistable<Integer> {
    /**
     * 部门名称
     */
    private String name;

    /**
     * 员工信息
     */
    @JsonUnwrapped
    @OneToMany(mappedBy = "dept")
    private List<Employee> employees;
}
```

```java
 package com.keveon.demo.domain;

 import com.keveon.demo.commons.consts.Gender;
 import com.keveon.demo.commons.consts.WorkingStatus;
 import lombok.*;
 import lombok.experimental.Accessors;
 import org.springframework.data.jpa.domain.AbstractPersistable;

 import javax.persistence.*;
 import javax.validation.constraints.Size;
 import java.time.LocalDate;

 /**
  * 员工信息
  *
  * @author keveon on 2019/04/07.
  * @version 1.0.0
  * @since 1.0.0
  */
 @Setter
 @Getter
 @Entity
 @Builder
 @ToString
 @NoArgsConstructor
 @AllArgsConstructor
 @Accessors(chain = true)
 @EqualsAndHashCode(callSuper = true)
 @Table(name = "t_employee",
         indexes = {
                 @Index(columnList = "phone"),
                 @Index(columnList = "idCard")
         },
         uniqueConstraints = {
                 @UniqueConstraint(columnNames = {"phone"}),
                 @UniqueConstraint(columnNames = {"idCard"})
         }
 )
 public class Employee extends AbstractPersistable<Integer> {
     /**
      * 员工姓名
      */
     @Size(max = 20)
     private String name;
     /**
      * 员工手机号
      */
     @Size(max = 11)
     private String phone;
     /**
      * 身份证号码
      */
     @Size(max = 18)
     private String idCard;
     /**
      * 员工性别
      */
     private Gender gender;
     /**
      * 入职日期
      */
     private LocalDate entryDate;
     /**
      * 离职日期
      */
     private LocalDate turnoverDate;
     /**
      * 工作状态
      */
     private WorkingStatus status;
     /**
      * 登陆详情
      */
     @Embedded
     private LoginDetail loginDetail;
     /**
      * 所在部门
      */
     @ManyToOne
     private Dept dept;
 }
```

::: tip

`org.springframework.data.jpa.domain.AbstractPersistable` 是 `Spring DTA JPA` 提供的顶层抽象。包含两个属性：`id` 和 `new`，`id` 自不用说，`JPA` 规范的要求。`new` 目前还不知道有啥用，无伤大雅。这个抽象类接受一个泛型参数，传入主键类型即可，这里使用了 `Integer`，如果需要，可以传入其他实现序列化接口的类型，如：`Long`、`Spring` 等，或自定义的复杂类型。

:::

## 创建数据仓库层

::: tip

通俗来讲，就是 `数据访问层`，也就是我们说的 `DAO` 层。在 `Spring Data JPA` 中，由于是基于领域设计的，所以被称为 `Repository` 层。

:::

为了使用方便，spring-data-jpa 已经提供了多个接口，只需要继承其中一个或多个（只有 `Interface` 可以被继承哈，实现类或抽象类请不要继承），spring-data-jpa 将会自动实现并提供相应的实现。

::: upgrade Repository

最基本的接口，不提供任何功能，仅作为 `SpringData` 的一个标记，并提供实现。这个接口只是一个空的接口，目的是为了统一所有 `Repository` 的类型，其接口类型使用了泛型，泛型参数中 T 代表实体类型，ID 则是实体中 id 的类型。任何直接或间接继承此接口的类或接口，均会被 Spring 扫描到。

:::

::: upgrade CrudRepository

提供最基本的增删改查方法。此接口中的方法大多是我们在访问数据库中常用的一些方法，如果我们要写自己的 DAO 的时候，只需定义个接口来集成它便可使用了。

:::

::: upgrade PagingAndSortingRepository

提供基本的分页及排序功能，并同时提供 CrudRepository 接口的功能。

:::

::: upgrade QueryByExampleExecutor

提供条件查询功能。

:::

::: upgrade JpaRepository

这个接口继承自 `PagingAndSortingRepository`，里面的方法都是一些简单的操作，并未涉及到复杂的逻辑。当你在处理一些简单的数据逻辑时，便可继承此接口。

:::

::: upgrade JpaSpecificationExecutor

提供 `criteria` 查询，排序、支持分页，此接口没有父类(不包括 `Object` )，即没有上级接口。

:::

::: upgrade SimpleJpaRepository

实现 `JpaRepository` 和 `JpaSpecificationExecutor` 接口，使用 [hibernate](http://hibernate.org/) 的 `EntityManager`做持久化相关处理。您也可以更换为其他 `JPA` 实现，如：`EclipseLink`、`TopLink` 等。

:::

::: upgrade QueryDslPredicateExecutor

提供 [Querydsl](http://www.querydsl.com/) 查询的接口。

:::

::: upgrade QueryDslJpaRepository

继承 `SimpleJpaRepository` 类，实现 `QueryDslPredicateExecutor` 接口。

:::

这些 `Repository` 都是 `spring-data-commons` 提供给我们的核心接口，`spring-data-commons` 是 `Spring Data` 的核心包。这个接口中为我们提供了数据的分页方法，以及排序方法。`spring-data` 让我们省了很多心了，一切都按照这个规范进行构造，就连业务系统中常用到的一些操作都为我们考虑到了，而我们只需更用心的去关注业务逻辑层。`spring-data` 将 `repository` 的颗粒度划得很细。

用图形方式表达继承/实现关系如下：

> 由于关系略微复杂，且本人表达能力有限，_强行_ 画了这个脑图出来，用于表达继承关系。请从右往左看，`Repository` 才是顶层接口。

![](https://files.keveon.com/images/4pidx.png)

综合上述的内容，我们这里的代码可以很简单，只需要定义一个 `Interface`，继承 `org.springframework.data.jpa.repository.JpaRepository` 和 `org.springframework.data.jpa.repository.JpaSpecificationExecutor` 即可，就拥有了基本的 `CRUD` 操作，和一些复杂查询的操作。

```java
package com.keveon.demo.repository;

import com.keveon.demo.domain.Dept;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

/**
 * The interface Dept repository.
 *
 * @author keveon on 2019/04/07.
 * @version 1.0.0
 * @since 1.0.0
 */
public interface DeptRepository
        extends JpaRepository<Dept, Integer>, JpaSpecificationExecutor<Dept> {
}
```

```java
package com.keveon.demo.repository;

import com.keveon.demo.domain.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

/**
 * The interface Employee repository.
 *
 * @author keveon on 2019/04/07.
 * @version 1.0.0
 * @since 1.0.0
 */
public interface EmployeeRepository
        extends JpaRepository<Employee, Integer>, JpaSpecificationExecutor<Employee> {
}
```

::: tip

这样就已经有了大量的操作数据库方法，怎么样，是不是很简洁？由于集成了 `Spring Data REST`，我们现在同时有了一些基本增删改查的 `RESTful` 接口了。什么，不敢相信？别急，往下看。

:::

## 验证接口

上面说到，我们已经有了一批 `HTTP` 接口，我们来验证下。

::: tip

由于我们一开始进行了一些配置，应用启动时会自动建库建表。也可以配置成不自动创建，修改配置文件，将 `spring.jpa.hibernate.ddl-auto` 修改成 `none` 即可。

:::

1. 在 `src/main/resources` 目录下新建 `data.sql`，放入一下初始化数据的 `insert` 语句。`Spring Data JPA` 会在启动时检查，如果有这个文件，将自动执行其中的 `SQL` 语句。

   ::: tip

   - 如果想要自动建库建表（不使用实体生成的方式，又想自动建表），可以在这个目录下新建 `schema.sql` 文件，放入建库建表语句即可，执行优先级高于 `data.slq`。

   - 还有更高级的骚操作，集成 [flyway](https://flywaydb.org/) 等工具，可以实现自动化的维护数据库和数据表，也可以用来做数据迁移。今天我们先不展开讨论，有兴趣的可以自己搜搜。

   :::

2. 启动项目，默认端口是 8080。打开浏览器访问：<http://localhost:8080>，可以看到类似如下内容：

   ![](https://files.keveon.com/images/ew68v.png)

   ::: tip

   我安装了谷歌浏览器插件：[JSON-handle](https://chrome.google.com/webstore/detail/iahnhfdhidomcpggpaimmmahffihkfnj)，才会自动格式化和美化，否则应该是挤成一坨的。

   :::

3. 按照提示，我们访问：<http://localhost:8080/depts>，可以看到如下内容：

   ![](https://files.keveon.com/images/gwlvw.png)

4. 紧接着，我们再获取编号为 `1` 的部门的完整信息：<http://localhost:8080/depts/1>：

   ![](https://files.keveon.com/images/dpw47.png)

5. 这个部门里都有哪些员工呢？访问：<http://localhost:8080/depts/1/employees>：

   ![](https://files.keveon.com/images/hd8ck.png)

6. 查看编号为 `1` 的员工的详细信息：<http://localhost:8080/employees/1>

   ![](https://files.keveon.com/images/iwqfp.png)

   我们可以看到，员工信息的 `_links` 内，又有一个链接地址，指向了当前员工所在部门的信息：<http://localhost:8080/employees/1/dept>

   ![](https://files.keveon.com/images/gcdh5.png)

   这就是我们经常说的 `RESTful level3` 的一种表现形式了。

7. 上边这些都是做查询，我想修改，要怎么做？

   ::: tip

   由于浏览器的限制，不能直接发起 `PATCH` 请求，而在 `RESTful` 中，修改必须使用 `PATCH` 请求，所以我们这里需要用到一些其他工具，比如：`PostMan`、`Curl` 等。我们这里直接使用 `Curl` 进行调用：

   :::

   ```bash
    $ curl 'http://localhost:8080/depts/1' -i -X PATCH \
        -H 'Content-Type: application/hal+json' \
        -d '{
      "name" : "This is renamed dept."
    }'
   ```

   这个请求将返回：

   ```http request
    HTTP/1.1 200 OK
    Content-Type: application/hal+json;charset=UTF-8
    Content-Length: 308

    {
      "id" : 1,
      "name" : "This is renamed dept.",
      "new" : false,
      "_links" : {
        "self" : {
          "href" : "http://localhost:8080/depts/1"
        },
        "dept" : {
          "href" : "http://localhost:8080/depts/1"
        },
        "employees" : {
          "href" : "http://localhost:8080/depts/1/employees"
        }
      }
    }
   ```

## 单元测试

::: tip 你听过 TDD 么？

TDD 就是 **测试驱动开发** 的简称，通俗来讲，就是设计好功能模块后，先写单元测试，然后实现功能，实现完成后单元测试还得能跑通。听起来是不是有点不可思议？确实，实践起来是比较难的，坚持下来更难，但是带来的好处就是程序更加健壮。<small>TDD 和 单元测试 的好坏不是我们今天的重点，就不展开讨论了，有兴趣的可以 [发邮件给我](mailto:keveon@keveon.com)。</small>

:::

我们在实际开发过程中，并不应该直接通过工具调用来进行测试，这种方式并不能复用，也不方便重复执行，最主要的是不方便统计代码的覆盖率等等。综合这些原因，我们应该使用单元测试或集成测试的方法来验证我们的接口，使用这种方式还有一个好处：**生成接口文档**。

`Spring` 团队本身是采用 `TDD` 的方式进行开发的，他们也一直都是 `TDD` 的践行者，其提供的所有框架，都是经过严格的测试的。众所周知，`Spring` 的 `API 文档`（我这里说的 API 并不仅仅是 HTTP API 哈，而是广义上的 **应用程序接口** 是比较完善的，一般也都是同步更新的，他们怎么做到的呢？难道安排专人进行维护？当然不是，`Spring` 团队开发了一套叫做 `Spring REST Docs` 的框架，用于使用单元测试来生成 `API` 文档，接下来我将带领大家体验使用单元测试来生成 `RESTful` 接口文档。

1. 我们先新建单元测试类，部分核心代码如下：

   ```java
   package com.keveon.demo.repository;

   import org.junit.jupiter.api.BeforeEach;
   import org.junit.jupiter.api.Test;
   import org.junit.jupiter.api.extension.ExtendWith;
   import org.springframework.beans.factory.annotation.Autowired;
   import org.springframework.boot.test.context.SpringBootTest;
   import org.springframework.restdocs.RestDocumentationContextProvider;
   import org.springframework.restdocs.RestDocumentationExtension;
   import org.springframework.test.context.junit.jupiter.SpringExtension;
   import org.springframework.test.web.servlet.MockMvc;
   import org.springframework.test.web.servlet.setup.MockMvcBuilders;
   import org.springframework.transaction.annotation.Transactional;
   import org.springframework.web.context.WebApplicationContext;

   import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.documentationConfiguration;
   import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;

   /**
    * The type Dept repository test.
    *
    * @author keveon on 2019/04/07.
    * @version 1.0.0
    * @see DeptRepository
    * @since 1.0.0
    */
   @Transactional
   @SpringBootTest
   @ExtendWith({RestDocumentationExtension.class, SpringExtension.class})
   class DeptRepositoryTest {

       /**
        * The Context.
        */
       @Autowired
       protected WebApplicationContext context;
       /**
        * The Mock mvc.
        */
       protected MockMvc mockMvc;

       /**
        * Sets up.
        *
        * @param restDocumentation the rest documentation
        */
       @BeforeEach
       protected void setUp(RestDocumentationContextProvider restDocumentation) {
           this.mockMvc = MockMvcBuilders.webAppContextSetup(this.context)
                   .apply(documentationConfiguration(restDocumentation)
                           .operationPreprocessors()
                           .withRequestDefaults(prettyPrint())
                   )
                   .build();
       }
   }
   ```

   ::: tip 这里简单介绍下几个核心的部分

   - @Transactional：Spring 的事物注解，在单元测试中增加次注解，可以在用例执行完毕后进行回滚，避免产生脏数据。

   - @SpringBootTest：Spring 测试必备注解，不做过多解释。

   - @ExtendWith({RestDocumentationExtension.class, SpringExtension.class})：类似于 `Junit 4` 时使用的 `@RunWith`，这个用于集成 `Junit 5`。

   - RestDocumentationExtension.class：用于加载 `Spring REST docs`。

   - @BeforeEach：相当于 `Junit 4` 中的 `@Before`，类似的还有：`@AfterEach`。

   :::

2. 编写一个用例：

   ```java
   /**
    * Retrieve.
    *
    * @throws Exception the exception
    * @see DeptRepository#findById(Object)
    * @see DeptRepository#getOne(Object)
    */
   @Test
   void retrieve() throws Exception {
       this.mockMvc.perform(get(basePath + "/depts/{id}", id))
               .andExpect(status().isOk())
               .andExpect(jsonPath("id", equalTo(id)))
               .andExpect(jsonPath("name", notNullValue()))
               .andDo(document("depts-retrieve",
                       links(
                               linkWithRel("self").ignored(),
                               linkWithRel("dept").description("<<resources-depts-retrieve, 部门>> 资源"),
                               linkWithRel("employees").description("<<resources-employees, 员工资源（Employees）>> 的列表")
                       ),
                       pathParameters(
                               parameterWithName("id").description("部门编号")
                       ),
                       responseFields(
                               fieldWithPath("id").description("部门编号"),
                               fieldWithPath("name").description("部门名称"),
                               fieldWithPath("new").description("是否新建")
                       ).and(subsectionWithPath("_links").ignored())
               ));
   }
   ```

   ::: tip 重点部分解释

   - depts-retrieve：最终生成文档存放位置及文件名。支持分隔符 `/`，使最终文档存放的更规整，便于管理及 **复用**。
   - links: 用于描述放回结果中 `_links` 下每一个链接的作用。
   - pathParameters：放在路径上的请求参数，类似的还有 `requestParameters`，`requestFields`，分别用于描述 `查询参数` 和 `请求体参数`。
   - responseFields：用于描述响应体中每一个字段。

   :::

3. 执行测试后，会在 `target/generated-snippets` 目录下产生文档，文件名与上述 `document` 方法的第二个参数一致。

4. 生成文档后，如果不通过特定的编辑器进行查看，你发现看不懂或者看着很乱，别担心，这是因为你看的是 `Asciidoc` 的源码，`Asciidoc` 或者说 `Spring REST docs` 很贴心的提供了一个插件，将 `*.adoc` 渲染成为 `html` 页面。需要我们提供一个模版文件，将自动生成的这些文档片段引入进去，`asciidoc` 插件就会在 `pre-package` 阶段自动的帮我们渲染这些文档，最终产生一个个的单页网页了，用浏览器打开即可查看。

   ::: tip

   由于现在篇幅已经太长了，就不把模版贴出来，大家可以直接去查看源码，地址在 [附录 C. 源码地址](#附录-c-源码地址)，模板就存放在 `src/main/asciidoc` 目录下。

   :::

5. 在 [基础配置](#基础配置) 阶段，我们配置了 `resource` 插件，所以在 `package` 阶段，会将产生的文档文件打包进项目中，项目启动后，我们可以直接访问 `/docs/index.html` 查看（这里假设你提供的模版叫 index.adoc）。

6. 最后附上一张效果图：![](https://files.keveon.com/images/cryxp.png)

## 下一步做什么？

- 使用 [Travis-ci](http://travis-ci.com)，实现自动构建镜像，并部署到服务器。
- 使用 [Spring Data JPA](https://spring.io/projects/spring-data-jpa) 提供的能力，实现审计。
- 集成 [Thymeleaf](https://www.thymeleaf.org/doc/tutorials/2.1/thymeleafspring.html)，做页面展示。
- 集成 [Spring Security](https://spring.io/projects/spring-security)，做授权及认证。

## 附录 A. 使用 IDEA + Hibernate 生成实体

1. 在 `IDEA` 中添加数据库连接。

   ![](https://files.keveon.com/images/wap26.png)

2. 右击项目树的跟节点，`Add Framework Support ...`，找到 `Hibernate` 并选中，勾选 `Create default hibernate configuration and main class` 和 `Import database schema`，最后点击 `OK`。

   ![](https://files.keveon.com/images/vjddt.png)

3. 选择第一步创建的连接，选择生成的实体存放位置。按需配置其他选项，如：不带前后缀、`Generate Column properties`、`Generate JPA Annotations (Java5)` 等。

   ![](https://files.keveon.com/images/mlcny.png)

   > 可以直接修改生成的类名、属性名奥。

4. 生成的实体大概长这样：

   ```java
   package com.keveon.demo.domain;

   import javax.persistence.*;
   import java.util.Objects;

   /**
    * @author keveon on 2019/04/07.
    * @version 1.0.0
    * @since 1.0.0
    */
   @Entity
   @Table(name = "T_DEPT", schema = "PUBLIC", catalog = "DEFAULT")
   public class TDept {
       private int id;
       private String name;

       @Id
       @Column(name = "ID", nullable = false)
       public int getId() {
           return id;
       }

       public void setId(int id) {
           this.id = id;
       }

       @Basic
       @Column(name = "NAME", nullable = true, length = 255)
       public String getName() {
           return name;
       }

       public void setName(String name) {
           this.name = name;
       }

       @Override
       public boolean equals(Object o) {
           if (this == o) return true;
           if (o == null || getClass() != o.getClass()) return false;
           TDept tDept = (TDept) o;
           return id == tDept.id &&
                   Objects.equals(name, tDept.name);
       }

       @Override
       public int hashCode() {
           return Objects.hash(id, name);
       }
   }
   ```

5. [使用 lombok 简化代码](#附录-b-使用-lombok-简化代码)。

6. 删除 `@Basic` 注解。

7. 继承 `org.springframework.data.jpa.domain.AbstractPersistable`，删除 `id` 字段。

8. 打开项目结构，移除 `Hibernate`。

   ::: tip 项目结构快捷键

   - Mac OS X：<kbd>Command</kbd> + <kbd>;</kbd>

   - Windows/Linux：<kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>Shift</kbd> + <kbd>S</kbd>

   :::

   ![](https://files.keveon.com/images/d7ped.png)

9. 删除自动生成的 `hibernate.cfg.xml` 和 `Main.java`。

10. 最终，我们的实体如下：

    ```java
    package com.keveon.demo.domain;

    import lombok.*;
    import lombok.experimental.Accessors;
    import org.springframework.data.jpa.domain.AbstractPersistable;

    import javax.persistence.*;

    /**
     * @author keveon on 2019/04/07.
     * @version 1.0.0
     * @since 1.0.0
     */
    @Setter
    @Getter
    @Entity
    @Builder
    @ToString
    @NoArgsConstructor
    @AllArgsConstructor
    @Table(name = "t_dept")
    @Accessors(chain = true)
    @EqualsAndHashCode(callSuper = true)
    public class Dept extends AbstractPersistable<Integer> {
        @Column(name = "name")
        private String name;
    }
    ```

## 附录 B. 使用 Lombok 简化代码

::: tip

这里用到了 `IDEA` 的 `lombok` 插件，没有安装这个插件的可以在插件仓库中搜索并安装。

:::

1. 在顶部菜单栏中, 找到 `Refactor`，选择 `Lombok` -> `Default @Data`。

   ![](https://files.keveon.com/images/mmxud.png)

2. 将 `@Data` 拆分为多个：`@Setter`、`@Getter` 等。

3. 最终我们的实体如下：

   ```java
   package com.keveon.demo.domain;

   import lombok.*;
   import lombok.experimental.Accessors;

   /**
    * @author keveon on 2019/04/07.
    * @version 1.0.0
    * @since 1.0.0
    */
   @Setter
   @Getter
   @Builder
   @ToString
   @EqualsAndHashCode
   @NoArgsConstructor
   @AllArgsConstructor
   @Accessors(chain = true)
   public class Dept {
       private Integer id;
       private String name;
   }
   ```

## 附录 C. 源码地址

::: tip

本文所有源码，都公布在 `Github` 上，欢迎 `star` 和 `fork`。

如有疑问，或发现文中有错误，请在下方评论区评论，或 [发邮件给我](mailto:keveon@keveon.com)。

源码地址：<https://github.com/keveon/spring-data-jpa-demo>

:::
