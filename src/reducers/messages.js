import { ADD_MESSAGE, DELETE_MESSAGE } from '../constants/ActionTypes'

const Messages = (state = [], action) => {
  switch (action && action.type) {
    case ADD_MESSAGE:
      return state.concat([
        {
          message: action.payload.message,
          author: action.payload.author,
          timestamp: action.payload.timestamp,
          mid: action.payload.mid
        }
      ])
    case DELETE_MESSAGE:
      return state.filter(msg => msg.mid !== action.payload.mid)
    default:
      return state
  }
}

export default Messages
