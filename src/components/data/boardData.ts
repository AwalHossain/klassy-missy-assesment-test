import { KanbanState } from "@/redux/types/kanbanTypes";

const initialKanbanData: KanbanState= {
  columns: {
    incoming: {
      title: 'Incoming Request',
      cards: [
        {
          id: '1',
          regimen: 'RGM1264',
          datetime: '21:30:47, 4 June 2024',
          name: 'Fatima Ahmed'
        },
        {
          id: '2',
          regimen: 'RGM1255',
          datetime: '01:30:47, 2 June 2024',
          name: 'Shorif Islam'
        },
        {
          id: '3',
          regimen: 'RGM1257',
          datetime: '10:30:47, 1 June 2024',
          name: 'Numana Begum'
        },
        {
          id: '4',
          regimen: 'RGM2254',
          datetime: '07:30:47, 6 June 2024',
          name: 'Amina Begum'
        },
        {
          id: '5',
          regimen: 'RGM1214',
          datetime: '03:30:47, 1 June 2024',
          name: 'Sabria'
        }
      ]
    },
    processing: {
      title: 'Processing',
      cards: [
        {
          id: '6',
          regimen: 'RGM1264',
          datetime: '11:30:47, 3 June 2024',
          name: 'Romana Akter'
        },
        {
          id: '7',
          regimen: 'RGM1255',
          datetime: '02:30:47, 4 June 2024',
          name: 'Abdullah'
        }
      ]
    },
    done: {
      title: 'Done | Updated',
      cards: [
        {
          id: '8',
          regimen: 'RGM1264',
          datetime: '21:30:47, 01 June 2024',
          name: 'Samiera'
        },
        {
          id: '9',
          regimen: 'RGM1255',
          datetime: '11:30:47, 01 June 2024',
          name: 'Nabila'
        },
        {
          id: '10',
          regimen: 'RGM1264',
          datetime: '21:30:47, 02 June 2024',
          name: 'Annah Ahmed'
        },
        {
          id: '11',
          regimen: 'RGM1255',
          datetime: '01:30:47, 01 June 2024',
          name: 'Miftahul Islam'
        }
      ]
    }
  }
};

export default initialKanbanData;