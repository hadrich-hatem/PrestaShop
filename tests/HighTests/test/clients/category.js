var CommonClient = require('./common_client');

global.checkCategoryName = [];

class Category extends CommonClient {

    clickOnSaveButton(selectorButton, selectorNumber) {
        return this.client
            .scrollWaitForExistAndClick(selectorButton, 50)
            .pause(2000)
            .waitForExist(selectorNumber, 90000)
            .then(() => this.client.getText(selectorNumber))
            .then((text) => global.number_category = parseInt(text));
    }

    checkImage(selector) {
        return this.client
            .waitForExist(selector)
            .pause(2000)
            .then(() => this.client.isExisting(selector))
            .then((text) => expect(text).to.be.equal(true));

    }

    clickOnAction(actionSelector, groupActionSelector = '', action = 'edit') {
        if (action === 'delete') {
            return this.client
                .waitForExistAndClick(groupActionSelector)
                .waitForExistAndClick(actionSelector)
        } else {
            return this.client
                .pause(2000)
                .waitForExistAndClick(actionSelector)
        }
    }

    deleteCategoryWithActionGroup(categorySubmenu) {
        return this.client
            .waitForExistAndClick(categorySubmenu.select_category)
            .waitForExistAndClick(categorySubmenu.action_group_button)
            .waitForExistAndClick(categorySubmenu.delete_action_group_button)
            .alertAccept()
            .waitForExistAndClick(categorySubmenu.second_delete_button)
            .pause(5000)
    }

    getCategoriesName(categories_list, i, category_name) {
        return this.client.getText(categories_list + '/li[' + i + ']/a').then(function (name) {
            if (name === category_name) checkCategoryName[i] = true;
            else checkCategoryName[i] = false;
        });
    }

    checkExistenceCategory(selector) {
        return this.client
            .waitForExist(selector)
            .then(() => {
                expect(checkCategoryName).to.be.an('array').that.does.include(true)
            });
    }
}

module.exports = Category;