module.exports = {
  ProductSettings:{
    menu:'//*[@id="subtab-AdminPPreferences"]/a',
    allowOrderOutOfStock_button:'//label[contains(@for, "form_stock_allow_ordering_oos_%I")]',
    delivery_time_in_stock_input:'//*[@id="form_stock_delivery_time_1"]',
    display_unavailable_attributes_button:'//label[contains(@for, "form_page_display_unavailable_attributes_%I")]',
    stockManagement_button:'//*[@id="form_stock_pack_stock_management"]',
    save_button:'(//button[text()="Save"])[%POS]',
    Pagination: {
      products_per_page_input: '//*[@id="form_pagination_products_per_page"]'
    }
  }
};
