import React from "react";

export default function Table(props: {
  title: string;
  header: (string | number)[];
  data: (string | number)[][];
}) {
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
