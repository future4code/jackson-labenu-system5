export enum SPECIALTIES {
   REACT = 'REACT',
   REDUX = 'REDUX',
   CSS = 'CSS',
   TESTES = 'TESTES',
   TYPESCRIPT = 'TYPESCRIPT',
   POO = 'PROGRAMAÇÃO ORIENTADA A OBJETOS',
   BACKEND = 'BACKEND'
}

export type Teacher = {
   id: string,
   name: string,
   email: string,
   birthDate: string,
   specialties: SPECIALTIES[]
}