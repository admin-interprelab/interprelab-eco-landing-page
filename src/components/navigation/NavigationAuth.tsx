/**
 * Navigation Auth Component
 */

import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { User, LogOut, Settings, LayoutDashboard } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import type { NavigationAuthProps } from './types';
import { AUTH_ROUTES } from './constants';

/**
 * Navigation Auth Component
 *
 * Authentication-related navigation items
 */
export const NavigationAuth = ({
  className = '',
  variant = 'desktop',
  showDashboard = true,
  showSettings = true,
  onSignOut,
}: NavigationAuthProps) => {
  const { user, signOut } = useAuth();
  const { t } = useLanguage();

  const handleSignOut = async () => {
    if (onSignOut) {
      onSignOut();
    } else {
      await signOut();
    }
  };

  if (variant === 'mobile') {
    return (
      <div className={`pt-6 space-y-3 ${className}`}>
        {user ? (
          <>
            {showDashboard && (
              <Link to={AUTH_ROUTES.dashboard}>
                <Button variant="ghost" className="w-full justify-start">
                  <LayoutDashboard className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
            )}
            {showSettings && (
              <Link to={AUTH_ROUTES.settings}>
                <Button variant="ghost" className="w-full justify-start">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
              </Link>
            )}
            <Button
              onClick={handleSignOut}
              variant="glass"
              className="w-full justify-start"
            >
              <LogOut className="w-4 h-4 mr-2" />
              {t('signOut')}
            </Button>
          </>
        ) : (
          <>
            <Link to={AUTH_ROUTES.waitlist}>
              <Button variant="glass" className="w-full flex items-center gap-2">
                Join Waitlist
              </Button>
            </Link>
            <Link to={AUTH_ROUTES.signIn}>
              <Button variant="hero" className="w-full">
                <User className="w-4 h-4 mr-2" />
                {t('signIn')}
              </Button>
            </Link>
          </>
        )}
      </div>
    );
  }

  // Desktop variant
  return (
    <div className={`hidden md:flex items-center gap-3 ${className}`}>
      {user ? (
        <>
          {showDashboard && (
            <Link to={AUTH_ROUTES.dashboard}>
              <Button variant="ghost" size="sm">
                <LayoutDashboard className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
            </Link>
          )}
          {showSettings && (
            <Link to={AUTH_ROUTES.settings}>
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </Link>
          )}
          <Button onClick={handleSignOut} variant="glass" size="sm">
            <LogOut className="w-4 h-4 mr-2" />
            {t('signOut')}
          </Button>
        </>
      ) : (
        <>
          <Link to={AUTH_ROUTES.waitlist}>
            <Button variant="glass" size="sm" className="flex items-center gap-2">
              Join Waitlist
            </Button>
          </Link>
          <Link to={AUTH_ROUTES.signIn}>
            <Button variant="hero" size="sm">
              <User className="w-4 h-4 mr-2" />
              {t('signIn')}
            </Button>
          </Link>
        </>
      )}
    </div>
  );
};
