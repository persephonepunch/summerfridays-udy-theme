
      const createCollectionsAndFilters = require('./_utils/index.js');
      
      module.exports = function(eleventyConfig) {
       
        eleventyConfig.addPassthroughCopy({"theme/assets": "assets"});

        eleventyConfig.addPassthroughCopy("admin");
        
        createCollectionsAndFilters(eleventyConfig);
        
        return {
          dir: {
            input: "cms",
            includes: "../theme",
            output: "public"
          }
        };
      };