"use client";
import { AspectRatio } from "../ui/aspect-ratio";
import Image from "next/image";

type AspectRatioImageProps = {
  imageSrc: string;
  alt: string;
};

export async function AspectRatioImage({
  imageSrc,
  alt,
}: AspectRatioImageProps) {
  let aspectRatio = 1;
  const img = new window.Image();
  img.src = imageSrc;
  await img.decode();
  aspectRatio = img.width / img.height;
  return (
    <AspectRatio ratio={aspectRatio}>
      <Image className="rounded" src={imageSrc} alt={alt} fill />
    </AspectRatio>
  );
}
