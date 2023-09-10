import { IcategoryInitialState } from "../../slices/categorySlice";
import { IpersonneInitialState } from "../../slices/personneSlice";
import { IroleInitialState } from "../../slices/roleSlice";

export default interface Istate {
  personnes: IpersonneInitialState;
  roles: IroleInitialState;
  category: IcategoryInitialState;
}
