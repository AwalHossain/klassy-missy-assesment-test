

export interface ChildrenProps {
    children: React.ReactNode;
}



export interface Card {
    id: string;
    regimen: string;
    timestamp: string;
    name: string;
  }
  
  export interface Column {
    id: string;
    title: string;
    cards: Card[];
  }