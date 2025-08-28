import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Zap, Instagram, Facebook, Twitter } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-dark-light border-t border-dark-lighter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Zap className="h-8 w-8 text-primary" />
              <span className="text-xl font-display font-bold text-primary">
                Tattoo Studio
              </span>
            </Link>
            <p className="text-accent-dark text-sm leading-relaxed max-w-md">
              Creating unique and meaningful art on skin. Our studio combines traditional 
              techniques with modern innovation to deliver exceptional tattoo experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-primary font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-accent-dark hover:text-primary transition-colors duration-300 text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-accent-dark hover:text-primary transition-colors duration-300 text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/styles" className="text-accent-dark hover:text-primary transition-colors duration-300 text-sm">
                  Styles
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-accent-dark hover:text-primary transition-colors duration-300 text-sm">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link to="/booking" className="text-accent-dark hover:text-primary transition-colors duration-300 text-sm">
                  Book Now
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-primary font-semibold mb-4">Connect</h3>
            <div className="space-y-3">
              <p className="text-accent-dark text-sm">
                123 Tattoo Street<br />
                Art District, CA 90210
              </p>
              <p className="text-accent-dark text-sm">
                Phone: (555) 123-4567<br />
                Email: info@tattoostudio.com
              </p>
              <div className="flex space-x-4 pt-2">
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-accent-dark hover:text-primary transition-colors duration-300"
                >
                  <Instagram className="h-5 w-5" />
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-accent-dark hover:text-primary transition-colors duration-300"
                >
                  <Facebook className="h-5 w-5" />
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-accent-dark hover:text-primary transition-colors duration-300"
                >
                  <Twitter className="h-5 w-5" />
                </motion.a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-dark-lighter mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-accent-dark text-sm">
              © {currentYear} Tattoo Studio. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-accent-dark hover:text-primary transition-colors duration-300 text-sm">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-accent-dark hover:text-primary transition-colors duration-300 text-sm">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
