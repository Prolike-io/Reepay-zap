// We recommend writing your creates separate like this and rolling them
// into the App definition at the end.
module.exports = {
  key: 'recipe',

  // You'll want to provide some helpful display labels and descriptions
  // for users. Zapier will put them into the UX.
  noun: 'Recipe',
  display: {
    label: 'Bla',
    description: 'BlaBlablablablalbalba'
  },

  // `operation` is where the business logic goes.
  operation: {
    inputFields: [
      {
        key: 'event_type', required: true, type: 'string',
        choices: [
          'customer_created', 'customer_changed', 'customer_deleted',
          'subscription_created', 'subscription_payment_method_added',
          'subscription_payment_method_changed', 'subscription_trial_end', 'subscription_renewal',
          'subscription_cancelled', 'subscription_uncancelled', 'subscription_on_hold',
          'subscription_on_hold_dunning', 'subscription_reactivated',
          'subscription_expired', 'subscription_expired_dunning', 'subscription_changed',
          'invoice_created', 'invoice_settled', 'invoice_authorized', 'invoice_dunning',
          'invoice_dunning_notification', 'invoice_dunning_cancelled', 'invoice_failed',
          'invoice_refund', 'invoice_reactivate', 'invoice_cancelled', 'invoice_changed',
          'invoice_credited',]
      },
      { key: 'customer_handle', required: true, type: 'string' },
      { key: 'subscription_handle', helpText: 'Handle/id of the subscription', type: 'string' },
      {
        key: 'returns', children: [
          {
            key: 'customer_fields', list: true, choices: [
              "handle", "email", "first_name", "last_name",
              "address", "address2", "city", "postal_code",
              "country", "phone", "company", "vat",
              "created", "deleted",
              "subscriptions", "active_subscriptions",
              "trial_active_subscriptions", "trial_cancelled_subscriptions",
              "expired_subscriptions", "on_hold_subscriptions", "cancelled_subscriptions",
              "non_renewing_subscriptions", "failed_invoices", "failed_amount",
              "cancelled_invoices", "cancelled_amount", "pending_invoices",
              "pending_amount", "dunning_invoices", "dunning_amount",
              "settled_invoices", "settled_amount", "refunded_amount",
              "pending_additional_costs", "pending_additional_cost_amount",
              "transferred_additional_costs", "transferred_additional_cost_amount",
              "pending_credits", "pending_credit_amount", "transferred_credits",
              "transferred_credit_amount", "test",]
          },

          {
            key: 'subscription_fields', list: true, choices: [
              "handle", "customer", "plan", "state",
              "amount", "quantity", "expires", "reactivated",
              "timezone", "created", "activated", "renewing",
              "plan_version", "amount_incl_vat",
              "start_date", "end_date", "grace_duration",
              "current_period_start", "next_period_start",
              "first_period_start", "last_period_start",
              "in_trial", "trial_start", "trial_end",
              "is_cancelled", "has_started",
              "renewal_count", "cancelled_date",
              "expired_date", "expire_reason",
              "on_hold_date", "on_hold_reason",
              "payment_method_added", "scheduled_plan_change",
              "reminder_email_sent", "failed_invoices",
              "failed_amount", "cancelled_invoices",
              "cancelled_amount", "pending_invoices",
              "pending_amount", "dunning_invoices",
              "dunning_amount", "settled_invoices",
              "settled_amount", "refunded_amount",
              "pending_additional_costs",
              "pending_additional_cost_amount",
              "transferred_additional_costs",
              "transferred_additional_cost_amount",
              "pending_credits", "pending_credit_amount",
              "transferred_credits", "transferred_credit_amount",
              "hosted_page_links", "subscription_discounts",
              "pending_change", "subscription_changes",
              "subscription_add_ons", "test",]
          },
        ]
      },
    ],
    perform: (z, bundle) => {
      return main(z, bundle.inputData.customer_handle, bundle.inputData.subscription_handle, bundle)
    },
  }
};

function filter_object(return_filter, obj) {
  var rtn_obj = {};
  return_filter.forEach(el => {
    rtn_obj[el] = obj[el];
  });
  return rtn_obj;
}


function cust_api(z, cust_id) {
  const promise = z.request({
    url: 'https://api.reepay.com/v1/customer/' + cust_id,
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    }
  }).then((response) => JSON.parse(response.content))
  return promise
}

function sub_api(z, cust_id) {
  const promise = z.request({
    url: 'https://api.reepay.com/v1/subscription/' + cust_id,
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    }
  }).then((response) => JSON.parse(response.content))
  return promise
}

async function main(z, cust_id, sub_handle, bundle) {
  var bla1 = await sub_api(z, sub_handle)
  var bla2 = await cust_api(z, cust_id)
  
  return { 
    "cust": filter_object(bundle.inputData.returns[0].customer_fields, bla2), 
    "sub": filter_object(bundle.inputData.returns[0].subscription_fields, bla1) 
  }
}