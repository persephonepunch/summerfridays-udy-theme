const slugify = ( text ) => {
        return text
        .toString()
        .toLowerCase()
        .replace(/s+/g, "-") // Replace spaces with -
        .replace(/&/g, "-and-") // Replace & with 'and'
        .replace(/[^w-]+/g, "") // Remove all non-word chars
        .replace(/--+/g, "-") // Replace multiple - with single -
        .replace(/^-+/, "") // Trim - from start of text
        .replace(/-+$/, "") // Trim - from end of text 
      };
      
      class SkuData {
              data() {
                return {
                  permalink: "/data/sku/{{page.fileSlug}}.json"
                };
              }
            
              render(data) {
      
                let item = {}
                try {
                  const skus = {};
                  const skuValues = data['sku-values'] || [];

                  if (Array.isArray(skuValues)) {
                    skuValues.forEach( e => {
                      console.log(slugify(e.name));
                      skus[e.property] = slugify(e.name)
                    })
                  }
                  let dimensions = {width: 0, height: 0, length: 0, weight: 0};
                  if (data['width']) {
                     dimensions.width = data['width'];
                  }          
                  if (data['height']) {
                    dimensions.height = data['height'];
                  }   
                  if (data['length']) {
                    dimensions.width = data['length'];
                  }   
                  if (data['weight']) {
                    dimensions.weight = data['weight'];
                  }  
                  item = {
                    "id": data.slug,
                    "price": data.price.value/100,
                    "compare-at-price": data['compare-at-price'],
                    "more-images": data['more-images'],
                    "image": data['main-image'].url || "",
                    "name": data.name,
                    "slug": data.slug,
                    "product": data.product,
                    "download-files": data['download-files'],
                    "sku-values": skus,
                    "dimensions": dimensions
                  }
                } catch(e) {
                  item = {}
                }
                
                return JSON.stringify(item);
              }
            }
            
            module.exports = SkuData;