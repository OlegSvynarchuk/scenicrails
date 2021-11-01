let axios = require('axios')

async function getProducts() {
  const token = await axios.post("https://community243bg.joladev.com/rest/V1/integration/admin/token?username=super_test&password=super_test5") 
    const AUTH_STRING = 'Bearer ' + token.data
  let products = await axios.get('https://community243bg.joladev.com/rest/V1/all/products', {
          headers: {
              Authorization: AUTH_STRING
          }
      })
      console.log(products.data.items)
    }

getProducts()    
