import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import PetListPage from "./pages/PetListPage";
import PetDetailPage from "./pages/PetDetailPage";
import ShopPage from "./pages/ShopPage";
import CartPage from "./pages/CartPage";
import FavoritesPage from "./pages/FavoritesPage";
import BuyerGuidePage from "./pages/BuyerGuidePage";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdminRoute && <Navbar />}
      <main className="flex-1">{children}</main>
      {!isAdminRoute && <Footer />}
    </div>
  );
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/adopt" element={<PetListPage />} />
            <Route path="/pet/:id" element={<PetDetailPage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/guide" element={<BuyerGuidePage />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
