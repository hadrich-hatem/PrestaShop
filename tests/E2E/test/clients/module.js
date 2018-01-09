var CommonClient = require('./common_client');
let promise = Promise.resolve();
global.modulesInformations = [];
global.moduleObject = {};

class Module extends CommonClient {

    getAllModulesInformations(modules_list, i) {
        return this.client
            .getAttribute(modules_list + '/div[' + i + ']', 'data-name').then(function (name) {
                moduleObject.data_name = name.toLowerCase();
                console.log(i + ') ' + moduleObject.data_name);
            })
            .getAttribute(modules_list + '/div[' + i + ']', 'data-author').then(function (name) {
                moduleObject.data_author = name.toLowerCase();
                console.log(i + ') ' + moduleObject.data_author);
            })
            .getAttribute(modules_list + '/div[' + i + ']', 'data-description').then(function (name) {
                moduleObject.data_description = name.toLowerCase();
                console.log(i + ') ' + moduleObject.data_description);
            })
            .getAttribute(modules_list + '/div[' + i + ']', 'data-tech-name').then(function (name) {
                moduleObject.data_tech_name = name.toLowerCase();
                console.log(i + ') ' + moduleObject.data_tech_name);
            })
            .getAttribute(modules_list + '/div[' + i + ']', 'data-child-categories').then(function (name) {
                moduleObject.data_child_categories = name.toLowerCase();
                console.log(i + ') ' + moduleObject.data_child_categories);
            })
            .getAttribute(modules_list + '/div[' + i + ']', 'data-categories').then(function (name) {
                moduleObject.data_categories = name.toLowerCase();
                console.log(i + ') ' + moduleObject.data_categories);
            })
            .getAttribute(modules_list + '/div[' + i + ']', 'data-type').then(function (name) {
                moduleObject.data_type = name.toLowerCase();
                console.log(i + ') ' + moduleObject.data_type);
                //modulesInformations.push(moduleObject)
            })
    }

    checkModule(i) {
        moduleObject.forEach(function(item){
            console.log(item);
            expect(item).to.contain('contact' || 'form')
        });
        return this.client.pause(1000);
    }

    // checkModules(selector) {
    //     return this.client
    //         .waitForExist(selector)
    //         .then(() => {
    //             console.log(modulesInformations);
    //             expect(modulesInformations[0]).to.have.deep.property(
    //                 (
    //                     (modulesInformations[0].data_name.includes('contact') || modulesInformations[0].data_name.includes('form')) ||
    //                     (modulesInformations[0].data_author.includes('contact') || modulesInformations[0].data_author.includes('form')) ||
    //                     (modulesInformations[0].data_description.includes('contact') || modulesInformations[0].data_description.includes('form')) ||
    //                     (modulesInformations[0].data_tech_name.includes('contact') || modulesInformations[0].data_tech_name.includes('form')) ||
    //                     (modulesInformations[0].data_child_categories.includes('contact') || modulesInformations[0].data_child_categories.includes('form')) ||
    //                     (modulesInformations[0].data_categories.includes('contact') || modulesInformations[0].data_categories.includes('form')) ||
    //                     (modulesInformations[0].data_type.includes('contact') || modulesInformations[0].data_type.includes('form'))
    //                 )
    //             )
    //         });
    // }

    checkModules(i, client) {
        return promise.then(() => client.checkModule(modulesInformations[i]));
    }
}

module.exports = Module;