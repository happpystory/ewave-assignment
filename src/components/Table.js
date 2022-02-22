import { useState } from "react"

const Table = ({filteredProducts, newProducts}) => {
 
    const [columnOrder, setColumnOrder] = useState({})

    const sortColumn = (column) => {

        let dirModifier;

        if(columnOrder.column === column) {
          //same column clicked again
            if(columnOrder.direction === "asc") {
              //desc
              setColumnOrder({column, direction: 'desc'})
              dirModifier = -1;
            } else { 
              //asc
              setColumnOrder({column, direction: 'asc'})
              dirModifier = 1;
            }
        } else {
            //new column clicked
            setColumnOrder({column, direction: 'asc'})
            dirModifier = 1;
        }

        let newlySortedProducts = newProducts.sort((a,b) => {
            if(column === 'price' || column === 'production_date') { 
                const columnA = parseInt(a[column])
                const columnB = parseInt(b[column])
                return columnA > columnB ? (1 * dirModifier) : (-1 * dirModifier)
            }
            const columnA = a[column]
            const columnB = b[column]
    
            return columnA > columnB ? (1 * dirModifier) : (-1 * dirModifier)
        })

        filteredProducts(newlySortedProducts)
    }

    
  return (
    <div>
        <table>
          <thead>
              <tr>
                <th><span className="column column-index"><span>#</span></span></th>
                <th><span className="column" onClick={()=>sortColumn('category')}>
                    <span>Category</span>
                    {columnOrder.direction === 'asc' && columnOrder.column === 'category' && <span>&#9650;</span>} 
                    {columnOrder.direction === 'desc' && columnOrder.column === 'category' && <span>&#9660;</span>}
                    </span>
                  </th>
                <th><span className="column" onClick={()=>sortColumn('price')}>
                    <span>Price</span>
                    {columnOrder.direction === 'asc' && columnOrder.column === 'price' && <span>&#9650;</span>} 
                    {columnOrder.direction === 'desc' && columnOrder.column === 'price' && <span>&#9660;</span>}
                    </span>
                  </th>
                <th><span className="column" onClick={()=>sortColumn('manufacturer')}>
                    <span>Manufacturer</span>
                    {columnOrder.direction === 'asc' && columnOrder.column === 'manufacturer' && <span>&#9650;</span>} 
                    {columnOrder.direction === 'desc' && columnOrder.column === 'manufacturer' && <span>&#9660;</span>}
                    </span>
                  </th>
                <th><span className="column" onClick={()=>sortColumn('production_date')}>
                    <span>Production date</span> 
                    {columnOrder.direction === 'asc' && columnOrder.column === 'production_date' && <span>&#9650;</span>} 
                    {columnOrder.direction === 'desc' && columnOrder.column === 'production_date' && <span>&#9660;</span>}
                    </span>
                  </th>
              </tr>
          </thead>
          <tbody>
              {newProducts.length !== 0 && 
              newProducts.map((el, i)=>
              <tr key={i}>
                  <td>{i+1}</td>
                  <td>{el.category}</td>
                  <td>{'$'}{el.price}</td>
                  <td>{el.manufacturer}</td>
                  <td>{el.production_date}</td>
              </tr>)}
          </tbody>
        </table>
    </div>
  )
}

export default Table