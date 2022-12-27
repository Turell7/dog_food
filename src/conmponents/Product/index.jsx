export function Product({
  createdAt, name, img, price, tags, stock,
}) {
  return (
    <div className="card card-compact drop-shadow-xl shadow">
      {/* Загатовка на переделку бейджеков */}
      {/* <div className="indicator">
        <span className="indicator-item badge badge-primary">new</span>
        <span className="indicator-item badge badge-primary">ыфду</span>
        <div className="grid w-32 h-32 bg-base-300 place-items-center">
          <figure>
            <img src={img} alt="product" />
          </figure>
        </div>
      </div> */}

      <figure><img src={img} alt="product" /></figure>
      <div className="card-body">
        <h3 className=" text-lg font-medium">
          {price}
          &#8381;
        </h3>
        <h4 className="opacity-50">
          {stock}
          шт
        </h4>
        <h2 className="card-title grow">
          {name}
          <div>
            { tags?.map((tag) => (
              <div key={createdAt + tag} className="badge badge-secondary">{tag}</div>
            ))}
          </div>
        </h2>
        <div className="card-actions justify-end">
          <button type="button" className="btn btn-sm btn-outline btn-secondary">Detail</button>
          <button type="button" className="btn btn-sm btn-outline btn-secondary">Add to cart</button>
        </div>
      </div>
    </div>
  )
}
