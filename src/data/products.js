
const catalog = [
  { name: "Wireless Headphones", category: "Electronics", price: 1499, image: "photo-1505740420928-5e560c06d30e" },
  { name: "Smart Watch", category: "Electronics", price: 2499, image: "photo-1523275335684-37898b6baf30" },
  { name: "Running Shoes", category: "Fashion", price: 1999, image: "photo-1542291026-7eec264c27ff" },
  { name: "Travel Backpack", category: "Accessories", price: 999, image: "photo-1553062407-98eeb64c6a62" },
  { name: "Bluetooth Speaker", category: "Electronics", price: 1799, image: "photo-1608043152269-423dbba4e7e1" },
  { name: "Laptop", category: "Electronics", price: 45999, image: "photo-1496181133206-80ce9b88a853" },
  { name: "Smartphone", category: "Electronics", price: 15999, image: "photo-1511707171634-5f897ff02aa9" },
  { name: "Keyboard", category: "Electronics", price: 1299, image: "photo-1587829741301-dc798b83add3" },
  { name: "Computer Mouse", category: "Electronics", price: 699, image: "photo-1527814050087-3793815479db" },
  { name: "Tablet", category: "Electronics", price: 12999, image: "photo-1544244015-0df4b3ffc6b0" },
  { name: "Sunglasses", category: "Fashion", price: 799, image: "photo-1511499767150-a48a237f0083" },
  { name: "Casual T-Shirt", category: "Fashion", price: 499, image: "photo-1521572163474-6864f9cf17ab" },
  { name: "Denim Jeans", category: "Fashion", price: 1299, image: "photo-1542272604-787c3835535d" },
  { name: "Casual Jacket", category: "Fashion", price: 2299, image: "photo-1551028719-00167b16eac5" },
  { name: "Leather Wallet", category: "Accessories", price: 599, image: "photo-1627123424574-724758594e93" },
  { name: "Desk Lamp", category: "Home", price: 899, image: "photo-1507473885765-e6ed057f782c" },
  { name: "Coffee Mug", category: "Home", price: 299, image: "photo-1514228742587-6b1558fcca3d" },
  { name: "Skincare Cream", category: "Beauty", price: 499, image: "photo-1608248543803-ba4f8c70ae0b" },
  { name: "Perfume", category: "Beauty", price: 1499, image: "photo-1541643600914-78b084683601" },
  { name: "Yoga Mat", category: "Sports", price: 899, image: "photo-1544367567-0f2fcb009e0b" },
  { name: "Smartphone",category: "Phones",price: 15999,image: "photo-1511707171634-5f897ff02aa9"},
];

const editions = [
  "Classic", "Premium", "Pro", "Ultra", "Lite",
  "Plus", "Max", "Essential", "Studio", "Travel",
  "Everyday", "Eco", "Urban", "Active", "Signature",
  "Flex", "Compact", "Deluxe", "Smart", "Performance",
  "Modern", "Elite", "Advanced", "Comfort", "Special",
];

const products = Array.from({ length: 500 }, (_, index) => {
  const item = catalog[index % catalog.length];
  const edition = editions[Math.floor(index / catalog.length)];

  return {
    id: index + 1,
    name: `${edition} ${item.name}`,
    category: item.category,
    price: item.price + (index % 10) * 50,
    image: `https://images.unsplash.com/${item.image}?auto=format&fit=crop&w=600&q=80`,
    description: `Explore the ${edition} ${item.name} collection at ShopEase.`,
    rating: Number((3.5 + (index % 15) / 10).toFixed(1)),
    stock: 10 + (index % 40),
  };
});

export default products;
