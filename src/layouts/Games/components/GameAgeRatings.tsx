"use client";

import Image from "next/image";
import { getAgeRating } from "@/lib/igdb";
import { AgeRating } from "@/types/AgeRating";

function AgeRatingImage({ url, title }: { url: string; title: string }) {
  return <Image src={url} alt={title} width={48} height={48} />;
}

export default function GameAgeRatings({
  ageRatings,
}: {
  ageRatings: AgeRating[];
}) {
  return ageRatings.map((ageRating) => {
    if (!ageRating.rating) return;
    const { url, title } = getAgeRating(ageRating.rating);
    return <AgeRatingImage url={url} title={title} key={ageRating.id} />;
  });
}