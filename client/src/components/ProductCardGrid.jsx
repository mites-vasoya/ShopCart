import ProductCard from "./ProductCard";
import "./ProductCardGrid.css";

export function ProductCardsGrid({ products, wishlist }) {
  let inWishlist;
  return (
    <>
      <div className="product-card-grid">
        {products?.map((product) => {
          if (wishlist?.includes(product._id)) {
            inWishlist = true;
          } else {
            inWishlist = false;
          }

          return <ProductCard product={product}  key={product._id}/>;
        })}
      </div>
    </>
  );
}
