/**
 * Footer Newsletter Component
 * Newsletter subscription form (optional component)
 */

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Check, AlertCircle } from 'lucide-react';
import { isValidEmail } from './utils';

interface FooterNewsletterProps {
  /** Newsletter title */
  title?: string;
  /** Newsletter description */
  description?: string;
  /** Placeholder text for email input */
  placeholder?: string;
  /** Submit button text */
  buttonText?: string;
  /** Success message */
  successMessage?: string;
  /** Error message */
  errorMessage?: string;
  /** Custom CSS classes */
  className?: string;
  /** Submit handler */
  onSubmit?: (email: string) => Promise<boolean>;
}

/**
 * Footer Newsletter Component
 *
 * Optional newsletter subscription component with:
 * - Email input validation
 * - Success/error states
 * - Loading states
 * - Accessibility support
 * - Responsive design
 */
export const FooterNewsletter = ({
  title = 'Stay Updated',
  description = 'Get the latest news and updates from InterpreLab.',
  placeholder = 'Enter your email',
  buttonText = 'Subscribe',
  successMessage = 'Thank you for subscribing!',
  errorMessage = 'Please enter a valid email address.',
  className = '',
  onSubmit,
}: FooterNewsletterProps) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setStatus('error');
      setMessage('Email is required.');
      return;
    }

    if (!isValidEmail(email)) {
      setStatus('error');
      setMessage(errorMessage);
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      const success = onSubmit ? await onSubmit(email) : true;

      if (success) {
        setStatus('success');
        setMessage(successMessage);
        setEmail('');
      } else {
        setStatus('error');
        setMessage('Something went wrong. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  const isLoading = status === 'loading';
  const isSuccess = status === 'success';
  const isError = status === 'error';

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Newsletter Header */}
      <div className="space-y-2">
        <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Mail className="w-4 h-4" />
          {title}
        </h4>
        <p className="text-xs text-muted-foreground">
          {description}
        </p>
      </div>

      {/* Newsletter Form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex gap-2">
          <Input
            type="email"
            placeholder={placeholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading || isSuccess}
            className={`
              flex-1 text-sm
              ${isError ? 'border-destructive focus:border-destructive' : ''}
              ${isSuccess ? 'border-success focus:border-success' : ''}
            `}
            aria-label="Email address for newsletter"
            aria-describedby={message ? 'newsletter-message' : undefined}
          />

          <Button
            type="submit"
            size="sm"
            disabled={isLoading || isSuccess}
            className="px-4"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : isSuccess ? (
              <Check className="w-4 h-4" />
            ) : (
              buttonText
            )}
          </Button>
        </div>

        {/* Status Message */}
        {message && (
          <div
            id="newsletter-message"
            className={`
              flex items-center gap-2 text-xs
              ${isSuccess ? 'text-success' : isError ? 'text-destructive' : 'text-muted-foreground'}
            `}
            role={isError ? 'alert' : 'status'}
            aria-live="polite"
          >
            {isSuccess ? (
              <Check className="w-3 h-3" />
            ) : isError ? (
              <AlertCircle className="w-3 h-3" />
            ) : null}
            {message}
          </div>
        )}
      </form>

      {/* Privacy Notice */}
      <p className="text-xs text-muted-foreground">
        We respect your privacy. Unsubscribe at any time.{' '}
        <a
          href="/privacy"
          className="underline hover:text-foreground transition-colors"
        >
          Privacy Policy
        </a>
      </p>
    </div>
  );
};
