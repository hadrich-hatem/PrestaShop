const {AccessPageBO} = require('../../../../selectors/BO/access_page');
const common_scenarios = require('../../../common_scenarios/taxes');

let taxData = {
  name: 'TVA 5%',
  rate: 5
};

scenario('Create, edit, delete and check "Tax" in the Back Office', () => {
  scenario('Open the browser and connect to the Back Office', client => {
    test('should open the browser', () => client.open());
    test('should log in successfully in the Back Office', () => client.signInBO(AccessPageBO));
  }, 'common_client');
  common_scenarios.createTax(taxData);
  common_scenarios.checkTax(taxData);
  common_scenarios.editTax(taxData);
  common_scenarios.checkTax(taxData);
  common_scenarios.deleteTax(taxData);
  common_scenarios.createTax(JSON.parse(JSON.stringify(taxData)));
  common_scenarios.deleteTaxWithBulkAction(taxData.name);
  scenario('Logout from the Back Office', client => {
    test('should logout successfully from the Back Office', () => client.signOutBO());
  }, 'common_client');
}, 'common_client', true);