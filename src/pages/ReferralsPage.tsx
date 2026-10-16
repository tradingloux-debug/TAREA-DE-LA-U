import React, { useEffect, useState } from 'react';
import { useAccount } from '../context/AccountContext';
import { useLanguage } from '../context/LanguageContext';
import { useRouter } from '../context/RouterContext';
import { useBookingDraft } from '../context/BookingDraftContext';
import { storageService } from '../services/storage';
import { referralService } from '../services/referralService';
import { accountService } from '../services/accountService';
import { ReferralProgramState } from '../types/referral';
import { ReferralCard } from '../components/referrals/ReferralCard';
import { GiaCreditsCard } from '../components/referrals/GiaCreditsCard';
import { AvatarUploader } from '../components/account/AvatarUploader';
import { BackButton } from '../components/common/BackButton';
import {
  UserCircle,
  Save,
  Pencil,
  CalendarCheck,
  Gift,
  LogOut,
  ShieldCheck,
  Trash2,
  Lock,
  Mail,
  UserPlus,
  LogIn,
  AlertTriangle,
  CheckCircle2,
  X,
  Camera,
  Heart,
} from 'lucide-react';

export const ReferralsPage: React.FC = () => {
  const { language } = useLanguage();
  const { navigate } = useRouter();
  const { favorites } = useBookingDraft();
  const { profile, register, login, logout, deleteAccount, saveProfile, updateAvatar } = useAccount();

  // Auth mode when guest: 'register' | 'login'
  const [authMode, setAuthMode] = useState<'register' | 'login'>('register');

  // Register Form State
  const [regForm, setRegForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    country: 'El Salvador',
    avatarUrl: '',
  });

  // Login Form State
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  // Edit Profile State
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    avatarUrl: '',
  });

  const [authError, setAuthError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [bookingCount, setBookingCount] = useState(0);
  const [referralState, setReferralState] = useState<ReferralProgramState>(() => referralService.getState());

  // Delete Account Confirmation Modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);

  // Sync profile into editForm when profile changes
  useEffect(() => {
    if (profile) {
      setEditForm({
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
        email: profile.email || '',
        phone: profile.phone || '',
        country: profile.country || '',
        avatarUrl: profile.avatarUrl || '',
      });
      setEditing(false);
    }
  }, [profile]);

  useEffect(() => {
    let active = true;
    storageService.listRecentBookings().then((bookings) => {
      if (!active) return;
      const ownBookings = profile
        ? bookings.filter((item) => item.email.trim().toLowerCase() === profile.email.trim().toLowerCase())
        : [];
      setBookingCount(ownBookings.length);
      if (profile) {
        setReferralState(referralService.unlockAfterFirstBooking(profile, bookings));
      }
    });
    return () => {
      active = false;
    };
  }, [profile]);

  const copy = {
    es: {
      eyebrow: 'Mi Cuenta GIA',
      title: profile ? `¡Hola, ${profile.firstName}!` : 'Tu portal de viajero GIA',
      subtitle: profile
        ? 'Administra tus datos, foto de perfil, reservas y beneficios de viaje.'
        : 'Crea tu cuenta o inicia sesión para gestionar tus reservas, personalizar tu perfil y acceder a beneficios.',
      tabRegister: 'Crear cuenta',
      tabLogin: 'Iniciar sesión',
      firstName: 'Nombre',
      lastName: 'Apellido',
      email: 'Correo electrónico',
      password: 'Contraseña',
      phone: 'Teléfono / WhatsApp',
      country: 'País de residencia',
      avatarLabel: 'Foto de perfil (opcional)',
      createBtn: 'Crear mi cuenta',
      loginBtn: 'Iniciar sesión',
      logoutBtn: 'Cerrar sesión',
      deleteBtn: 'Eliminar mi cuenta',
      editBtn: 'Editar perfil',
      saveBtn: 'Guardar cambios',
      cancelBtn: 'Cancelar',
      changePhoto: 'Cambiar foto',
      registeredOnDevice: 'Cuentas detectadas en este dispositivo:',
      clickToLogin: 'Haz clic para seleccionar:',
      noAccountYet: '¿No tienes cuenta todavía?',
      alreadyHaveAccount: '¿Ya tienes una cuenta registrada?',
      deleteConfirmTitle: '¿Eliminar tu cuenta definitivamente?',
      deleteConfirmText:
        'Esta acción eliminará de forma permanente tu perfil, foto de perfil y sesión activa de este navegador. Podrás crear una nueva cuenta cuando lo desees.',
      deleteConfirmBtn: 'Sí, borrar mi cuenta definitivamente',
      reservations: 'Mis reservas',
      reservationCount: 'Reservas activas con tu correo',
      viewReservations: 'Ver historial de reservas',
      localNote: 'Tus credenciales y datos se guardan de forma privada en el almacenamiento seguro de tu navegador.',
      lockedTitle: 'Tu código de recomendación se activará con tu primera reserva',
      lockedText:
        'Crea tus reservaciones con este mismo correo. En cuanto se confirme tu primera experiencia, se activará tu código personal de Comparte GIA con el que ganarás créditos para futuros tours.',
      bookNow: 'Explorar experiencias y reservar',
      program: 'Programa Comparte GIA',
      credits: 'Créditos y descuentos acumulados',
    },
    en: {
      eyebrow: 'My GIA Account',
      title: profile ? `Hello, ${profile.firstName}!` : 'Your GIA Traveler Portal',
      subtitle: profile
        ? 'Manage your details, profile photo, bookings, and travel perks.'
        : 'Create an account or log in to manage bookings, customize your profile, and access benefits.',
      tabRegister: 'Create account',
      tabLogin: 'Log in',
      firstName: 'First name',
      lastName: 'Last name',
      email: 'Email address',
      password: 'Password',
      phone: 'Phone / WhatsApp',
      country: 'Country of residence',
      avatarLabel: 'Profile picture (optional)',
      createBtn: 'Create my account',
      loginBtn: 'Log in',
      logoutBtn: 'Log out',
      deleteBtn: 'Delete my account',
      editBtn: 'Edit profile',
      saveBtn: 'Save changes',
      cancelBtn: 'Cancel',
      changePhoto: 'Change photo',
      registeredOnDevice: 'Accounts found on this device:',
      clickToLogin: 'Click to select:',
      noAccountYet: "Don't have an account yet?",
      alreadyHaveAccount: 'Already have an account?',
      deleteConfirmTitle: 'Permanently delete your account?',
      deleteConfirmText:
        'This action will permanently delete your profile details, photo, and active session from this browser. You can create a new account whenever you want.',
      deleteConfirmBtn: 'Yes, permanently delete my account',
      reservations: 'My bookings',
      reservationCount: 'Bookings linked to your email',
      viewReservations: 'View booking history',
      localNote: 'Your credentials and data are stored privately in your secure browser storage.',
      lockedTitle: 'Your referral code unlocks after your first booking',
      lockedText:
        'Book your trips using this same email address. Once your first experience is confirmed, your personal Share GIA referral code will activate with travel credits.',
      bookNow: 'Explore experiences & book',
      program: 'Share GIA Program',
      credits: 'Earned credits and discounts',
    },
    pt: {
      eyebrow: 'Minha Conta GIA',
      title: profile ? `Olá, ${profile.firstName}!` : 'Seu Portal de Viajante GIA',
      subtitle: profile
        ? 'Gerencie seus dados, foto de perfil, reservas e benefícios de viagem.'
        : 'Crie sua conta ou faça login para gerenciar suas reservas, personalizar seu perfil e acessar benefícios.',
      tabRegister: 'Criar conta',
      tabLogin: 'Entrar',
      firstName: 'Nome',
      lastName: 'Sobrenome',
      email: 'E-mail',
      password: 'Senha',
      phone: 'Telefone / WhatsApp',
      country: 'País de residência',
      avatarLabel: 'Foto de perfil (opcional)',
      createBtn: 'Criar minha conta',
      loginBtn: 'Entrar',
      logoutBtn: 'Sair da conta',
      deleteBtn: 'Excluir minha conta',
      editBtn: 'Editar perfil',
      saveBtn: 'Salvar alterações',
      cancelBtn: 'Cancelar',
      changePhoto: 'Alterar foto',
      registeredOnDevice: 'Contas detectadas neste dispositivo:',
      clickToLogin: 'Clique para selecionar:',
      noAccountYet: 'Ainda não tem uma conta?',
      alreadyHaveAccount: 'Já tem uma conta cadastrada?',
      deleteConfirmTitle: 'Excluir sua conta definitivamente?',
      deleteConfirmText:
        'Esta ação removerá permanentemente seu perfil, foto de perfil e sessão ativa deste navegador. Você poderá criar uma nova conta quando desejar.',
      deleteConfirmBtn: 'Sim, excluir minha conta definitivamente',
      reservations: 'Minhas reservas',
      reservationCount: 'Reservas ativas com seu e-mail',
      viewReservations: 'Ver histórico de reservas',
      localNote: 'Suas credenciais e dados são salvos de forma privada no armazenamento seguro do seu navegador.',
      lockedTitle: 'Seu código de indicação será ativado com sua primeira reserva',
      lockedText:
        'Crie suas reservas com este mesmo e-mail. Assim que sua primeira experiência for confirmada, seu código pessoal Compartilhe GIA será ativado para você ganhar créditos em futuros passeios.',
      bookNow: 'Explorar experiências e reservar',
      program: 'Programa Compartilhe GIA',
      credits: 'Créditos e descontos acumulados',
    },
  }[language];

  // Handle Account Registration
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    if (!regForm.firstName.trim() || !regForm.lastName.trim() || !regForm.email.trim() || !regForm.password.trim()) {
      setAuthError(language === 'es' ? 'Por favor completa todos los campos obligatorios.' : 'Please fill in all required fields.');
      return;
    }
    if (!regForm.email.includes('@')) {
      setAuthError(language === 'es' ? 'Ingresa un correo electrónico válido.' : 'Please enter a valid email address.');
      return;
    }
    if (regForm.password.length < 4) {
      setAuthError(language === 'es' ? 'La contraseña debe tener al menos 4 caracteres.' : 'Password must be at least 4 characters.');
      return;
    }

    const res = register({
      firstName: regForm.firstName,
      lastName: regForm.lastName,
      email: regForm.email,
      password: regForm.password,
      phone: regForm.phone || '+503 7000-0000',
      country: regForm.country || 'El Salvador',
      avatarUrl: regForm.avatarUrl || undefined,
    });

    if (res.success) {
      setSuccessMsg(language === 'es' ? '¡Cuenta creada con éxito! Bienvenido a GIA Experiences.' : 'Account created successfully! Welcome to GIA Experiences.');
      setTimeout(() => setSuccessMsg(''), 3500);
    } else {
      setAuthError(res.error || (language === 'es' ? 'Error al crear la cuenta.' : 'Failed to create account.'));
    }
  };

  // Handle Account Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    if (!loginForm.email.trim() || !loginForm.password.trim()) {
      setAuthError(language === 'es' ? 'Ingresa tu correo y contraseña.' : 'Enter your email and password.');
      return;
    }

    const res = login({
      email: loginForm.email,
      password: loginForm.password,
    });

    if (res.success) {
      setSuccessMsg(language === 'es' ? 'Sesión iniciada correctamente.' : 'Logged in successfully.');
      setTimeout(() => setSuccessMsg(''), 3000);
    } else {
      setAuthError(res.error || (language === 'es' ? 'Credenciales incorrectas.' : 'Invalid credentials.'));
    }
  };

  // Handle Profile Update
  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    if (!editForm.firstName.trim() || !editForm.lastName.trim() || !editForm.email.trim()) {
      setAuthError(language === 'es' ? 'Nombre, apellido y correo son obligatorios.' : 'First name, last name, and email are required.');
      return;
    }

    saveProfile({
      firstName: editForm.firstName,
      lastName: editForm.lastName,
      email: editForm.email,
      phone: editForm.phone,
      country: editForm.country,
      avatarUrl: editForm.avatarUrl || undefined,
    });

    setEditing(false);
    setSuccessMsg(language === 'es' ? 'Perfil actualizado con éxito.' : 'Profile updated successfully.');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  // Handle Delete Account
  const handleDeleteAccount = () => {
    deleteAccount();
    setShowDeleteModal(false);
    setSuccessMsg(language === 'es' ? 'Tu cuenta ha sido eliminada permanentemente.' : 'Your account has been permanently deleted.');
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const existingUsers = accountService.getAllUsers();

  return (
    <div className="bg-neutral-50/70 min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Back navigation */}
        <div>
          <BackButton
            fallbackPath="/"
            label={language === 'es' ? 'Volver al inicio' : 'Back to Home'}
          />
        </div>

        {/* Header */}
        <header>
          <span className="text-xs font-mono font-bold text-teal-800 uppercase tracking-wider">{copy.eyebrow}</span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-display mt-1">{copy.title}</h1>
          <p className="text-sm text-neutral-600 mt-2">{copy.subtitle}</p>
        </header>

        {/* Global Success Banner */}
        {successMsg && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-semibold flex items-center gap-3 animate-in fade-in duration-200">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* ======================================================== */}
        {/* GUEST VIEW: REGISTER OR LOGIN TABS                       */}
        {/* ======================================================== */}
        {!profile ? (
          <div className="bg-white rounded-3xl border border-neutral-200/90 shadow-sm p-6 sm:p-10 space-y-6">
            {/* Tabs */}
            <div className="flex border-b border-neutral-200 gap-4">
              <button
                type="button"
                onClick={() => {
                  setAuthMode('register');
                  setAuthError('');
                }}
                className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
                  authMode === 'register'
                    ? 'border-[#00A6A6] text-[#00A6A6]'
                    : 'border-transparent text-neutral-500 hover:text-neutral-800'
                }`}
              >
                <UserPlus className="w-4 h-4" />
                <span>{copy.tabRegister}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setAuthMode('login');
                  setAuthError('');
                }}
                className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
                  authMode === 'login'
                    ? 'border-[#00A6A6] text-[#00A6A6]'
                    : 'border-transparent text-neutral-500 hover:text-neutral-800'
                }`}
              >
                <LogIn className="w-4 h-4" />
                <span>{copy.tabLogin}</span>
              </button>
            </div>

            {/* Error Message */}
            {authError && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{authError}</span>
              </div>
            )}

            {/* TAB 1: CREATE ACCOUNT */}
            {authMode === 'register' && (
              <form onSubmit={handleRegister} className="space-y-6">
                {/* Profile Photo Uploader */}
                <div className="p-4 rounded-2xl bg-neutral-50/80 border border-neutral-200/80">
                  <label className="block text-xs font-bold text-neutral-800 mb-2">
                    {copy.avatarLabel}
                  </label>
                  <AvatarUploader
                    currentAvatar={regForm.avatarUrl}
                    onSelectAvatar={(url) => setRegForm({ ...regForm, avatarUrl: url })}
                    language={language}
                  />
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      {copy.firstName} *
                    </label>
                    <input
                      type="text"
                      required
                      value={regForm.firstName}
                      onChange={(e) => setRegForm({ ...regForm, firstName: e.target.value })}
                      placeholder={language === 'es' ? 'Ej. Sofía' : 'E.g. Sophia'}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-neutral-200 bg-neutral-50 focus:bg-white focus:ring-2 focus:ring-teal-700 outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      {copy.lastName} *
                    </label>
                    <input
                      type="text"
                      required
                      value={regForm.lastName}
                      onChange={(e) => setRegForm({ ...regForm, lastName: e.target.value })}
                      placeholder={language === 'es' ? 'Ej. Rodríguez' : 'E.g. Rodriguez'}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-neutral-200 bg-neutral-50 focus:bg-white focus:ring-2 focus:ring-teal-700 outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      {copy.email} *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3.5 top-3 text-neutral-400" />
                      <input
                        type="email"
                        required
                        value={regForm.email}
                        onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                        placeholder="tu-correo@ejemplo.com"
                        className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-neutral-200 bg-neutral-50 focus:bg-white focus:ring-2 focus:ring-teal-700 outline-hidden"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      {copy.password} *
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 absolute left-3.5 top-3 text-neutral-400" />
                      <input
                        type="password"
                        required
                        minLength={4}
                        value={regForm.password}
                        onChange={(e) => setRegForm({ ...regForm, password: e.target.value })}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-neutral-200 bg-neutral-50 focus:bg-white focus:ring-2 focus:ring-teal-700 outline-hidden"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      {copy.phone}
                    </label>
                    <input
                      type="tel"
                      value={regForm.phone}
                      onChange={(e) => setRegForm({ ...regForm, phone: e.target.value })}
                      placeholder="+503 7000-0000"
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-neutral-200 bg-neutral-50 focus:bg-white focus:ring-2 focus:ring-teal-700 outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      {copy.country}
                    </label>
                    <input
                      type="text"
                      value={regForm.country}
                      onChange={(e) => setRegForm({ ...regForm, country: e.target.value })}
                      placeholder={language === 'es' ? 'Ej. El Salvador, EE.UU., México...' : 'E.g. El Salvador, USA...'}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-neutral-200 bg-neutral-50 focus:bg-white focus:ring-2 focus:ring-teal-700 outline-hidden"
                    />
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3.5 bg-[#00A6A6] hover:bg-[#008f8f] active:scale-98 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>{copy.createBtn}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAuthMode('login')}
                    className="text-xs text-neutral-600 hover:text-[#00A6A6] font-semibold cursor-pointer"
                  >
                    {copy.alreadyHaveAccount} <span className="text-[#00A6A6] underline">{copy.tabLogin}</span>
                  </button>
                </div>
              </form>
            )}

            {/* TAB 2: LOG IN */}
            {authMode === 'login' && (
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      {copy.email} *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3.5 top-3 text-neutral-400" />
                      <input
                        type="email"
                        required
                        value={loginForm.email}
                        onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                        placeholder="tu-correo@ejemplo.com"
                        className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-neutral-200 bg-neutral-50 focus:bg-white focus:ring-2 focus:ring-teal-700 outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      {copy.password} *
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 absolute left-3.5 top-3 text-neutral-400" />
                      <input
                        type="password"
                        required
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-neutral-200 bg-neutral-50 focus:bg-white focus:ring-2 focus:ring-teal-700 outline-hidden"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3.5 bg-slate-900 hover:bg-slate-800 active:scale-98 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>{copy.loginBtn}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAuthMode('register')}
                    className="text-xs text-neutral-600 hover:text-[#00A6A6] font-semibold cursor-pointer"
                  >
                    {copy.noAccountYet} <span className="text-[#00A6A6] underline">{copy.tabRegister}</span>
                  </button>
                </div>

                {/* If there are previously registered users on this device, show quick-select */}
                {existingUsers.length > 0 && (
                  <div className="mt-6 pt-5 border-t border-neutral-100 space-y-2">
                    <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider block">
                      {copy.registeredOnDevice}
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {existingUsers.map((u) => (
                        <button
                          key={u.id}
                          type="button"
                          onClick={() => {
                            setLoginForm({ email: u.email, password: u.password });
                          }}
                          className="text-left p-2.5 rounded-xl border border-neutral-200 hover:border-teal-500 hover:bg-teal-50/40 flex items-center gap-3 transition-colors cursor-pointer group"
                        >
                          <div className="w-9 h-9 rounded-full overflow-hidden bg-neutral-200 shrink-0 border border-neutral-300">
                            {u.avatarUrl ? (
                              <img src={u.avatarUrl} alt={u.firstName} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center font-bold text-xs text-neutral-600">
                                {u.firstName.charAt(0)}
                              </div>
                            )}
                          </div>
                          <div className="overflow-hidden">
                            <span className="text-xs font-bold text-neutral-900 block truncate group-hover:text-teal-800">
                              {u.firstName} {u.lastName}
                            </span>
                            <span className="text-[11px] text-neutral-500 block truncate">
                              {u.email}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </form>
            )}

            <div className="mt-5 pt-4 border-t border-neutral-100 flex items-start gap-2 text-[11px] text-neutral-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{copy.localNote}</span>
            </div>
          </div>
        ) : (
          /* ======================================================== */
          /* LOGGED IN USER VIEW                                      */
          /* ======================================================== */
          <div className="space-y-8">
            {/* Profile Overview Card */}
            <section className="bg-white rounded-3xl border border-neutral-200 p-6 sm:p-8 shadow-xs">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-neutral-100">
                {/* Avatar and user details */}
                <div className="flex items-center gap-4">
                  <div className="relative group">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-teal-500 shadow-md bg-teal-50 flex items-center justify-center">
                      {profile.avatarUrl ? (
                        <img
                          src={profile.avatarUrl}
                          alt={`${profile.firstName} ${profile.lastName}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <UserCircle className="w-10 h-10 text-teal-700" />
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowAvatarModal(true)}
                      className="absolute bottom-0 right-0 p-1.5 bg-[#00A6A6] text-white rounded-full shadow hover:bg-teal-700 transition-transform active:scale-95 cursor-pointer"
                      title={copy.changePhoto}
                    >
                      <Camera className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display">
                        {profile.firstName} {profile.lastName}
                      </h2>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                        {language === 'es' ? 'Cuenta activa' : 'Active account'}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-500 mt-0.5">{profile.email}</p>
                    <p className="text-[11px] text-neutral-400 mt-1">
                      {profile.phone} · {profile.country}
                    </p>
                  </div>
                </div>

                {/* Edit / Actions */}
                <div className="flex flex-wrap items-center gap-2">
                  {!editing ? (
                    <button
                      type="button"
                      onClick={() => setEditing(true)}
                      className="px-4 py-2 rounded-xl border border-neutral-200 hover:bg-neutral-50 text-xs font-bold text-neutral-800 flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Pencil className="w-3.5 h-3.5 text-teal-700" />
                      <span>{copy.editBtn}</span>
                    </button>
                  ) : null}

                  <button
                    type="button"
                    onClick={logout}
                    className="px-4 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-xs font-bold text-neutral-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>{copy.logoutBtn}</span>
                  </button>
                </div>
              </div>

              {/* Edit form inline */}
              {editing ? (
                <form onSubmit={handleUpdateProfile} className="mt-6 space-y-4">
                  <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80">
                    <label className="block text-xs font-bold text-neutral-800 mb-2">
                      {copy.avatarLabel}
                    </label>
                    <AvatarUploader
                      currentAvatar={editForm.avatarUrl}
                      onSelectAvatar={(url) => setEditForm({ ...editForm, avatarUrl: url })}
                      language={language}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">
                        {copy.firstName}
                      </label>
                      <input
                        type="text"
                        required
                        value={editForm.firstName}
                        onChange={(e) => setEditForm({ ...editForm, firstName: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-neutral-200 bg-neutral-50 focus:bg-white focus:ring-2 focus:ring-teal-700 outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">
                        {copy.lastName}
                      </label>
                      <input
                        type="text"
                        required
                        value={editForm.lastName}
                        onChange={(e) => setEditForm({ ...editForm, lastName: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-neutral-200 bg-neutral-50 focus:bg-white focus:ring-2 focus:ring-teal-700 outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">
                        {copy.phone}
                      </label>
                      <input
                        type="tel"
                        value={editForm.phone}
                        onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-neutral-200 bg-neutral-50 focus:bg-white focus:ring-2 focus:ring-teal-700 outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">
                        {copy.country}
                      </label>
                      <input
                        type="text"
                        value={editForm.country}
                        onChange={(e) => setEditForm({ ...editForm, country: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-neutral-200 bg-neutral-50 focus:bg-white focus:ring-2 focus:ring-teal-700 outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-[#00A6A6] text-white text-xs font-bold rounded-xl flex items-center gap-2 hover:bg-teal-700 cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>{copy.saveBtn}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditing(false)}
                      className="px-5 py-2.5 bg-neutral-100 text-neutral-700 text-xs font-bold rounded-xl cursor-pointer hover:bg-neutral-200"
                    >
                      {copy.cancelBtn}
                    </button>
                  </div>
                </form>
              ) : null}

              {/* Profile Details Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-2 text-xs">
                <div>
                  <span className="text-neutral-400 block mb-0.5">{copy.email}</span>
                  <strong className="text-neutral-800 break-all">{profile.email}</strong>
                </div>
                <div>
                  <span className="text-neutral-400 block mb-0.5">{copy.phone}</span>
                  <strong className="text-neutral-800">{profile.phone || '-'}</strong>
                </div>
                <div>
                  <span className="text-neutral-400 block mb-0.5">{copy.country}</span>
                  <strong className="text-neutral-800">{profile.country || '-'}</strong>
                </div>
                <div>
                  <span className="text-neutral-400 block mb-0.5">{copy.reservationCount}</span>
                  <strong className="text-[#00A6A6] font-mono font-bold text-sm">{bookingCount}</strong>
                </div>
              </div>
            </section>

            {/* Quick Navigation Cards */}
            <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button
                type="button"
                onClick={() => navigate('/mis-reservas')}
                className="text-left bg-white rounded-2xl border border-neutral-200 p-5 hover:border-teal-400 transition-all shadow-2xs group cursor-pointer"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#00A6A6] flex items-center justify-center group-hover:scale-105 transition-transform">
                    <CalendarCheck className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono font-bold text-neutral-400">
                    {bookingCount} {language === 'es' ? 'totales' : 'total'}
                  </span>
                </div>
                <strong className="block text-slate-900 group-hover:text-[#00A6A6] transition-colors">
                  {copy.reservations}
                </strong>
                <span className="text-xs text-neutral-500 mt-1 block">
                  {copy.viewReservations}
                </span>
              </button>

              <button
                type="button"
                onClick={() => navigate('/mis-favoritos')}
                className="text-left bg-white rounded-2xl border border-neutral-200 p-5 hover:border-rose-400 transition-all shadow-2xs group cursor-pointer"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Heart className="w-5 h-5 fill-rose-500" />
                  </div>
                  <span className="text-xs font-mono font-bold text-rose-600">
                    {favorites.length} {language === 'es' ? 'guardadas' : 'saved'}
                  </span>
                </div>
                <strong className="block text-slate-900 group-hover:text-rose-600 transition-colors">
                  {language === 'es' ? 'Mis Favoritos' : 'My Favorites'}
                </strong>
                <span className="text-xs text-neutral-500 mt-1 block">
                  {language === 'es' ? 'Experiencias guardadas con corazón' : 'Saved favorite tours'}
                </span>
              </button>

              <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-2xs">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center">
                    <Gift className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono font-bold text-amber-600">
                    ${referralState.creditsBalance} USD
                  </span>
                </div>
                <strong className="block text-slate-900">{copy.program}</strong>
                <span className="text-xs text-neutral-500 mt-1 block">{copy.credits}</span>
              </div>
            </section>

            {/* Referral / Share GIA Section */}
            {referralState.currentCode ? (
              <div className="space-y-6">
                <ReferralCard state={referralState} />
                <GiaCreditsCard
                  balance={referralState.creditsBalance}
                  transactions={referralState.transactions}
                />
              </div>
            ) : (
              <section className="rounded-3xl bg-slate-950 text-white p-7 sm:p-9 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="max-w-2xl">
                  <Gift className="w-8 h-8 text-amber-400 mb-4" />
                  <h2 className="text-2xl font-black font-display">{copy.lockedTitle}</h2>
                  <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                    {copy.lockedText}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => navigate('/experiencias')}
                  className="px-5 py-3 bg-[#00A6A6] text-white hover:bg-[#008f8f] text-xs font-black rounded-xl shrink-0 cursor-pointer shadow-md"
                >
                  {copy.bookNow}
                </button>
              </section>
            )}

            {/* DANGER ZONE: DELETE ACCOUNT */}
            <section className="bg-white rounded-3xl border border-rose-200 p-6 sm:p-8 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-bold text-rose-900 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                    <span>{language === 'es' ? 'Zona de cuenta y privacidad' : 'Account & Privacy Zone'}</span>
                  </h3>
                  <p className="text-xs text-neutral-500 mt-1">
                    {language === 'es'
                      ? 'Si ya no deseas utilizar este servicio, puedes borrar definitivamente tu cuenta de este dispositivo.'
                      : 'If you no longer wish to use this service, you can permanently delete your account from this device.'}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowDeleteModal(true)}
                  className="px-4 py-2.5 rounded-xl border border-rose-300 text-rose-700 hover:bg-rose-50 text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>{copy.deleteBtn}</span>
                </button>
              </div>
            </section>
          </div>
        )}

        {/* ======================================================== */}
        {/* MODAL: QUICK AVATAR PICKER                               */}
        {/* ======================================================== */}
        {showAvatarModal && profile && (
          <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Camera className="w-5 h-5 text-teal-700" />
                  <span>{copy.changePhoto}</span>
                </h3>
                <button
                  type="button"
                  onClick={() => setShowAvatarModal(false)}
                  className="p-1 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <AvatarUploader
                currentAvatar={profile.avatarUrl}
                onSelectAvatar={(url) => {
                  updateAvatar(url);
                  setShowAvatarModal(false);
                  setSuccessMsg(language === 'es' ? 'Foto de perfil actualizada.' : 'Profile photo updated.');
                  setTimeout(() => setSuccessMsg(''), 2500);
                }}
                language={language}
              />

              <div className="pt-2 text-right">
                <button
                  type="button"
                  onClick={() => setShowAvatarModal(false)}
                  className="px-4 py-2 rounded-xl bg-neutral-100 text-neutral-700 text-xs font-bold hover:bg-neutral-200 cursor-pointer"
                >
                  {copy.cancelBtn}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* MODAL: DELETE ACCOUNT CONFIRMATION                       */}
        {/* ======================================================== */}
        {showDeleteModal && (
          <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-rose-200 animate-in zoom-in-95 duration-150">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
                <Trash2 className="w-6 h-6" />
              </div>

              <div className="text-center space-y-2">
                <h3 className="text-lg font-black text-slate-900 font-display">
                  {copy.deleteConfirmTitle}
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  {copy.deleteConfirmText}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleDeleteAccount}
                  className="flex-1 px-4 py-3 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-sm"
                >
                  {copy.deleteConfirmBtn}
                </button>
                <button
                  type="button"
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  {copy.cancelBtn}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
