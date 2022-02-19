

const ManufacturerFilter = ({product, filters}) => {

  
  const filterCheck = (e) => {
    filters('manufacturer', e.target.id, e.target.checked)
  
  }

  return (
    <div>
        <label htmlFor={product.manufacturer}>{product.manufacturer}</label>
        <input type="checkbox" id={product.manufacturer}  onChange={filterCheck} />
    </div>
  )
}

export default ManufacturerFilter