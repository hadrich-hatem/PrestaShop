const {AccessPageFO} = require('../../../selectors/FO/access_page');
const common_scenarios = require('./order');

scenario('Create order in FO', () => {
  scenario('Open the browser and connect to the FO', client => {
    test('should open the browser', () => client.open());
    test('should sign in FO', () => client.signInFO(AccessPageFO));
  }, 'order/order');
  common_scenarios.createOrder();
}, 'order/order');
