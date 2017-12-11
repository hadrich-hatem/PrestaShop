module.exports = Object.assign({},
    {
        BO: {
            success_panel: '//*[@id="content"]/div[@class="bootstrap"]/div[contains(@class, "success")]',
        }
    },
    require('./catalogpage'),
    require('./customers'),
    require('./access_page'),
    require('./add_product_page'),
    require('./module_page'),
    require('./onboarding'),
    require('./order_page'),
    require('./product_list')
);