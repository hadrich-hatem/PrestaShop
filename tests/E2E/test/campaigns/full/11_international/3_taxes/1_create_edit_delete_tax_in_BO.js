const {AccessPageBO} = require('../../../../selectors/BO/access_page');
const common_scenarios = require('./taxes');

let taxData = {
  name: 'TVA 5%',
  rate: 5
};

scenario('Create, edit, delete and check "Tax rules" in the Back Office', () => {
  scenario('Open the browser and connect to the BO', client => {
    test('should open the browser', () => client.open());
    test('should log in successfully in BO', () => client.signInBO(AccessPageBO));
  }, 'common_client');
  common_scenarios.createTax(taxData.name + date_time, taxData.rate);
  common_scenarios.checkTax(taxData.name + date_time, taxData.rate);
  common_scenarios.editTax(taxData.name + date_time, taxData.name + date_time + 'update', taxData.rate + 10);
  common_scenarios.checkTax(taxData.name + date_time + 'update', taxData.rate + 10);
  common_scenarios.deleteTax(taxData.name + date_time + 'update');
  scenario('Logout from the Back Office', client => {
    test('should logout successfully from the Back Office', () => client.signOutBO());
  }, 'common_client');
}, 'common_client', true);