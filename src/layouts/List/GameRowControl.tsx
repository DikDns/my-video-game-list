"use client";

import NextLink from "next/link";
import Image from "next/image";
import { useState, useTransition } from "react";
import Link from "@mui/material/Link";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { getImageUrl } from "@/lib/igdb";
import { ListStatus } from "@prisma/client";
import { GameList } from "./List";

export default function GameRowControl({ item }: { item: GameList }) {
  const [status, setStatus] = useState(item.status);
  const [score, setScore] = useState(item.score);

  console.log(item);

  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell component="th" scope="row">
        <Image
          src={getImageUrl(item.game.imageId, "cover_small", "2x")}
          alt={`${item.game.name} Cover`}
          width={45}
          height={68}
        />
      </TableCell>
      <TableCell>
        <Link
          color="#fff"
          component={NextLink}
          href={`/games/${item.game.slug}`}
        >
          {`${item.game.name}`}
        </Link>
      </TableCell>
      <TableCell>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id="list-status-label">Status</InputLabel>
          <Select
            labelId="list-status-label"
            id="list-status-select"
            label="Status"
            value={status}
            onChange={(event) => setStatus(event.target.value as ListStatus)}
          >
            <MenuItem value={ListStatus.PLAYING}>PLAYING</MenuItem>
            <MenuItem value={ListStatus.COMPLETED}>COMPLETED</MenuItem>
            <MenuItem value={ListStatus.WISHTOPLAY}>WISHTOPLAY</MenuItem>
            <MenuItem value={ListStatus.ONHOLD}>ONHOLD</MenuItem>
            <MenuItem value={ListStatus.DROPPED}>DROPPED</MenuItem>
          </Select>
        </FormControl>
      </TableCell>
      <TableCell>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id="list-score-label">Score</InputLabel>
          <Select
            labelId="list-score-label"
            id="list-score-select"
            value={score || ""}
            label="Status"
            onChange={(event) => setScore(event.target.value as number)}
          >
            <MenuItem value={10}>{`10 - MASTERPIECE`}</MenuItem>
            <MenuItem value={9}>{`9 - GREAT`}</MenuItem>
            <MenuItem value={8}>{`8 - VERY GOOD`}</MenuItem>
            <MenuItem value={7}>{`7 - GOOD`}</MenuItem>
            <MenuItem value={6}>{`6 - FINE`}</MenuItem>
            <MenuItem value={5}>{`5 - AVERAGE`}</MenuItem>
            <MenuItem value={4}>{`4 - BAD`}</MenuItem>
            <MenuItem value={3}>{`3 - VERY BAD`}</MenuItem>
            <MenuItem value={2}>{`2 - HORRIBLE`}</MenuItem>
            <MenuItem value={1}>{`1 - APPALLING`}</MenuItem>
            <MenuItem value={0}>
              <em>{`None`}</em>
            </MenuItem>
          </Select>
        </FormControl>
      </TableCell>
      <TableCell align="right">Delete</TableCell>
    </TableRow>
  );
}
