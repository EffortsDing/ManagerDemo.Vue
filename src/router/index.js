import Vue from 'vue'
import Router from 'vue-router'
// import LogIn from '@/components/LogIn'
import index from '../views/home/index'
import empty from '../views/home/empty'
import table from '../views/user/table'
import tCharactter from '../views/character/t_charactter'
import tPermission from '../views/permission/t_permission'
import perResourcetable from '../views/perResource/preResourcetable'
import coreBillTable from '../views/core_bill/core_billTable'
import coreRefundAdd from '../views/core_refund/core_refundAdd'
import coreRefundReview from '../views/core_refund/core_refundReview'
const LogIn = resolve => require(['@/components/LogIn'], resolve)

Vue.use(Router)
//  /preResourcetable

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'LogIn',
      component: LogIn,
      hidden: true
    },
    {
      path: '/',
      component: index,
      name: '系统管理',
      // 图标样式class
      iconCls: 'el-icon-message',
      children: [
        { path: '/empty', component: empty, name: '主页', hidden: true },
        { path: '/table', component: table, name: '用户管理', hidden: false, meta: { requireAuth: true } },
        { path: '/t_charactter', component: tCharactter, name: '角色管理' },
        { path: '/permission', component: tPermission, name: '权限管理' },
        { path: '/perResourcetable', component: perResourcetable, name: '权限资源管理' }
      ]
    },
    {
      path: '/',
      component: index,
      name: '运营管理',
      children: [
        {path: '/core_billTable', component: coreBillTable, name: '账单明细查询'}
      ]
    },
    {
      path: '/',
      component: index,
      name: '退费管理',
      children: [
        {path: '/core_refundAdd', component: coreRefundAdd, name: '退费单录入'},
        {path: '/core_refundReview', component: coreRefundReview, name: '退费单审核'}
      ]
    }
  ]
})
export default router
