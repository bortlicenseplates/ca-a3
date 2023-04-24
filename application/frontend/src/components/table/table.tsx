import React from "react";

const Table: React.FC<{
  title: string;
  header: (string | number)[];
  data: (string | number)[][];
}> = (props) =>  {
  return (
    <>
      <table>
        <thead>
          <tr>
            {props.header.map((hCol) => (
              <th>{hCol}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.data.map((dRow) => (
            <tr>
              {dRow.map((dCol) => (
                <td>{dCol}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Table;