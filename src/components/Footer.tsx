import { Link } from "react-router-dom";
import { PawPrint, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <PawPrint className="h-6 w-6 text-secondary" />
              <span className="text-xl font-bold">PawAdopt</span>
            </div>
            <p className="text-muted-foreground">
              Find your perfect pet companion and give them a loving home.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/adopt" className="text-muted-foreground hover:text-foreground transition-colors">
                  Adopt a Pet
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-muted-foreground hover:text-foreground transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/guide" className="text-muted-foreground hover:text-foreground transition-colors">
                  Buyer Guide
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>contact@pawadopt.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+91 6488374843</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>37, sarai vihar colony, delhi</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-secondary transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-secondary transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-secondary transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} PawAdopt. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
