import { createContext, useContext, FC, Dispatch } from "react";
import { useImmerReducer } from "use-immer";
import { appStateReducer, AppState, List, Task } from "./appStateReducer";
import { Action } from "./actions";
import { DragItem } from "../DragItem";

type AppStateContextProps = {
  draggedItem: DragItem | null,
  lists: List[],
  getTasksByListId(id: string): Task[],
  dispatch: Dispatch<Action>
}

export const appData: AppState = {
  draggedItem: null,
  lists: [
    {
      id: '0',
      text: 'To Do',
      tasks: [
        {
          id: 'c0',
          text: 'Generate app bla-bla',
        },
        {
          id: 'c1',
          text: 'Generate app scaffold',
        },
        {
          id: 'c2',
          text: 'Generate app foo-foo',
        }
      ]
    },
    {
      id: '1',
      text: 'In Progress',
      tasks: [
        {
          id: 'c3',
          text: 'Learn GraphQL',
        },
        {
          id: 'c4',
          text: 'Learn TypeScript',
        },
        {
          id: 'c5',
          text: 'Learn JS',
        }
      ]
    },
    {
      id: '2',
      text: 'Done',
      tasks: [
        {
          id: 'c6',
          text: 'Begin to use static typing',
        },
        {
          id: 'c7',
          text: 'Using React'
        }
      ]
    }
  ]
}

const AppStateContext = createContext<AppStateContextProps>({} as AppStateContextProps);

export const useAppState = () => useContext(AppStateContext);

export const AppStateProvider: FC = ({ children }) => {
  const [state, dispatch] = useImmerReducer(appStateReducer, appData);
  const { lists, draggedItem } = state;

  const getTasksByListId = (id: string) => lists.find(list => list.id === id)?.tasks || [];

  return (
    <AppStateContext.Provider value={{ lists, draggedItem, getTasksByListId, dispatch }}>
      {children}
    </AppStateContext.Provider>
  )
}