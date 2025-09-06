
import { motion } from "framer-motion";

const MotionWrapper = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}   
      animate={{ opacity: 1, x: 0 }}     
      exit={{ opacity: 0, x: -100 }}     
      transition={{
        duration: 1,      
        ease: "easeInOut" 
      }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
};

export default MotionWrapper;
