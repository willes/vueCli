/**
 * Created by willes on 2017/10/31.
 */
import * as types from './mutation-types'
export const Info = function ({commit, state}, {data, index}) {
  commit(types.SET_USER, data)
}
export const navbar = function ({commit, state}, {title}) {
  commit(types.SET_NAVBAR, title)
}
