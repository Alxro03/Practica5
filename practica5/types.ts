export type comic = {
    id: string;
    titulo: string;
    descripcion: string;
    formato: string;
  };
  
  export type user = {
    id: string;
    nombre: string;
    correo: string;
    collecioncomics: collection;
  };

  export type collection = {
    id: string;
    nombre: string;
    comics: string[];
  }