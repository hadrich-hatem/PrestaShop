module.exports = {
    createProduct: function (AddProductPage, productData) {
        scenario('Create a new product', client => {
            test('should go to "Product Settings" page', () => client.waitForExistAndClick(AddProductPage.products_subtab));
            test('should click on "New Product" button', () => client.waitForExistAndClick(AddProductPage.new_product_button));
            test('should set the "Name" input', () => client.waitAndSetValue(AddProductPage.product_name_input, productData["name"] + ' ' + date_time));
            test('should set the "Quantity" input', () => client.setQuantity(AddProductPage.quantity_shortcut_input, productData["quantity"]));
            test('should set the "Price" input', () => client.setPrice(AddProductPage.priceTE_shortcut, productData["price"]));
            test('should upload the first product picture', () => client.uploadPicture(productData["image_name"], AddProductPage.picture));

            if (productData.hasOwnProperty('type')) {
                scenario('Add the created product to pack', client => {
                    test('should select the "Pack of products"', () => client.waitAndSelectByValue(AddProductPage.product_type, 1));
                    test('should set the "Add products to your pack"', () => client.addPackProduct(productData['product']['name'], productData['product']['quantity']));
                }, 'product/product');
            }

            if (productData.hasOwnProperty('attribute')) {
                scenario('Add Attribute', client => {
                    test('should select the "Product with combination" radio button', () => client.waitForExistAndClick(AddProductPage.variations_type_button));
                    test('should go to "Combinations" tab', () => client.waitForExistAndClick(AddProductPage.variations_tab));
                    test('should select the variation', () => client.selectVariation(AddProductPage, productData['attribute']['name'] + date_time));
                    test('should click on "Generate" button', () => client.waitForExistAndClick(AddProductPage.variations_generate));
                    test('should verify the appearance of the green validation', () => client.checkTextValue(AddProductPage.validation_msg, 'Settings updated.'));
                    test('should select all the generated variations', () => client.waitForVisibleAndClick(AddProductPage.var_selected));
                    test('should set the "Variations quantity" input', () => client.setVariationsQuantity(AddProductPage, productData['attribute']['variation_quantity']));
                }, 'create_product');
            }

            if (productData.hasOwnProperty('feature')) {
                scenario('Add Feature', client => {
                    test('should click on "Add feature" button', () => client.clickOnAddFeature(AddProductPage));
                    test('should select the created feature', () => client.selectFeature(AddProductPage, productData['feature']['name'] + date_time, productData['feature']['value']));
                }, 'create_product');
            }

            if(productData.hasOwnProperty('pricing')) {
                scenario('Edit product pricing', client => {
                    test('should click on "Pricing"', () => client.scrollWaitForExistAndClick(AddProductPage.product_pricing_tab, 50));
                    test('should set the "Price per unit (tax excl.)"', () => client.waitAndSetValue(AddProductPage.unit_price, productData['pricing']['unitPrice']));
                    test('should set the "Unit"', () => client.waitAndSetValue(AddProductPage.unity, productData['pricing']['unity']));
                    test('should set the "Price (tax excl.)"', () => client.waitAndSetValue(AddProductPage.pricing_wholesale, productData['pricing']['wholesale']));
                    test('should click on "Add specific price" button', () => client.waitForExistAndClick(AddProductPage.pricing_add_specific_price_button));
                    test('should change the reduction type to "Percentage"', () => client.waitAndSelectByValue(AddProductPage.specific_price_reduction_type_select, productData['pricing']['type']));
                    test('should set the "Discount" input', () => client.waitAndSetValue(AddProductPage.specific_price_discount_input, productData['pricing']['discount']));
                    test('should click on "Apply" button', () => client.waitForExistAndClick(AddProductPage.specific_price_save_button));
                }, 'create_product');
            }

            scenario('Save the created product', client => {
                test('should switch the product online', () => client.waitForExistAndClick(AddProductPage.product_online_toggle));
                test('should click on "Save" button', () => client.waitForExistAndClick(AddProductPage.save_product_button));
                test('should verify the appearance of the green validation', () => client.checkTextValue(AddProductPage.validation_msg, 'Settings updated.'));
            }, 'create_product');

        }, 'create_product');

    }
};
