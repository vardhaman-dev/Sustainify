
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUp, Users, Package, Leaf } from "lucide-react";
import { Link } from "react-router-dom";

const ImpactTracker = () => {
  const [counters, setCounters] = useState({
    wasteDiverted: 0,
    transactions: 0,
    users: 0
  });
  
  const targets = {
    wasteDiverted: 50000,
    transactions: 10000,
    users: 5000
  };
  
  useEffect(() => {
    // Animate counters on component mount
    const duration = 2000; // 2 seconds for the animation
    const startTime = Date.now();
    
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      setCounters({
        wasteDiverted: Math.floor(targets.wasteDiverted * progress),
        transactions: Math.floor(targets.transactions * progress),
        users: Math.floor(targets.users * progress)
      });
      
      if (progress === 1) clearInterval(interval);
    }, 50);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-gradient-to-r from-eco-light/20 to-eco-medium/20 py-10 px-4 rounded-xl shadow-sm overflow-hidden relative">
      <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-eco-medium/10 rounded-full blur-3xl"></div>
      
      <div className="mb-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gradient mb-2">
          Live Impact Tracker
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Together we're making a difference. Join our growing community in creating a sustainable future.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto relative z-10">
        {/* Waste Diverted */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-md border border-eco-medium/20 hover:shadow-lg transition-all hover:-translate-y-1"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-full bg-green-100">
              <Leaf className="h-6 w-6 text-green-600" />
            </div>
            <span className="text-xs font-medium bg-green-100 text-green-700 py-1 px-2 rounded-full">
              <ArrowUp className="h-3 w-3 inline mr-1" />+2.4%
            </span>
          </div>
          <h3 className="text-4xl font-bold text-green-700">
            {counters.wasteDiverted.toLocaleString()}+ kg
          </h3>
          <p className="mt-2 text-muted-foreground">Waste Diverted</p>
          <div className="mt-4 h-2 w-full bg-green-100 rounded-full overflow-hidden">
            <div className="h-full bg-green-600 rounded-full" style={{ width: "75%" }}></div>
          </div>
          <p className="mt-1 text-right text-xs text-muted-foreground">75% of 2023 goal</p>
        </motion.div>
        
        {/* Transactions */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-md border border-eco-medium/20 hover:shadow-lg transition-all hover:-translate-y-1"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-full bg-blue-100">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
            <span className="text-xs font-medium bg-blue-100 text-blue-700 py-1 px-2 rounded-full">
              <ArrowUp className="h-3 w-3 inline mr-1" />+5.7%
            </span>
          </div>
          <h3 className="text-4xl font-bold text-blue-700">
            {counters.transactions.toLocaleString()}+
          </h3>
          <p className="mt-2 text-muted-foreground">Transactions</p>
          <div className="mt-4 h-2 w-full bg-blue-100 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 rounded-full" style={{ width: "80%" }}></div>
          </div>
          <p className="mt-1 text-right text-xs text-muted-foreground">80% of 2023 goal</p>
        </motion.div>
        
        {/* Active Users */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-md border border-eco-medium/20 hover:shadow-lg transition-all hover:-translate-y-1"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-full bg-amber-100">
              <Users className="h-6 w-6 text-amber-600" />
            </div>
            <span className="text-xs font-medium bg-amber-100 text-amber-700 py-1 px-2 rounded-full">
              <ArrowUp className="h-3 w-3 inline mr-1" />+3.9%
            </span>
          </div>
          <h3 className="text-4xl font-bold text-amber-700">
            {counters.users.toLocaleString()}+
          </h3>
          <p className="mt-2 text-muted-foreground">Active Users</p>
          <div className="mt-4 h-2 w-full bg-amber-100 rounded-full overflow-hidden">
            <div className="h-full bg-amber-600 rounded-full" style={{ width: "65%" }}></div>
          </div>
          <p className="mt-1 text-right text-xs text-muted-foreground">65% of 2023 goal</p>
        </motion.div>
      </div>
      
      <div className="text-center mt-8">
        <Link to="/join" className="inline-flex items-center group">
          <span className="text-eco-dark font-medium">Join our mission</span>
          <ArrowRight className="ml-1 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default ImpactTracker;
