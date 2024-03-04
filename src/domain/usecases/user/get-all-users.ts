export interface GetAllUsers {
  get(): Promise<GetAllUsersResult>;
}

export type GetAllUsersResult =
  | {
      id?: string;
      name: string;
      email: string;
      address?: string;
      coordinates?: number[];
    }[]
  | null;
