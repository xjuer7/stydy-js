import { useQuery } from "@tanstack/react-query"
import { getRestaurants, Restaurant } from "../api";

type Response = {
    data?: Restaurant[];
    isLoading: boolean;
    isError: boolean
}

export const useRestList = ():Response => {
    const {data, isLoading, isError} = useQuery({
        queryKey: ['list'],
        queryFn: getRestaurants
    });

    return {data, isLoading, isError}
}