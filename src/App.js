import { useEffect, useState } from "react";
import Table from "./components/Table";
import Header from "./components/Header";
import SidePanel from "./components/SidePanel";

let products = require('./assets/products.json')

const App = () => {

  const [totalCost, setTotalCost] = useState(0)
  const [averagePrice, setAveragePrice] = useState(0)
  const [highestPrice, setHighestPrice] = useState(0)
  const [lowestPrice, setLowestPrice] = useState(0)
  const [sidePanel, setSidePanel] = useState(false)
  const [newProducts, setNewProducts] = useState(products)

    useEffect(()=>{
      //total sum
      let sum = 0;
      products.forEach((product)=> {
          let parsePrice = parseInt(product.price);
          sum+=parsePrice
      })
      setTotalCost(sum)
  
      //average price
      let averagePrice = parseInt(sum / products.length)
      setAveragePrice(averagePrice)

      //most expensive product price
      let allPrices = [];
      products.forEach((product) => {
          allPrices.push(parseInt(product.price))
      });

      let highestPrice = Math.max(...allPrices)
      setHighestPrice(highestPrice)

      //cheapest product
      let lowestPrice = Math.min(...allPrices)
      setLowestPrice(lowestPrice)
    },[])  

    const openSidePanel = () => setSidePanel(true)
    const closeSidePanel = () => setSidePanel(false)
    const filteredProducts = (newProducts) => setNewProducts(newProducts)

  return (
    <div>
      <Header 
          products={products} 
          averagePrice={averagePrice} 
          highestPrice={highestPrice} 
          lowestPrice={lowestPrice} 
          totalCost={totalCost} 
          openSidePanel={openSidePanel}
        />
        <Table 
          sidePanel={sidePanel} 
          highestPrice={highestPrice} 
          closeSidePanel={closeSidePanel} 
          filteredProducts={filteredProducts}
          newProducts={newProducts}
        />
      
        <SidePanel 
        products={products} 
        closeSidePanel={closeSidePanel}
        filteredProducts={filteredProducts}
        sidePanel={sidePanel}
        />
    </div> 
  )
}
export default App;
