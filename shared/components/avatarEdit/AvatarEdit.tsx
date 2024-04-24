import React, { useState } from "react";
import AvatarEditor from "react-avatar-editor";

type Props = {
  photo: string;
};

export const AvatarEdit = ({ photo }: Props) => {
  const [scale, setScale] = useState(1.2);

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (e.deltaY < 0) {
      setScale((prevScale) => prevScale + 0.15);
    } else {
      setScale((prevScale) => prevScale - 0.15);
    }
  };

  return (
    <div onWheel={handleWheel}>
      <AvatarEditor
        border={20}
        borderRadius={150}
        color={[23, 23, 23, 0.87]}
        height={312}
        image={photo}
        rotate={0}
        scale={scale}
        width={312}
      />
    </div>
  );
};
