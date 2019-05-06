# GIT 笔记

- [版本控制](#版本控制)
- [基础命令](#基础命令)
  - [设置git用户信息](#设置git用户信息)
  - [初始化git仓库](#初始化git仓库)
  - [查看仓库状态](#查看仓库状态)
  - [查看文件改动](#查看文件改动)
  - [忽略文件或文件夹](#忽略文件或文件夹)
  - [版本查看](#版本查看)
  - [分支](#分支)
- [上传代码到GIT服务器（github为例）](#上传代码到git服务器github为例)
  - [步骤](#步骤)
  - [使用SSH方式上传代码](#使用ssh方式上传代码)
    - [步骤](#步骤-1)
- [删除分支](#删除分支)
- [保存工作现场](#保存工作现场)

## 版本控制
VCS：版本控制系统（Version Control System）
GIT是一个`分布式`版本控制工具

## 基础命令
### 设置git用户信息
设置用户名、邮箱等，用于查看提交者信息  
设置用户名：`git config --global user.name "xxx"`  
设置邮箱： `git config --global user.email "xxx@xxx.com"`  

查看用户名、邮箱： `git config user.name/user.email`

### 初始化git仓库
初始化git仓库：`git init`

### 查看仓库状态
查看仓库状态：`git status`  
查看仓库简要状态信息： `git status -s`

### 查看文件改动
查看尚未提交到暂存区的文件的改动信息： `git diff [文件名]`  
查看已经提交到缓存区的文件的改动信息： `git diff --cached [文件名]`


### 忽略文件或文件夹
新建`.gitignore`文件，在其中添加需要忽略的文件或文件夹。

### 版本查看
查看提交历史：`git log`  
查看提交历史（一行显示）：`git log --oneline`  
跳转到指定版本： `git reset --hard [版本号]`  
查看未来的版本： `git reflog`  

### 分支
删除分支： `git branch -d [分支名]`

## 上传代码到GIT服务器（github为例）
github是基于GIT实现的代码管理平台。

### 步骤
- 在github上创建仓库
- `git push [远程仓库地址] [本地分支名]` (如 git push https://github.com/ks4na/test.git master 就可以将本地仓库的master分支提交到远程test仓库的master分支上)

> 不需要每次推送代码都使用远程仓库地址的方法：  
> 使用命令 `git remote add origin [远程仓库地址]` ,以后提交时可以将远程仓库地址换成 `origin` 即可

> 建立本地分支和远程仓库分支的关联 - `-u`参数  
> `git push -u origin master`  
> 建立本地分支和远程仓库分支的关联后，下次提交时直接输入`git push`即可提交。

### 使用SSH方式上传代码
使用`https`方式来推送代码到远程，需要输入账户密码，这样不很安全；  
而使用`SSH`方式连接来推送代码不需要账户密码，更加安全。

#### 步骤
1. 本地创建`ssh公钥密钥`
  - `ssh-keygen -t rsa -C "仓库创建者email"`, 一路回车即可
2. 找到公钥密钥生成的目录，用户目录`.ssh`目录下,`.pub`文件即为公钥文件，复制其中的字符串
3. 在仓库拥有者的个人设置中的SSH设置中添加`ssh key`即可

## 删除分支
`git branch -d [分支名]`  
> 如果新建的分支尚未被合并时需要强行删除： `git branch -D [分支名]`

## 保存工作现场
工作到一半但是不想进行提交，可以使用 `git stash` 保存工作现场，  
然后再使用 `git stash pop` 恢复工作现场。