const {AccessPageFO} = require('../../../selectors/FO/access_page');
const {CheckoutOrderPage} = require('../../../selectors/FO/order_page');
const {languageFO} = require('../../../selectors/FO/index');
const {SearchProductPage} = require('../../../selectors/FO/search_product_page');

var customersData = [{
  firstname: 'John',
  lastname: 'Doe',
  email: 'CJD@prestashop.com',
  password: '123456789',
  birthday: {
    day: '18',
    month: '12',
    year: '1991'
  }
},{
  firstname: 'John',
  lastname: 'Smith',
  email: 'CJS@prestashop.com',
  password: '123456789',
  birthday: {
    day: '18',
    month: '12',
    year: '1991'
  }
}];

var productData = {
  name: 'PrM',
  quantity: "1",
  price: '5',
  image_name: 'image_test.jpg',
  reference: 'a'
};

/**
 * This scenario is based on the bug described in this ticket
 * http://forge.prestashop.com/browse/BOOM-4438
 **/

scenario('Create order in the Front Office', () => {
  scenario('Open the browser and connect to the Front Office', client => {
    test('should open the browser', () => client.open());
    test('should login successfully in the Front Office', () => client.signInFO(AccessPageFO, customersData[0], customersData[1]));
  }, 'multiremote_client');
  scenario('Create order in the Front Office', client => {
    test('should set the language of shop to "English"', () => client.changeLanguage(languageFO, "english"));
    test('should search for the product "' + productData.name + date_time + '"', () => client.searchByValue(SearchProductPage.search_input, SearchProductPage.search_button, productData.name + date_time));
    test('should go to the product page', () => client.waitForExistAndClick(SearchProductPage.product_result_name));
    test('should click on "Add to cart" button  ', () => client.waitForExistAndClick(CheckoutOrderPage.add_to_cart_button));
    test('should check that the order does not created on the second browser', () => client.waitForVisibleElement(CheckoutOrderPage.proceed_to_checkout_button));
    test('should click on proceed to checkout button 2', () => client.waitForExistAndClick(CheckoutOrderPage.proceed_to_checkout_button));
    test('should click on confirm address button', () => client.waitForExistAndClick(CheckoutOrderPage.checkout_step2_continue_button));
    test('should click on "confirm delivery" button', () => client.waitForExistAndClick(CheckoutOrderPage.checkout_step3_continue_button));
    test('should set the payment type "Payment by bank wire"', () => client.waitForExistAndClick(CheckoutOrderPage.checkout_step4_payment_radio));
    test('should set "the condition to approve"', () => client.waitForExistAndClick(CheckoutOrderPage.condition_check_box));
    test('should click on order with an obligation to pay button', () => client.waitForExistAndClick(CheckoutOrderPage.confirmation_order_button, 7000));
    test('should check the order confirmation on the first browser', () => client.checkConfirmation(CheckoutOrderPage.confirmation_order_message, 'YOUR ORDER IS CONFIRMED', "contain"));
    test('should check that the order does not created on the second browser', () => client.waitForVisibleElement(CheckoutOrderPage.proceed_to_checkout_button));
  }, 'multiremote_client');
}, 'multiremote_client', true);