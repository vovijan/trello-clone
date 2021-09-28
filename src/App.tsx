import { AppContainer } from "./styles";
import { AddNewItem } from "./AddNewItem";
import { Column } from "./Column";
import { useAppState } from "./state/AppStateContext";
import { addList } from "./state/actions";

export const App = () => {
  const { lists, dispatch } = useAppState();

  return (
    <AppContainer>
      {lists.map(list => (
        <Column key={list.id} id={list.id} text={list.text} />
      ))}
      <AddNewItem
        onAdd={text => dispatch(addList(text))}
        toggleButtonText="+ Add another list"
      />
    </AppContainer>
  );
}