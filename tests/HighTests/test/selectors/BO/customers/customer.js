module.exports = {
  Customer:{
    customer_menu: '//*[@id="subtab-AdminParentCustomer"]/a',
    customers_subtab: '//*[@id="subtab-AdminCustomers"]/a',
    new_customer_button: '//*[@id="page-header-desc-customer-new_customer"]',
    social_title_button: '//*[@id="gender_1"]',
    first_name_input: '//*[@id="firstname"]',
    last_name_input: '//*[@id="lastname"]',
    email_address_input: '//*[@id="email"]',
    password_input: '//*[@id="passwd"]',
    days_select: '//*[@id="fieldset_0"]/div[2]/div[6]/div/div/div[1]/select',
    month_select: '//*[@id="fieldset_0"]/div[2]/div[6]/div/div/div[2]/select',
    years_select: '//*[@id="fieldset_0"]/div[2]/div[6]/div/div/div[3]/select',
    save_button: '//*[@id="customer_form_submit_btn"]',
    customer_filter_by_name_input: '//*[@id="form-customer"]/div/div[2]/table/thead/tr[2]/th[6]/input',
    customer_search_button: '//*[@id="submitFilterButtoncustomer"]',
    click_outside: '//*[@id="form-customer"]/div/div[2]/table/thead/tr[2]/th[1]',
    email_address_value: '//*[@id="form-customer"]/div/div[2]/table/tbody/tr/td[%ID]'
  }
};
