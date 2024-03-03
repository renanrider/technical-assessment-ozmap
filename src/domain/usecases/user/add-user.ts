export interface AddUser {
  add: (addUserParams: AddUserParams) => Promise<AddUserResult | null>;
}

export type AddUserParams = {
  id?: string;
  name: string;
  email: string;
  address?: string;
  coordinates?: number[];
};

export type AddUserResult = {
  id?: string;
  name: string;
  email: string;
  address?: string;
  coordinates?: number[];
};
