// Simula una API REST desde el frontend
export function obtenerRevistas() {
  return Promise.resolve([
    {
      id: 1,
      titulo: 'International Business Review',
      linea: 'negocios',
      indice: 'Scopus Q1',
      enlace: 'https://www.journals.elsevier.com/international-business-review',
    },

    {
      id: 2,
      titulo: 'Journal of Corporate Finance',
      linea: 'finanzas',
      indice: 'Scopus Q1',
      enlace: 'https://www.journals.elsevier.com/journal-of-corporate-finance',
    },
    {
      id: 3,
      titulo: 'Journal of Marketing',
      linea: 'marketing',
      indice: 'Scopus Q1',
      enlace: 'https://journals.sagepub.com/home/jmx',
    },
    {
      id: 4,
      titulo: 'Research Policy',
      linea: 'tecnologia',
      indice: 'Scopus Q1',
      enlace: 'https://www.journals.elsevier.com/research-policy',
    },
  ])
}
