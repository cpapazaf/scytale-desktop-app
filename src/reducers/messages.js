import { ADD_MESSAGE } from '../constants/ActionTypes'

const Messages = (state = [], action) => {
  switch (action && action.type) {
    case ADD_MESSAGE:
      return state.concat([
        {
          message: action.payload.message,
          author: action.payload.author,
          timestamp: action.payload.timestamp
        }
      ])
    default:
      return state
  }
}

export default Messages
