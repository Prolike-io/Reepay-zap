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
      { key: 'apikey', required: true, type: 'string' },
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
      // settings = JSON.parse(bundle.inputData);

      // if (bundle.inputData.event_type in settings) {
      //   tmp_setting = settings[bundle.inputData.event_type]
      //   return_object = {}
      //   if (tmp_setting["customer"]) {
      //     const promise = z.request({
      //       url: 'https://api.reepay.com/v1/customer/' + bundle.inputData.customer,
      //       method: 'GET',
      //       headers: {
      //         'content-type': 'application/json',
      //         'authorization': 'basic ' + bundle.inputData.apikey
      //       }
      //     }).then((response) => JSON.parse(response.content)).then((json_obj) => {


      //       z.request({
      //         url: 'http://dcarl.me:5000/v1/test',
      //         method: 'POST',
      //         body: JSON.stringify({
      //           data: json_obj
      //         }),
      //         headers: {
      //           'content-type': 'application/json',

      //           // This is NOT how you normally do authentication. This is just to demo how to write a create here.
      //           // Refer to this doc to set up authentication:
      //           // https://zapier.github.io/zapier-platform-cli/#authentication
      //           'X-API-Key': bundle.inputData.apikey
      //         }
      //       });
      //     })
      // return promise.then((response) => JSON.parse(response.content));
      rtn = [];

      rtn.push(bundle.inputData)



      return { 'rtn': rtn };
      // return bundle.inputData;
      // const promise2 = z.request({
      //   url: 'http://dcarl.me:5000/v1/test',
      //   method: 'POST',
      //   body: JSON.stringify({
      //     data: promise
      //   }),
      //   headers: {
      //     'content-type': 'application/json',

      //     // This is NOT how you normally do authentication. This is just to demo how to write a create here.
      //     // Refer to this doc to set up authentication:
      //     // https://zapier.github.io/zapier-platform-cli/#authentication
      //     'X-API-Key': bundle.inputData.apikey
      //   }
      // });

      // return promise2.then((response) => JSON.parse(response.content));
      // }

      //   const promise = z.request({
      //     url: 'http://dcarl.me:5000/v1/test',
      //     method: 'POST',
      //     body: JSON.stringify({
      //       key: bundle.inputData.apikey,
      //       Event_Type: bundle.inputData.event_type,
      //       blin: bundle.inputData.blin,
      //     }),
      //     headers: {
      //       'content-type': 'application/json',

      //       // This is NOT how you normally do authentication. This is just to demo how to write a create here.
      //       // Refer to this doc to set up authentication:
      //       // https://zapier.github.io/zapier-platform-cli/#authentication
      //       'X-API-Key': bundle.inputData.apikey
      //     }
      //   });

      //   return promise.then((response) => JSON.parse(response.content));
      // }
    },

    // In cases where Zapier needs to show an example record to the user, but we are unable to get a live example
    // from the API, Zapier will fallback to this hard-coded sample. It should reflect the data structure of
    // returned records, and have obviously dummy values that we can show to any user.
    sample: {
      id: 1,
      createdAt: 1472069465,
      name: 'Best Spagetti Ever',
      authorId: 1,
      directions: '1. Boil Noodles\n2.Serve with sauce',
      style: 'italian'
    },

    // If the resource can have fields that are custom on a per-user basis, define a function to fetch the custom
    // field definitions. The result will be used to augment the sample.
    // outputFields: () => { return []; }
    // Alternatively, a static field definition should be provided, to specify labels for the fields
    // outputFields: [
    //   {key: 'id', label  : 'ID'},
    //   {key: 'apikey', label: 'API Key'},
    //   {key: 'createdAt', label: 'Created At'},
    //   {key: 'event_type', label: 'Event type'},
    //   {key: 'directions', label: 'Directions'},
    //   {key: 'authorId', label: 'Author ID'},
    //   {key: 'style', label: 'Style'}
    // ]
  }
};
