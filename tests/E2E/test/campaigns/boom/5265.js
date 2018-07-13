const {AddProductPage} = require('../../selectors/BO/add_product_page.js');
const {AccessPageBO} = require('../../selectors/BO/access_page.js');
const {Menu} = require('../../selectors/BO/menu.js');
const product = require('../common_scenarios/product');
let promise = Promise.resolve();

scenario('BOOM-5265: Check that the field "Pre-defined" and "Custom value" is disabled in product page', client => {
  test('should open browser', () => client.open());
  test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
  test('should go to "Catalog" page', () => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu, Menu.Sell.Catalog.products_submenu));
  test('should click on "NEW PRODUCT"', () => client.waitForExistAndClick(AddProductPage.new_product_button));

  scenario('Fill "Basic settings" form', client => {
    test('should set the "product name" input', () => client.waitAndSetValue(AddProductPage.product_name_input, 'FCP' + date_time));
    test('should upload the first product picture', () => client.uploadPicture('1.png', AddProductPage.picture));
    test('should set the "Reference" input', () => client.waitAndSetValue(AddProductPage.product_reference_input, 'grayshirt'));
    test('should set the "Quantity" input', () => client.waitAndSetValue(AddProductPage.quantity_shortcut_input, "100"));
    test('should set the "Tax exclude" price input', () => client.setPrice(AddProductPage.priceTE_shortcut, '10'));
    test('should set the "Summary" text', () => client.setEditorText(AddProductPage.summary_textarea, "Create product"));
    test('should click on "Description" tab', () => client.scrollWaitForExistAndClick(AddProductPage.tab_description));
    test('should set the "Description" text', () => client.setEditorText(AddProductPage.description_textarea, "Create product"));
    product.addProductFeature(client, "Frame Size", 0, "40x60cm");
    test('should check that the "Custom value" input is well disabled', () => client.checkAttributeValue(AddProductPage.feature_custom_value.replace('%ID', 0), 'disabled', 'disabled', 'equal', 2000));
    test('should click on "SAVE" button', () => {
      return promise
        .then(() => client.isVisible(AddProductPage.symfony_toolbar, 3000))
        .then(() => {
          if (global.isVisible) {
            client.waitForExistAndClick(AddProductPage.symfony_toolbar)
          }
        })
        .then(() => client.waitForExistAndClick(AddProductPage.save_product_button, 2000));
    });
    product.addProductFeature(client, "Compositions", 1, '', "Azerty", "custom_value");
    test('should check that the "Pre-defined value" select is well disabled', () => client.isExisting(AddProductPage.feature_value_select.replace('%ID', 1).replace('%V', '@disabled'), 2000));
    test('should click on "Save" button', () => client.waitForExistAndClick(AddProductPage.save_product_button, 3000));
    test('should check that the success alert message is well displayed', () => client.waitForExistAndClick(AddProductPage.close_validation_button));
  }, 'product/product');
}, 'product/product', true);
