import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProductData } from './constants';
import { Brain, Sparkles, Eye } from 'lucide-react';

interface ProductCardProps {
  product: ProductData;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const renderImageSection = () => {
    if (product.id === 'interprebot') {
      // Complex 3D scene for InterpreBot
      return (
        <div className="relative aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-purple-900/40 to-pink-900/40">
          {/* 3D Computer Scene */}
          <div className="w-full h-full relative perspective-1000">
            {/* Main 3D Computer */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative transform-gpu hover:scale-105 transition-transform duration-500">
                {/* Computer Base */}
                <div
                  className="w-32 h-20 bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg shadow-xl"
                  style={{ transform: 'rotateX(15deg) rotateY(-10deg)' }}
                >
                  {/* Screen */}
                  <div className="absolute top-1 left-2 right-2 bottom-6 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded border border-cyan-400/30 overflow-hidden">
                    {/* Scrolling Code Effect */}
                    <div className="absolute inset-0 bg-gradient-to-t from-transparent via-cyan-400/10 to-transparent animate-pulse" />
                    <div className="text-cyan-300 text-xs font-mono p-1 opacity-70">
                      <div className="animate-pulse">AI Analysis...</div>
                      <div className="animate-pulse" style={{ animationDelay: '0.2s' }}>Voice: 92%</div>
                      <div className="animate-pulse" style={{ animationDelay: '0.4s' }}>Grammar: 88%</div>
                    </div>
                  </div>
                  {/* Keyboard */}
                  <div className="absolute bottom-1 left-2 right-2 h-2 bg-slate-700 rounded-sm" />
                </div>
              </div>
            </div>

            {/* Floating Neural Network Elements */}
            <div className="absolute top-4 left-4 w-3 h-3 bg-cyan-400 rounded-full animate-float opacity-70" />
            <div className="absolute top-6 right-6 w-2 h-2 bg-purple-400 rounded-full animate-float opacity-70" style={{ animationDelay: '1s' }} />
            <div className="absolute bottom-6 left-8 w-4 h-4 bg-pink-400 rounded-full animate-float opacity-70" style={{ animationDelay: '2s' }} />
            <div className="absolute bottom-4 right-4 w-2 h-2 bg-yellow-400 rounded-full animate-float opacity-70" style={{ animationDelay: '1.5s' }} />

            {/* Data Flow Lines */}
            <div className="absolute inset-0 pointer-events-none">
              <svg className="w-full h-full">
                <defs>
                  <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#06b6d4', stopOpacity: 0.6 }} />
                    <stop offset="100%" style={{ stopColor: '#8b5cf6', stopOpacity: 0.2 }} />
                  </linearGradient>
                </defs>
                <path
                  d="M20,40 Q80,20 140,60 Q180,80 220,40"
                  stroke="url(#flowGradient)"
                  strokeWidth="2"
                  fill="none"
                  className="animate-pulse"
                />
                <path
                  d="M40,80 Q100,100 160,80 Q200,60 240,80"
                  stroke="url(#flowGradient)"
                  strokeWidth="1"
                  fill="none"
                  className="animate-pulse"
                  style={{ animationDelay: '0.5s' }}
                />
              </svg>
            </div>

            {/* Voice Wave Animation */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-gradient-to-t from-cyan-400 to-purple-400 rounded-full animate-pulse"
                  style={{
                    height: `${8 + Math.sin(i) * 4}px`,
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: '1s'
                  }}
                />
              ))}
            </div>

            {/* Holographic Interface Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-cyan-400/5 to-purple-400/5" />

            {/* Status Badge */}
            <div className="absolute top-4 left-4">
              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 border-0 text-white text-xs">
                <Eye className="w-3 h-3 mr-1" />
                AI Analysis Active
              </Badge>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
          <img
            src={product.imageSrc}
            alt={product.imageAlt}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <Badge className={`${product.imageBadgeBg} border-0 text-white mb-2`}>
              {product.imageBadge.text}
            </Badge>
            <p className="text-white text-sm">{product.subtitle}</p>
          </div>
        </div>
      );
    }
  };

  return (
    <Card className="bg-card/50 border-border/50 backdrop-blur-sm hover-lift group">
      <CardContent className="p-8">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-lg ${product.iconBgGradient}`}>
              {product.icon}
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground">{product.title}</h3>
              <p className="text-muted-foreground">{product.subtitle}</p>
            </div>
          </div>

          {renderImageSection()}

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">{product.featuresTitle}</h4>
            <div className="space-y-2">
              {product.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className={`w-2 h-2 ${feature.iconColorClass || 'bg-primary'} rounded-full`} />
                  <span className="text-sm text-muted-foreground">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          {product.specializations && product.specializations.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">{product.specializationsTitle}</h4>
              <div className="flex gap-2">
                {product.specializations.map((spec, index) => (
                  <Badge key={index} variant={spec.variant || 'outline'}>
                    {spec.text}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <Button asChild className={`w-full border-0 text-white hover:opacity-90 ${product.buttonBgGradient}`}>
            <Link to={product.buttonHref}>
              {product.id === 'interprebot' ? <Brain className="w-4 h-4 mr-2" /> : null}
              {product.id === 'interprecoach' ? <Chrome className="w-4 h-4 mr-2" /> : null}
              {product.id === 'interprelab-platform' ? <Sparkles className="w-4 h-4 mr-2" /> : null}
              {product.buttonText}
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
