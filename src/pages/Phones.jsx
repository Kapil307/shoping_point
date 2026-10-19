
import CategoryPage from "./CategoryPage";

function Phones({ onAddToCart }) {
  return (
    <CategoryPage
      title="Phones"
      category={[
        "smartphones",
       
      ]}
      onAddToCart={onAddToCart}
    />
  );
}

export default Phones;
