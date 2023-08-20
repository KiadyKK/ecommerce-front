import Irole from "../role/role";

export default interface Ipersonne1 {
  id?: number;
  username?: string;
  email?: string;
  pending?: boolean;
  role?: Irole;
}
