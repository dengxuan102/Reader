export default {
  changeUserStatus(state, v) {
    state.userState = v;
  },
  upgradeVip(state, v) {
    state.userState = 'vip'
    state.vipLevel = v
  },
  login(state, v) {
    state.userInfo = v.userInfo
    state.userStatus = v.userStatus
    state.userLevel = v.userLevel
  },
  countAdd(state, v) {
    state.count += v;
  },
  setMemberInfo(state, v) {
    state.userStatus = v.userStatus
    state.vipLevel = v.vipLevel
  }
}
