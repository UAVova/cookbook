import { REQUEST_VERSIONS, RECEIVE_VERSIONS } from '../actions';
import union from 'lodash/union';

export default (state = {}, action) => {
  switch(action.type) {
    case REQUEST_VERSIONS:
      return {
        ...state,
        [action.recipeId]: {
          ...state[action.recipeId],
          isFetching: true
        }
      }
    case RECEIVE_VERSIONS:
      return {
        ...state,
        [action.response.recipeId]: {
          isFetching: false,
          ids: union(state[action.response.recipeId].ids, action.response.result),
          nextPage: action.response.nextPage
        }
      }
    default:
      return state;
  }
}