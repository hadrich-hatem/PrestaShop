module.exports = {
    buyOrderPage: {
        add_to_cart_button: '//*[@id="add-to-cart-or-refresh"]//button[contains(@class, "add-to-cart")]',
        proceed_to_checkout_in_modal_button: '//*[@id="blockcart-modal"]//a',
        proceed_to_checkout_button: '//*[@id="main"]//div[contains(@class, "checkout")]//a',
        checkout_step2_continue_button: '//*[@id="checkout-addresses-step"]//button[contains(@name,"confirm-addresses")]',
        checkout_step3_continue_button: '//*[@id="js-delivery"]//button[@name="confirmDeliveryOption"]',
        checkout_step4_payment_radio: '//*[@id="payment-option-2"]',
        shipping_method_option: '//*[@id="delivery_option_2"]',
        message_textarea: '//*[@id="delivery_message"]',
        condition_check_box: '//*[@id="conditions_to_approve[terms-and-conditions]"]',
        confirmation_order_button: '//*[@id="payment-confirmation"]/div[1]/button',
        confirmation_order_message: '//*[@id="content-hook_order_confirmation"]/div/div/div/h3',
        order_product: '//*[@id="order-items"]/div/div/div[2]/span',
        order_reference: '//*[@id="order-details"]/ul/li[1]',
        order_basic_price: '//*[@id="order-items"]/div/div/div[3]/div/div[1]',
        order_total_price: '//*[@id="order-items"]/div/table/tbody/tr[1]/td[2]',
        order_shipping_prince_value: '//*[@id="order-items"]/div/table/tbody/tr[2]/td[2]',
        customer_name: '//*[@id="_desktop_user_info"]/div/a[2]/span',
        shipping_method: '//*[@id="order-details"]/ul/li[3]'
    }
};