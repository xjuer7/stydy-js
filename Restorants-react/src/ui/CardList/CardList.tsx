import { useRestList } from '../../hooks/useRestList'
import { updateRestaurantRating } from '../../api';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../../App'
import { Card } from '../Card/Card'
import { useEffect, useState } from 'react';
import './style.css'

type TProps = {
    inputValue: string | undefined;
}

export function CardList({inputValue}: TProps) {
    const {data, isLoading } = useRestList()
    const [goodReview, setGoodReview] = useState(false)

    const { isSuccess, mutate } = useMutation({
        mutationFn: updateRestaurantRating,
        onSuccess: () => {
            queryClient.invalidateQueries(['list']);
        }
    });
    
    const updateRating = (id: string, num: number) => {
        mutate({id, raiting: num})
    }

    useEffect(() => {
        if(isSuccess) {
            setGoodReview(true)
            setTimeout(() => setGoodReview(false), 3000)
        }

    },[isSuccess])

    const filteredList = data?.filter((item) => item.name.replace(/['"]+/g, "").toLowerCase().includes(inputValue!.toLowerCase()))

    return (
        <>
        {isLoading && <div className='loading'>Идет загрузка...</div>}
        <div className='card-list'>
        {goodReview && <div className='notice'>Спасибо за отметку!</div>}
        {(filteredList || []).map(item => (
        <Card 
            id = {item.id}
            name = {item.name} 
            description  = {item.description}
            raiting  = {item.raiting}
            url = {item.url}
            key={item.id}
            onRatingChange = {updateRating}
        />
        ))}
        </div>
        </>
    )
}