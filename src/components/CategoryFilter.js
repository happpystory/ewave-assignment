import { useEffect, useState } from "react"

const CategoryFilter = ({product, filters, reset, resetResetState, selectedFilters}) => {

  const [checkStatus, setCheckStatus] = useState(false)

  useEffect(()=>{
    if(reset === true) {
      setCheckStatus(false)
      resetResetState()
    }
  }, [reset])

  useEffect(()=>{
    for(let i = 0; i < selectedFilters.length; i++) {
      if(selectedFilters[i].type === 'category' && selectedFilters[i].value === product.category) {
        setCheckStatus(true)
      }
    }
  },[selectedFilters])

  const filterCheck = (e) => {
    setCheckStatus(e.target.checked)
    filters('category', e.target.id, e.target.checked)
  }
  
 

  return (
    <div>
        <input type="checkbox" id={product.category} checked={reset === true ? false : checkStatus} onChange={filterCheck}/>
        <label htmlFor={product.category}>{product.category} </label>
    </div>
  )
}

export default CategoryFilter