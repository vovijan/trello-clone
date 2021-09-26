import { CardContainer } from"./styles";

type CardProps = {
  id: string,
  text: string
}

export const Card = ({ text }: CardProps) => <CardContainer>{text}</CardContainer>;