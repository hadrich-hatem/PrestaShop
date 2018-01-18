const {AccessPageBO} = require('../../../selectors/BO/access_page');
const {Movement} = require('../../../selectors/BO/catalogpage/stocksubmenu/movements');
const {Menu} = require('../../../selectors/BO/menu.js');

scenario('Check order movement', () => {
  scenario('Login in the Back Office', client => {
    test('should open the browser', () => client.open());
    test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
  }, 'stocks');

  scenario('Check order movement', client => {
    test('should go to "Stocks" page', () => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu, Menu.Sell.Catalog.stocks_submenu));
    test('should go to "Movements" tabs', () => client.goToStockMovements(Movement));
    test('should check the movements of the delivered product', () => client.checkMovement(Movement, 1, global.tab["orderQuantity"], "-", "Customer Order"));
  }, 'stocks');
}, 'stocks', true);
