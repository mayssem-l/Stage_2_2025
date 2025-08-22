export interface User {
  userId?: number;
  username?: string;
  firstname?: string;
  lastname?: string;
  name?: string; // tu peux soit supprimer ça, soit le garder si tu l'utilises ailleurs
  email?: string;
  role?: string;
  password?: string; // facultatif (explication ci-dessous)
}
