// var globals = require('../globals.webdriverio.js');
// var WebdriverIO = require('webdriverio'),
//   matrix = WebdriverIO.multiremote({
//     browserA: { desiredCapabilities: { browserName: 'chrome' } },
//     browserB: { desiredCapabilities: { browserName: 'chrome' } }
//   }),
//   browserA = matrix.select('browserA'),
//   browserB = matrix.select('browserB');
// const {AccessPageBO} = require('../selectors/BO/access_page');
// const {AccessPageFO} = require('../selectors/FO/access_page');
// const {productPage} = require('../selectors/FO/product_page');
// const {CheckoutOrderPage} = require('../selectors/FO/order_page');
//
// matrix.addCommand('signInFO1', function (selector) {
//   return browserA
//     .click(selector.sign_in_button)
//     .pause(2000)
//     .setValue(selector.login_input, 'pub@prestashop.com')
//     .pause(2000)
//     .setValue(selector.password_inputFO, '123456789')
//     .pause(2000)
//     .click(selector.login_button)
//     .pause(2000)
//     .click(selector.logo_home_page);
// });
// matrix.addCommand('signInFO2', function (selector) {
//   return browserB
//     .click(selector.sign_in_button)
//     .pause(2000)
//     .setValue(selector.login_input, 'pub1516801745858@prestashop.com')
//     .pause(2000)
//     .setValue(selector.password_inputFO, '123456789')
//     .pause(2000)
//     .click(selector.login_button)
//     .pause(2000)
//     .click(selector.logo_home_page);
// });
//
//
// describe('multiremote example', function() {
//
//   it('should open application', function() {
//     return matrix.init().url('http://prestashop1730b1.local/');
//   });
//
//   it('should login the browser', function() {
//     browserA.signInFO1(AccessPageFO);
//     browserB.signInFO2(AccessPageFO);
//     return matrix.sync();
//   });
//
//   it('Create order into multiremote', function() {
//     browserA
//       .pause(5000)
//       .click(productPage.first_product)
//       .setValue(productPage.first_product_quantity, "1")
//       .pause(2000)
//       .click(CheckoutOrderPage.add_to_cart_button)
//       .pause(2000)
//       .click(CheckoutOrderPage.proceed_to_checkout_modal_button)
//       .pause(2000)
//       .click(CheckoutOrderPage.proceed_to_checkout_button)
//       .pause(2000)
//       .click(CheckoutOrderPage.checkout_step2_continue_button)
//       .pause(2000)
//       .click(CheckoutOrderPage.shipping_method_option)
//       .pause(2000)
//       .click(CheckoutOrderPage.checkout_step3_continue_button)
//       .pause(2000)
//       .click(CheckoutOrderPage.checkout_step4_payment_radio)
//       .pause(2000)
//       .click(CheckoutOrderPage.condition_check_box)
//       .pause(2000)
//       .click(CheckoutOrderPage.confirmation_order_button)
//       .pause(30000);
//     browserB
//       .pause(5000)
//       .click(productPage.first_product)
//       .setValue(productPage.first_product_quantity, "1")
//       .pause(2000)
//       .click(CheckoutOrderPage.add_to_cart_button)
//       .pause(2000)
//       .click(CheckoutOrderPage.proceed_to_checkout_modal_button)
//       .pause(2000)
//       .click(CheckoutOrderPage.proceed_to_checkout_button)
//       .pause(2000)
//       .click(CheckoutOrderPage.checkout_step2_continue_button)
//       .pause(2000)
//       .click(CheckoutOrderPage.shipping_method_option)
//       .pause(2000)
//       .click(CheckoutOrderPage.checkout_step3_continue_button)
//       .pause(2000)
//       .click(CheckoutOrderPage.checkout_step4_payment_radio)
//       .pause(2000)
//       .click(CheckoutOrderPage.condition_check_box)
//       .pause(2000)
//       .click(CheckoutOrderPage.confirmation_order_button)
//       .pause(30000);
//     return matrix.sync();
//   });
//
//   it('should end the session', function() {
//     return matrix.pause(2000).end();
//   });
//
// });