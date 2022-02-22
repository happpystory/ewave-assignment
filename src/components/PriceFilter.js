import { useEffect, useState } from "react"

const PriceFilter = ({filters, reset, resetResetState, priceFilter}) => {

  const [maxValue, setMaxValue] = useState("")
  const [minValue, setMinValue] = useState("")

  useEffect(()=>{
    if(reset === true) {
      setMinValue("")
      setMaxValue("")
      resetResetState()
    }
  }, [reset])

  useEffect(()=>{
    if(Object.keys(priceFilter).length !== 0) { 
      if(priceFilter.minPrice !== 0) setMinValue(priceFilter.minPrice)
      if(priceFilter.maxPrice !== 0) setMaxValue(priceFilter.maxPrice)
    }
  },[priceFilter])

  const filterCheck = (e) => {
    if(e.target.id === 'min') setMinValue(e.target.value)
    if(e.target.id === 'max') setMaxValue(e.target.value)
    filters('price', e.target.id, e.target.value)
  }

  return (
    <div className="section price-wrapper">
       <div>
          <input type="number" id="min" min="0" value={reset === true ? "" : minValue} onChange={filterCheck} />
          <label>Min price</label>
       </div>
        <div>
          <input type="number" id="max" min="0" value={reset === true ? "" : maxValue} onChange={filterCheck} />
          <label>Max price</label>
        </div>
    </div>
  )
}

export default PriceFilter