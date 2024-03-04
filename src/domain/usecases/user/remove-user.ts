export interface RemoveUser {
  remove: (
    RemoveUserParams: RemoveUserParams,
  ) => Promise<RemoveUserResult | null>;
}

export type RemoveUserParams = {
  userId: string;
};

export type RemoveUserResult = {
  id?: string;
  name: string;
  email: string;
  address?: string;
  coordinates?: number[];
};
