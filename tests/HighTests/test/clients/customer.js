var CommonClient = require('./common_client');

class CreateCustomer extends CommonClient {

  setBirthday(customer) {
    return this.client
      .waitAndSelectByValue(customer.days_select, '18')
      .waitAndSelectByValue(customer.month_select, '12')
      .waitAndSelectByValue(customer.years_select, '1991')
  }

  searchByEmail(customer, customer_email) {
    if (global.test === true){
      return this.client
          .waitAndSetValue(customer.customer_filter_by_name_input, customer_email)
          .waitForExistAndClick(customer.click_outside)
          .waitForExistAndClick(customer.customer_search_button)
          .getText(customer.email_address_value.replace('%ID', 6)).then(function (text) {
            expect(text).to.be.equal(customer_email);
          })
    }else {
      return this.client
          .getText(customer.email_address_value.replace('%ID', 5)).then(function (text) {
            expect(text).to.be.equal(customer_email);
          })
    }
  }

  searchByAddress(addresses, address) {
    if (global.test === true){
      return this.client
          .waitAndSetValue(addresses.filter_by_address_input, address)
          .waitForExistAndClick(addresses.click_outside)
          .waitForExistAndClick(addresses.address_search_button)
          .getText(addresses.address_value.replace('%ID', 5)).then(function (text) {
            expect(text).to.be.equal("12 rue d'amsterdam" + address);
          })
    }else {
      return this.client
          .getText(addresses.address_value.replace('%ID', 4)).then(function (text) {
            expect(text).to.be.equal("12 rue d'amsterdam" + address);
          })
    }
  }
}

module.exports = CreateCustomer;
