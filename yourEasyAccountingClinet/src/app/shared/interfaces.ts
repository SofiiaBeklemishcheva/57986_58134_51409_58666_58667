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
  //Dodane później
  deliveryMethod: string;
  reciver: string;
  payer: string;
  seller: string;
  assName: string;
  assQty: number;
  assjm: string;
  issuedBy: string;
  recived: string;
  comments: string;
  payDate: Date;
}

export interface User {
  ID: number;
  albumId: number;
  name: string;
  surname: string;
  nickname: string;
  access: number;
}

export interface Vendor {
  ID: number;
  name: string;
  NIP: string;
  address: string;
  phone: string;
  comments: string;
}
