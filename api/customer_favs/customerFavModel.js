const db = require('../../data/db-config');

const getFavsById = async (id) => {
    return db("groomer")
    .innerJoin( "customer_favs", "customer_favs.groom_id", "groomer.user_id")
    .innerJoin( "customer", "customer.user_id", "customer_favs.customer_id")
    .select(
      "groomer.business_name",
      "groomer.given_name",
      "groomer.family_name",
      "groomer.phone_number",
      "groomer.address",
      "groomer.city",
      "groomer.state",
      "groomer.country",
      "groomer.email",
      "groomer.about"
    )
    .where("customer.user_id", id)
  }

module.exports = {
    getFavsById,
}