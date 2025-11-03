import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { CartProvider, FavoritesProvider } from "./hooks/useCart";

createRoot(document.getElementById("root")!).render(
  <CartProvider>
    <FavoritesProvider>
      <App />
    </FavoritesProvider>
  </CartProvider>
);