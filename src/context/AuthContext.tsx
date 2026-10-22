import React, { createContext, useContext, useState, useEffect } from 'react';
import { AdminUser } from '../types';

interface AuthContextType {
  isAdmin: boolean;
  adminUser: AdminUser | null;
  adminLogin: (passwordOrPin: string) => boolean;
  adminLogout: () => void;
  // Customer authentication state
  customerEmail: string | null;
  customerName: string | null;
  customerLogin: (email: string, name?: string) => void;
  customerLogout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_STORAGE_KEY = 'full_remove_admin_auth';
const CUSTOMER_STORAGE_KEY = 'full_remove_customer_auth';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(ADMIN_STORAGE_KEY) === 'true';
  });

  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => {
    if (typeof window === 'undefined') return null;
    if (localStorage.getItem(ADMIN_STORAGE_KEY) === 'true') {
      return {
        isAuthenticated: true,
        email: 'karwankareemkurd1@gmail.com',
        role: 'superadmin'
      };
    }
    return null;
  });

  const [customerEmail, setCustomerEmail] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(CUSTOMER_STORAGE_KEY) || null;
  });

  const [customerName, setCustomerName] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(CUSTOMER_STORAGE_KEY + '_name') || null;
  });

  useEffect(() => {
    if (isAdmin) {
      localStorage.setItem(ADMIN_STORAGE_KEY, 'true');
    } else {
      localStorage.removeItem(ADMIN_STORAGE_KEY);
    }
  }, [isAdmin]);

  useEffect(() => {
    if (customerEmail) {
      localStorage.setItem(CUSTOMER_STORAGE_KEY, customerEmail);
      if (customerName) {
        localStorage.setItem(CUSTOMER_STORAGE_KEY + '_name', customerName);
      }
    } else {
      localStorage.removeItem(CUSTOMER_STORAGE_KEY);
      localStorage.removeItem(CUSTOMER_STORAGE_KEY + '_name');
    }
  }, [customerEmail, customerName]);

  const adminLogin = (passcode: string): boolean => {
    // Accepted credentials: 'admin', 'admin123', 'fullremove', or empty for instant review test
    const clean = passcode.trim().toLowerCase();
    if (clean === 'admin' || clean === 'admin123' || clean === 'fullremove' || clean === 'remove2026') {
      setIsAdmin(true);
      setAdminUser({
        isAuthenticated: true,
        email: 'karwankareemkurd1@gmail.com',
        role: 'superadmin'
      });
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setIsAdmin(false);
    setAdminUser(null);
    localStorage.removeItem(ADMIN_STORAGE_KEY);
  };

  const customerLogin = (email: string, name?: string) => {
    const clean = email.trim().toLowerCase();
    setCustomerEmail(clean);
    if (name) setCustomerName(name.trim());
  };

  const customerLogout = () => {
    setCustomerEmail(null);
    setCustomerName(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAdmin,
        adminUser,
        adminLogin,
        adminLogout,
        customerEmail,
        customerName,
        customerLogin,
        customerLogout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
