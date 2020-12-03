---
permalink: /article/linux/without-password-use-ssh
---

# Linux 中使用 SSH 进行免密登录.md

写这篇文章的主要目的, 是因为前些天内网 **病毒肆虐**, 被入侵的主机多是弱密码。大家按照本文说明, 配置 `使用 SSH 进行安全登陆`, 并设置为 `禁止密码登录` 后, 能在一定程度上降低服务器被入侵的风险.

## SSH 是什么?

:::: theorem

简单说, SSH 是一种网络协议, 用于计算机之间加密登录.

如果一个用户从本地计算机, 使用 SSH 协议登录另一台远程计算机, 我们就可以认为, 这种登录是安全的, 即使被中途截获, 密码也不会泄露.

最早的时候, 互联网通信都是明文通信, 一旦被截获, 内容就暴露无疑. 1995 年, 芬兰学者 Tatu Ylonen 设计了 SSH 协议, 将登录信息全部加密, 成为互联网安全的一个基本解决方案, 迅速在全世界获得推广, 目前已经成为 Linux 系统的标准配置.

需要指出的是, SSH 只是一种协议, 存在多种实现, 既有商业实现, 也有开源实现. 本文针对的实现是 OpenSSH, 它是自由软件, 应用非常广泛.

::: right

本段内容摘抄自 **阮一峰** 的: [SSH 原理与运用（一）：远程登录](http://www.ruanyifeng.com/blog/2011/12/ssh_remote_login.html)

:::

::::

## 安装 SSH 服务

### 在被控主机安装 OpenSSH Server

```bash
# RedHat/CentOS
$ yum install -y openssh-server

# Debian/Ubuntu
$ apt install openssh-server

# Archlinux
$ pacman -S openssh-server # 或 yay -S openssh-server
```

### 在客户端安装 OpenSSH Client

> 如果使用的客户端是 `Windows`, 这一步应换为安装 `Git for Windows`, 在 `Git Bash` 附带了我们所需要的 `SSH client` 工具包.

```bash
# RedHat/CentOS
$ yum install -y openssh-client

# Debian/Ubuntu
$ apt install openssh-client

# ArchLinux
$ pacman -S openssh-client # 或 yay -S openssh-client
```

### 安装完成后启动服务, 并设为开机自启

```bash
$ systemctl enable sshd
$ systemctl start sshd
```

## 基本使用

SSH 主要用于远程登录, 基本语法为: `ssh -p 端口 用户名@主机名`.

- 默认端口为 22, 如果使用默认端口, 可以不写 `-p 22`.
- 如果客户端的用户名和服务器上的用户名一致, 可以忽略.
- 主机名的部分, 除了写主机名, 还可以写 `域名` 或 `IP 地址`.
- 假设要远程的服务器主机名是 example.com, IP 为 10.11.123.234, 用户名为 demo, 远程端口为 22, 客户端用户为 dmeo, 以下命令都是等效的:

  ```bash
  ssh -p 22 demo@example.com
  ssh demo@example.com
  ssh example.com

  ssh -p 22 demo@10.11.123.234
  ssh demo@10.11.123.234
  ssh 10.11.123.234
  ```

## 生成公钥秘钥

直接使用上一步进行连接的时候, 会要求我们输入密码, 输入正确的密码后即可登录远程计算机(输入的密码是看不到的, 不是键盘坏了). 正如我们标题所说, 要使用 SSH 实现免密码登录, 那么我们就需要生成一串钥匙, 公钥用于登录, 私钥用于验证.

基本语法为: `ssh-keygen -t 加密类型 -b 加密长度 -C 邮箱`.

```bash
$ ssh-keygen -t rsa -b 4096 -C keveon@keveon.com
Generating public/private rsa key pair.
Enter file in which to save the key (/home/keveon/.ssh/id_rsa):
Created directory '/home/keveon/.ssh'.
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /home/keveon/.ssh/id_rsa.
Your public key has been saved in /home/keveon/.ssh/id_rsa.pub.
The key fingerprint is:
SHA256:4u7nfM1rEhVN5GoNQ+PNo1xKNrYxBPO2jZb8uVBivUU  keveon@keveon.com
The key's randomart image is:
+---[RSA 4096]----+
|          o.++o  |
|           *.=.  |
|            &.* E|
|           B.^ o |
|      . S  ./ = .|
|     . .  .+ + + |
|      .    +. +  |
|     . .. o +. . |
|     .ooo. o...  |
+----[SHA256]-----+
```

## 将公钥上传到被控服务器

- 通过 SSH 命令上传

  ```bash
  $ ssh-copy-id demo@10.11.123.234
  ```

- 手动上传

  将当前用户目录下的 `.ssh/id_rsa.pub` 中的内容拷贝到服务器上 **被控用户目录** 下的 `.ssh/authorized_keys` 文件中.

  > 例如: /home/demo/.ssh/id_rsa.pub

## 修改服务器配置, 禁止使用密码登陆

1. 修改服务器上的 `/etc/ssh/sshd_config`, 将 `PasswordAuthentication yes` 修改为 `PasswordAuthentication no`.

   ```bash
   $ sed -i 's/PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config
   $ systemctl restart sshd
   ```

2. 我们先用刚才上传了密钥的机器, 尝试远程登陆服务器. 如果登陆成功, 那么说明配置生效了.

3. 再找另一台没有上传过密钥的机器, 尝试进行远程. 不出医疗意料的话, 控制台会打印类似这样的错误信息:

   ```bash
   $ ssh demo@10.11.123.234
   Permission denied (publickey,gssapi-keyex,gssapi-with-mic).
   ```

4. 按照上边的方法, 将密钥上传至服务器后, 尝试远程连接成功。

5. 至此我们就大功告成了. 感兴趣的可以接着往下看.

## 进一步加强 Linux 安全性

### 禁止直接使用 `root` 远程登陆

::: theorem

Linux 最高权限用户 `root`, 默认可以直接登录 sshd. 为了提高服务器的安全度, 需要对它进行禁止, 使得攻击者无法通过暴力破解来获取 root 权限.

:::

1. 新建一个普通用户, 并设置密码.

   > 用户名 **不是** 必须是 `plain`, 可以随便写.

   ```bash
   $ useradd plain
   $ passwd plain
   Changing password for user plain.
   New password:
   Retype new password:
   passwd: all authentication tokens updated successfully.
   ```

2. 修改服务器上的 `/etc/ssh/sshd_config`, 将 `#PermitRootLogin yes` 修改为 `PermitRootLogin no`.

   ```bash
   $ sed -i 's/#PermitRootLogin yes/PermitRootLogin no/' /etc/ssh/sshd_config
   $ systemctl restart sshd
   ```

3. 到这里, 就设置为禁止 `root` 用户远程登录了.

### 修改默认的 `SSH` 端口

1. 修改服务器上的 `/etc/ssh/sshd_config`, 将 `#Port 22` 修改为 `Port 4567`.

   > 端口号 **不是** 必须是 `4567`, 可以随便写, 最大可以开到 `65535`.

   ```bash
   $ sed -i 's/#Port 22/Port 4567/' /etc/ssh/sshd_config
   $ systemctl restart sshd
   ```

2. 远程登陆时使用 `-p 4567` 指定端口.

   ```bash
   $ ssh -p 4567 demo@10.11.123.234
   ```

3. 也可以修改本地配置文件, 避免每次都需要指定端口号.

   > 在 ~/.ssh/config 配置文件下加入如下内容后, 直接使用 `ssh demo` 进行远程登陆.

   ```
   HOST demo
       Port 4567
       Uset demo
       HostName 10.11.123.234
       IdentityFile ~/.ssh/id_rsa.pub
   ```
