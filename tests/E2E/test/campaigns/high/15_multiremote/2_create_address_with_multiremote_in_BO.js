const {AccessPageBO} = require('../../../selectors/BO/access_page');
const {Addresses} = require('../../../selectors/BO/customers/addresses');
const {BO} = require('../../../selectors/BO/customers/index');
const {Menu} = require('../../../selectors/BO/menu.js');
let promise = Promise.resolve();

var addressesData = [{
  firstname: 'John',
  lastname: 'Doe',
  email: 'CJD@prestashop.com',
  id_number: '0123456789',
  address_alias: 'My CJD addresse',
  company: 'Presta',
  VAT_number: '0123456789',
  address: 'CJD',
  address_second: 'RDC',
  zip_code: '75009',
  city: 'Paris',
  country: '8',
  phone: '0123456789',
  other_information: 'Information of CJD'
},{
  firstname: 'John',
  lastname: 'Smith',
  email: 'CJS@prestashop.com',
  id_number: '0123456789',
  address_alias: 'My CJS addresse',
  company: 'Presta',
  VAT_number: '0123456789',
  address: 'CJS',
  address_second: 'RDC',
  zip_code: '75009',
  city: 'Paris',
  country: '8',
  phone: '0123456789',
  other_information: 'Information of CJS'
}];

scenario('Create "Address"', () => {
  scenario('Login in the Back Office', client => {
    test('should open the browser', () => client.open());
    test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
  }, 'multiremote_client');
  scenario('Create a new "Address"', client => {
    test('should go to the "Customers" page', () => client.goToSubtabMenuPage(Menu.Sell.Customers.customers_menu, Menu.Sell.Customers.addresses_submenu));
    test('should click on add new address', () => client.waitForExistAndClick(Addresses.new_address_button));
    test('should set "Email" input', () => client.waitAndSetValue(Addresses.email_input, date_time + addressesData[0].email, date_time + addressesData[1].email));
    test('should set "Identification number" input', () => client.waitAndSetValue(Addresses.id_number_input, addressesData[0].id_number, addressesData[1].id_number));
    test('should set "Address alias" input', () => client.waitAndSetValue(Addresses.address_alias_input, addressesData[0].address_alias, addressesData[1].address_alias));
    test('should set "Company" input', () => client.waitAndSetValue(Addresses.company, addressesData[0].company, addressesData[1].company));
    test('should set "VAT number" input', () => client.waitAndSetValue(Addresses.VAT_number_input, addressesData[0].VAT_number, addressesData[1].VAT_number));
    test('should set "Address" input', () => client.waitAndSetValue(Addresses.address_input, addressesData[0].address + date_time, addressesData[1].address + date_time));
    test('should set "Second address" input', () => client.waitAndSetValue(Addresses.address_second_input, addressesData[0].address_second, addressesData[1].address_second));
    test('should set "Postal code" input', () => client.waitAndSetValue(Addresses.zip_code_input, addressesData[0].zip_code, addressesData[1].zip_code));
    test('should set "City" input', () => client.waitAndSetValue(Addresses.city_input, addressesData[0].city, addressesData[1].city));
    test('should set "Pays" input', () => client.waitAndSelectByValue(Addresses.country_input, addressesData[0].country, addressesData[1].country));
    test('should set "Home phone" input', () => client.waitAndSetValue(Addresses.phone_input, addressesData[0].phone, addressesData[1].phone));
    test('should set "Other information" input', () => client.waitAndSetValue(Addresses.other_input, addressesData[0].other_information, addressesData[1].other_information));
    test('should click on "Save" button', () => {
      return promise
        .then(() => client.scrollTo(Addresses.save_button, 50))
        .then(() => client.waitForExistAndClick(Addresses.save_button))
    });
    test('should verify the appearance of the green validation', () => client.checkTextValue(BO.success_panel, '×\nSuccessful creation.', 'equal', 3000));
  }, 'multiremote_client');
  scenario('Check the address creation', client => {
    test('should check the existence of the filter address input', () => client.isVisible(Addresses.filter_by_address_input));
    test('should search the customer by address', () => client.searchByAddress(Addresses, addressesData[0].address + date_time, addressesData[1].address + date_time));
  }, 'multiremote_client');
  scenario('Logout from the Back Office', client => {
    test('should logout successfully from the Back Office', () => client.signOutBO());
  }, 'multiremote_client');
}, 'multiremote_client', true);
