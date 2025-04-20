import React from "react";
import { useAppSelector } from "../../store/hooks";
import { RootState } from "../../types";
import LaneSkeleton from "../Lane/LaneSkeleton";

const BoardSkeleton: React.FC = () => {
  const { statuses } = useAppSelector((state: RootState) => state.board);
  const laneTodos = Array.from({ length: 5 }).map((_todo, idx) => ({
    id: idx,
    todo: "",
    completed: false,
    userId: 1,
    status: statuses[Math.floor(idx / 3)],
  }));

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4 animate-pulse">
        <div
          className="h-8 bg-gray-300 rounded-sm w-28"
        ></div>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-4 w-[96vw]">
        {statuses.map((status) => {
          return (
            <LaneSkeleton key={status} status={status} todos={laneTodos} />
          );
        })}
      </div>
    </div>
  );
};

export default BoardSkeleton;
