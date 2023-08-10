"use client";

import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Container from "@mui/material/Container";
import CircularLoading from "@/components/Loading/CircularLoading";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Skeleton from "@mui/material/Skeleton";
import BasicBreadcrumbs from "@/components/Navigation/BasicBreadcrumbs";
import YoutubePlayer from "@/components/VideoPlayer/YoutubePlayer";
import truncStr from "@/utils/truncStr";
import { getGameVideos } from "@/lib/igdb";
import { subtitleSlide, videoSlide } from "../styles";
import { Video } from "@/types/Video";

export default function Videos() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    if (videos.length > 0) return;
    fetchMore();
  }, []);

  const fetchMore = async () => {
    const fetchLimit = 10;
    const body = `
      f name, video_id, game.name, game.slug;
      w name != n & game != n & video_id != n;
      s id desc;
      l ${fetchLimit};
      o ${offset};
    `;
    const nextVideos: Video[] = await getGameVideos(body);

    if (nextVideos.length <= 0) return setHasMore(false);

    setVideos((prevVideos) => [...prevVideos, ...nextVideos]);
    setOffset(videos.length + nextVideos.length);
    setHasMore(true);
  };

  return (
    <Container>
      <BasicBreadcrumbs />

      <InfiniteScroll
        dataLength={videos.length}
        next={fetchMore}
        hasMore={hasMore}
        loader={<CircularLoading />}
      >
        <Box>
          {videos.map((video) => (
            <Box key={video.id} sx={videoSlide}>
              <CardMedia>
                <YoutubePlayer
                  videoId={video.video_id}
                  width="100%"
                  height="144px"
                  fallback={
                    <Skeleton
                      variant="rectangular"
                      width="100%"
                      height="100%"
                    />
                  }
                />
              </CardMedia>
              <Typography
                className="name"
                sx={subtitleSlide}
                variant="subtitle1"
                component="p"
              >
                {truncStr(
                  `${video.name || ""} for ${
                    video.game ? video.game.name || "" : ""
                  }`,
                  50
                )}
              </Typography>
            </Box>
          ))}
        </Box>
      </InfiniteScroll>
    </Container>
  );
}
