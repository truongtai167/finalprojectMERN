import React, { memo, useState, useCallback, useEffect } from "react";
import { pitchInforTabs } from "../ultils/constants";
import Swal from "sweetalert2";
import path from "../ultils/path";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
function PitchInformation() {
  const activedStyles = "";
  const notActivedStyles = "";
  const [activedTab, setActivedTab] = useState(1);
  return (
    <div>
      <div className="flex items-center gap-2 relative bottom-[-1px]">
        {pitchInforTabs.map((el) => (
          <span
            className={`py-2 px-4 cursor-pointer ${
              activedTab === +el.id
                ? "bg-red-500 border border-b-0"
                : "bg-gray-200"
            } `}
            key={el.id}
            onClick={() => setActivedTab(el.id)}
          >
            {el.name}
          </span>
        ))}
      </div>
      <div className="w-full border p-4">
        {pitchInforTabs.some((el) => el.id === activedTab) &&
          pitchInforTabs
            .find((el) => el.id === activedTab)
            ?.content?.map((e) => (
              <li className="leading-6" key={e}>
                {e}
              </li>
            ))}
      </div>
    </div>
  );
}

export default memo(PitchInformation);
