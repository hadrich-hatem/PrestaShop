const {AccessPageBO} = require('../../../selectors/BO/access_page');
const {AddProductPage} = require('../../../selectors/BO/add_product_page');
const {Menu} = require('../../../selectors/BO/menu.js');

var productData = [{
  name: 'PrM',
  quantity: "1",
  price: '5',
  image_name: 'image_test.jpg',
  reference: 'a'
},{
  name: 'MP',
  quantity: "1",
  price: '5',
  image_name: 'image_test.jpg',
  reference: 'a'
}];

scenario('Create product in the Back Office', () => {
  scenario('Login in the Back Office', client => {
    test('should open the browser', () => client.open());
    test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
  }, 'multiremote_client');
  scenario('Create a new product in the Back Office', client => {
    test('should go to "Product Settings" page', () => client.waitForExistAndClick(Menu.Sell.Catalog.catalog_menu));
    test('should click on "New Product" button', () => client.waitForExistAndClick(AddProductPage.new_product_button));
    test('should set the "Name" input', () => client.waitAndSetValue(AddProductPage.product_name_input, productData[0].name + date_time, productData[1].name + date_time));
    test('should set the "Reference"', () => client.waitAndSetValue(AddProductPage.product_reference, productData[0].reference, productData[1].reference));
    test('should set the "Quantity" input', () => client.waitAndSetValue(AddProductPage.quantity_shortcut_input, productData[0].quantity, productData[0].quantity));
    test('should set the "Price" input', () => client.setPrice(AddProductPage.priceTE_shortcut, productData[0].price, productData[1].price));
    test('should upload the first product picture', () => client.uploadPicture(productData[0].image_name, productData[1].image_name, AddProductPage.picture));
    test('should switch the product online', () => client.waitForExistAndClick(AddProductPage.product_online_toggle));
    test('should click on "Save" button', () => client.waitForExistAndClick(AddProductPage.save_product_button));
    test('should verify the appearance of the green validation', () => client.checkTextValue(AddProductPage.validation_msg, 'Settings updated.'));
  }, 'multiremote_client');
  scenario('Logout from the Back Office', client => {
    test('should logout successfully from the Back Office', () => client.signOutBO());
  }, 'multiremote_client');
}, 'multiremote_client', true);