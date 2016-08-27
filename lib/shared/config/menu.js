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
                link: '/admin/task/allTask'
            },
            {
                label: '待领取',
                link: '/admin/task/toAcceptTask'
            },
            {
                label: '待提交',
                link: '/admin/task/toSubmitTask'
            },
            {
                label: '未审核',
                link: '/admin/task/toAuditTask'
            },
            {
                label: '已完成',
                link: '/admin/task/passTask'
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
