import { useEffect, useState } from "react"

const ManufacturerFilter = ({product, filters, reset, resetResetState, selectedFilters}) => {

  const [checkStatus, setCheckStatus] = useState(false)

  useEffect(()=>{
    if(reset === true) {
      setCheckStatus(false)
      resetResetState()
    }
  }, [reset])

  useEffect(()=>{
    for(let i = 0; i < selectedFilters.length; i++) {
      if(selectedFilters[i].type === 'manufacturer' && selectedFilters[i].value === product.manufacturer) {
        setCheckStatus(true)
      }
    }
  },[selectedFilters])


  const filterCheck = (e) => {
    setCheckStatus(e.target.checked)
    filters('manufacturer', e.target.id, e.target.checked)
  
  }


  return (
    <div >
        <input type="checkbox" id={product.manufacturer} checked={reset === true ? false : checkStatus}  onChange={filterCheck} />
        <label htmlFor={product.manufacturer}>{product.manufacturer}</label>
    </div>
  )
}

export default ManufacturerFilter