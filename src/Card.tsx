import { useRef } from "react";
import { useDrop } from "react-dnd";
import { useItemDrag } from "./utils/useItemDrag";
import { useAppState } from "./state/AppStateContext";
import { isHidden } from "./utils/isHidden";
import { moveTask, setDraggedItem } from "./state/actions";
import { CardContainer } from"./styles";

type CardProps = {
  id: string,
  text: string,
  columnId: string,
  isPreview?: boolean
}

export const Card = ({ id, text, columnId, isPreview }: CardProps) => {
  const { draggedItem, dispatch } = useAppState();
  const ref = useRef<HTMLDivElement>(null);

  const { drag } = useItemDrag({
    type: "CARD",
    id,
    text,
    columnId,
  })

  const [, drop] = useDrop({
    accept: "CARD",
    hover() {
      if (!draggedItem) {
        return
      }
      if (draggedItem.type !== "CARD") {
        return
      }
      if (draggedItem.id === id) {
        return
      }

      dispatch(
        moveTask(draggedItem.id, id, draggedItem.columnId, columnId)
      )
      dispatch(setDraggedItem({ ...draggedItem, columnId }))
    }
  });

  drag(drop(ref));

  return (
    <CardContainer
      ref={ref}
      isHidden={isHidden(draggedItem, "CARD", id, isPreview)}
      isPreview={isPreview}
    >
      {text}
    </CardContainer>
  )
};