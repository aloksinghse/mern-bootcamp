require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const uuid = require("uuid/v4");

exports.makePayment = (req, res) => {
  const { products, token } = req.body;
  console.log("PRODUCTS:", products);
  console.log("TOKEN:", token);
  const user = req.profile;
  console.log("USER Email : ", user);

  /*const amount = products.reduce((currnetValue, nextValue) => {
    return currnetValue + nextValue.count * nextValue.price;
  }, 0);*/
  let amount = 0;
  products.map((product) => {
    amount += product.price;
  });

  const idempotencyKey = uuid();

  return stripe.customers
    .create({
      email: user.email,
      source: user._id,
    })
    .then((customer) => {
      stripe.charges
        .create(
          {
            amount: amount * 100,
            currency: "usd",
            customer: customer.id,
            receipt_email: user.email,
            description: "Test account",
            shipping: {
              /*name: token.card.name,
              address: {
                line1: token.card.address_line1,
                line2: token.card.address_line2,
                city: token.card.address_city,
                country: token.card.address_country,
                postal_code: token.card.address_zip,
              },*/
            },
          },
          { idempotencyKey }
        )
        .then((result) => {
          return res.status(200).json(result);
        })
        .catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));
};
