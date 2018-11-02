import {ADD_MESSAGE} from '../constants/SimplePeerActions'

const Messages = (state = [], action) => {
  switch (action && action.type) {
    case ADD_MESSAGE:
      return state.concat([
        {
          message: action.message,
          author: action.author,
          timestamp: action.timestamp
        }
      ])
    default:
      return state
  }
}

export default Messages
