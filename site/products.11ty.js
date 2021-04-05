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
        
        class ProductsData {
                  data() {
                    return {
                      permalink: function (data) {
                        return "data/products.json";
                      }
                    };
                  }
                  render(data) {
                    let products = [];
                    try {
                      for (let product of data.collections.product) {
                        let properties = product.data['sku-properties'] || [];
        
                        properties = properties.map( prop => {
                          prop.enum = (prop.enum).map( e => ({
                            name: e,
                            slug: slugify(e)
                          }))
                          return prop;
                        })
                  
                        const productSlug = `product/${product.data.slug}.md`;
                        const variations = data.collections.sku.filter(sku =>
                          sku.data.product == productSlug
                        ).map(sku => {
                          let skuValues = (sku.data['sku-values'] || []);
                          if (Array.isArray(skuValues)) {
                            let obj = {};
                            skuValues.forEach( val => {
                              obj[val.property] = slugify(val.name)
                            })
                            skuValues = obj;
                          }
                          return {
                            id: sku.data.slug,
                            slug: sku.data.slug,
                            url:  '/data/sku/' + sku.data.slug + '.json',
                            price: sku.data.price,
                            compareAtPrice: sku.data['compare-at-price'],
                            "sku-values": skuValues
                          }
                        });
                        const item = {
                          slug: product.data.slug,
                          defaultSku: '/data/' + product.data['default-sku'].replace('md', 'json'),
                          properties,
                          variations
                        }
                  
                        products.push(item);
                      }
                    } catch(e) {
                      products = []
                    }
                    
                    return JSON.stringify(products);
                  }
                }
                
                module.exports = ProductsData;