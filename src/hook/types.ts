export type Note = {
  id: string;
  title: string;
  body: string;
  pinned: boolean;
  archived: boolean;
  createdAt: string;
  updatedAt: string;
};

export type View = "all" | "pinned" | "archived";
