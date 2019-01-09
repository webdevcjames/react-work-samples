/**
 * Tab Menu component
 *
 * Simply wraps TabMenuItem components
**/



import React from "react"
import PropTypes from "prop-types"

import "./style.sass"



export const TabMenu = props => (
  <ul className="tab-menu">
    { React.Children.map( props.children, menuItem => (
      <li className="tab-menu-item">
        { menuItem }
      </li>
    ) ) }
  </ul>
)



TabMenu.displayName = "TabMenu"



TabMenu.propTypes = {
  children: PropTypes.node
}



export default TabMenu
