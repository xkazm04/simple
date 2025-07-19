'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useState, useRef } from 'react';

export default function TestComponent() {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [15, -15]), {
    stiffness: 300,
    damping: 30
  });
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-15, 15]), {
    stiffness: 300,
    damping: 30
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative group cursor-pointer select-none"
      style={{
        perspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.1
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Ambient glow effect */}
      <motion.div
        className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        animate={{
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ duration: 0.6 }}
      />

      {/* Main card */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-200/50 dark:border-slate-700/50 p-12 max-w-md w-full text-center overflow-hidden"
      >
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500"
            animate={{
              rotate: isHovered ? 180 : 0,
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + i * 10}%`,
            }}
            animate={{
              y: [-10, 10, -10],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          />
        ))}

        {/* Avatar section */}
        <motion.div
          className="mb-8 relative"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.3
          }}
        >
          <motion.div
            className="relative inline-flex items-center justify-center w-28 h-28 mx-auto"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Rotating ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              style={{
                background: 'conic-gradient(from 0deg, #3b82f6, #8b5cf6, #ec4899, #3b82f6)',
                padding: '2px',
                borderRadius: '50%',
              }}
            >
              <div className="w-full h-full bg-white dark:bg-slate-900 rounded-full" />
            </motion.div>

            {/* Main avatar */}
            <motion.div
              className="relative z-10 inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 rounded-full shadow-2xl"
              animate={{
                boxShadow: isHovered
                  ? "0 25px 50px -12px rgba(139, 92, 246, 0.4)"
                  : "0 10px 25px -3px rgba(0, 0, 0, 0.1)",
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.span
                className="text-4xl font-bold text-white drop-shadow-lg"
                animate={{
                  scale: isPressed ? 0.9 : 1,
                  textShadow: isHovered
                    ? "0 0 20px rgba(255, 255, 255, 0.8)"
                    : "0 2px 4px rgba(0, 0, 0, 0.3)",
                }}
                transition={{ duration: 0.2 }}
              >
                D
              </motion.span>
            </motion.div>

            {/* Pulse effect */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-600/20"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </motion.div>

        {/* Title section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mb-6"
        >
          <motion.h1
            className="text-3xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 dark:from-slate-100 dark:via-slate-200 dark:to-slate-100 bg-clip-text text-transparent mb-2"
            animate={{
              backgroundPosition: isHovered ? "200% center" : "0% center",
            }}
            transition={{ duration: 0.8 }}
            style={{
              backgroundSize: "200% 100%",
            }}
          >
            Premium Component
          </motion.h1>

          <motion.div
            className="h-1 w-16 mx-auto bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: isHovered ? 80 : 64 }}
            transition={{ duration: 0.4 }}
          />
        </motion.div>

        {/* Description */}
        <motion.p
          className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg font-medium"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          Experience premium UI/UX with{' '}
          <motion.span
            className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 font-semibold"
            animate={{
              backgroundPosition: isHovered ? "100% center" : "0% center",
            }}
            transition={{ duration: 1.2, repeat: Infinity, repeatType: "reverse" }}
            style={{
              backgroundSize: "200% 100%",
            }}
          >
            cutting-edge animations
          </motion.span>
          {' '}and micro-interactions that delight users.
        </motion.p>

        {/* Interactive elements */}
        <motion.div
          className="mt-8 flex justify-center space-x-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
              whileHover={{ scale: 1.5 }}
            />
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}