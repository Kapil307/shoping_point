
import CategoryPage from "./CategoryPage";

function Accessories({ onAddToCart }) {
  return (
    <CategoryPage
      title="Accessories"
      category={[
        "sunglasses",
        "womens-bags",
        "womens-jewellery",
        "mens-watches",
        "womens-watches",
        "mobile-accessories",
        "sports-accessories",
      ]}
      onAddToCart={onAddToCart}
    />
  );
}

export default Accessories;
