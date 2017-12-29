const {AccessPageBO} = require('../../../selectors/BO/access_page');
const {AccessPageFO} = require('../../../selectors/FO/access_page');
const {ShopParametersBO} = require('../../../selectors/BO/shop_parameters.js');
const {Menu} = require('../../../selectors/BO/menu.js');
let promise = Promise.resolve();

scenario('Configure shop in the Back Office', () => {
  scenario('Login in the Back Office', client => {
    test('should open the browser', () => client.open());
    test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
  }, 'common_client');

  scenario('Disable shop in the Back Office', client => {
    test('should go to "Shop parameters" page', () => client.waitForExistAndClick(Menu.Configure.ShopParameters.shop_parameters_menu));
    test('should click on "Enable multistore"', () => client.scrollWaitForExistAndClick(ShopParametersBO.enable_multistore, 50));
    test('should click on "Save" button', () => client.waitForExistAndClick(ShopParametersBO.general_save_button));
    test('should verify the appearance of the green validation', () => client.checkTextValue(ShopParametersBO.success_panel, "The settings have been successfully updated."));
    test('should click on "Maintenance" tab', () => client.waitForExistAndClick(ShopParametersBO.maintenance_tab));
    test('should set the "Enable shop" to "NO"', () => client.waitForExistAndClick(ShopParametersBO.enable_shop.replace("%s", 'off')));

    test('should set the "Custom maintenance" textarea', () => {
      return promise
        .then(() => client.waitForExistAndClick(ShopParametersBO.source_code_button.replace("%ID", 1)))
        .then(() => client.waitAndSetValue(ShopParametersBO.textarea_value, 'We are currently disabled our shop and will be back really soon.'))
        .then(() => client.waitForExistAndClick(ShopParametersBO.ok_button))
    });
    test('should switch to the "French" language', () => client.selectLanguage(ShopParametersBO.language_button, ShopParametersBO.language_option, 'French', 1));
    test('should set the "Custom maintenance" textarea', () => {
      return promise
        .then(() => client.waitForExistAndClick(ShopParametersBO.source_code_button.replace("%ID", 2)))
        .then(() => client.waitAndSetValue(ShopParametersBO.textarea_value, 'Nous avons actuellement désactivés notre boutique et serons de retour très bientôt.'))
        .then(() => client.waitForExistAndClick(ShopParametersBO.ok_button))
    });
    test('should click on "Save" button', () => client.waitForExistAndClick(ShopParametersBO.save_button));
    test('should verify the appearance of the green validation', () => client.checkTextValue(ShopParametersBO.success_panel, "The settings have been successfully updated."));
    test('should go to the front office', () => {
      return promise
        .then(() => client.waitForExistAndClick(AccessPageBO.shopname))
        .then(() => client.switchWindow(1))
    });
    test('should check that the shop is disabled', () => client.checkTextValue(ShopParametersBO.maintenance_message, 'Nous sommes actuellement désactivés notre boutique et serons de retour très bientôt.', 'contain'));
  }, 'common_client');

  scenario('Enable shop in the Back Office', client => {
    test('should set the "Enable shop" to "YES"', () => {
      return promise
        .then(() => client.switchWindow(0))
        .then(() => client.waitForExistAndClick(ShopParametersBO.enable_shop.replace("%s", 'on')))
    });
    test('should click on "Save" button', () => client.waitForExistAndClick(ShopParametersBO.save_button));
    test('should verify the appearance of the green validation', () => client.checkTextValue(ShopParametersBO.success_panel, "The settings have been successfully updated."));
    test('should go to the front office', () => {
      return promise
        .then(() => client.waitForExistAndClick(AccessPageBO.shopname))
        .then(() => client.switchWindow(1))
    });
    test('should check that the shop is enabled', () => client.signInFO(AccessPageFO));
  }, 'common_client');
}, 'common_client', true);
