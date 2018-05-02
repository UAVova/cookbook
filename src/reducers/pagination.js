import { combineReducers } from 'redux';

import recipes from './recipes_pagination';
import versions from './versions_pagination';

export default combineReducers({recipes, versions});