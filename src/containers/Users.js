import { connect } from 'react-redux'
import UserListComponent from '../components/UserList'

export const Users = connect(state => ({
  users: state.users
}), {})(UserListComponent)
