import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';

const Welcome2 = () => {
  const {user, logout} = useAuth();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 relative overflow-hidden">
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full bg-blue-200/30 blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ top: '10%', left: '20%' }}
        />
        <motion.div
          className="absolute w-[300px] h-[300px] rounded-full bg-blue-300/20 blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ top: '40%', right: '10%' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <header className="flex justify-between items-center mx-4 md:mx-8 mt-4 md:mt-8 p-4 rounded-[50px] bg-white/80 backdrop-blur-sm shadow-lg">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent"
          >
            Track It Back
          </motion.h1>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-6 h-6 text-blue-700" />
          </button>

          {/* Desktop Navigation */}
          <motion.nav 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="hidden md:block space-x-6"
          >
          {user && (<button onClick={() => logout()} className="text-blue-700 hover:text-blue-400">Logout</button>)}
          {!user && (
            <>
            <Link to="/login" className="text-blue-700 hover:text-blue-400">Login</Link>
            <Link to="/register" className="text-blue-700 hover:text-blue-400">Sign Up</Link>
            </>
            )}
          <Link to="/chat" className="text-blue-700 hover:text-blue-400">Chat</Link>
          <Link to="/notifications" className="text-blue-700 hover:text-blue-400">Notifications</Link>
          </motion.nav>
        </header>

        {/* Mobile Navigation */}
        <motion.div
          initial={false}
          animate={{ height: isMenuOpen ? 'auto' : 0, opacity: isMenuOpen ? 1 : 0 }}
          className={`md:hidden overflow-hidden bg-white/90 backdrop-blur-sm mx-4 mt-2 rounded-2xl shadow-lg ${isMenuOpen ? 'block' : 'hidden'}`}
        >
          <nav className="flex flex-col p-4 space-y-4">
          {user && (<button onClick={() => logout()} className="text-blue-700 hover:text-blue-400">Logout</button>)}
          {!user && (
            <>
            <Link to="/login" className="text-blue-700 hover:text-blue-400">Login</Link>
            <Link to="/register" className="text-blue-700 hover:text-blue-400">Sign Up</Link>
            </>
            )}
          <Link to="/chat" className="text-blue-700 hover:text-blue-400">Chat</Link>
          <Link to="/notifications" className="text-blue-700 hover:text-blue-400">Notifications</Link>
          </nav>
        </motion.div>

        <main className="flex flex-col items-center justify-center min-h-[80vh] px-4 md:px-6 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-700 to-blue-900 bg-clip-text text-transparent mb-4 md:mb-6"
          >
            Welcome to Track It Back Platform
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-lg md:text-xl text-blue-800/80 max-w-2xl mb-8 md:mb-12"
          >
            Our platform helps you report, find, and recover lost or found items efficiently. 
            Register or Login to get started.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="space-x-4 md:space-x-6"
          >
            <motion.a 
              href="/dashboard"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 md:px-8 py-2.5 md:py-3 rounded-full text-sm md:text-base shadow-lg hover:shadow-xl transition-shadow"
            >
              Go to Dashboard
            </motion.a>
          </motion.div>
        </main>

        <motion.footer 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-0 w-full p-4 md:p-6 text-center bg-white/80 backdrop-blur-sm"
        >
          <p className="text-blue-800/60 text-sm md:text-base">&copy; 2025 Track It Back. All rights reserved.</p>
          <div className="mt-1 md:mt-2">
            <span className="text-xs md:text-sm text-blue-600/60">Share | Rate Us | About Us</span>
          </div>
        </motion.footer>
      </div>
    </div>
  );
};

export default Welcome2;
