/**
 * Lists reducers
 *
 * Reducers for clearing and setting the lists property in the Redux store
**/



import * as types from "../constants/actionTypes"

import _ from "lodash"



const initialState = null



export default (state=initialState, action) => {
  let lists

  switch(action.type) {


  case types.CLEAR:
    return action.clearAll || action.inclusions && action.inclusions.includes("lists") 
      ? initialState
      : state


  case types.SET_LIST:
    return { ...state, [action.list._id]: { ...action.list } }


  case types.SET_LISTS:
    lists = _.keyBy(action.lists, "_id")
    return { ...state, ...lists }


  default:
    return state

  }
}