import { useTenant } from '../contexts/tenant.context';
import { useEffect } from 'react';

export const useTheme = () => {
  const { currentTenant } = useTenant();

  useEffect(() => {
    if (!currentTenant?.theme) return;

    const theme = currentTenant.theme;
    const root = document.documentElement;

    // Set CSS custom properties for dynamic theming
    root.style.setProperty('--color-primary', theme.primaryColor);
    root.style.setProperty('--color-secondary', theme.secondaryColor);
    root.style.setProperty('--color-accent', theme.accentColor);
    root.style.setProperty('--color-background', theme.backgroundColor);
    root.style.setProperty('--color-card-background', theme.cardBackgroundColor);
    root.style.setProperty('--color-header-background', theme.headerBackgroundColor);
    root.style.setProperty('--color-footer-background', theme.footerBackgroundColor);
    root.style.setProperty('--color-text', theme.textColor);
    root.style.setProperty('--color-text-secondary', theme.textSecondaryColor);
    root.style.setProperty('--color-link', theme.linkColor);
    root.style.setProperty('--color-border', theme.borderColor);
    root.style.setProperty('--color-shadow', theme.shadowColor);
    
    // Set font family
    root.style.setProperty('--font-family', theme.fontFamily);
    
    // Set font sizes
    root.style.setProperty('--font-size-small', theme.fontSize.small);
    root.style.setProperty('--font-size-medium', theme.fontSize.medium);
    root.style.setProperty('--font-size-large', theme.fontSize.large);
    root.style.setProperty('--font-size-xlarge', theme.fontSize.xlarge);

    // Apply custom CSS if provided
    if (theme.customCSS) {
      const styleId = 'tenant-custom-css';
      let existingStyle = document.getElementById(styleId);
      
      if (existingStyle) {
        existingStyle.remove();
      }
      
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = theme.customCSS;
      document.head.appendChild(style);
    }

    // Update document title and favicon
    if (currentTenant.name) {
      document.title = currentTenant.name;
    }
    
    if (currentTenant.favicon) {
      const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
      if (favicon) {
        favicon.href = currentTenant.favicon;
      }
    }

  }, [currentTenant]);

  return {
    theme: currentTenant?.theme,
    isThemeLoaded: !!currentTenant?.theme,
  };
};
