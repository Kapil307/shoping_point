
import CategoryPage from "./CategoryPage";

function Beauty({ onAddToCart }) {
  return (
    <CategoryPage
      title="Beauty"
      category={[
        "beauty",
        "skin-care",
        "fragrances",
      ]}
      onAddToCart={onAddToCart}
    />
  );
}

export default Beauty;
