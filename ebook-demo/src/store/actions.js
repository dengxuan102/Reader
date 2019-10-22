export default {
  bugVip({
    commit
  }, e) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // if (e.key === 'level') {
        //   commit('upgradeVip', e.value)
        // } else if (e.key === 'vip') {
        //   commit('changeUserStatus', e.value)
        // }
        // resolve()
        commit('setMemberInfo', {
          userStatus: e.userStatus,
          vipLevel: e.vipLevel
        })
      }, 1000)
    })
  },
  getFreeVip({
    commit
  }, o) {
    console.log('vm', o.vm)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('changeUserStatus', o.v)
        resolve()
      }, 1000)
    })
  }
}
