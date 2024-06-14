import React from "react";
import { Bullet } from "./SVGComponents";

const BulletItem = ({name, content}:{name:string, content:string}) => {
  return (
    <div className="flex items-center justify-between sm:mb-4 mb-7">
      <Bullet /><p className="flex sm:flex-col w-11/12"><span className="sm:m-auto mr-auto text-base sm:font-extralight">{name}</span><span className="sm:m-auto sm:text-center ml-auto sm:mt-2 text-xl">{content}</span></p>
    </div>
  );
};
export default BulletItem;