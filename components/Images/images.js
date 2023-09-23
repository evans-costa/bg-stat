export default function Images({ boardgame, size }) {
  return (
    <img
      className="cover"
      src={boardgame.image}
      alt={`Cover of ${boardgame.name}`}
      width={size}
      height={size}
    />
  );
}
