export default [
    {
        label: '首页',
        icon: 'home',
        link: '/admin/home'
    },
    '-',
    {
        label: '管理员',
        icon: 'appstore',
        child: [
            {
                label: '管理员列表',
                link: '/admin/system/administrators'
            },
            {
                label: '登录日志',
                link: '/admin/system/loginLog'
            },
        ]
    },
    '-',
    {
        label: '用户列表',
        icon: 'appstore',
        link: '/admin/users'
    },
    '-',
    {
        label: '任务管理',
        icon: 'appstore',
        child: [
            {
                label: '新建任务',
                link: '/admin/task/newTask'
            },
            {
                label: '全部任务',
                link: '/admin/task/allTasks'
            },
            {
                label: '待领取',
                link: '/admin/task/toAcceptTasks'
            },
            {
                label: '待提交',
                link: '/admin/task/toSubmitTasks'
            },
            {
                label: '未审核',
                link: '/admin/task/toAuditTasks'
            },
            {
                label: '已完成',
                link: '/admin/task/passTasks'
            },
        ]
    },
    {
        label: '测试',
        icon: 'setting',
        child: [
            {
                label: '测试添加',
                link: '/admin/test'
            },
        ]
    },
]
