import { createStore, combineReducers } from 'redux'

function countReducer(state = 0, action) {
  switch(action.type) {
    case "ADD":
      return state + 1;
    case 'MINUS':
      return state - 1;
    default:
      return 0;
  }
}

// 连接多个reducer
const reducer = combineReducers({
  count: countReducer
})
const store = createStore(reducer)
// const store = createStore(countReducer)

export default store