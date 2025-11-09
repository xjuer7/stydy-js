import { ChangeEvent } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { PLAYLISTS } from "../../data";
import { useNavigate } from "react-router-dom";
import './PlaylistsPage.css'

export function PlaylistsPage() {
    const [searchParam, setSearchParam] = useSearchParams();
    const searchName = searchParam.get('searchName') || '';
    const searchGenre = searchParam.get('searchGenre') || '';
    const navigate = useNavigate()

    let filteredPlaylists = PLAYLISTS
    .filter(({ genre }) => genre !== 'Non Music')
    .filter(({ name }) =>  name.toLowerCase().includes(searchName))
    .filter(({ genre }) =>  genre.toLowerCase().startsWith(searchGenre)) 

    const handleSearchName = (e:ChangeEvent<HTMLInputElement>): void => {
        const { value } = e.target;
		setSearchParam({ searchName: value.toLowerCase(), searchGenre });
    }
    const handleSearchGenre = (e:ChangeEvent<HTMLInputElement>): void => {
        const { value } = e.target;
		setSearchParam({ searchName, searchGenre: value.toLowerCase() });
    }

    return (
        <>
        {(searchGenre || searchName) && (<button className="playlists__btn-return" onClick={() => navigate('/playlists')}>Вернуться к списку плейлистов</button>)}
        <h2 className="playlistsPage__title">PlaylistsPage</h2>

        <div className="playlists">
            <label>
                введите жанр {''}
                <input type="text" value={searchGenre} onChange={handleSearchGenre}/>
            </label>

            <label>
                введите название {''}
                <input type="text" value={searchName} onChange={handleSearchName}/>
            </label>

            {filteredPlaylists.length == 0 && <p>Такой плейлист отсутствует</p>}

            {filteredPlaylists.map(({id, name, genre}) => (
            <Link to={`/playlists/${id}`} key={id}>
                <div className="playlists__btn">{genre}</div>{name}
            </Link>
        ))}
        </div>
       
        </>
    );
}