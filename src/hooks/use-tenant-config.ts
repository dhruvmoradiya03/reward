import { useTenant } from '@contexts/tenant.context';

export const useTenantConfig = () => {
  const { currentTenant, isLoading, error } = useTenant();

  const isPointsEnabled = currentTenant?.clientConfig.pointsConfig.isEnabled ?? false;
  const isPaymentEnabled = currentTenant?.clientConfig.paymentConfig.paymentGateway.isActive ?? false;
  const clientType = currentTenant?.clientConfig.paymentConfig.clientType ?? 'only-pay';

  // Payment configuration helpers
  const canUsePoints = isPointsEnabled;
  const canUsePayment = isPaymentEnabled;
  const canUsePointsAndPay = isPointsEnabled && isPaymentEnabled && clientType === 'pay-plus-points';
  const isOnlyPoints = clientType === 'only-points';
  const isOnlyPay = clientType === 'only-pay';

  // Points configuration
  const pointsConfig = currentTenant?.clientConfig.pointsConfig;
  const pointsPayConfig = currentTenant?.clientConfig.paymentConfig.pointsPayConfig;

  // Theme configuration
  const theme = currentTenant?.theme;

  // Feature flags
  const features = currentTenant?.features;

  // Client information
  const clientInfo = currentTenant?.clientConfig;

  return {
    // Tenant state
    currentTenant,
    isLoading,
    error,

    // Payment capabilities
    canUsePoints,
    canUsePayment,
    canUsePointsAndPay,
    isOnlyPoints,
    isOnlyPay,
    clientType,

    // Configuration objects
    pointsConfig,
    pointsPayConfig,
    theme,
    features,
    clientInfo,

    // Helper functions
    shouldShowPricing: () => features?.products.showPricing ?? true,
    shouldShowPoints: () => features?.products.showPoints ?? true,
    shouldShowPointsBalance: () => features?.homepage.showPointsBalance ?? true,
    shouldShowPaymentGateway: () => features?.cart.showPaymentGateway ?? true,
    shouldShowPointsPayOption: () => features?.cart.showPointsPayOption ?? true,
  };
};
