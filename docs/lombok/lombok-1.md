# Lombok 简介及使用

## 简介

::: tip Lombok

可以方便地减少 Java 应用程序中样板文件的代码量, 这样, 您就不需要编码大量的 Java 语法. 但是使 Lombok 如此贴心的不只是语法, 它是一种独特的代码生成方法, 能够开启所有 Java 开发可能性.

:::

- 官网地址: <https://projectlombok.org>
- GitHub 地址: <https://github.com/rzwitserloot/lombok>

## 下载安装

### IntelliJ IDEA 集成:

直接在插件仓库搜索 lombok, 下载安装即可.

### Eclipse/MyEclipse 集成:

1. 从官网下载 [lombok.jar](https://projectlombok.org/downloads/lombok.jar).
1. 将 lombok.jar 包拷贝到 Eclipse/MyEclipse 安装目录下的根目录
1. 在配置文件 eclipse.ini 中添加如下内容：

```bash
-javaagent:lombok.jar
-Xbootclasspath/a:lombok.jar
```

::: tip

使用 `lombok` 注解的时候记得要导入 `lombok.jar` 包到工程

:::

## 常用注解简介

- [@Data](lombok/lombok-2?id=Data)：注解在类上, 提供类所有属性的 `Getter` 和 `Setter` 方法, 此外还提供了 `equals`、`canEqual`、`hashCode`、`toString` 方法。
- [@Getter & @Setter](lombok/lombok-2?id=getter-amp-setter)：注解在属性上，为属性提供了 `Getter` 和 `Setter`。
- [@ToString](lombok/lombok-2?id=tostring)：注解在类上，为类提供 `toString()` 方法。
- [@EqualsAndHashCode](lombok/lombok-2?id=equalsandhashcode)：注解在类上，为类提供 `equals()` 方法和 `hashCode()` 方法。
- [@RequiredArgsConstructor](lombok/lombok-2?id=requiredargsconstructor)：生成必要的构造器。
- [@NoArgsConstructor & @AllArgsConstructor](lombok/lombok-2?id=noargsconstructor-amp-allargsconstructor)：注解写在类上，为类提供了一个 `无参/全参` 的构造方法。
- [@NonNull](lombok/lombok-2?id=nonnull)：一般写在方法签名中，被此注解的字段，传入值禁止为 `null`，否则抛 `NPE(NullPointerException)`。
- [@Cleanup](lombok/lombok-2?id=cleanup)：被此注解标记的对象，在使用完毕后自动调用对象 `close()` 方法。
- [@Log & @Slf4j & @CommonsLog & @JBossLog 等](lombok/lombok-2?id=log-amp-slf4j-amp-commonslog-amp-jbosslog-等)：注解在类上，在类中自动生成一个属性名为 `log` 的日志对象。
- [@Builder](lombok/lombok-2?id=builder)：生成链式构造，可与 [@Data](lombok/lombok-2?id=Data) 等注解共存。
- @Synchronized：对象同步。
- @SneakyThrows：抛出异常。

## 更多资料

- <https://projectlombok.org/features/index.html>
- <http://blog.csdn.net/u011719271/article/details/53842420>
- <http://jnb.ociweb.com/jnb/jnbJan2010.html>
- <http://www.jianshu.com/p/dd5349ac8473>
