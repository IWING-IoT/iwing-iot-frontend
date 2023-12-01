import Avvvatars from "avvvatars-react";

type CustomAvatarProps = {
  value: string;
  size: number;
};

export default function CustomAvatar({ value, size }: CustomAvatarProps) {
  return (
    <div
      style={{ height: `${size}px`, width: `${size}px` }}
      className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-muted [&>div>p]:font-sans"
    >
      <Avvvatars value={value} size={size} borderSize={1} />
    </div>
  );
}
