
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import "./CetegoryPage.css";

function CategoryPage({ title, category, onAddToCart }) {
  const [allProducts, setAllProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(20);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch products from DummyJSON API
  useEffect(() => {
    const controller = new AbortController();

    async function fetchProducts() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "https://dummyjson.com/products?sortBy=title&order=asc&limit=100",
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products.");
        }

        const data = await response.json();

        // Convert API data to your ProductCard format
        const formattedProducts = data.products.map((item) => ({
          id: item.id,
          name: item.title,
          image: item.thumbnail,
          price: item.price,
          category: item.category,
          description: item.description,
          rating: item.rating,
          images: item.images,
        }));

        setAllProducts(formattedProducts);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Unable to load products.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchProducts();

    return () => controller.abort();
  }, []);

  // Filter products by category
 const filteredProducts = allProducts.filter((product) => {
  const productCategory = product.category?.toLowerCase();

  // Support one category or multiple categories
  const selectedCategories = Array.isArray(category)
    ? category.map((item) => item.toLowerCase())
    : [category?.toLowerCase()];

  return selectedCategories.includes(productCategory);
});

  const products = filteredProducts.slice(0, visibleCount);

  // Reset visible products when category changes
  useEffect(() => {
    setVisibleCount(20);
  }, [category]);

  return (
    <section className="container py-5 category-page">
      <h1 className="fw-bold mb-2">{title}</h1>

      <p className="text-secondary mb-4">
        Explore our {title.toLowerCase()} collection.
        {!loading && !error && ` (${filteredProducts.length} products)`}
      </p>

      {/* Loading */}
      {loading && (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status" />
          <p className="mt-3">Loading {title.toLowerCase()} products...</p>
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="alert alert-danger">
          {error}
          <button
            type="button"
            className="btn btn-outline-danger ms-3"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      )}

      {/* No products found */}
      {!loading && !error && filteredProducts.length === 0 && (
        <div className="text-center py-5">
          <h3>No products found</h3>
          <p className="text-secondary">
            There are currently no products in this category.
          </p>
        </div>
      )}

      {/* Product Grid */}
      {!loading && !error && products.length > 0 && (
        <>
          <div className="row g-4">
            {products.map((product) => (
              <div
                className="col-6 col-sm-6 col-lg-3"
                key={product.id}
              >
                <ProductCard
                  product={product}
                  onAddToCart={onAddToCart}
                />
              </div>
            ))}
          </div>

          {/* Load More */}
          {visibleCount < filteredProducts.length && (
            <div className="text-center mt-5">
              <button
                type="button"
                className="btn btn-success"
                onClick={() =>
                  setVisibleCount((count) =>
                    Math.min(count + 20, filteredProducts.length)
                  )
                }
              >
                Load More
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}

export default CategoryPage;
