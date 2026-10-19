
import CategoryPage from "./CategoryPage";

function Sports({ onAddToCart }) {
  return (
    <CategoryPage
      title="Sports"
      category={[
        "sports-accessories",
      ]}
      onAddToCart={onAddToCart}
    />
  );
}

export default Sports;
