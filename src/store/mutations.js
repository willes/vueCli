/**
 * Created by willes on 2017/10/31.
 */
import * as types from './mutation-types'

const mutations = {
  [types.SET_USER] (state, user) {
    state.user = user
  },
  [types.SET_NAVBAR] (state, title) {
      state.navbar = title
  }
}

export default mutations
