import { ISubcategory } from "app/isubcategory";

export interface ICategory {
  id:string;
  name:string;
  weblink:string;
  subcategories: ISubcategory[][];
}