import React from 'react';
import {Route, IndexRoute, IndexRedirect} from 'react-router';
import request from 'superagent';
import Admin from 'screens/admin';
import Home from 'screens/admin/screens/home';
import Personal from 'screens/admin/screens/personal';
import {Administrators, LoginLog} from 'screens/admin/screens/system';
import Users from 'screens/admin/screens/users';
import {NewTask, TaskList, TaskDetail} from 'screens/admin/screens/task';
import Tests from 'screens/admin/screens/tests';

let firstEntry = true;

function authenticate (nextState, replaceState, callback) {
    if (typeof window !== 'undefined' && !firstEntry) {
        request
        .post('/graphql')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send({
            query: 'query { session }'
        })
        .end((error, result) => {
            if (error || !result.body.data.session) {
                window.location.href = '/admin/login';
            } else {
                callback();
            }
        });
    } else {
        firstEntry = false;
        callback();
    }
}

export default [
    <Route name='admin' path='/admin' component={Admin}>
        <IndexRoute component={Home} onEnter={authenticate} />
        <Route name='adminHome' path='home' component={Home} onEnter={authenticate} />
        <Route name='adminPersonal' path='personal' component={Personal} onEnter={authenticate} />
        <Route name='adminSystem' path='system'>
            <Route name='adminAdministrators' path='administrators' component={Administrators} onEnter={authenticate} />
            <Route name='adminLoginLog' path='loginLog' component={LoginLog} onEnter={authenticate} />
        </Route>
        <Route name='adminUsers' path='users' component={Users} onEnter={authenticate} />
        <Route name='adminTask' path='task'>
            <Route name='adminNewTask' path='newTask' component={NewTask} onEnter={authenticate} />
            <Route name='adminTaskList' path='taskList' component={TaskList} onEnter={authenticate} />
            <Route name='adminTaskDetail' path='taskDetail' component={TaskDetail} onEnter={authenticate} />
        </Route>
        <Route name='adminTest' path='test' component={Tests} onEnter={authenticate} />
    </Route>
];
