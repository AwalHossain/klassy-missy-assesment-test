export interface KanbanCard {
    id: string;
    regimen: string;
    datetime: string;
    name: string;
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