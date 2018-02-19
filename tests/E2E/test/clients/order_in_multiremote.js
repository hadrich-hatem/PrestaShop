var CommonClient = require('./common_client');
const {languageFO} = require('../selectors/FO/index');

class OrderInMultiremote extends CommonClient {

  constructor() {
    super(true);
  }

  signInFO(selector) {
    this.client.browserA
      .signInFO(selector, URL, 'pub@prestashop.com', '123456789');
    this.client.browserB
      .signInFO(selector, URL, 'pub2@prestashop.com', '123456789');
    return this.client.sync();
  }

  // changeLanguage(language) {
  //   if (language === "francais") {
  //     browserA
  //       .waitForExistAndClick(languageFO.language_selector)
  //       .waitForVisibleAndClick(languageFO.language_FR)
  //     browserB
  //       .waitForExistAndClick(languageFO.language_selector)
  //       .waitForVisibleAndClick(languageFO.language_FR)
  //   } else {
  //     browserA
  //       .waitForExistAndClick(languageFO.language_selector)
  //       .waitForVisibleAndClick(languageFO.language_EN)
  //   }
  //   return this.client.sync();
  // }

  createOrder(productPage, CheckoutOrderPage) {
    browserA
      .pause(5000)
      .waitForExistAndClick(productPage.first_product)
      .waitAndSetValue(productPage.first_product_quantity, "1")
      .waitForExistAndClick(CheckoutOrderPage.add_to_cart_button)
      .waitForExistAndClick(CheckoutOrderPage.proceed_to_checkout_modal_button)
      .waitForExistAndClick(CheckoutOrderPage.proceed_to_checkout_button)
      .waitForExistAndClick(CheckoutOrderPage.checkout_step2_continue_button)
      .waitForExistAndClick(CheckoutOrderPage.shipping_method_option)
      .waitForExistAndClick(CheckoutOrderPage.checkout_step3_continue_button)
      .waitForExistAndClick(CheckoutOrderPage.checkout_step4_payment_radio)
      .waitForExistAndClick(CheckoutOrderPage.condition_check_box)
      .waitForExistAndClick(CheckoutOrderPage.confirmation_order_button)
      .pause(2000);
    browserB
      .pause(5000)
      .waitForExistAndClick(productPage.first_product)
      .waitAndSetValue(productPage.first_product_quantity, "1")
      .waitForExistAndClick(CheckoutOrderPage.add_to_cart_button)
      .waitForExistAndClick(CheckoutOrderPage.proceed_to_checkout_modal_button)
      .waitForExistAndClick(CheckoutOrderPage.proceed_to_checkout_button)
      .waitForExistAndClick(CheckoutOrderPage.checkout_step2_continue_button)
      .waitForExistAndClick(CheckoutOrderPage.shipping_method_option)
      .waitForExistAndClick(CheckoutOrderPage.checkout_step3_continue_button)
      .waitForExistAndClick(CheckoutOrderPage.checkout_step4_payment_radio)
      .waitForExistAndClick(CheckoutOrderPage.condition_check_box)
      .waitForExistAndClick(CheckoutOrderPage.confirmation_order_button)
      .pause(2000);
    return this.client.sync();
  }
}

module.exports = OrderInMultiremote;