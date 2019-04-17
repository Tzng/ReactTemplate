// 需要使用的问题
const question1 = [
    {
        type: 'input',
        message: '请输入文件描述:',
        name: 'descriptions',
        default: "没有文件描述" // 默认值
    },
    {
        type: 'input',
        message: '请输入作者名称:',
        name: 'author',
        default: "张三" // 默认值
    },
    {
        type: 'list',
        name: 'type',
        message: '请选择模版类型?',
        choices: [
            'react-component------ES6组件',
            'react-function------函数组件',
        ],
    },
];

// rcCom的问题
const rcQuestion = [            {
    type: 'confirm',
    name: 'noUseModel',
    message: '不使用model?',
    default: true // 默认值
}];

module.exports.question1 = question1;
module.exports.rcQuestion = rcQuestion;
