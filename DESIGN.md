# DESIGN SYSTEM — Red Empresarial SISPSA CRM

## Identidad de Marca

**SISPSA** (Servicios Integrales de Salud) es una empresa venezolana de seguros y servicios médicos.
**Red Empresarial** es el ecosistema CRM que conecta asesores, afiliados y clínicas aliadas.
**CON3XUZ** es el socio tecnológico que desarrolla y mantiene la plataforma.

---

## Assets de Marca

| Archivo | Uso | Ubicación |
|---|---|---|
| `sispsa-logo.svg` | Logo principal (fondo claro) | `frontend/public/` |
| `sispsa-logo-white.svg` | Logo invertido (fondo oscuro) | `frontend/public/` |
| `sispsa-bg-pattern.svg` | Fondo página principal / hero | `frontend/public/` |
| `sispsa-login-bg.svg` | Fondo página de login | `frontend/public/` |
| `favicon.svg` | Ícono de pestaña (CON3XUZ bolt) | `frontend/public/` |

### Logo SISPSA
- Escudo médico (cruz) + nombre SISPSA + tagline "RED EMPRESARIAL"
- Versión oscura: texto azul marino `#1E3A8A`
- Versión blanca: todo en blanco, para sidebars y fondos oscuros
- Altura mínima: 32px — no escalar por debajo

---

## Paleta de Colores

### Primarios
| Token | Hex | Uso |
|---|---|---|
| `primary` | `#1D4ED8` | Botones, links, acciones principales |
| `primary-dark` | `#1E40AF` | Hover de botones primarios |
| `sidebar` | `#0F172A` | Fondo del sidebar |

### Semánticos
| Token | Hex | Uso |
|---|---|---|
| `success` | `#10B981` | Afiliado activo, pago registrado |
| `warning` | `#F59E0B` | Pendiente de aprobación, vencimiento próximo |
| `danger` | `#EF4444` | Vencido, bloqueado, error |
| `whatsapp` | `#25D366` | Botones de WhatsApp |

### Neutros
| Token | Uso |
|---|---|
| `text-primary` | Texto principal |
| `text-muted` | Labels, subtítulos |
| `border` | Bordes de tarjetas e inputs |
| `canvas` | Fondo de filas en tabla (hover) |
| `surface` | Fondo de cards e inputs |

---

## Gradientes de Fondo

### Login / Páginas de acceso
```
background: linear-gradient(135deg, #0F172A 0%, #1E3A8A 60%, #1D4ED8 100%)
```

### Hero de Landing
```
background: linear-gradient(135deg, #0F172A 0%, #1E3A8A 45%, #1D4ED8 100%)
```
Combinar con overlay de `sispsa-bg-pattern.svg` en `opacity: 0.6`.

---

## Tipografía

| Nivel | Font | Peso | Tamaño |
|---|---|---|---|
| H1 Hero | Inter | 800 (ExtraBold) | 48–56px |
| H2 Sección | Inter | 700 (Bold) | 32–40px |
| H3 Card title | Inter | 600 (SemiBold) | 18–20px |
| Body | Inter | 400–500 | 14–16px |
| Label / Badge | Inter | 700 (Bold) | 10–12px, uppercase, tracking-widest |

---

## Planes de Salud SISPSA

| Plan | Color | Badge | Precio |
|---|---|---|---|
| Bronce | `text-amber-800` / `bg-amber-800/10` | 🟤 Bronce | $20/mes |
| Plata | `text-slate-600` / `bg-slate-500/10` | ⚪ Plata | $25/mes |
| Oro | `text-amber-600` / `bg-amber-500/10` | 🟡 Oro | $29/mes |
| Esmeralda Básico | `text-emerald-600` / `bg-emerald-500/10` | 🟢 Esmeralda Básico | $28/mes |
| Esmeralda Plus | `text-emerald-700` / `bg-emerald-600/10` | 🟢 Esmeralda Plus | $34/mes |
| Diamante | `text-blue-600` / `bg-blue-500/10` | 🔵 Diamante | $39/mes |

---

## Distribución de Ingresos (Modelo SISPSA)

```
70% → Clínica Aliada
15% → SISPSA
15% → Red Empresarial (CON3XUZ)
```

---

## Componentes Clave

### Pipeline — Etapas Kanban
| Etapa | ID | Color |
|---|---|---|
| Nuevo Prospecto | `nuevo` | `#60A5FA` (blue-400) |
| Propuesta Enviada | `propuesta` | `#3B82F6` (blue-500) |
| En Negociación | `negociacion` | `#F59E0B` (amber-500) |
| Esperando Pago | `esperando_pago` | `#10B981` (emerald-500) |
| Afiliación Exitosa | `afiliacion_exitosa` | `#059669` (emerald-600) |

### Estados de Afiliado
| Estado | Color token | Significado |
|---|---|---|
| Activo | `success` | Póliza vigente y al día |
| Pendiente | `warning` | Registro reciente, sin primer pago |
| Vencido | `danger` | Póliza vencida o suspendida |

### Roles de Usuario
| Rol | Acceso |
|---|---|
| `super_admin` | Todo el sistema + Master Control |
| `admin` | CRM + Gestión de Equipo |
| `supervisor` | CRM + vista de su zona |
| `vendedor` | Solo sus afiliados y prospectos |

---

## Patrones de Diseño en Uso

- **Cards**: `rounded-xl border border-border bg-white shadow-sm` (clase `.card-re`)
- **Inputs**: `rounded-lg border border-border bg-canvas px-3 py-2 focus:border-primary focus:ring-1`
- **Botón primario**: `rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark`
- **Badge de plan**: `inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium {bgClass} {colorClass}`
- **Animación entrada**: `animate-in fade-in slide-in-from-bottom-4 duration-500`

---

## Estructura de Rutas

| Ruta | Vista | Acceso |
|---|---|---|
| `/` | LandingPage | Público |
| `/login` | LoginView | Público |
| `/registro` | RegistroPage | Público |
| `/dashboard` | DashboardView | Autenticado |
| `/afiliados` | AfiliadosView | Autenticado |
| `/pipeline` | PipelineView | Autenticado |
| `/agenda` | AgendaView | Autenticado |
| `/academia` | AcademiaView | Autenticado |
| `/configuracion` | ConfiguracionView | Autenticado |
| `/equipo` | EquipoView | Admin + Super Admin |
| `/usuarios` | UsuariosView | Solo Super Admin |
| `/auditoria` | AuditoriaView | Solo Super Admin |

---

## Notas de Implementación

- **Storage**: Todo en `localStorage` (MVP). Migrar a Supabase/Firebase en producción.
- **Auth**: Super admin detectado por email (`@sispsa.com.ve`, `@con3xuz.com`, o emails específicos hardcodeados).
- **Import**: Soporta `.csv` y `.xlsx` — usar plantilla descargable desde AfiliadosView.
- **Notificaciones**: Contexto `NotificationContext` — sesión en memoria, no persisten al recargar.
- **Deploy**: Vercel + GitHub auto-deploy en push a `main`.
