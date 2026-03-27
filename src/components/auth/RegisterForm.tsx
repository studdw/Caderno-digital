import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Eye, EyeOff, Loader2, Check, X } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { validateEmail, validatePassword, validateUsername, getPasswordStrength } from '../../utils/validations';

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.isValid) {
      setError(emailValidation.message!);
      return;
    }

    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      setError(passwordValidation.message!);
      return;
    }

    const usernameValidation = validateUsername(formData.username);
    if (!usernameValidation.isValid) {
      setError(usernameValidation.message!);
      return;
    }

    setLoading(true);
    try {
      const { error } = await signUp(formData.email, formData.password, formData.username);
      if (error) {
        setError(error.message);
      } else {
        setSuccess(true);
        setTimeout(() => navigate('/login'), 2000);
      }
    } catch (err) {
      setError('Erro inesperado. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const passwordStrength = getPasswordStrength(formData.password);

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md mx-auto"
      >
        <div className="bg-surface rounded-2xl shadow-lg p-8 editorial-shadow text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check size={32} className="text-green-600" />
          </div>
          <h2 className="text-xl font-headline font-bold text-on-surface mb-2">
            Conta criada com sucesso!
          </h2>
          <p className="text-secondary text-sm mb-4">
            Verifique seu email para confirmar a conta.
          </p>
          <p className="text-secondary text-sm">
            Redirecionando para o login...
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="bg-surface rounded-2xl shadow-lg p-8 editorial-shadow">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-headline font-bold text-on-surface mb-2">
            Criar conta
          </h1>
          <p className="text-secondary text-sm">
            Junte-se ao Caderno do Aluno
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-on-surface mb-2">
              Nome de usuário
            </label>
            <input
              id="username"
              type="text"
              value={formData.username}
              onChange={handleChange('username')}
              className="w-full px-4 py-3 bg-surface-low border border-outline rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
              placeholder="seu_usuario"
              required
            />
            <p className="text-xs text-secondary mt-1">
              3-20 caracteres, apenas letras, números e _
            </p>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-on-surface mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange('email')}
              className="w-full px-4 py-3 bg-surface-low border border-outline rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
              placeholder="seu@email.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-on-surface mb-2">
              Senha
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange('password')}
                className="w-full px-4 py-3 pr-12 bg-surface-low border border-outline rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-on-surface transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {formData.password && (
              <div className="mt-2">
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex-1 bg-surface-low rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        passwordStrength.score <= 2 ? 'bg-red-500' :
                        passwordStrength.score <= 3 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                    />
                  </div>
                  <span className={`text-xs font-medium ${passwordStrength.color}`}>
                    {passwordStrength.label}
                  </span>
                </div>
                <div className="text-xs text-secondary space-y-1">
                  <div className="flex items-center gap-1">
                    {formData.password.length >= 8 ? <Check size={12} className="text-green-500" /> : <X size={12} className="text-red-500" />}
                    <span>Mínimo 8 caracteres</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {/[A-Z]/.test(formData.password) ? <Check size={12} className="text-green-500" /> : <X size={12} className="text-red-500" />}
                    <span>Uma letra maiúscula</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {/[a-z]/.test(formData.password) ? <Check size={12} className="text-green-500" /> : <X size={12} className="text-red-500" />}
                    <span>Uma letra minúscula</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {/\d/.test(formData.password) ? <Check size={12} className="text-green-500" /> : <X size={12} className="text-red-500" />}
                    <span>Um número</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"
            >
              {error}
            </motion.div>
          )}

          <button
            type="submit"
            disabled={loading || passwordStrength.score < 3}
            className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Criando conta...
              </>
            ) : (
              'Criar conta'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-secondary text-sm">
            Já tem uma conta?{' '}
            <Link
              to="/login"
              className="text-primary hover:text-primary-hover transition-colors font-medium"
            >
              Entrar
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
}