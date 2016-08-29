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
                label: '管理员日志',
                link: '/admin/system/loginLog'
            },
        ]
    },
    '-',
    {
        label: 'App管理',
        icon: 'appstore',
        child: [
            {
                label: 'App发布',
                link: '/admin/appManage/appIssue'
            },
            {
                label: 'App列表',
                link: '/admin/appManage/appList'
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
                label: '任务列表',
                link: '/admin/task/taskList'
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
