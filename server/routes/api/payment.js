const config = require('../../../config/config')
const stripe = require('stripe')(config.stripe_secret_key)

module.exports = (app) => {
  // Returns the fields needed
  app.post('/api/stripe/account/get', function (req, res, next) {
    const stripeAccountId = 'acct_1CldUrBlnDwW7J6d';

    if (!stripeAccountId) {
      res.send({
        success: true,
        message: 'Missing stripe account.',
        setupBegan: false,
      });
    } else {
      stripe.accounts.retrieve(
        stripeAccountId,
        (err, account) => {
          if (err) {
            res.send({
              success: false,
              message: `Error: ${err.message}`,
              setupBegan: true,
            });
          } else {
            res.send({
              success: true,
              message: 'Stripe account',
              setupBegan: true,
              account: account,
            });
          }
        }),



  // Begin Stripe Connect setup
  app.post('/api/stripe/account/setup', function (req, res, next) {
    const country = req.body.countryCode;
    const email = 'waggx002@gmail.com';

    if (
      country !== 'CA' &&
      country !== 'US'
    ) {
      res.send({
        success: false,
        message: 'Error: Invalid country',
      });
    } else {
      stripe.accounts.create({
        type: 'custom',
        country,
        email,
      }, function(err, account) {
        if (err) {
          console.log('err', err);
          res.send({
            success: false,
            message: `Error: ${err.message}`,
          });
        } else {
            console.log('account', account);

            const { id } = account;

            stripe.accounts.update(
              id,
              {
                tos_acceptance: {
                  date: Math.floor(Date.now() / 1000),
                  ip: req.ip// Assumes you're not using a proxy
                }
              }
            ).then(() => {
              res.send({
                success: true,
                message: 'Account setup has begun.',
                accountId: id

          });
        });
      }
    })
  };
})
}
  })
}
