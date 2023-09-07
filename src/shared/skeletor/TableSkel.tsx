import { FC, ReactElement } from "react";
import Skeleton from "react-loading-skeleton";
import "./TableSkel.scss";

type props = {
  col: number;
  row: number;
};

const TableSkel: FC<props> = ({ col, row }): ReactElement => {
  return (
    <table>
      <tbody>
        {[...Array(col)].map((e: number, i: number) => {
          return (
            <tr key={i}>
              {[...Array(row)].map((e: number, j: number) => {
                return (
                  <td key={j}>
                    <Skeleton height={31} width={"100%"} />
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TableSkel;
