
const Header = ({products, lowestPrice, averagePrice, highestPrice, totalCost, openSidePanel}) => {
  return (
    <div className="header-wrapper">
        <button className="header-button" onClick={()=>openSidePanel(true)}>Options</button>
        <div>
          <p><span className="header-label">Total quantity:</span> {`${products.length}`} </p>
          <p><span className="header-label">Total cost:</span> {`$${totalCost}`}</p>
          <p><span className="header-label">Average price of displayed products:</span> {`$${averagePrice}`}</p>
          <p><span className="header-label">Most expensive product:</span> {`$${highestPrice}`}</p>
          <p><span className="header-label">Cheapest product:</span> {`$${lowestPrice}`}</p>
        </div>
    </div>
  )
}

export default Header