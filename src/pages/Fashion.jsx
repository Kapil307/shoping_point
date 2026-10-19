import CategoryPage from "./CategoryPage";

function Fashion({ onAddToCart }) {
  return (
    <CategoryPage
      title="Fashion"
      category={[
        "mens-shirts",
        "mens-shoes",
        "mens-watches",
        "tops",
        "womens-bags",
        "womens-dresses",
        "womens-jewellery",
        "womens-shoes",
        "womens-watches",
        "sunglasses",
      ]}
      onAddToCart={onAddToCart}
    />
  );
}

export default Fashion;