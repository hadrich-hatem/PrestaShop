module.exports = {
    ModulesPage: {
        installed_module_tabs: '(//div[@class="page-head-tabs"]/a)[2]',
        search_results: '.module-search-result-wording',
        search_input: 'input.pstaggerAddTagInput.module-tags-input',
        search_button: '//div[@class="input-group module-search-block"]/button[@class="btn btn-primary pull-right search-button"]',
        installed_modules_number_span: '//*[@id="main-div"]/div[3]/div[2]/div/div[2]/div/div[7]/span[1]',
        installed_built_modules_number_span: '//*[@id="main-div"]/div[3]/div[2]/div/div[2]/div/div[9]/span[1]',
        installed_theme_modules_number_span: '//*[@id="main-div"]/div[3]/div[2]/div/div[2]/div/div[11]/span[1]',
        page_loaded: '.module-search-result-wording',
        module_menu_button: '[class="btn btn-primary-outline  dropdown-toggle"]',
        configure_module_button: '[data-confirm_modal="module-modal-confirm-%module_tech_name-configure"]',
        enable_module_button: '[data-confirm_modal="module-modal-confirm-%module_tech_name-enable"]',
        disable_module_button: '[data-confirm_modal="module-modal-confirm-%module_tech_name-disable"]',
        disable_module_confirm_button: '//*[@id="module-modal-confirm-%module_tech_name-disable"]/div/div/div[3]/a',
        actions_module_dropdown: '//*[@class="btn btn-primary-outline  dropdown-toggle"]',
        action_module_installed_button: '//*[@id="modules-list-container-all"]/div[1]/div/div/div[5]/div[2]/form/button',
        action_module_built_button: '//*[@id="modules-list-container-native"]/div/div/div/div[5]/div[2]/form/button',
        action_module_theme_button: '//*[@id="modules-list-container-theme"]/div/div/div/div[5]/div[2]/form/button'
    },
};
