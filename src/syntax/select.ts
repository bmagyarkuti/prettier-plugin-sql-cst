import { AllSelectNodes } from "sql-parser-cst";
import { CstToDocMap } from "../CstToDocMap";
import { join, line, indent, group } from "../print_utils";

export const selectMap: Partial<CstToDocMap<AllSelectNodes>> = {
  select_stmt: (print) => group(join(line, print("clauses"))),
  select_clause: (print) =>
    group([print("selectKw"), indent([line, print("columns")])]),
  from_clause: (print) =>
    group([print("fromKw"), indent([line, print("expr")])]),
  join_expr: (print, path) => [
    print("left"),
    line,
    group(
      join(" ", [
        join(" ", print("operator")),
        [
          print("right"),
          path.getValue().specification
            ? indent([line, print(["specification"])])
            : [],
        ],
      ])
    ),
  ],
  join_on_specification: (print) => group(join(" ", print(["onKw", "expr"]))),
  join_using_specification: (print) =>
    group(join(" ", print(["usingKw", "expr"]))),
  where_clause: (print) =>
    group([print("whereKw"), indent([line, print("expr")])]),
  order_by_clause: (print) =>
    group([
      join(" ", print("orderByKw")),
      indent([line, print("specifications")]),
    ]),
  group_by_clause: (print) =>
    group([join(" ", print("groupByKw")), indent([line, print("columns")])]),
  having_clause: (print) =>
    group([print("havingKw"), indent([line, print("expr")])]),
  sort_specification: (print) => join(" ", print(["expr", "orderKw"])),
};