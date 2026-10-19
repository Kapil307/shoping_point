
import CategoryPage from "./CategoryPage";

function HomeProducts({ onAddToCart }) {
  return (
    <CategoryPage
      title="Home & Living"
      category={[
        "furniture",
        "home-decoration",
        "kitchen-accessories",
      ]}
      onAddToCart={onAddToCart}
    />
  );
}

export default HomeProducts;
