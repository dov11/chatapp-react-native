import API from '../../lib/api'
import { history } from '../../store'
import { CALL_API, FIND } from '../../middleware/api'


export const SUBSCRIBED_TO_USERS_SERVICE = 'SUBSCRIBED_TO_USERS_SERVICE'
export const USER_CREATED = 'USER_CREATED'
// export const MESSAGE_UPDATED = 'MESSAGE_UPDATED'
// export const MESSAGE_REMOVED = 'MESSAGE_REMOVED'

const api = new API()
const users = api.service('users')

const createdUser = (user) => {
  return {
    type: USER_CREATED,
    payload: user
  }
}

export const loadUsers = () => {
  return {
    [CALL_API]: {
      service: 'users',
      method: FIND,
      type: SUBSCRIBED_TO_USERS_SERVICE,
      authenticate: true,
      params: {
        query: {
          '$sort': { createdAt: -1},
          '$limit': 25,
        },
      },
    }
  }
}

export default () => {
  return (dispatch) => {
    api.authenticate()
      .then(() => {
        users.on('created', (users) => { dispatch(createdUser(user)) })
        // messages.on('updated', (message) => { dispatch(updatedMessage(message)) })
        // messages.on('patched', (message) => { dispatch(updatedMessage(message)) })
        // messages.on('removed', (message) => { dispatch(removedMessage(message)) })
      })

    dispatch(loadUsers())
  }
}
