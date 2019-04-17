模板文件。配合模板命令使用

```text
    1、本地更新版本号
        比如我想来个1.0.1版本，这个是补丁的意思，补丁最合适；
        ：npm version patch
        比如我想来个1.1.0版本，这个是小修小改；
        ：npm version minor
        比如我想来个2.0.0版本，这个是大改咯；
        ：npm version major
    2、修改远端的版本,提交到远端npm中：
        npm publish 
```
使用方法:

`temp init <name>`

<name>指的的你要建立的组件名称
