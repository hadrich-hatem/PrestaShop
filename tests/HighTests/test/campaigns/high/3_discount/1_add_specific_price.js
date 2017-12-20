const {AccessPageBO} = require('../../../selectors/BO/access_page');
const {AccessPageFO} = require('../../../selectors/FO/access_page');
const {AddProductPage} = require('../../../selectors/BO/add_product_page');
const {SearchProductPage} = require('../../../selectors/FO/search_product_page');
const {buyOrderPage} = require('../../../selectors/FO/buy_order_page');
const {layerCart} = require('../../../selectors/FO/layer_cart_page');
const common = require('../common/common');

var productData = {
    name: 'SpecificPrice',
    quantity: "10",
    price: '5',
    image_name: 'image_test.jpg',
    pricing: {
        unitPrice: "10",
        unity: "1",
        wholesale: "5",
        type: 'percentage',
        discount: '19.6'
    }
};

scenario('Create "Product"', () => {
    scenario('Login in the Back Office', client => {
        test('should open the browser', () => client.open());
        test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
    }, 'create_product');
    common.createProduct(AddProductPage, productData);
    scenario('Logout from the Back Office', client => {
        test('should logout successfully from the Back Office', () => client.signOutBO());
    }, 'create_product');
}, 'create_product', true);

scenario('Check "Specific price"', () => {
    scenario('Login in the Back Office', client => {
        test('should open the browser', () => client.open());
        test('should login successfully in the Back Office', () => client.signInFO(AccessPageFO));
    }, 'create_product');
    scenario('Check the created "Specific price" in the Front Office', client => {
        test('should change front office language to english', () => client.languageChange('english'));
        test('should search for the product', () => client.searchByValue(SearchProductPage.search_input, SearchProductPage.search_button, productData["name"]));
        test('should verify that the discount is equal to "-19.67%"', () => client.checkTextValue(SearchProductPage.product_result_discount, '-19.67%'));
        test('should go to the product page', () => client.waitForExistAndClick(SearchProductPage.product_result_name));
        test('should verify that the discount is equal to "-19.67%"', () => client.checkTextValue(buyOrderPage.product_discount_details, 'SAVE 19.67%'));
        test('should click on "Add to cart" button  ', () => client.waitForExistAndClick(buyOrderPage.add_to_cart_button));
        test('should click on "Proceed to checkout" button', () => client.waitForExistAndClick(layerCart.command_button));
        test('should verify that the discount is equal to "-19.67%"', () => client.checkTextValue(buyOrderPage.product_discount_details, '-19.67%'));
    }, 'create_product');
    scenario('Logout from the Front Office', client => {
        test('should logout successfully from the Front Office', () => client.signOutFO(AccessPageFO));
    }, 'create_product');
}, 'create_product', true);