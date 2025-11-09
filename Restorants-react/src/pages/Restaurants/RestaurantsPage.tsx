import { CardList } from "../../ui/CardList/CardList";
import { SearchEl } from "../../ui/Search/Search";
import { useState } from "react"

export const RestaurantsPage = () => {
    const [valueTitle, setValueTitle] = useState('')

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValueTitle(event.target.value)
    }

    return (
        <>
            <SearchEl value={valueTitle} onChange={handleChange}/>
            <CardList inputValue = {valueTitle}/>
        </>
    )
}

