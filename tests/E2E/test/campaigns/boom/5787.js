const {AddProductPage} = require('../../selectors/BO/add_product_page');
const {AccessPageBO} = require('../../selectors/BO/access_page');
const {Menu} = require('../../selectors/BO/menu.js');
let data = require('./../../datas/product-data');
let promise = Promise.resolve();

scenario('BOOM-5787: Add product to pack then check the existence of this product in the result search', client => {
  test('should open browser', () => client.open());
  test('should log in successfully in the Back Office', () => client.signInBO(AccessPageBO));
  test('should go to "Catalog" page', () => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu, Menu.Sell.Catalog.products_submenu));
  test('should click on "NEW PRODUCT" button', () => client.waitForExistAndClick(AddProductPage.new_product_button));

  scenario('Fill "Basic settings" form', client => {
    test('should set the "product name" input', () => client.waitAndSetValue(AddProductPage.product_name_input, 'BPK' + date_time));
    test('should select the "Pack of products" type', () => client.waitAndSelectByValue(AddProductPage.product_type, 1));
    test('should set the "Add products to your pack"', () => {
      return promise
        .then(() => client.waitAndSetValue(AddProductPage.search_product_pack, data.pack.pack.pack1.search))
        .then(() => client.waitForExistAndClick(AddProductPage.product_item_pack))
        .then(() => client.waitAndSetValue(AddProductPage.product_pack_item_quantity, data.pack.pack.pack1.quantity))
        .then(() => client.waitForExistAndClick(AddProductPage.product_pack_add_button));
    });
    test('should set the "Add products to your pack"', () => {
      return promise
        .then(() => client.scrollTo(AddProductPage.description_tab))
        .then(() => client.waitAndSetValue(AddProductPage.search_product_pack, 'demo_14'))
        .then(() => client.waitForExistAndClick(AddProductPage.product_item_pack))
        .then(() => client.waitAndSetValue(AddProductPage.product_pack_item_quantity, '2'))
        .then(() => client.scrollWaitForExistAndClick(AddProductPage.product_pack_add_button));
    });
    test('should check that the product does not exist in the result of search', () => {
      return promise
        .then(() => client.scrollTo(AddProductPage.search_product_pack))
        .then(() => client.waitAndSetValue(AddProductPage.search_product_pack, 'demo_14'))
        .then(() => client.isVisible(AddProductPage.product_item_pack, 2000))
        .then(() => {
          if(global.isVisible) {
            client.waitForExistAndClick(AddProductPage.product_item_pack);
            expect(global.isVisible, "The product exist in the result of search").to.be.false;
          } else {
            client.pause(1000);
          }
        });
    });
  }, 'product/product');
}, 'product/product', true);