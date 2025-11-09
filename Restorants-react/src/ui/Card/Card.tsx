import { useState } from 'react'
import StarIcon from '../../assets/star.svg?react'
import './style.css'


type TProps = {
    id: string;
    name: string;
    description: string;
    raiting:number;
    url: string;
    onRatingChange: (id: string, newVal:number) => void;
}

export const Card = ({id, name, description, raiting, url, onRatingChange }: TProps) => {
    const lengthStars = [1,2,3,4,5]
    const [currentRaiting, setCurrentRaiting] = useState(raiting ? raiting : 0)

    const handleRatingChange = (newVal: number) => {
        setCurrentRaiting(newVal)
        onRatingChange(id, newVal)
    }

    const onSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()
    }

    return (
        <div className="card">
            <img src={url} className="card__img"/>
            <div className='card__text'>
                <h3 className="card__title">{name}</h3>
                <p className="card__descr">{description}</p>
            </div>
            <form className="card__stars-wrap" onSubmit={onSubmit}>
                {lengthStars.map(star => (
                    <button 
                        key={star}
                        type='button'
                        onClick={() => handleRatingChange(star)}
                        >
                            <StarIcon className={`${currentRaiting >= star ? 'star-active' : ''} card__star-icon`} />
                    </button>
                ))}
            </form>
        </div>
    )
}