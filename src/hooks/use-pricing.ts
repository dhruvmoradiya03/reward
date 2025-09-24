import { useTenant } from '../contexts/tenant.context';

export const usePricing = () => {
  const { currentTenant } = useTenant();

  const getPricingDisplay = (price: number, points: number) => {
    if (!currentTenant) return { showPrice: false, showPoints: false };

    const clientType = currentTenant.clientConfig.paymentConfig.clientType;

    switch (clientType) {
      case 'only-pay':
        return { showPrice: true, showPoints: false };
      case 'only-points':
        return { showPrice: false, showPoints: true };
      case 'pay-plus-points':
        return { showPrice: true, showPoints: true };
      default:
        return { showPrice: true, showPoints: false };
    }
  };

  const getPaymentOptions = () => {
    if (!currentTenant) return { showPaymentGateway: false, showPointsPay: false };

    const clientType = currentTenant.clientConfig.paymentConfig.clientType;
    const pointsConfig = currentTenant.clientConfig.pointsConfig;

    return {
      showPaymentGateway: clientType === 'only-pay' || clientType === 'pay-plus-points',
      showPointsPay: clientType === 'only-points' || clientType === 'pay-plus-points',
      showPointsOnly: clientType === 'only-points',
      showPayOnly: clientType === 'only-pay',
    };
  };

  const calculatePointsToCurrency = (points: number) => {
    if (!currentTenant?.clientConfig.paymentConfig.pointsPayConfig) return 0;
    
    const ratio = currentTenant.clientConfig.paymentConfig.pointsPayConfig.pointsToCurrencyRatio;
    return points * ratio;
  };

  const calculateCurrencyToPoints = (currency: number) => {
    if (!currentTenant?.clientConfig.paymentConfig.pointsPayConfig) return 0;
    
    const ratio = currentTenant.clientConfig.paymentConfig.pointsPayConfig.pointsToCurrencyRatio;
    return Math.ceil(currency / ratio);
  };

  const getMinMaxPoints = () => {
    if (!currentTenant?.clientConfig.paymentConfig.pointsPayConfig) {
      return { min: 0, max: Infinity };
    }

    const config = currentTenant.clientConfig.paymentConfig.pointsPayConfig;
    return {
      min: config.minPointsRequired,
      max: config.maxPointsAllowed,
    };
  };

  const isPointsEnabled = () => {
    return currentTenant?.clientConfig.pointsConfig.isEnabled || false;
  };

  const getPointsAPIEndpoint = () => {
    return currentTenant?.clientConfig.pointsConfig.apiEndpoint || '';
  };

  const getPointsAPIKey = () => {
    return currentTenant?.clientConfig.pointsConfig.apiKey || '';
  };

  return {
    getPricingDisplay,
    getPaymentOptions,
    calculatePointsToCurrency,
    calculateCurrencyToPoints,
    getMinMaxPoints,
    isPointsEnabled,
    getPointsAPIEndpoint,
    getPointsAPIKey,
    clientType: currentTenant?.clientConfig.paymentConfig.clientType,
  };
};
