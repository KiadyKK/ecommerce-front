import Ipersonne1 from "../types/personne/personne1";
import { AES, enc } from "crypto-js";

export const clear = (): void => {
  localStorage.clear();
};

export const saveUser = (data: any): void => {
  clear();
  console.log(data)
  const { personne, token }: { personne: Ipersonne1; token: string } = data;
  localStorage.setItem(
    "id",
    AES.encrypt(personne.id!.toString(), "MYKEY4DEMO").toString()
  );
  localStorage.setItem(
    "username",
    AES.encrypt(personne.username!, "MYKEY4DEMO").toString()
  );
  localStorage.setItem(
    "email",
    AES.encrypt(personne.email!, "MYKEY4DEMO").toString()
  );
  localStorage.setItem(
    "role",
    AES.encrypt(personne.role!.role, "MYKEY4DEMO").toString()
  );
  localStorage.setItem("token", AES.encrypt(token, "MYKEY4DEMO").toString());
};

export const getItem = (key: string): string | null => {
  const item = localStorage.getItem(key) ? localStorage.getItem(key) : false;
  if (item) {
    const decrypted = AES.decrypt(item, "MYKEY4DEMO");
    const decryptedString = decrypted.toString(enc.Utf8);
    return decryptedString;
  }

  return null;
};
