
const PriceFilter = ({filters, products}) => {

  const filterCheck = (e) => {
    filters('price', e.target.id, e.target.value)
  }

  return (
    <div>
        <label>Min price</label>
        <input type="number" id="min" onChange={filterCheck} />
        <label>max price</label>
        <input type="number" id="max" onChange={filterCheck} />
    </div>
  )
}

export default PriceFilter