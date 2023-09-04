![GitHub views](https://raw.githubusercontent.com/MuYunyun/flow/traffic/traffic-flow/views.svg)

> 工欲善其事，必先利其器。

- [使用说明](#使用说明)
- [快捷搜索跳转](#快捷搜索跳转)
  - [Github](#github)
  - [知乎](#知乎)
  - [淘宝](#淘宝)
  - [京东](#京东)
  - [掘金](#掘金)
- [工作流提效](#工作流提效)
  - [一键切换网络代理](#一键切换网络代理)
  - [使用 VSCode 快速打开项目文件](#使用-vscode-快速打开项目文件)
  - [快速打开到项目对应的 github/gitlab 链接](#快速打开到项目对应的-githubgitlab-链接)

## 使用说明

1. [下载 flow](https://github.com/MuYunyun/commonSearch/raw/master/flow.alfredworkflow)
2. 双击下载好的 `flow.alfredworkflow` 文件, 自动完成安装。

> 使用该插件需要[安装 node](https://nodejs.org/en/)

## 快捷搜索跳转

### Github

* 触发 Key : `gh`

![](http://with.muyunyun.cn/c0f217c75c131b1ee93ab4c1d353ec42.jpg-400)

### 知乎

* 触发 key : `zh`

![](http://with.muyunyun.cn/ef946bc5fe4d0fdb6474350bf31cf9fc.jpg-400)

### 淘宝

* 触发 key : `tb`

![](http://with.muyunyun.cn/97f9f0513c1369886a812bbf6cd73b05.jpg-400)

### 京东

* 触发 key : `jd`

![](http://with.muyunyun.cn/19e5ecbc5d38251e5ceeb145579faeb1.jpg-400)

### 掘金

* 触发 key : `gold`, 按住 `cmd` 可以查看内容简介

![](http://with.muyunyun.cn/40a83edf9552b4a071dd2ff5093a445b.gif)

## 工作流提效

### 一键切换网络代理

在使用公司内部网络加速、开 vpn、使用 Charles 调试等场景下，需要频繁在路径 `System Preferences - Network - Advanced - Proxies` 下进行手动切换代理配置，十分繁琐。为此提供该 workflow 来简化配置链路。

* 触发 key: pac
* 选项
  * `clear all proxy`: 清空全部代理，用于 Charles.app 代理调试。
  * `auto proxy discovery`: 设置自动代理发现模式，用于公司内部网络加速。
  * `global mode`: 设置全局代理模式。

![](http://with.muyunyun.cn/00dd758122c9cbde256f5d02518ad769.gif)

### 使用 VSCode 快速打开项目文件

* 触发 key: code
* 前置配置: 需双击点开流水线配置，将目标目录替换为自己的。

### 快速打开到项目对应的 github/gitlab 链接

* 触发 key: open
* 前置配置: 需双击点开流水线配置，将目标目录替换为自己的。
