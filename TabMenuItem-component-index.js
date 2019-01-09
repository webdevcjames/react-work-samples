/**
 * Tab Menu Item component
 *
 * Component used to control which tab is currently visible/open/active
**/



import * as viewActions from "../../actions/view"

import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import { filterObject, getDeep } from "../../helpers/object"



export const TabMenuItem = props => {
  const isActive = (props.tab === props.currentTab) || (props.default && !props.currentTab)
  const onClick = e => {
    e.preventDefault()
    props.tab && !isActive && props.switchToTab(props.tab)
  }
  return <a href="#" { ...filterObject({ className: isActive && "active" }) } onClick={onClick}>{props.children}</a>
}



TabMenuItem.displayName = "TabMenuItem"



TabMenuItem.propTypes = {
  children:    PropTypes.node,
  currentTab:  PropTypes.string,
  default:     PropTypes.bool,
  switchToTab: PropTypes.func,
  tab:         PropTypes.string.isRequired
}



export const mapDispatchToProps = dispatch => { return {
  switchToTab: tab => dispatch(viewActions.setViewTab(tab))
} }



export const mapStateToProps = state => { return {
  currentTab: getDeep(state, "view.tab")
} }



export default connect(mapStateToProps, mapDispatchToProps)(TabMenuItem)
