import { ZapData } from "@/lib/types";
import React from "react";
import { formatDistanceToNow, parseISO } from "date-fns";
import { useNavigate } from "react-router-dom";

interface ZapItemProps {
  zap: ZapData;
}

function timeSince(timestamp: string): string {
  const date = parseISO(timestamp);
  return formatDistanceToNow(date, { addSuffix: true });
}

const ZapItem: React.FC<ZapItemProps> = ({ zap }) => {
  const navigate = useNavigate();

  return (
    <tr className="border-slate-500">
      <th>
        <label>
          <input type="checkbox" className="checkbox" />
        </label>
      </th>
      <td>
        <div
          className="font-bold cursor-pointer"
          onClick={() => navigate(`/zap/${zap.id}`)}
        >
          Untitled Zap
        </div>
      </td>
      <td>{timeSince(zap.updatedAt)}</td>
      <td>
        {" "}
        <input
          type="checkbox"
          className="toggle toggle-primary"
          defaultChecked
        />
      </td>
    </tr>
  );
};

interface ZapListProps {
  zaps: ZapData[];
}

const ZapList: React.FC<ZapListProps> = ({ zaps }) => {
  return (
    <div className="overflow-x-auto mt-8">
      <table className="table">
        {/* head */}
        <thead>
          <tr className="border-b-2 border-slate-500">
            <th></th>
            <th>Name</th>
            <th>Last Updated</th>
            <th>Running</th>
          </tr>
        </thead>
        <tbody>
          {zaps.map((zap, i) => (
            <ZapItem key={i} zap={zap} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ZapList;
