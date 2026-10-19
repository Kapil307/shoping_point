
import CategoryPage from "./CategoryPage";

function Electronics({ onAddToCart }) {
  return (
    <CategoryPage
      title="Electronics"
      category={[
        "smartphones",
        "laptops",
        "tablets",
        "mobile-accessories",
      ]}
      onAddToCart={onAddToCart}
    />
  );
}

export default Electronics;
