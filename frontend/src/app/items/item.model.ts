import { ItemLocation } from "./location";

export interface Item {
  _id?:string;
  itemType:string;
  postType:string;
  description:string;
  imageUrl:string;// to be converted to array
  address:string;
  firstName:string;
  lastName:string;
  email:string;
  phone: string
  location:ItemLocation;

}
