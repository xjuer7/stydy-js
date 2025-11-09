import { useNavigate, useParams, useSearchParams, Link } from 'react-router-dom'
import './PlaylistsInfoPage.css'
import { PLAYLISTS } from '../../data';

export function PlaylistsInfoPage() {
    const { playlistsId } = useParams();
    const playlist = PLAYLISTS[Number(playlistsId)]

    if (!playlist) {
        return (
            <div className="playInfoPage">
				<h2>PlaylistsInfoPage</h2>

				<div className="playlists">
					<p>Плейлиста с таким playlistId нет</p>
				</div>
			</div>
        )
    }

    const [searchParam, setSearchParam] = useSearchParams();
    const navigate = useNavigate()

    const handleClick = () => {
        const newParams = new URLSearchParams(searchParam)
        newParams.set('searchGenre', playlist.genre.toLowerCase())
        navigate(`/playlists?${newParams.toString()}`)
    }

    return (
        <div className="playInfoPage">
			<h2>PlaylistsInfoPage</h2>

			<div className="playlists">
				<div className='playlists__genre'>
                    <p>{`Жанр: `}</p>
                    <button className='playlists__btn' onClick={handleClick}>{playlist?.genre}</button>
                </div>
                <p>{`Название: `}
                    <span className='playlists__name'>{playlist?.name}</span>
                </p>

                <ul className='playlists__track'>
                {playlist?.songs.map((item, index) => (
                    <li key={index}>{`- ${item}`}</li>
                ))}
                </ul>
			</div>
		</div>
    )
}