import { useParams, Link } from "react-router-dom";
import { USERS } from "../../data";
import "./UserInfoPage.css";

export function UserInfoPage() {
	const { userId } = useParams();
	let playlist

	//параметр из динамическим путей, id пользователя
	const user = USERS[Number(userId)];

	if (user) {
		playlist = user.playlist?.id
	} else {
		return (
			<div className="userInfoPage">
				<h2>UserInfoPage</h2>

				<div className="users">
					<p>Пользователя таким userId нет</p>
				</div>
			</div>
		);
	}

	return (
		<div className="userInfoPage">
			<h2>UserInfoPage</h2>

			<div className="users">
				<p>{user.jobTitle}</p>
				<p>{user.email}</p>
				<img src={user.avatar} alt="" width={200} height={200} />
				<p>{user.fullName}</p>
				<p>{user.bio}</p>
				{user.playlist?.name && (
					<p>{`playlist: `}
					<Link to={`/playlists/${playlist}`}>{user.playlist?.name}</Link>
				</p>
				)}
				
			</div>
		</div>
	);
}
