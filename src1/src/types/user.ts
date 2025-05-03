export interface Register {
    id?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    gender?: string;
    dob?: Date;
    city?: string;
    phoneNumber?: number;
    password?: string;
    detail?: string;
    idNo?: string;
    expiry?: Date;
    bank?: string;
    holder?: string;
    code?: string;
    account?: number;
    branch?: string;
  }
  
  export interface User {
    id: number,
    name: string,
    role: string,
    designation:string,
    branch: string,
    mobileNumber: number,
    email: string,
    address: string,
    image:string,
    status:string
  }
  