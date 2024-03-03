export interface GetUser {
  get: (GetUserParams: GetUserParams) => Promise<GetUserResult | null>;
}

export type GetUserParams = {
  userId: string;
};

export type GetUserResult = {
  id?: string;
  name: string;
  email: string;
  address?: string;
  coordinates?: number[];
};
