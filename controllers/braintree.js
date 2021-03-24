require("dotenv").config();
const uuid = require("uuid/v4");

const braintree = require("braintree");

const gateway = new braintree.BraintreeGateway({
  /*environment: braintree.Environment.Sandbox,
  merchantId: "useYourMerchantId",
  publicKey: "useYourPublicKey",
  privateKey: "useYourPrivateKey",*/

  environment: braintree.Environment.Sandbox,
  merchantId: "3js84sfwrpmvtxmc",
  publicKey: "twnc3gz7cssms8bn",
  privateKey: "ebea806c267540ede7fb8eb87602ffb0",
});

exports.getToken = (req, res) => {
  gateway.clientToken.generate({}, (err, response) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(response);
    }
  });
};

/*
exports.getToken = (req, res) => {
  gateway.clientToken.generate(
    {
      customerId: aCustomerId,
    },
    (err, response) => {
      // pass clientToken to your front-end
      const clientToken = response.clientToken;
    }
  );
};*/

exports.makePayment = (req, res) => {
  let nonceFromTheClient = req.body.paymentMethodNonce;
  let amountFromTheClient = req.body.amount;
  gateway.transaction.sale(
    {
      amount: amountFromTheClient,
      paymentMethodNonce: nonceFromTheClient,
      /* deviceData: deviceDataFromTheClient,*/
      options: {
        submitForSettlement: true,
      },
    },
    (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(result);
      }
    }
  );
};
