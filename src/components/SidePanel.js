import { useEffect, useState } from "react"
import CategoryFilter from "./CategoryFilter"
import ManufacturerFilter from "./ManufacturerFilter"
import PriceFilter from "./PriceFilter"

const SidePanel = ({products, closeSidePanel, highestPrice, filteredProducts, sidePanel}) => {

    const [selectedFilters, setSelectedFilters] = useState([])
    const [priceValues, setPriceValues] = useState({})
    const [priceFilter, setPriceFilter] = useState({})
    const [allExcept, setAllExcept] = useState(false)
    const [reset, setReset] = useState(false)
    const [uniqueFilterLabels, setUniqueFilterLabels] = useState({})

    useEffect(()=>{
        if(Object.keys(priceValues).length !== 0) { 
            setPriceFilter({type: 'price', minPrice:priceValues.minPrice, maxPrice: priceValues.maxPrice})
        }
    },[priceValues])

    useEffect(()=>{
        //remove duplicate categories and manufacturers
        let uniqueCategories = products.filter((e, i) => {
            return products.findIndex((x) => {
            return x.category === e.category;
            }) === i;
        });

        let uniqueManufacturer = products.filter((e, i) => {
            return products.findIndex((x) => {
            return x.manufacturer === e.manufacturer;
            }) === i;
        });
        
        setUniqueFilterLabels({categories: uniqueCategories, manufacturer: uniqueManufacturer})
    },[])

  
    const filters = (type, value, status) => {
      
        if(status === true) {
            setSelectedFilters([...selectedFilters, {type, value, status}])
        }
      
        if(status === false) {
           let filterStatus = selectedFilters.filter((obj)=>obj.value !== value)
           setSelectedFilters(filterStatus)
        }

        if(type === 'price') {
            if(value === 'min') {
                setPriceValues({minPrice: parseInt(status), maxPrice: priceValues.maxPrice ? priceValues.maxPrice : highestPrice})
            }
            if(value === 'max') { 
                setPriceValues({maxPrice: parseInt(status), minPrice: priceValues.minPrice ? priceValues.minPrice : 0})
            }
        }
    }

    const applyFilter = () => {
        
        if(allExcept === false) { 
            let result = []

            //filter products
            products.forEach((product)=> {
                for(let i = 0; i < selectedFilters.length; i++) {
                    if(product[selectedFilters[i].type] === selectedFilters[i].value) {
                        result.push(product)
                    }
                }
            })

            //remove duplicates
            let uniqueProducts = result.filter((e, i) => {
                return result.findIndex((x) => {
                return x.category === e.category && x.value === e.value;
                }) === i;
            });

            //if no filters applied
            if(uniqueProducts.length === 0) {
                uniqueProducts.push(...products)
            }
            
            //if price filter is applied
            let priceFilteredProducts = []
            if(Object.keys(priceFilter).length !== 0) {
                uniqueProducts.forEach((obj)=>{
                    if(parseInt(obj.price) > priceFilter.minPrice && parseInt(obj.price) <= priceFilter.maxPrice) {
                        priceFilteredProducts.push(obj)
                    }
                })
            }
            
            filteredProducts(Object.keys(priceFilter).length !== 0 ? priceFilteredProducts : uniqueProducts)
        }

        if(allExcept === true) { 

            const isMatchingItem = (item, { type: key, value }) => {
                return item[key] === value;
              }
    
            const collectNonMatchingItem = ({ filters = [], result = [] }, item) => {
                if (!filters.some(filter => isMatchingItem(item, filter))) {
                  result.push(item);
                }
                return { filters, result };
            }
    
            const allExceptProducts = products.reduce(collectNonMatchingItem, {
                filters: selectedFilters,
                result: [],
            }).result;

          
            //if price filter is applied
            let priceFilteredProductsExceptAll = []
            if(Object.keys(priceFilter).length !== 0) {
                allExceptProducts.forEach((obj)=>{
                    if(!(parseInt(obj.price) > priceFilter.minPrice && parseInt(obj.price) <= priceFilter.maxPrice)) {
                        priceFilteredProductsExceptAll.push(obj)
                    } 
                })
            }
            
            filteredProducts(priceFilteredProductsExceptAll.length !== 0 ? priceFilteredProductsExceptAll : allExceptProducts)
        }
        
        closeSidePanel()
    }

    const resetFilter = () => {
        filteredProducts(products)
        setSelectedFilters([])
        closeSidePanel()
        setReset(true)
        setPriceFilter({})
        setAllExcept(false)
    }
   
    const resetResetState = () => setReset(false)

  return (
    <div className={sidePanel === true ? "sidePanel sidePanel-open" : 'sidePanel sidePanel-closed'}>
        {sidePanel === true &&
        <div>
            <div className="category-section">
                <p className="label">Filter by category</p>
                {uniqueFilterLabels.categories?.map((product, i)=>
                <div className="section" key={i}>
                    <CategoryFilter 
                        product={product} 
                        filters={filters} 
                        reset={reset} 
                        resetResetState={resetResetState} 
                        selectedFilters={selectedFilters} 
                    /> 
                </div>)} 
            </div>

            <div className="price-section">
                <p className="label">Filter by price</p>
                <PriceFilter 
                    filters={filters} 
                    reset={reset} 
                    resetResetState={resetResetState} 
                    priceFilter={priceFilter} 
                />
            </div>

            <div className="manufacturer-section">
                <p className="label">Filter by manufacturer</p>
                {uniqueFilterLabels.manufacturer?.map((product, i)=>
                <div className="section" key={i}>
                    <ManufacturerFilter 
                        product={product} 
                        filters={filters} 
                        reset={reset} 
                        resetResetState={resetResetState} 
                        selectedFilters={selectedFilters}
                    /> 
                </div>)} 
            </div>

            <div className="allExcept-section">
                <input type="checkbox" id="allExcept-input" checked={allExcept} onChange={()=>setAllExcept(allExcept === true? false : true)}/>
                <label htmlFor="allExcept-input">All Except</label><br/>
            </div>

            <div><button className="sidePanel-button apply-button" onClick={applyFilter}>Apply</button></div>
            <div><button className="sidePanel-button" onClick={resetFilter}>Reset</button></div>
        </div>}
    </div>
  )
}

export default SidePanel