import * as types from '../constants/ActionTypes'

const users = (state = [], action) => {
  switch (action && action.type) {
    case types.USERS_LIST:
      return action.users
    case types.ADD_USER:
      return state.concat([{id: action.id, name: action.name}])
    default:
      return state
  }
}

export default users
