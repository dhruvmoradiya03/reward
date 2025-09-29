// Client App Integration Utilities
// This file contains utilities for integrating with client applications

export interface ClientRedirectParams {
  tenant: string;
  user_id?: string;
  token?: string;
  return_url?: string;
  user_email?: string;
  user_name?: string;
  points_balance?: number;
}

export interface ClientAppConfig {
  baseUrl: string;
  redirectEndpoint: string;
  supportedTenants: string[];
}

// Generate redirect URL for client app
export const generateClientRedirectUrl = (
  clientConfig: ClientAppConfig,
  params: ClientRedirectParams
): string => {
  const { baseUrl, redirectEndpoint } = clientConfig;
  const queryParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      queryParams.append(key, value.toString());
    }
  });

  return `${baseUrl}${redirectEndpoint}?${queryParams.toString()}`;
};

// Parse redirect parameters from URL
export const parseRedirectParams = (searchParams: URLSearchParams): ClientRedirectParams => {
  return {
    tenant: searchParams.get('tenant') || '',
    user_id: searchParams.get('user_id') || undefined,
    token: searchParams.get('token') || undefined,
    return_url: searchParams.get('return_url') || undefined,
    user_email: searchParams.get('user_email') || undefined,
    user_name: searchParams.get('user_name') || undefined,
    points_balance: searchParams.get('points_balance') ? 
      parseInt(searchParams.get('points_balance')!) : undefined,
  };
};

// Validate tenant from client app
export const validateTenantFromClient = (tenant: string): boolean => {
  const supportedTenants = ['demo', 'hdfc', 'axis', 'icici'];
  return supportedTenants.includes(tenant.toLowerCase());
};

// Store user session from client app
export const storeUserSession = (params: ClientRedirectParams): void => {
  if (typeof window === 'undefined') return;

  // Store authentication data
  if (params.token) {
    localStorage.setItem('auth_token', params.token);
  }
  
  if (params.user_id) {
    localStorage.setItem('user_id', params.user_id);
  }

  // Store user profile
  if (params.user_email) {
    localStorage.setItem('user_email', params.user_email);
  }
  
  if (params.user_name) {
    localStorage.setItem('user_name', params.user_name);
  }

  // Store points balance
  if (params.points_balance !== undefined) {
    localStorage.setItem('points_balance', params.points_balance.toString());
  }

  // Store tenant
  localStorage.setItem('tenant', params.tenant);
};

// Get stored user session
export const getStoredUserSession = () => {
  if (typeof window === 'undefined') return null;

  return {
    user_id: localStorage.getItem('user_id'),
    token: localStorage.getItem('auth_token'),
    user_email: localStorage.getItem('user_email'),
    user_name: localStorage.getItem('user_name'),
    points_balance: localStorage.getItem('points_balance') ? 
      parseInt(localStorage.getItem('points_balance')!) : 0,
    tenant: localStorage.getItem('tenant'),
  };
};

// Clear user session
export const clearUserSession = (): void => {
  if (typeof window === 'undefined') return;

  localStorage.removeItem('auth_token');
  localStorage.removeItem('user_id');
  localStorage.removeItem('user_email');
  localStorage.removeItem('user_name');
  localStorage.removeItem('points_balance');
  localStorage.removeItem('tenant');
};

// Client app redirect examples
export const CLIENT_REDIRECT_EXAMPLES = {
  // HDFC Bank redirect
  hdfc: {
    url: 'https://hdfc.rewargenix.com/redirect-handler',
    params: {
      tenant: 'hdfc',
      user_id: 'hdfc_user_123',
      token: 'jwt_token_here',
      user_email: 'user@hdfc.com',
      user_name: 'John Doe',
      points_balance: 5000,
      return_url: '/dashboard'
    }
  },
  
  // AXIS Bank redirect
  axis: {
    url: 'https://axis.rewargenix.com/redirect-handler',
    params: {
      tenant: 'axis',
      user_id: 'axis_user_456',
      token: 'jwt_token_here',
      user_email: 'user@axis.com',
      user_name: 'Jane Smith',
      points_balance: 7500,
      return_url: '/rewards'
    }
  },
  
  // ICICI Bank redirect
  icici: {
    url: 'https://icici.rewargenix.com/redirect-handler',
    params: {
      tenant: 'icici',
      user_id: 'icici_user_789',
      token: 'jwt_token_here',
      user_email: 'user@icici.com',
      user_name: 'Bob Johnson',
      return_url: '/shop'
    }
  }
};
