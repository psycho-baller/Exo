import { useQueryClient, useQuery } from "@tanstack/react-query";
import type { UseQueryResult } from "@tanstack/react-query";

import { filterDataFromSchema } from "../../utils/search";
import { useAtom } from "jotai";
import type { PrimitiveAtom } from "jotai";
import type { ReactElement } from "react";
import { awaitSearch } from "../../components/SearchInput";

interface SearchProps<T, S> {
  useQueryResult: () => UseQueryResult<S[]>;
  filterSchema: Record<string, unknown>;
  resultKey: string;
  renderHit: (hit: T) => JSX.Element;
  queryAtom: PrimitiveAtom<string>;
  RenderOnEmpty?: ReactElement
}

export function SearchResult<T, S>({ filterSchema, useQueryResult, resultKey, renderHit, queryAtom, RenderOnEmpty }: SearchProps<T, S>) {
  const [query] = useAtom(queryAtom)
  const queryResult = useQueryResult()

  const data = queryResult.data ? filterDataFromSchema(queryResult.data as Record<string, unknown>[], filterSchema) : []
  console.log("data:", data)
  const queryClient = useQueryClient();
  // queryClient.clear()
  console.log("db", ['db', data, filterSchema])
  const db = queryClient.getQueryData<S[]>(['db', data, filterSchema])
  const searchResult = useQuery<T[]>({
    queryKey: ['search', db, query],
    enabled: false,
  })
  console.log("searchResult", searchResult)
  return (
    <>
      {
        searchResult.data?.map((hit) => renderHit(hit))
      }
      {/* Gotta handle the case where that's null */}
      {RenderOnEmpty && searchResult.data?.length === 0 && RenderOnEmpty}
    </>
  )
}