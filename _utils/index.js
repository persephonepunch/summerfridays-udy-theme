const registerFilters = require('./filters');
const registerCollections = require('./collections');
const registerTransforms = require('./transforms');
const registerShortcodes = require('./shortcodes');
const addFilesToFunctions = require('./zip')

module.exports = function (eleventyConfig) {

    eleventyConfig.setLiquidOptions({
        dynamicPartials: true,
    });

    registerCollections(eleventyConfig);

    registerFilters(eleventyConfig);

    registerTransforms(eleventyConfig);

    registerShortcodes(eleventyConfig);

    eleventyConfig.on('afterBuild', async () => {
        await addFilesToFunctions();
    });
}