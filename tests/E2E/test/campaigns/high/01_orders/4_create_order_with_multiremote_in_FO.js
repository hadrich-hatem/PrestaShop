const {AccessPageBO} = require('../../../selectors/BO/access_page');
const {AccessPageFO} = require('../../../selectors/FO/access_page');
const common_scenarios = require('./order');
const {productPage} = require('../../../selectors/FO/product_page');
const {CheckoutOrderPage} = require('../../../selectors/FO/order_page');

scenario('Create order in the Front Office', () => {
  scenario('Open the browser and connect to the Front Office', client => {
    test('should open the browser', () => client.open());
    test('should login successfully in the Front Office', () => client.signInFO(AccessPageFO));
  }, 'order_in_multiremote');
  scenario('Create order in the Front Office', client => {
    test('should set the language of shop to "English"', () => client.changeLanguage());
    /*test('should go to the first product page', () => client.waitForExistAndClick(productPage.first_product));
    test('should click on "Add to cart" button  ', () => client.waitForExistAndClick(CheckoutOrderPage.add_to_cart_button));
    test('should click on proceed to checkout button 1', () => client.waitForVisibleAndClick(CheckoutOrderPage.proceed_to_checkout_modal_button));
    test('should click on proceed to checkout button 2', () => client.waitForExistAndClick(CheckoutOrderPage.proceed_to_checkout_button));
    test('should click on confirm address button', () => client.waitForExistAndClick(CheckoutOrderPage.checkout_step2_continue_button));
    test('should click on "confirm delivery" button', () => client.waitForExistAndClick(CheckoutOrderPage.checkout_step3_continue_button));
    test('should set the payment type "Payment by bank wire"', () => client.waitForExistAndClick(CheckoutOrderPage.checkout_step4_payment_radio));
    test('should set "the condition to approve" c', () => client.waitForExistAndClick(CheckoutOrderPage.condition_check_box));
    test('should click on order with an obligation to pay button', () => client.waitForExistAndClick(CheckoutOrderPage.confirmation_order_button));
    test('should check the order confirmation', () => client.checkTextValue(CheckoutOrderPage.confirmation_order_message, 'YOUR ORDER IS CONFIRMED', "contain"));*/
  }, 'order_in_multiremote');
  // scenario('Create order in the Front Office', () => {
  //   common_scenarios.createMultiOrders(browserB);
  // }, 'order_in_multiremote');
}, 'order_in_multiremote');