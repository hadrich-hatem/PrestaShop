const {AccessPageBO} = require('../../../selectors/BO/access_page');
const {AccessPageFO} = require('../../../selectors/FO/access_page');
const {productPage} = require('../../../selectors/FO/product_page');
const {buyOrderPage} = require('../../../selectors/FO/buy_order_page');
const {layerCart} = require('../../../selectors/FO/layer_cart_page');
const {CatalogPage} = require('../../../selectors/BO/catalogpage/index');
const {DiscountSubMenu} = require('../../../selectors/BO/catalogpage/discount_submenu');

scenario('Create "Catalog price rule"', () => {
    scenario('Login in the Back Office', client => {
        test('should open the browser', () => client.open());
        test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
    }, 'create_product');
    scenario('Create a new "Catalog price rule"', client => {
        test('should go to "Discount" page', () => client.goToSubtabMenuPage(CatalogPage.menu_button, DiscountSubMenu.submenu));
        test('should go to "Catalog Price Rules" page', () => client.waitForExistAndClick(DiscountSubMenu.catalog_price_rules_subtab));
        test('should click on "Add new catalog price rule" button', () => client.waitForExistAndClick(DiscountSubMenu.new_catalog_price_rules_button));
        test('should set the "Name" input', () => client.waitAndSetValue(DiscountSubMenu.name_input, 'discount' + date_time));
        test('should change the reduction type to "Percentage"', () => client.waitAndSelectByValue(DiscountSubMenu.reduction_type_select, 'percentage'));
        test('should set the "Reduction" input', () => client.waitAndSetValue(DiscountSubMenu.reduction_input, '19.666666'));
        test('should click on "Save" button', () => client.waitForExistAndClick(DiscountSubMenu.save_button));
        test('should verify the appearance of the green validation', () => client.checkTextValue(CatalogPage.success_panel, '×\nSuccessful creation.'));
    }, 'create_product');
    scenario('Logout from the Back Office', client => {
        test('should logout successfully from the Back Office', () => client.signOutBO());
    }, 'create_product');
}, 'create_product', true);

scenario('Check "Catalog price rule"', () => {
    scenario('Login in the Back Office', client => {
        test('should open the browser', () => client.open());
        test('should login successfully in the Back Office', () => client.signInFO(AccessPageFO));
    }, 'create_product');
    scenario('Check the created "Catalog price rule" in the Front Office', client => {
        test('should change front office language to english', () => client.languageChange('english'));
        test('should verify that the discount is equal to "-19.67%"', () => client.checkTextValue(productPage.first_product_discount, '-19.67%'));
        test('should choose product ', () => client.waitForExistAndClick(productPage.first_product));
        test('should verify that the discount is equal to "-19.67%"', () => client.checkTextValue(buyOrderPage.product_discount_details, 'SAVE 19.67%'));
        test('should click on "Add to cart" button  ', () => client.waitForExistAndClick(buyOrderPage.add_to_cart_button));
        test('should click on "Proceed to checkout" button', () => client.waitForVisibleAndClick(layerCart.command_button));
        test('should verify that the discount is equal to "-19.67%"', () => client.checkTextValue(buyOrderPage.product_discount_details, '-19.67%'));
    }, 'create_product');
    scenario('Logout from the Front Office', client => {
        test('should logout successfully from the Front Office', () => client.signOutFO(AccessPageFO));
    }, 'create_product');
}, 'create_product', true);