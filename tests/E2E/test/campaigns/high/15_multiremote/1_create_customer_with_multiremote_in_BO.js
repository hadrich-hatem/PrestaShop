const {AccessPageBO} = require('../../../selectors/BO/access_page');
const {Customer} = require('../../../selectors/BO/customers/customer');
const {BO} = require('../../../selectors/BO/customers/index');
const {Menu} = require('../../../selectors/BO/menu.js');
let promise = Promise.resolve();

var customersData = [{
  firstname: 'John',
  lastname: 'Doe',
  email: 'CJD@prestashop.com',
  password: '123456789',
  birthday: {
    day: '18',
    month: '12',
    year: '1991'
  }
},{
  firstname: 'John',
  lastname: 'Smith',
  email: 'CJS@prestashop.com',
  password: '123456789',
  birthday: {
    day: '18',
    month: '12',
    year: '1991'
  }
}];

scenario('Create "Customer"', () => {
  scenario('Login in the Back Office', client => {
    test('should open the browser', () => client.open());
    test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
  }, 'multiremote_client');
  scenario('Create a new "Customer"', client => {
    test('should go to the "Customers" page', () => client.goToSubtabMenuPage(Menu.Sell.Customers.customers_menu, Menu.Sell.Customers.customers_submenu));
    test('should click on "Add new customer" button', () => client.waitForExistAndClick(Customer.new_customer_button));
    test('should choose the "Social title" radio', () => client.waitForExistAndClick(Customer.social_title_button));
    test('should set the "First name" input', () => client.waitAndSetValue(Customer.first_name_input, customersData[0].firstname, customersData[1].firstname));
    test('should set the "Last name" input', () => client.waitAndSetValue(Customer.last_name_input, customersData[0].lastname, customersData[1].lastname));
    test('should set the "Email" input', () => client.waitAndSetValue(Customer.email_address_input, date_time + customersData[0].email, date_time + customersData[1].email));
    test('should set the "Password" input', () => client.waitAndSetValue(Customer.password_input, customersData[0].password, customersData[1].password));
    test('should set the customer "Birthday"', () => {
      return promise
        .then(() => client.waitAndSelectByValue(Customer.days_select, customersData[0].birthday.day, customersData[1].birthday.day))
        .then(() => client.waitAndSelectByValue(Customer.month_select, customersData[0].birthday.month, customersData[1].birthday.month))
        .then(() => client.waitAndSelectByValue(Customer.years_select, customersData[0].birthday.year, customersData[1].birthday.year))
    });
    test('should click on "Save" button', () => client.waitForExistAndClick(Customer.save_button));
    test('should verify the appearance of the green validation', () => client.checkTextValue(BO.success_panel, '×\nSuccessful creation.', 'equal', 3000));
  }, 'multiremote_client');
  scenario('Check the customer creation', client => {
    test('should check the existence of the customer filter email input', () => client.isVisible(Customer.customer_filter_by_email_input));
    test('should search the customer by email', () => client.searchByEmail(Customer, date_time + customersData[0].email, date_time + customersData[1].email));
  }, 'multiremote_client');
  scenario('Logout from the Back Office', client => {
    test('should logout successfully from the Back Office', () => client.signOutBO());
  }, 'multiremote_client');
}, 'multiremote_client', true);