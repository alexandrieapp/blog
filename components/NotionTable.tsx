import { Block, RichText } from "@notionhq/client/build/src/api-types";
import { NotionText } from "./NotionText";
import { useEffect, useState } from "react";

interface Props {
  block: Block;
}

export const NotionTable: React.FC<Props> = ({ block }) => {
  const [tableData, setTableData] = useState<{
    header: RichText[][];
    rows: RichText[][][];
  } | null>(null);

  useEffect(() => {
    const fetchTableData = async () => {
      // @ts-ignore: Current client version does not support `table` but API does
      const tableBlock = block.table;
      const header = tableBlock.children[0];
      const rows = tableBlock.children.slice(1);

      setTableData({
        header: header.table_row.cells,
        rows: rows.map((row) => row.table_row.cells),
      });
    };

    fetchTableData();
  }, [block]);

  if (!tableData) {
    return null;
  }

  return (
    <div className="my-8 rounded-lg border border-gray-200 overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {tableData.header.map((cell, index) => (
              <th
                key={index}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                <NotionText text={cell} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {tableData.rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                >
                  <NotionText text={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
