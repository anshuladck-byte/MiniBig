
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import api from '../lib/api';

export interface Student {
  full_name: string;
  usn: string;
  email: string;
  phone: string;
  branch: string;
  semester: string;
  section: string;
}

interface AuthContextType {
  student: Student | null;
  loading: boolean;
  refreshStudent: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshStudent = async () => {
    const token = localStorage.getItem('campus_token');

    if (!token) {
      setStudent(null);
      return;
    }

    try {
      const response = await api.get('/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStudent(response.data);
    } catch (error) {
      setStudent(null);
      localStorage.removeItem('campus_token');
      localStorage.removeItem('campus_student');
    }
  };

  useEffect(() => {
    refreshStudent().finally(() => setLoading(false));
  }, []);

  return (
    <AuthContext.Provider value={{ student, loading, refreshStudent }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}
