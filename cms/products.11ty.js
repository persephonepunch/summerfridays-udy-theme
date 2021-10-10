const path = require('path');
const moneyUtils = require(path.join(process.cwd(), '_utils', 'money', 'utils'));

class ProductsData {

    data() {
        return {
            permalink: "/data/products.json"
        }
    }

    async render(data) {
        const products = [];
        
        if (!data.collections.products || !data.collections.products.length) {
            return JSON.stringify(products);
        }
        
        for (let product of data.collections.product) {
            for (let variation of product.data.variations) {
                const product = {
                    id: variation.slug,
                    title: variation.tile,
                    url: "/data/products.json",
                    dimensions: {
                        width: variation.f_width,
                        length: variation.f_length,
                        weight: variation.f_weight,
                        height: variation.f_height
                    },
                    image: variation['f_main-image'] ?  variation['f_main-image'].url : ""
                }
                product.price = await moneyUtils.sanitizePrice(variation.f_price);
                products.push(product)
            }
        }

        return JSON.stringify(products);
    }

}

module.exports = ProductsData