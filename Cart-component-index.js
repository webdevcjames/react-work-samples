/**
 * Cart component
 *
 * Component used to modify and view the products to be purchased
**/



import * as cartHelpers from "../../helpers/cart"
import * as entities from "../../constants/entities"
import * as searches from "../../constants/searches"

import React from "react"
import PropTypes from "prop-types"
import _ from "lodash"

import Button from "../Button"
import EntitySearch from "../EntitySearch"
import Icon from "../Icon"
import ResultsTable from "../ResultsTable"

import { classify } from "../../helpers/array"
import { filterObject } from "../../helpers/object"

import "./style.sass"



export const Cart = props => {
  const disabled = props.disabled
  const error    = props.error
  const value    = props.value || {}

  const columns = props.columns || filterObject({
    quantity: { label: "Qty",        width: 2 },
    name:     { label: "Product",    width: !disabled ? 5 : 7 },
    price:    { label: "Unit Price", width: !disabled ? 2 : 3 },
    total:    { label: "Line Total", width: !disabled ? 2 : 3 },
    remove:   !disabled && { label: "", width: 0 },
  })



  const renderItem = (item, column) => {
    switch(column) {
    case "quantity":
      return !disabled ? (
        <input type="number" className="cart-item-input" value={item[column]}
          onBlur={e => updateItems(cartHelpers.setCartItemQuantity(item, e.target.value || 1, value))}
          onChange={e => updateItems(cartHelpers.setCartItemQuantity(item, e.target.value, value))} />
      ) : item[column]


    case "price":
      return `$${parseFloat(item[column]).toFixed(2)}`


    case "total":
      return `$${(parseInt(item["quantity"] || 0) * parseFloat(item["price"])).toFixed(2)}`


    case "remove":
      return (
        <Button color="red" icon onClick={() => updateItems(cartHelpers.removeItemFromCart(item, value))}>
          <Icon>{props.removeIcon || "clear"}</Icon>
        </Button>
      )


    default:
      return item[column]
    }
  }



  const updateItems = items => props.onChange && props.onChange({ target: { value: items } })



  const AddItem = (
    <tr key="AddItem" className="add-cart-item">
      <td colSpan={Object.keys(columns).length}>
        <EntitySearch
          fields={["name"]}
          getResultDescription={product => product.category.replace(/\./g, " > ")}
          getResultTitle={product => product.name}
          onSelectResult={item => updateItems(cartHelpers.addItemToCart(item, value))}
          placeholder={props.placeholder || "Enter name of product to add"}
          resultStyle={{ icon: "basket", width: "33.3333%" }}
          searchEntity={entities.PRODUCT}
          searchName={searches.PRODUCT_SEARCH}
        />
      </td>
    </tr>
  )



  return (
    <div className={classify("field-container cart", error && "error")}>
      <ResultsTable
        className={classify("cart-items", props.className, disabled && "read-only")}
        columns={columns}
        items={[ ..._.map(value, (item, key) => ({ ...item, _id: key })), { render: () => !disabled && AddItem } ]}
        onRender={renderItem}
      />                
      {error && <label className="field-error">{error}</label>}
    </div>
  )
}



Cart.displayName = "Cart"



Cart.propTypes = {
  className:   PropTypes.string,
  columns:     PropTypes.object,
  disabled:    PropTypes.bool,
  error:       PropTypes.string,
  onChange:    PropTypes.func,
  placeholder: PropTypes.string,
  removeIcon:  PropTypes.string,
  value:       PropTypes.object,
}



export default Cart
