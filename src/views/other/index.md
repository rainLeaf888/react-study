# 常用工具
iterms 快捷键及nrm ，nvm,  typora(markdown 工具)

## nrm 源切换：
  nrm ls 列出所有源
  nrm use taboo 切换源

  nvm node版本切换：
  nvm use 8.0
  nvm install 8.0 nvm install stable 安装node 当前稳定版本
  nvm install lastest 安装node当前最新版本


## iterms 快捷键：
1. command + shift + h 查看剪贴板历史
2. command + ； 查看历史命令
3.  ctrl + a 到行首
4.  ctrl + e 到行尾
5.  ctrl + p 上一条命令
6.  ctrl + u 清空当前行

## 常用zsh快捷方式：
1. code . 打开vscode：
    vscode 中 install code command 即可
2.  j  bach(目录名)   自动跳转到指定目录
    mac:  brew install autojump     zsh:  在~/.zshrc 文件中添加 [ -f /usr/local/etc/profile.d/autojump.sh ] && . /usr/local/etc/profile.d/autojump.sh   重启终端即可 （不需要在～/.zshrc 中的plugins中配置autojump）


## 查看yarn安装全局的依赖包位置：
yarn global dir


## vscode 常用插件：
1.Bracket Pair Colorizer
2.EsLint
3.TsLint

typora: markdown 工具



## 查看复合层:
chorme  打开检查 —> more tools —> Layers

transform : translateZ() 或 translate3d() , 会开启硬件（gui）加速，会新开一个复合层

例：https://blog.logrocket.com/eliminate-content-repaints-with-the-new-layers-panel-in-chrome-e2c306d4d752


## 常用liunx命令：
查看进程占用端口：
ps –ef|grep 进程名
查看某端口占用:
lsof -i:3000

Liunx 上查找nginx所在位置
ps -ef | grep nginx

## fs-extra:
node 文件操作库，是node内置fs的扩展，支持同步和异步（异步可用aysnc await，因为返回结果是promise），可remove，copy等文件  replace:  可替换特定内容

walk:  获取到一个目录，包含子目录里的文件里的所有文件名
