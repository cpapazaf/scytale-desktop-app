import { MESSAGE_ADD, MESSAGE_DELETE, MESSAGE_DELETE_ALL } from '../constants/ActionTypes'

const Messages = (state = [], action) => {
  switch (action && action.type) {
    case MESSAGE_ADD:
      return state.concat([
        {
          message: action.payload.message,
          author: action.payload.author,
          timestamp: action.payload.timestamp,
          mid: action.payload.mid
        }
      ])
    case MESSAGE_DELETE:
      return state.filter(msg => msg.mid !== action.payload.mid)
    case MESSAGE_DELETE_ALL:
        return []
    default:
      return state
  }
}

export default Messages
