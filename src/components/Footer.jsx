import "./Footer.css";
function Footer() {
  return (
    <footer className="bg-dark text-white text-center py-4 mt-5">
      <div className="container">
        <h5 className="text-success">ShopEase</h5>
        <p className="mb-1">
          Your one-stop destination for online shopping.
        </p>
        <small>© {new Date().getFullYear()} ShopEase. All rights reserved.</small>
      </div>
    </footer>
  );
}

export default Footer;
