# Java 开发中使用 Lombok 简化代码

## 简介

[lombok](https://projectlombok.org) 是什么呢？如果你不了解也没关系，接下来我会一步步带领大伙入坑的。

通俗一点讲，这就是个生成代码的框架（或者说工具、插件）。Ta 与那个同名的小岛一样美丽、优雅。

lombok 的魅力就在于可以很方便地减少 Java 应用程序中样板文件的代码量, 不需要编写那些冗余的 Java 代码，比如 Getter、Setter、构造器等。

::: tip

使 `Lombok` 如此贴心的不只是语法，它是一种独特的代码生成方法，能够开启所有 Java 开发可能性。

:::

> 我用 lombok 已经有三个年头了，最开始知道这个东东，还是一次在网上瞎逛的时候偶然发现了一个号称 `JavaWeb 开发的颠覆者` 的框架：[Spring Boot](http://projects.spring.io/spring-boot/)。这个框架本身与 lombok 并没有直接关系，我也是在创建 boot 项目的时候看到 lombok（IDEA 或者 STS 可以看到），出于好奇就去官网瞅了瞅，看到介绍之后，我就果断入坑了，从此欲罢不能，一发不可收拾，你不信？可能是你病得太轻（代码洁癖，我已经晚期了）。

## 快速开始

项目中加入 lombok 的依赖包，同时 IDE 安装了 lombok 插件就可以使用了。

### 下载 & 安装

上边说了这么多 lombok 的好处，也说 Ta 挺坑的，原因就是 Eclipse/MyEclipse 使用不很方便，要手动安装插件，其实是 Eclipse 的坑。官方提供的 jar 其实同时也是插件，有一键安装的方法，不过不是每次都成功，很多时候还需要手动配置，久而久之，就直接手动安装了，也没几步操作。具体安装过程之前我写过一篇文章专门说这个，就不在这废话了，不知道的移步[我以前写的文章](lombok/lombok-1.md)。今天主要说说快速上手。

### 项目加入 lombok

准备工作相对简单一些，[下载官方 jar 包](https://projectlombok.org/download)，引入到项目中即可，也可以使用 [`Maven`](#maven) 或 [`Gradle`](#gradle) 等包管理器直接引入。

#### Maven

```xml
<!-- https://mvnrepository.com/artifact/org.projectlombok/lombok -->
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <version>1.16.16</version>
    <scope>provided</scope>
</dependency>
```

#### Gradle

```groovy
provided group: 'org.projectlombok', name: 'lombok', version: '1.16.16'
```

### 常用注解

::: tip

以下示例均采用 Java6 编译，由于编译器版本等因素，最终输出的 class 文件内容可能会有部分差异。

:::

我们先从最常用的开始：

#### @Data

这个注解是最常用的，是一个类级别注解，同时也是一个 `复合型注解`，所谓复合型注解，就是多个注解的集合体。

这个注解包含了 `@Getter`、`@Setter`、`@ToString`、`@EqualsAndHashCode`、`@RequiredArgsConstructor`，每个注解的作用会在稍后一一介绍。

此注解有一个参数 `staticConstructor` 用来生成静态构造器，对应值为 构造器名。

使用注解的效果直接上代码：

- 源文件

```java
import lombok.Data;

@Data(staticConstructor="of")
public class DataExample {
  private final String name;
  private int age;
  private double score;
  private String[] tags;
}
```

- 字节码文件

```java
import java.beans.ConstructorProperties;
import java.util.Arrays;

public class DataExample {
    private final String name;
    private int age;
    private double score;
    private String[] tags;

    @ConstructorProperties({"name"})
    private DataExample(String name) {this.name = name;}
    public static DataExample of(String name) {return new DataExample(name);}

    public String getName() {return this.name;}

    public int getAge() {return this.age;}
    public void setAge(int age) {this.age = age;}

    public double getScore() {return this.score;}
    public void setScore(double score) {this.score = score;}

    public String[] getTags() {return this.tags;}
    public void setTags(String[] tags) {this.tags = tags;}

    protected boolean canEqual(Object other) {return other instanceof DataExample;}

    public boolean equals(Object o) {if(o == this) {return true;} else if(!(o instanceof DataExample)) {return false;} else {DataExample other = (DataExample)o;
            if(!other.canEqual(this)) {return false;} else {Object this$name = this.getName();
                Object other$name = other.getName();
                if(this$name == null) {if(other$name == null) {return this.getAge() != other.getAge()?false:(Double.compare(this.getScore(), other.getScore())!= 0?false:Arrays.deepEquals(this.getTags(), other.getTags()));}
                } else if(this$name.equals(other$name)) {return this.getAge() != other.getAge()?false:(Double.compare(this.getScore(), other.getScore())!= 0?false:Arrays.deepEquals(this.getTags(), other.getTags()));}

                return false;
            }
        }
    }

    public int hashCode() {
        int PRIME = true;
        int result = 1;
        Object $name = this.getName();
        int result = result * 59 + ($name == null?43:$name.hashCode());
        result = result * 59 + this.getAge();
        long $score = Double.doubleToLongBits(this.getScore());
        result = result * 59 + (int)($score >>> 32 ^ $score);
        result = result * 59 + Arrays.deepHashCode(this.getTags());
        return result;
    }

    public String toString() {return "DataExample(name=" + this.getName() + ", age=" + this.getAge()+ ", score=" + this.getScore() + ", tags=" + Arrays.deepToString(this.getTags()) + ")";}
}
```

> 想必大家现在已经感受到了 lombok 的魅力了吧？如果还没有，别急，这只是刚开始，接着往下看：

#### @Getter & @Setter

这两个注解是生成 get、set 方法的，可以写在类上，也可以写在属性上。这两个注解有一个重要的属性 `value`， 用来控制生成的方法的访问级别，对应值是 AccessLevel 类型枚举，分别有 PUBLIC, PROTECTED, PACKAGE, 和 PRIVATE，默认为 PUBLIC。

- 源文件

```java
public class Example {
    @Getter @Setter private int age = 10;
    @Setter(AccessLevel.PROTECTED) private String name;
}
```

- 字节码文件

```java
public class Example {
    private int age = 10;
    private String name;

    public DataExample(){}
    public int getAge() {return this.age;}
    public void setAge(int age) {this.age = age;}
    protected void setName(String name) {this.name = name;}
}
```

#### @ToString

覆盖默认 `toString()`方法。其中常用参数介绍：

1. includeFieldNames：生成的 toString() 方法是否包含字段名，布尔类型。
2. exclude：不显示在 toString() 中的字段，String 数组。
3. callSuper：调用父类 toString()，布尔类型。

- 源码

```java
import lombok.ToString;

@ToString(exclude="id")
public class ToStringExample {
  private static final int STATIC_VAR = 10;
  private String name;
  private Shape shape = new Square(5, 10);
  private String[] tags;
  private int id;

  public String getName() {return this.getName();
  }

  @ToString(callSuper=true, includeFieldNames=true)
  public static class Square extends Shape {
    private final int width, height;

    public Square(int width, int height) {
      this.width = width;
      this.height = height;
    }
  }
}
```

- 字节码（部分）

```java
import java.util.Arrays;

public class ToStringExample {
  private static final int STATIC_VAR = 10;
  private String name;
  private Shape shape = new Square(5, 10);
  private String[] tags;
  private int id;

  public String getName() {return this.getName();
  }

  public static class Square extends Shape {
    private final int width, height;

    public Square(int width, int height) {
      this.width = width;
      this.height = height;
    }

    @Override public String toString() {return "Square(super=" + super.toString() + ", width=" + this.width + ", height=" + this.height + ")";}
  }

  @Override public String toString() {return "ToStringExample(" + this.getName() + "," + this.shape + "," + Arrays.deepToString(this.tags) + ")";}
}
```

#### @EqualsAndHashCode

生成 equals 和 hashCode 方法，callSuper 及 exclude 等参数同 `@ToString`。

#### @RequiredArgsConstructor

作用同注解名，生成必须的构造器，即：无参构造器，若类中用 `final` 标记的字段，则生成的是包含所有 final 类型字段的构造器。

#### @NoArgsConstructor & @AllArgsConstructor

无参构造器及全参构造器。注解参数同 [@RequiredArgsConstructor](#@RequiredArgsConstructor)。

#### @NonNull

一般写在方法签名中，被此注解的字段，传入值禁止为 `null`，否则抛 `NPE(NullPointerException)`。

#### @Cleanup

被此注解标记的对象，在使用完毕后自动调用对象 `close()` 方法。

- 源文件

```java
@Cleanup InputStream in = new FileInputStream("some/file");
```

- 字节码

```java
InputStream in = new FileInputStream("some/file");
try {
    // do something
} finally {
    if (in != null) in.close();
}
```

#### @Log & @Slf4j & @CommonsLog & @JBossLog 等

注解在类上，在类中自动生成一个属性名为 `log` 的日志对象，无需再写类似如下代码：

```java
private static final java.util.logging.Logger log = java.util.logging.Logger.getLogger(LogExample.class.getName());
```

#### @Builder

生成链式构造，可与 [@Data](#@Data) 等注解共存。

```java
User user = User.builder()
				.name("xxx")
				.age(8)
				.phone("13579246810")
				.build();
```

---

## 结束语

lombok 的能力可不止这些，暂时就介绍这么多吧，如果想知道更多有关信息，请访问：

- [稳定功能](https://projectlombok.org/features/)
- [测试功能](https://projectlombok.org/features/experimental/all)
