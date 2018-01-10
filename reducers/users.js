import {
  SUBSCRIBED_TO_USERS_SERVICE,
  USER_CREATED,
  // MESSAGE_UPDATED,
  // MESSAGE_REMOVED
} from '../actions/users/subscribe'

export default (state = [], { type, payload } = {}) => {
  switch (type) {
    case SUBSCRIBED_TO_USERS_SERVICE :
      return ([].concat(payload)).reverse()

    case USER_CREATED :
      const newUser = Object.assign({}, payload)
      return state.concat([newUser])

    // case MESSAGE_UPDATED :
    //   return state.map((message) => {
    //     if (message._id === payload._id) {
    //       return Object.assign({}, payload)
    //     }
    //     return message
    //   })
    //
    // case MESSAGE_REMOVED :
    //   return state.filter((message) => (message._id !== payload._id))

    default :
      return state
  }
}
