import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">LearnHub</span>
            </div>
            <p className="text-background/80 leading-relaxed">
              Empowering learners worldwide with AI-driven education platform. 
              Transform your career with personalized learning experiences.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="icon" className="text-background/80 hover:text-background hover:bg-background/10">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-background/80 hover:text-background hover:bg-background/10">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-background/80 hover:text-background hover:bg-background/10">
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-background/80 hover:text-background hover:bg-background/10">
                <Instagram className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-background/80 hover:text-background transition-colors">Browse Courses</a></li>
              <li><a href="#" className="text-background/80 hover:text-background transition-colors">Become Instructor</a></li>
              <li><a href="#" className="text-background/80 hover:text-background transition-colors">Student Dashboard</a></li>
              <li><a href="#" className="text-background/80 hover:text-background transition-colors">Certification</a></li>
              <li><a href="#" className="text-background/80 hover:text-background transition-colors">Mobile App</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Support</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-background/80 hover:text-background transition-colors">Help Center</a></li>
              <li><a href="#" className="text-background/80 hover:text-background transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-background/80 hover:text-background transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-background/80 hover:text-background transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-background/80 hover:text-background transition-colors">Refund Policy</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Stay Updated</h3>
            <p className="text-background/80 mb-4">
              Subscribe to get the latest course updates and learning tips.
            </p>
            <div className="space-y-3">
              <Input 
                placeholder="Enter your email" 
                className="bg-background/10 border-background/20 text-background placeholder:text-background/60"
              />
              <Button variant="default" className="w-full">
                Subscribe
              </Button>
            </div>
            <div className="mt-6 space-y-2 text-sm text-background/80">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>support@learnhub.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-background/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-background/80 text-sm">
              © 2024 LearnHub. All rights reserved. Made with ❤️ for learners worldwide.
            </p>
            <div className="flex items-center space-x-6 text-sm">
              <a href="#" className="text-background/80 hover:text-background transition-colors">Accessibility</a>
              <a href="#" className="text-background/80 hover:text-background transition-colors">Sitemap</a>
              <a href="#" className="text-background/80 hover:text-background transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};