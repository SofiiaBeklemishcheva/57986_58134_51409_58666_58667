export interface Invoice {
  ID: number;
  invoiceNum: string;
  issueDate: Date;
  paymentMethod: string;
  currency: string;
  netPrice: number;
  VAT: number;
  issuerID: number;
  clientID: number;
  materialName: string; //Nazwa towaru
  amount: string;
  dueDate: Date;
  invoiceType: string;
  issuePlace: string;
}

export interface User {
  ID: number;
  albumId: number;
  name: string;
  surname: string;
  nickname: string;
  password: string;
  access: number;
}
