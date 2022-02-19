import { useEffect, useState } from "react"
import CategoryFilter from "./CategoryFilter"
import ManufacturerFilter from "./ManufacturerFilter"
import PriceFilter from "./PriceFilter"

let products = require('./assets/products.json')

const Table = () => {
    const [sidePanel, setSidePanel] = useState(false)
    const [totalCost, setTotalCost] = useState(0)
    const [averagePrice, setAveragePrice] = useState(0)
    const [highestPrice, setHighestPrice] = useState(0)
    const [lowestPrice, setLowestPrice] = useState(0)
    const [sortedProducts, setSortedProducts] = useState(products)
    const [productFilters, setProductFilters] = useState([])
    const [columnOrder, setColumnOrder] = useState({})
    const [selectedFilters, setSelectedFilters] = useState([])
    const [priceValues, setPriceValues] = useState({})
    const [priceFilter, setPriceFilter] = useState({})

 
    useEffect(()=>{
        //console.log(products)
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

  
    const sortColumn = (column) => {
        if(columnOrder.column === column) {
            //same column as previous Click
            if(columnOrder.direction === "asc") {
                //desc
                setColumnOrder({column, direction: 'desc'})
                //
            } else { 
                //asc
                setColumnOrder({column, direction: 'asc'})
            }
        } else {
            //new column
            setColumnOrder({column, direction: 'asc'})
        }

     
        let dirModifier = columnOrder.direction === 'asc' ? -1 : 1;
        let newlySortedProducts = sortedProducts.sort((a,b)=>{
            if(column === 'price' || column === 'production_date') { 
                const columnA = parseInt(a[column])
                const columnB = parseInt(b[column])
                return columnA > columnB ? (1 * dirModifier) : (-1 * dirModifier)
            }
            const columnA = a[column]
            const columnB = b[column]
    
            return columnA > columnB ? (1 * dirModifier) : (-1 * dirModifier)
        })

        setSortedProducts(newlySortedProducts)
    
    }


    const filters = (type, value, status) => {
    
        if(status === true) {
            setSelectedFilters([...selectedFilters, {type, value, status}])
        }
      
        if(status === false) {
           let filterStatus = selectedFilters.filter((obj)=>obj.value !== value)
           setSelectedFilters(filterStatus)
        }

        // if(type === 'price') {
            
        //     if(value === 'min') {
        //         setPriceValues({minPrice: status, maxPrice: priceValues.maxPrice ? priceValues.maxPrice : highestPrice})
        //     }
        //     if(value === 'max') { 
        //         setPriceValues({maxPrice: status, minPrice: priceValues.minPrice ? priceValues.minPrice : lowestPrice})
        //     }

        //     setPriceFilter({type, minPrice:priceValues.minPrice, maxPrice: priceValues.maxPrice})
        // }

   
        //if(priceFilter) {
            //filter the prices
            //once selectedFilters contain the prices too, we can do this: 
            //product.price < obj.maxPrice && product.price > obj.minPrice { update State } 
        //}


    }

 
    const applyFilter = () => {
        //remove duplicates
        let result = []
        products.forEach((product)=>{
            for(let i = 0; i < selectedFilters.length; i++) {
                
                if(product[selectedFilters[i].type] === selectedFilters[i].value) {
                    result.push(product)
                }
            }
        })
    
        let uniqueProducts = result.filter((e, i) => {
            return result.findIndex((x) => {
            return x.category === e.category && x.value === e.value;}) === i;
        
        });
      
        setSortedProducts(uniqueProducts)
        setSidePanel(false)
        //all except
        //I do the opposite. Filter through 'products' but only those that do not match the selectedFilters pass.
        
    }

    const resetFilter = () => {
        setSortedProducts(products)
        setSidePanel(false)
        //remove checks from side panel
    }
   
   


  return (
    <div>
        <div><button onClick={()=>setSidePanel(true)}>Options</button></div>
        <div>
          <p>Total quantity: {`${products.length}`} </p>
          <p>Total cost: {`${totalCost}`}</p>
          <p>Average price of displayed products: {`${averagePrice}`}</p>
          <p>Most expensive product: {`${highestPrice}`}</p>
          <p>Cheapest product: {`${lowestPrice}`}</p>
        </div>

        <div className="table-container">
          <table id="EmployeeTable">
            <thead>
                <tr>
                  <th className="header"><span className="column"><span>#</span></span></th>
                  <th className="header"><span className="column"><span onClick={()=>sortColumn('category')}>Category</span></span></th>
                  <th className="header"><span className="column"><span onClick={()=>sortColumn('price')}>Price</span></span></th>
                  <th className="header"><span className="column"><span onClick={()=>sortColumn('manufacturer')}>Manufacturer</span></span></th>
                  <th className="header"><span className="column"><span onClick={()=>sortColumn('production_date')}>Production date</span></span></th>
                </tr>
            </thead>
            <tbody>
               {sortedProducts.length !== 0 && 
               sortedProducts.map((el, i)=>
               <tr key={i}>
                   <td>{i+1}</td>
                   <td>{el.category}</td>
                   <td>{el.price}</td>
                   <td>{el.manufacturer}</td>
                   <td>{el.production_date}</td>
                </tr>)}
            </tbody>
          </table>
          

          <div className={ sidePanel === true ? "sidePanel sidePanel-open" : 'sidePanel sidePanel-closed'}>
            
            <div className="sidePanel-body">
                <div>
                    <p>Filter by category:</p>
                     {products.map((product, i)=><div key={i}><CategoryFilter product={product} filters={filters}  /> </div>)} 
                </div>

                <div>
                    <p>Filter by price:</p>
                    <PriceFilter filters={filters} />
                </div>

                <div>
                    <p>Filter by manufacturer</p>
                    {products.map((product, i)=><div key={i}><ManufacturerFilter product={product} filters={filters}  /> </div>)} 
                </div>
                <div>
                    <input type="checkbox" />
                    <label>All Except</label><br/>
                </div>

                <div><button onClick={applyFilter}>Apply</button></div>
                <div><button onClick={resetFilter}>Reset</button></div>
            </div>
          </div>

        </div>
    </div>
  )
}

export default Table