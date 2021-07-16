import React, { useEffect, useState } from "react";
import GitHubService from "../../../pages/api/github";
import FriendsItem from "../FriendsItem";



export default function FriendsList({ quantidade, randomico }) {
  const [friends, setFriends] = useState([]);
  const friendsBox = friends.slice(0, 6);

  useEffect(() => {
    GitHubService.getFollowers(quantidade, randomico).then((friendsList) =>
      setFriends(friendsList)
    );
  }, []);

  return (
    <>
      <h2 className="subTitle">
        Seguidores <span className="boxLink">({friends.length})</span>
      </h2>
      <ul>
        {friendsBox.map((friend) => {
          return (
            <FriendsItem
              key={friend.login}
              html_url={friend.html_url}
              login={friend.login}
              avatar_url={friend.avatar_url}
            />
          );
        })}
      </ul>
      <h2 className="linkTitle">Ver todos</h2>
    </>
  );
}