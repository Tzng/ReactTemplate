// 需要使用的问题
const question1 = [
    {
        type: 'input',
        message: '请输入文件描述:',
        name: 'descriptions',
        default: "没有文件描述", // 默认值
        validate: function(val) {
            if(val==='没有文件描述') { // 校验位数
                return "你还能没有文件描述？";
            }
            return true
        }
    },
    {
        type: 'list',
        message: '选择作者:',
        name: 'author',
        choices: [
            'allahbin',
            'hejiaohao',
            'liukun'
        ],
    },
    {
        type: 'list',
        name: 'type',
        message: '请选择模版类型?',
        choices: [
            'react-component------ES6组件',
            'react-function------函数组件',
            'taro-component-----taro组件'
        ],
    },
];

// rcCom的问题
const rcQuestion = [{
    type: 'confirm',
    name: 'useModel',
    message: '是否使用model?（默认：不使用）',
    default: false // 默认值
},{
    type: 'confirm',
    name: 'useMobx',
    message: '是否使用mobx?（默认：不使用）',
    default: false // 默认值
}];

// 其他几个问题
const questions = [{
    type: 'input',
    message: '请输入mobx的namespace:',
    name: 'namespace',
    default: "？？？" // 默认值
},{
    type: 'input',
    message: '请输入mobx的namespace:',
    name: 'namespace',
    default: "？？？" // 默认值
}];

module.exports.question1 = question1;
module.exports.rcQuestion = rcQuestion;
module.exports.questions = questions;
