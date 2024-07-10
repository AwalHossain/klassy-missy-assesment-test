export interface KanbanCard {
  id: string;
  regimen: string;
  datetime: string;
  name: string;
  gender?: string;
  concern?: string;
  DOB?: Date; // Keeping DOB as Date since you wanted all except date to be string
  concernName?: string[];
  eyeConcern?: string;
  writtenConcern?: string;
}
  
  export interface KanbanColumn {
    title: string;
    cards: KanbanCard[];
  }
  
  export interface KanbanState {
    columns: {
      [key: string]: KanbanColumn;
    };
  }