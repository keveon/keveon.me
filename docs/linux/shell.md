# Linux Shell 介绍

从程序员的角度来看， Shell 本身是一种用 C 语言编写的程序，从用户的角度来看，Shell 是用户与 Linux 操作系统沟通的桥梁。用户既可以输入命令执行，又可以利用 Shell 脚本编程，完成更加复杂的操作。在 Linux GUI 日益完善的今天，在系统管理等领域，Shell 编程仍然起着不可忽视的作用。深入地了解和熟练地掌握 Shell 编程，是每一个 Linux 用户的必修 功课之一。

Linux 的 Shell 种类众多，常见的有：

- Bourne Shell（/usr/bin/sh 或/bin/sh）
- Bourne Again Shell（/bin/bash）
- Z Shell（/bin/zsh）
- C Shell（/usr/bin/csh）
- K Shell（/usr/bin/ksh）
- Shell for Root（/sbin/sh）
- ……

不同的 Shell 语言的语法有所不同，所以不能交换使用。每种 Shell 都有其特色之处，基本上，掌握其中任何一种 就足够了。在本文中，我们关注的重点是 `sh`、`bash` 和 `zsh`，也就是 `Bourne Shell`、`Bourne Again Shell`、`Z Shell`。

由于易用和免费，Bash 在日常工作中被广泛使用；同时，Bash 也是大多数 Linux 系统默认的 Shell。在一般情况下，人们并不区分 `Bourne Shell` 和 `Bourne Again Shell`，所以，在下面的文字中，我们可以看到 `#!/bin/sh`，它同样也可以改为 `#!/bin/bash` 或 `#!/bin/zsh`。

利用 vi 等文本编辑器编写 Shell 脚本的格式是固定的，如下：

```bash
#!/bin/sh
# 这里写注释，在linux中，'#' 开始是注释，也可以写在命令后边
echo hello! # 这里写要执行的命令
```
