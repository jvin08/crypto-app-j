import React from "react";
import { Bullet } from "./SVGComponents";

const BulletItem = ({name, content}:{name:string, content:string}) => {
  return (
    <div className="flex items-center justify-between mb-7">
      <Bullet /><p className="flex w-11/12"><span className="mr-auto text-base">{name}</span><span className="ml-auto text-xl">{content}</span></p>
    </div>
  );
};
export default BulletItem;