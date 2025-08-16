import React, { useEffect, useState } from 'react';
import { useScrollProgress } from '@/hooks/useAnimations';

export const ScrollProgressBar = () => {
  const progress = useScrollProgress();

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-background/20">
      <div
        className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300 ease-out"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
};

interface FloatingElementProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  direction?: 'up' | 'down';
}

export const FloatingElement: React.FC<FloatingElementProps> = ({
  children,
  className = '',
  speed = 1,
  direction = 'up',
}) => {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prev) => {
        const increment = speed * (direction === 'up' ? -1 : 1);
        return prev + increment;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [speed, direction]);

  return (
    <div
      className={`transition-transform duration-100 ease-out ${className}`}
      style={{ transform: `translateY(${Math.sin(position * 0.01) * 10}px)` }}
    >
      {children}
    </div>
  );
};

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  onClick,
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const x = (e.clientX - centerX) * 0.3;
    const y = (e.clientY - centerY) * 0.3;
    
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <button
      className={`transition-all duration-300 ease-out ${className}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px) scale(${isHovered ? 1.05 : 1})`,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  type?: 'fade' | 'slide' | 'bounce';
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = '',
  delay = 0,
  type = 'fade',
}) => {
  const [visibleChars, setVisibleChars] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setVisibleChars((prev) => {
          if (prev >= text.length) {
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, 50);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, delay]);

  const getCharClass = (index: number) => {
    const isVisible = index < visibleChars;
    const baseClass = 'inline-block transition-all duration-300';
    
    switch (type) {
      case 'slide':
        return `${baseClass} ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`;
      case 'bounce':
        return `${baseClass} ${isVisible ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`;
      default:
        return `${baseClass} ${isVisible ? 'opacity-100' : 'opacity-0'}`;
    }
  };

  return (
    <span className={className}>
      {text.split('').map((char, index) => (
        <span
          key={index}
          className={getCharClass(index)}
          style={{ transitionDelay: `${index * 0.03}s` }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
};

interface RippleEffectProps {
  children: React.ReactNode;
  className?: string;
}

export const RippleEffect: React.FC<RippleEffectProps> = ({ children, className = '' }) => {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newRipple = { id: Date.now(), x, y };
    setRipples((prev) => [...prev, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id));
    }, 600);
  };

  return (
    <div
      className={`relative overflow-hidden cursor-pointer ${className}`}
      onClick={handleClick}
    >
      {children}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute bg-white/30 rounded-full animate-ping pointer-events-none"
          style={{
            left: ripple.x - 10,
            top: ripple.y - 10,
            width: 20,
            height: 20,
            animationDuration: '0.6s',
          }}
        />
      ))}
    </div>
  );
};