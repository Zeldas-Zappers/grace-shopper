import axios from 'axios'

const FETCH_USERS = 'FETCH_USERS'

export const fetchUsers = (users) => {
  return {
    type: FETCH_USERS,
    users,
  }
}

export const setUsers = () => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get('/api/users')
      dispatch(fetchUsers(data))
    } catch (err) {
      console.error(err)
    }
  }
}

const initialState = []

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_USERS:
      return action.users
    default:
      return state
  }
}
