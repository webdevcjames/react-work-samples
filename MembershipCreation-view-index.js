/**
 * Membership Creation view
 *
 * View used to create a new Membership for a client
 *
 * In this context, a Membership is simply linking a client with a product
**/



import * as entities from "../../constants/entities"
import * as forms from "../../constants/forms"
import * as generalActions from "../../actions/general"
import * as membershipActions from "../../actions/membership"
import * as searches from "../../constants/searches"
import * as statuses from "../../constants/statuses"

import React from "react"
import PropTypes from "prop-types"
import _ from "lodash"
import { connect } from "react-redux"

import Button from "../../components/Button"
import EntityField from "../../components/EntityField"
import FlexibleSpace from "../../components/FlexibleSpace"
import Form from "../../components/Form"
import ScreenOverlay from "../../components/ScreenOverlay"
import View from "../../components/View"

import { getDeep } from "../../helpers/object"



export const MembershipCreation = props => (
  <View className="content">

    { !props.completed && (
      <View className="scroll-content" direction="row">
        <View direction="column" padding={["0", "48px"]} fill>
          <h1 style={{ padding: "48px 0 0" }}>Create New Membership</h1>

          <Form name={forms.MEMBERSHIP_CREATION}>
            <fieldset className="form-section">
              <div className="form-section-controls">
                <EntityField
                  fields={["firstName", "lastName"]}
                  label="Client"
                  name="clientId"
                  onRenderResult={clientItem => clientItem.email}
                  placeholder="Find client"
                  required
                  resultIcon="face"
                  resultTitle={clientItem => `${clientItem.firstName} ${clientItem.lastName}`}
                  searchEntity={entities.CLIENT}
                  searchName={searches.CLIENT_SEARCH}
                  width="33.3333%"
                />
                <EntityField
                  fields={["name"]}
                  label="Product"
                  name="productId"
                  onRenderResult={productItem => `${_.startCase(productItem.productType)} / ${productItem.category.replace(/\./g, " > ")}`}
                  placeholder="Find product"
                  required
                  resultIcon="basket"
                  resultTitle={productItem => productItem.name}
                  searchEntity={entities.PRODUCT}
                  searchName={searches.PRODUCT_SEARCH}
                  width="33.3333%"
                />
              </div>
            </fieldset>

            <FlexibleSpace />

            <div className="form-buttons">
              <Button 
                onClick={() => props.requestMembershipCreation && props.requestMembershipCreation()} 
                size="large" 
                color="green"
              >
                  Create
              </Button>
            </div>
          </Form>
        </View>
      </View>
    ) }

    {/* Success */}
    { props.completed && (
      <ScreenOverlay>
        <h1>Membership Created!</h1>
        <p className="subheadline">All done! With that out of the way, it&#39;s time to:</p>
        <View direction="column" align="center" valign="center" padding={["16px", "0", "0"]}>
          <Button color="white" onClick={props.reset}>Create Another</Button>
          <Button color="transparent" onClick={() => props.navigateTo("/membership/search")}>Manage Memberships</Button>
        </View>
      </ScreenOverlay>
    ) }
  </View>
)



MembershipCreation.displayName = "MembershipCreation"



MembershipCreation.propTypes = {
  completed:                 PropTypes.bool,
  navigateTo:                PropTypes.func,
  requestMembershipCreation: PropTypes.func,
  reset:                     PropTypes.func,
}



export const mapStateToProps = state => ({
  completed: getDeep(state, "view.status") == statuses.SUCCESSFUL
})



export const mapDispatchToProps = dispatch => ({
  navigateTo:                location => dispatch(generalActions.navigateTo(location)),
  requestMembershipCreation: ()       => dispatch(membershipActions.createMembershipFromForm(forms.MEMBERSHIP_CREATION)),
  reset:                     ()       => dispatch(generalActions.clear())
})



export default connect(mapStateToProps, mapDispatchToProps)(MembershipCreation)
