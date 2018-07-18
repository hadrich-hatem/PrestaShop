const {AddProductPage} = require('../../selectors/BO/add_product_page');
const {AccessPageBO} = require('../../selectors/BO/access_page');
const {Menu} = require('../../selectors/BO/menu.js');
const commonScenarios = require('../common_scenarios/product');
let data = require('./../../datas/product-data');

scenario('BOOM-5702: Check the appearance of alert after clicking on "Save image settings" button in product page', client => {
  test('should open browser', () => client.open());
  test('should log in successfully in the Back Office', () => client.signInBO(AccessPageBO));
  test('should go to "Catalog" page', () => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu, Menu.Sell.Catalog.products_submenu));
  test('should click on "NEW PRODUCT" button', () => client.waitForExistAndClick(AddProductPage.new_product_button));

  scenario('Fill "Basic settings" form', client => {
    test('should set the "product name" input', () => client.waitAndSetValue(AddProductPage.product_name_input, 'PSI' + date_time));
    test('should set the "Quantity" input', () => client.waitAndSetValue(AddProductPage.quantity_shortcut_input, data.common.quantity, 2000));
    test('should set the "Reference" input', () => client.waitAndSetValue(AddProductPage.product_reference, data.common.product_reference));
    test('should upload the first product picture', () => client.uploadPicture('image_test.jpg', AddProductPage.picture));
    test('should click on "First image" of product', () => client.scrollWaitForExistAndClick(AddProductPage.picture_background.replace('%POS', 1), 50, 3000));
    commonScenarios.clickOnCoverAndSave(client, true);
    commonScenarios.clickOnCoverAndSave(client, true);
  }, 'product/product');
}, 'product/product', true);