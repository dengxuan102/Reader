export default {
  memberInfo(state) {
    return state.userStatus === 'vip' ? (state.vipLevel > 0 ? `V${state.vipLevel}会员` : 'vip会员') : '普通会员'
  },
  // countAdd(state) {
  //   state.count += 2;
  // }
}
