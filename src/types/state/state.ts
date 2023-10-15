import { IcategoryInitialState } from "../../slices/categorySlice";
import { conditionnementInitialState } from "../../slices/conditionnementSlice";
import { uniteVenteInitialState } from "../../slices/uniteVenteSlice";
import { IpersonneInitialState } from "../../slices/personneSlice";
import { IroleInitialState } from "../../slices/roleSlice";
import { articleInitialState } from "../../slices/articleSlice";

export default interface Istate {
  personnes: IpersonneInitialState;
  roles: IroleInitialState;
  categories: IcategoryInitialState;
  conditionnements: conditionnementInitialState;
  uniteVentes: uniteVenteInitialState;
  articles: articleInitialState;
}
