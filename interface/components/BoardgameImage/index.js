import Image from "next/image";

export default function BoardgameImage({ boardgame, size }) {
  return (
    <Image
      className="cover w-auto h-auto"
      src={boardgame.image}
      alt={`Cover of ${boardgame.name}`}
      width={size}
      height={size}
      priority
    />
  );
}
