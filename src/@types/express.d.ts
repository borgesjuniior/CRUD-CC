// Incluindo a tipagem userId no Resquest do express

declare namespace Express {
  export interface Request {
    userId: string;
  }
}
