const {AccessPageBO} = require('../../../selectors/BO/access_page');
const common_scenarios = require('../../common_scenarios/discount');

let catalogPriceRuleData = {
  name: 'Catalog_price',
  type: "percentage",
  reduction: 25,
  quantity: 50
};

scenario('Create, edit, check and delete "Catalog Price Rules" in the Back Office', () => {
  scenario('Login in the Back Office', client => {
    test('should open the browser', () => client.open());
    test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
  }, 'discount');
  common_scenarios.createCatalogPriceRule(catalogPriceRuleData);
  common_scenarios.checkCatalogPriceRule(catalogPriceRuleData);
  common_scenarios.editCatalogPriceRule(catalogPriceRuleData, 'amount');
  common_scenarios.checkCatalogPriceRule(catalogPriceRuleData);
  common_scenarios.deleteCatalogPriceRule(catalogPriceRuleData);
  scenario('Logout from the Back Office', client => {
    test('should logout successfully from the Back Office', () => client.signOutBO());
  }, 'discount');
}, 'discount', true);