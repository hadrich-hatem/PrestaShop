/**
 * This scenario is based on the bug described in this ticket
 * http://forge.prestashop.com/browse/BOOM-2518
 **/
const {AccessPageBO} = require('../../../selectors/BO/access_page');
const {AccessPageFO} = require('../../../selectors/FO/access_page');
const {productPage} = require('../../../selectors/FO/product_page');
const {CheckoutOrderPage} = require('../../../selectors/FO/order_page');
const common_discount_scenarios = require('./discount');
let promise = Promise.resolve();

/** Exemple of carte rule date
 * var cartRuleDate = {
 *  name: 'carte_rule_name',
 *  customer_email: 'customer_email',
 *  minimum_amount: 'condition_minimum_amount',
 *  reduction_type: 'percent/amount',
 *  reduction: 'reduction_value'
 * };
 */

var cartRuleDate = [
  {
    name: 'Percent1 50%',
    customer_email: 'pub@prestashop.com',
    minimum_amount: '20',
    reduction_type: 'percent',
    reduction: '50'
  },
  {
    name: 'Percent2 50%',
    customer_email: 'pub@prestashop.com',
    minimum_amount: '20',
    reduction_type: 'percent',
    reduction: '50'
  },
  {
    name: 'Amount €20',
    customer_email: 'pub@prestashop.com',
    minimum_amount: '20',
    reduction_type: 'amount',
    reduction: '20'
  }
];

scenario('Create a new "Cart Rule" in the Back Office', () => {
  scenario('Login in the Back Office', client => {
    test('should open the browser', () => client.open());
    test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
  }, 'discount');
  common_discount_scenarios.createCartRule(cartRuleDate[0], 'codePromo1');
  common_discount_scenarios.createCartRule(cartRuleDate[1], 'codePromo2');
  common_discount_scenarios.createCartRule(cartRuleDate[2], 'codePromo3');
  scenario('Logout from the Back Office', client => {
    test('should logout successfully from Back Office', () => client.signOutBO());
  }, 'discount');
}, 'discount', true);

scenario('Check the total price after entering vouchers in the Front Office', () => {
  scenario('Login in the Front Office', client => {
    test('should open the browser', () => client.open());
    test('should login successfully in the Front Office', () => client.signInFO(AccessPageFO));
  }, 'discount');
  scenario('Check the total price of the shopping cart', client => {
    test('should change front office language to english', () => client.changeLanguage('english'));
    test('should go to the first product page', () => client.waitForExistAndClick(productPage.first_product));
    test('should set the "Quantity" input', () => client.waitAndSetValue(productPage.first_product_quantity, 3));
    test('should click on "ADD TO CART" button', () => client.waitForExistAndClick(CheckoutOrderPage.add_to_cart_button));
    test('should click on "PROCEED TO CHECKOUT" modal button', () => client.waitForVisibleAndClick(CheckoutOrderPage.proceed_to_checkout_modal_button));
    test('should click on "Have a promo code?" link', () => client.waitForExistAndClick(CheckoutOrderPage.promo_code_link));
    test('should set the "Promo code" input', () => client.setPromoCode(CheckoutOrderPage.promo_code_input, CheckoutOrderPage.promo_code_add_button, 'codePromo1'));
    test('should click on "Have a promo code?" link', () => client.waitForExistAndClick(CheckoutOrderPage.promo_code_link));
    test('should set the "Promo code" input', () => client.setPromoCode(CheckoutOrderPage.promo_code_input, CheckoutOrderPage.promo_code_add_button, 'codePromo2'));
    test('should check the total price after reduction', () => {
      return promise
        .then(() => client.getTextInVar(CheckoutOrderPage.cart_subtotal_products, "totalProducts"))
        .then(() => client.getTextInVar(CheckoutOrderPage.cart_subtotal_discount, "totalDiscount"))
        .then(() => client.checkTotalPrice(CheckoutOrderPage.cart_total))
    });
    test('should click on "Remove voucher" button', () => client.waitForExistAndClick(CheckoutOrderPage.remove_voucher_button));
    test('should click on "Have a promo code?" link', () => client.waitForExistAndClick(CheckoutOrderPage.promo_code_link));
    test('should set the "Promo code" input', () => client.setPromoCode(CheckoutOrderPage.promo_code_input, CheckoutOrderPage.promo_code_add_button, 'codePromo3'));
    test('should check the total price after reduction', () => {
      return promise
        .then(() => client.getTextInVar(CheckoutOrderPage.cart_subtotal_products, "totalProducts"))
        .then(() => client.getTextInVar(CheckoutOrderPage.cart_subtotal_discount, "totalDiscount"))
        .then(() => client.checkTotalPrice(CheckoutOrderPage.cart_total, 'amount'))
    });
  }, 'discount');
  scenario('Logout from the Front Office', client => {
    test('should logout successfully from the Front Office', () => client.signOutFO(AccessPageFO));
  }, 'discount');
}, 'discount', true);

scenario('Delete "Cart Rule" in the Back Office', () => {
  scenario('Login in the Back Office', client => {
    test('should open the browser', () => client.open());
    test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
  }, 'discount');
  common_discount_scenarios.deleteCartRule(cartRuleDate[0].name);
  common_discount_scenarios.deleteCartRule(cartRuleDate[1].name);
  common_discount_scenarios.deleteCartRule(cartRuleDate[2].name);
  scenario('Logout from the Back Office', client => {
    test('should logout successfully from Back Office', () => client.signOutBO());
  }, 'discount');
}, 'discount', true);