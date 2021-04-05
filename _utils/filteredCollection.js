const chunk = require('./chunk.js');

module.exports = function(collection, type, field, limit = 6) {
    const allRefs = new Set();
          const allRefsArray = [];

          const items = collection.getFilteredByTag(type);

          for (let item of items) {
            if (field in item.data) {
              const val = item.data[field];
              if (!allRefs.has(val)) {
                const allItems = collection.getFilteredByTag(type).filter(item => item.data[field] && item.data[field].includes(val));
                allRefs.add(val, true);
                const c = chunk(allItems, limit);
                for( let pageNumber = 0, max = c.length; pageNumber < max; pageNumber++) {
                allRefsArray.push({
                  refName: val,
                  pageNumber: pageNumber,
                  items: c[pageNumber],
                  length: c.length
                });
              }
              }
            }
          }
          
          return allRefsArray;
}
