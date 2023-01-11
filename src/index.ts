import { Node, parse } from "sql-parser-cst";
import { Parser, Printer, SupportLanguage } from "prettier";
import { printSql } from "./printSql";

export const languages: SupportLanguage[] = [
  {
    extensions: [".sql"],
    name: "SQL",
    parsers: ["sql-parser-cst"],
  },
];

export const parsers: Record<string, Parser<Node>> = {
  "sql-parser-cst": {
    parse: (text) =>
      parse(text, {
        dialect: "sqlite",
        includeRange: true,
        preserveComments: true,
      }),
    astFormat: "sql-cst",
    locStart: (node) => node.range?.[0] as number,
    locEnd: (node) => node.range?.[1] as number,
  },
};

export const printers: Record<string, Printer> = {
  "sql-cst": {
    print: printSql as Printer["print"],
  },
};
