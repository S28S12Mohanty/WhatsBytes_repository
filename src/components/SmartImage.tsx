"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";

type Props = ImageProps & {
  fallbackSrc?: string;
};

export default function SmartImage({ fallbackSrc = "https://placehold.co/600x400?text=No+Image", ...props }: Props) {
  const [errored, setErrored] = useState(false);
  if (errored) {
    return (
      <Image
        {...props}
        src={fallbackSrc}
        alt={typeof props.alt === "string" && props.alt ? props.alt : "image"}
        onError={() => {}}
      />
    );
  }
  return <Image {...props} onError={() => setErrored(true)} />;
}


