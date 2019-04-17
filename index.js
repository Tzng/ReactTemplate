#!/usr/bin/env node
const fs = require('fs');

const program = require('commander');
const download = require('download-git-repo'); //下载模版文件
const chalk = require('chalk');  //美化终端
const symbols = require('log-symbols'); //美化终端
const handlebars = require('handlebars'); //修改模版文件内容
const { rcQuestion, question1 } = require('./question.js');

const ora = require('ora'); //提示下载
var inquirer = require('inquirer');  //提示文本
const package = require('./package.json'); //获取版本信息
const re = new RegExp("^[A-Z].*?$"); //检查文件名是否是英文，只支持英文

/**
 * 不需要修改名称的文件
 */
const includes = [
    'index.ts',
    'index.tsx',
    'index.js',
    'action.js',
    'action.tsx',
    'action.ts',
    'reducer.js',
    'reducer.ts',
    'reducer.tsx',
    'saga.ts',
    'saga.js',
    'saga.tsx',
    'README.md',
    'model.js'
];
/**
 * 模版对应分支
 */
const getType = {
    "react-component------ES6组件": "component",
    "react-function------函数组件": "master",
    "react-redux------ES6组件": "redux",
    "react-function------typescript 函数组件": "function-typescript",
    "react-component------typescript ES6组件": "component-typescript",
    "react-redux------typescript ES6组件": "redux-typescript",
};

/**
 * 读取目标文件夹里面的文件
 * @param name 目标文件夹
 * @param answers 用户填写的参数
 * @return {*}
 */
function readDirFile(name, answers) {
    var files = fs.readdirSync(name);
    // 几个需要对文件进行操作的数据
    const { noUseModel, author } = answers;
    for (let i = 0; i < files.length; i++) {
        let fileName = `${name}/${files[i]}`;
        // 判断文件是否存在
        if (fs.existsSync(`${name}/${files[i]}`)) {
            // 判断文件是否是models文件
            if(files[i] === 'models.js' && noUseModel){
                console.log('删除models文件');
                // 删除文件
                fs.unlinkSync(`${name}/${files[i]}`);
                continue ;
            }
            // 如果文件存在的话，就对文件进行操作
            console.log(symbols.success, chalk.green(`配置文件${name}/${files[i]}完成`));
            // 读取文件内容
            const content = fs.readFileSync(fileName).toString();
            // 替换模板内容
            const result = handlebars.compile(content)({
                template: name,
                descriptions: answers.descriptions,
                date: new Date().toLocaleString(),
                author
            });
            // 再把文件写进去
            fs.writeFileSync(fileName, result);
        }
    }
    return files;
}

/**
 * 文件夹重命名
 * @param files
 * @param name
 */
function renFileName(files, name) {
    let count = 0; //所有文件修改完成，对文件进行改名字
    for (let i = 0; i < files.length; i++) {
        if (includes.includes(files[i])) {  //是否需要修改名称
            continue
        }
        //获取文件列表
        var index = files[i].indexOf('.');
        fs.rename(
            `${name}/${files[i]}`,
            `${name}/${name}${files[i].substring(index)}`,
            err => {
                if (err) {
                    console.log('---错误');
                }
                count++;
                if (count + 1 === files.length) { //排除index.js文件
                    console.log(symbols.success, chalk.green('模版创建成功'));
                }
            }
        );
    }
}

program.version(package.version, '-v,--version').command('init <name>').action(async name => {
    if (!re.test(name)) {
        console.log(symbols.error, chalk.red('组件名称不符合要求，必须以大写字母开头'));
        return
    }
    if (!fs.existsSync(name)) {
        try {
            const answers1 = await inquirer.prompt(question1);
            // 问题拿去处理
            const answers2 = await reactComponent(answers1);
            console.log(JSON.stringify(answers2));
            // 合并答案
            const answers = {...answers1, ...answers2};
            console.log(symbols.success, chalk.green('准备创建' + name + '..........,请稍候'));
            const spinner = ora('正在下载模板...' + JSON.stringify(getType[answers.type]));
            spinner.start();

            const type = getType[answers.type];
            // 仓库地址
            const url = `github:Tzng/template/#${type}`;
            console.log('正在从远程仓库github:Tzng/template下载目标分支文件' + type);
            // 下载仓库的代码，第一个是地址，第二个是要保存的地也就是前面输入的名称
            download(url, name, err => {
                if (err) {
                    spinner.fail();
                } else {
                    spinner.succeed();
                    // 读取文件夹里面的文件
                    var files = readDirFile(name, answers);
                    renFileName(files, name);
                }
            });
        }catch (e) {
            console.error('似乎出现了一些问题');
        }
    } else {
        console.log(symbols.error, chalk.red('有相同名称模版'));
    }
});

program.parse(process.argv);

/**
 * 对普通组件进行处理
 */
async function reactComponent(params) {
    // 判断是否需要删除model
    if (params.type === 'react-component------ES6组件') {
        return await inquirer.prompt(rcQuestion);
    }
    return {}
}
