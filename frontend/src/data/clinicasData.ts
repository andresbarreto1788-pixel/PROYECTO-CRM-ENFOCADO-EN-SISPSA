// ─── SISPSA Affiliated Clinics Database ───
// Geographic hierarchy: Estado → Ciudad → Clínicas Afiliadas

export interface Clinica {
  id: string;
  nombre: string;
  direccion: string;
  telefono: string;
  especialidades: string[];
}

export interface Ciudad {
  nombre: string;
  clinicas: Clinica[];
}

export interface Estado {
  nombre: string;
  ciudades: Ciudad[];
}

export const estadosVenezuela: Estado[] = [
  {
    nombre: 'Distrito Capital',
    ciudades: [
      {
        nombre: 'Caracas',
        clinicas: [
          {
            id: 'cc-trinidad',
            nombre: 'Centro Clínico La Trinidad',
            direccion: 'Av. Intercomunal de El Hatillo, Urb. La Trinidad',
            telefono: '(0212) 942-6100',
            especialidades: ['Medicina General', 'Pediatría', 'Cardiología', 'Traumatología'],
          },
          {
            id: 'policlinica-metro',
            nombre: 'Policlínica Metropolitana',
            direccion: 'Calle A-1, Urb. Caurimare, El Cafetal',
            telefono: '(0212) 908-0100',
            especialidades: ['Medicina Interna', 'Cirugía', 'Ginecología', 'Neurología'],
          },
          {
            id: 'clinica-avila',
            nombre: 'Clínica El Ávila',
            direccion: 'Av. San Juan Bosco, Altamira',
            telefono: '(0212) 276-1000',
            especialidades: ['Emergencias 24h', 'Oncología', 'Urología', 'Oftalmología'],
          },
          {
            id: 'cmc-caracas',
            nombre: 'Centro Médico de Caracas',
            direccion: 'Esq. Sociedad a San Nicolás, San Bernardino',
            telefono: '(0212) 555-9111',
            especialidades: ['Medicina General', 'Laboratorio', 'Imagenología', 'Pediatría'],
          },
        ],
      },
    ],
  },
  {
    nombre: 'Miranda',
    ciudades: [
      {
        nombre: 'Los Teques',
        clinicas: [
          {
            id: 'cm-losteques',
            nombre: 'Centro Médico Los Teques',
            direccion: 'Av. Bolívar, Los Teques',
            telefono: '(0212) 321-4500',
            especialidades: ['Medicina General', 'Pediatría', 'Ginecología'],
          },
        ],
      },
      {
        nombre: 'Guarenas',
        clinicas: [
          {
            id: 'policlinica-guarenas',
            nombre: 'Policlínica Guarenas',
            direccion: 'Av. Intercomunal Guarenas-Guatire',
            telefono: '(0212) 362-1800',
            especialidades: ['Emergencias', 'Medicina Interna', 'Traumatología'],
          },
        ],
      },
      {
        nombre: 'Baruta',
        clinicas: [
          {
            id: 'clinica-baruta',
            nombre: 'Clínica Santa Sofía',
            direccion: 'Av. Principal de Santa Sofía, Baruta',
            telefono: '(0212) 986-5500',
            especialidades: ['Cardiología', 'Dermatología', 'Laboratorio'],
          },
        ],
      },
    ],
  },
  {
    nombre: 'Zulia',
    ciudades: [
      {
        nombre: 'Maracaibo',
        clinicas: [
          {
            id: 'cm-paraiso',
            nombre: 'Centro Médico El Paraíso',
            direccion: 'Av. El Milagro, Sector Paraíso',
            telefono: '(0261) 759-1111',
            especialidades: ['Medicina General', 'Cirugía', 'Pediatría', 'Traumatología'],
          },
          {
            id: 'policlinica-amado',
            nombre: 'Policlínica Amado',
            direccion: 'Av. 3F, Sector La Lago',
            telefono: '(0261) 722-3344',
            especialidades: ['Medicina Interna', 'Cardiología', 'Neurología'],
          },
        ],
      },
      {
        nombre: 'Cabimas',
        clinicas: [
          {
            id: 'clinica-cabimas',
            nombre: 'Clínica Cabimas',
            direccion: 'Av. Intercomunal, Cabimas',
            telefono: '(0264) 241-5678',
            especialidades: ['Emergencias', 'Medicina General', 'Laboratorio'],
          },
        ],
      },
    ],
  },
  {
    nombre: 'Carabobo',
    ciudades: [
      {
        nombre: 'Valencia',
        clinicas: [
          {
            id: 'cm-valencia',
            nombre: 'Centro Médico Valencia',
            direccion: 'Av. Bolívar Norte, Valencia',
            telefono: '(0241) 824-6000',
            especialidades: ['Medicina General', 'Pediatría', 'Ginecología', 'Cardiología'],
          },
          {
            id: 'policlinica-valencia',
            nombre: 'Policlínica La Viña',
            direccion: 'Urb. La Viña, Valencia',
            telefono: '(0241) 842-7700',
            especialidades: ['Cirugía', 'Traumatología', 'Oncología'],
          },
        ],
      },
      {
        nombre: 'Puerto Cabello',
        clinicas: [],
      },
    ],
  },
  {
    nombre: 'Aragua',
    ciudades: [
      {
        nombre: 'Maracay',
        clinicas: [
          {
            id: 'cm-maracay',
            nombre: 'Centro Médico de Maracay',
            direccion: 'Av. Constitución, Maracay',
            telefono: '(0243) 246-3200',
            especialidades: ['Medicina General', 'Laboratorio', 'Imagenología'],
          },
        ],
      },
      {
        nombre: 'Turmero',
        clinicas: [],
      },
    ],
  },
  {
    nombre: 'Lara',
    ciudades: [
      {
        nombre: 'Barquisimeto',
        clinicas: [
          {
            id: 'cm-barquisimeto',
            nombre: 'Centro Médico de Barquisimeto',
            direccion: 'Av. Lara, Barquisimeto',
            telefono: '(0251) 252-8000',
            especialidades: ['Medicina General', 'Pediatría', 'Cardiología'],
          },
          {
            id: 'clinica-razetti-bqto',
            nombre: 'Clínica Razetti de Barquisimeto',
            direccion: 'Carrera 17, Barquisimeto',
            telefono: '(0251) 231-4455',
            especialidades: ['Cirugía', 'Traumatología', 'Ginecología'],
          },
        ],
      },
    ],
  },
  {
    nombre: 'Bolívar',
    ciudades: [
      {
        nombre: 'Ciudad Bolívar',
        clinicas: [
          {
            id: 'cm-cbolivar',
            nombre: 'Centro Médico Orinoco',
            direccion: 'Av. Táchira, Ciudad Bolívar',
            telefono: '(0285) 632-7100',
            especialidades: ['Medicina General', 'Emergencias', 'Laboratorio'],
          },
        ],
      },
      {
        nombre: 'Puerto Ordaz',
        clinicas: [
          {
            id: 'clinica-chilemex',
            nombre: 'Clínica Chilemex',
            direccion: 'Av. Las Américas, Puerto Ordaz',
            telefono: '(0286) 961-2233',
            especialidades: ['Medicina Interna', 'Pediatría', 'Cirugía'],
          },
        ],
      },
    ],
  },
  {
    nombre: 'Táchira',
    ciudades: [
      {
        nombre: 'San Cristóbal',
        clinicas: [
          {
            id: 'cm-tachira',
            nombre: 'Centro Clínico San Cristóbal',
            direccion: 'Av. Libertador, San Cristóbal',
            telefono: '(0276) 356-7800',
            especialidades: ['Medicina General', 'Cardiología', 'Neurología'],
          },
        ],
      },
    ],
  },
  {
    nombre: 'Mérida',
    ciudades: [
      {
        nombre: 'Mérida',
        clinicas: [
          {
            id: 'cm-merida',
            nombre: 'Centro Médico de Mérida',
            direccion: 'Av. Urdaneta, Mérida',
            telefono: '(0274) 263-5500',
            especialidades: ['Medicina General', 'Pediatría', 'Laboratorio'],
          },
        ],
      },
    ],
  },
  {
    nombre: 'Anzoátegui',
    ciudades: [
      {
        nombre: 'Barcelona',
        clinicas: [
          {
            id: 'cm-barcelona',
            nombre: 'Centro Médico de Barcelona',
            direccion: 'Av. Fuerzas Armadas, Barcelona',
            telefono: '(0281) 277-4400',
            especialidades: ['Emergencias', 'Medicina Interna', 'Traumatología'],
          },
        ],
      },
      {
        nombre: 'Puerto La Cruz',
        clinicas: [],
      },
    ],
  },
  {
    nombre: 'Nueva Esparta',
    ciudades: [
      {
        nombre: 'Porlamar',
        clinicas: [],
      },
    ],
  },
  {
    nombre: 'Falcón',
    ciudades: [
      {
        nombre: 'Coro',
        clinicas: [],
      },
      {
        nombre: 'Punto Fijo',
        clinicas: [],
      },
    ],
  },
];

// ─── Plans Data ───
export interface Plan {
  id: string;
  nombre: string;
  precio: number;
  color: string;
  colorBg: string;
  destacado: boolean;
  etiqueta?: string;
  beneficios: string[];
}

export const planes: Plan[] = [
  {
    id: 'bronce',
    nombre: 'Bronce',
    precio: 20,
    color: '#92400E',
    colorBg: 'rgba(146, 64, 14, 0.08)',
    destacado: false,
    beneficios: [
      'Consultas médicas generales',
      'Emergencias básicas',
      'Laboratorio clínico',
      'Descuento en farmacias',
    ],
  },
  {
    id: 'plata',
    nombre: 'Plata',
    precio: 25,
    color: '#475569',
    colorBg: 'rgba(71, 85, 105, 0.08)',
    destacado: false,
    beneficios: [
      'Todo lo del Plan Bronce',
      'Consultas especializadas',
      'Imagenología básica',
      'Hospitalización programada',
    ],
  },
  {
    id: 'oro',
    nombre: 'Oro',
    precio: 29,
    color: '#B45309',
    colorBg: 'rgba(245, 158, 11, 0.08)',
    destacado: true,
    etiqueta: 'Más Popular',
    beneficios: [
      'Todo lo del Plan Plata',
      'Cobertura dental básica',
      'Atención pediátrica',
      'Maternidad programada',
      'Red ampliada de clínicas',
    ],
  },
  {
    id: 'esmeralda-basico',
    nombre: 'Esmeralda Básico',
    precio: 28,
    color: '#059669',
    colorBg: 'rgba(16, 185, 129, 0.08)',
    destacado: false,
    beneficios: [
      'Cobertura nacional completa',
      'Consultas ilimitadas',
      'Laboratorio e imagenología',
      'Hospitalización de emergencia',
      'Cirugías ambulatorias',
    ],
  },
  {
    id: 'esmeralda-plus',
    nombre: 'Esmeralda Plus',
    precio: 34,
    color: '#047857',
    colorBg: 'rgba(4, 120, 87, 0.08)',
    destacado: false,
    beneficios: [
      'Todo lo del Esmeralda Básico',
      'Cobertura dental completa',
      'Cirugías programadas',
      'Maternidad integral',
      'Segundo opinión médica',
      'Telemedicina 24/7',
    ],
  },
  {
    id: 'diamante',
    nombre: 'Diamante',
    precio: 39,
    color: '#1E40AF',
    colorBg: 'rgba(30, 64, 175, 0.08)',
    destacado: false,
    etiqueta: 'Premium',
    beneficios: [
      'Cobertura total sin límites',
      'Red internacional de clínicas',
      'Chequeo ejecutivo anual',
      'Cirugías de alta complejidad',
      'Prótesis y órtesis',
      'Asistencia en viajes',
      'Concierge médico personal',
    ],
  },
];
