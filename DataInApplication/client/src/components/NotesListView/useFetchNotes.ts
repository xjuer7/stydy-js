
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../api/queryClient";
import { fetchData } from "../../api/Notes";

export function useFetchNotes() {
    const { isLoading, data, error, refetch} = useQuery({
        queryFn: () => fetchData('/api/notes'),
         queryKey: ["notes"],
    }, queryClient)

    return {
        loading: isLoading,
        error, 
        refetch,
        notesList: data ? data.list : []
    }
}