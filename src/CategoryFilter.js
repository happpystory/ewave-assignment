
const CategoryFilter = ({product, filters}) => {


  const filterCheck = (e) => {
    filters('category', e.target.id, e.target.checked)

  }
  
  return (
    <div>
        <label htmlFor={product.category}>{product.category} </label>
        <input type="checkbox" id={product.category}  onChange={filterCheck}/>
    </div>
  )
}

export default CategoryFilter