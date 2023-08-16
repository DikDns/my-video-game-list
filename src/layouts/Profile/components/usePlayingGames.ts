"use client";

import { useEffect, useState } from "react";
import { getGames } from "@/lib/igdb";
import { User } from "../User";

export default function usePlayingGames(user: User | null) {
  const [playingGames, setPlayingGames] = useState(
    user?.gameList
      ? user.gameList
          .filter((game) => game.status === "PLAYING")
          .sort((a, b) => (a.updatedAt > b.updatedAt ? 1 : 0))
      : []
  );
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (playingGames.length === 0) return;
    fetchGames();
  }, []);

  const fetchGames = async () => {
    setIsLoading(true);
    const fetchLimit = 10;
    const filteredPlayingGames = [];

    for (let i = 0; i < fetchLimit; i++) {
      if (playingGames[i]) {
        filteredPlayingGames.push(playingGames[i]);
      }
    }

    const body = `
      f name, slug, cover.image_id;
      l ${fetchLimit};
      w id=(${filteredPlayingGames.map((game) => game.gameId).join(",")});
    `;

    const nextGames = await getGames(body);

    setGames(nextGames);
    setIsLoading(false);
  };

  return { games, isLoading };
}
