import classNames from "classnames";
import { FC } from "react";
import { NavLinkProps } from "react-router-dom";

import Card from "Components/Card";
import { ICardData } from "Components/Card/types";

const Cards: FC<{
  cards: ICardData[];
  NavLink: React.ForwardRefExoticComponent<
    NavLinkProps & React.RefAttributes<HTMLAnchorElement>
  >;
  columns: number;
  className?: string;
}> = ({ className, cards, columns, NavLink }) => {
  return (
    <div
      data-testid='cards'
      className={classNames("grid grid-cols-1", className, {
        "md:grid-cols-1": columns === 1,
        "md:grid-cols-2": columns === 2,
        "md:grid-cols-3": columns === 3,
        "md:grid-cols-4": columns === 4,
        "md:grid-cols-5": columns === 5,
        "md:grid-cols-6": columns === 6,
        "md:grid-cols-7": columns === 7,
        "md:grid-cols-8": columns === 8,
        "md:grid-cols-9": columns === 9,
        "md:grid-cols-10": columns === 10,
        "md:grid-cols-11": columns === 11,
        "md:grid-cols-12": columns === 12
      })}
    >
      {cards.map((card, index) => {
        return <Card key={index} data={card} NavLink={NavLink} />;
      })}
    </div>
  );
};

export default Cards;
