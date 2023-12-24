import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { apiGetPitches } from "apis";
import { renderCustomizedLabel } from "ultils/helper";

const PiechartCategory = () => {
  const COLORS = ["#00C49F", "#FFBB28", "#FF8042", "#FF0000", "#0000FF"];

  const [category, setCategory] = useState(null);
  const [category1, setCategory1] = useState(null);
  const [category2, setCategory2] = useState(null);
  const [category3, setCategory3] = useState(null);
  const [category4, setCategory4] = useState(null);

  const fetchPitchCategory = async () => {
    const response = await apiGetPitches({ category: "Sân 3" });
    if (response.success) setCategory(response);
  };
  const fetchPitchCategory1 = async () => {
    const response = await apiGetPitches({ category: "Sân 5" });
    if (response.success) setCategory1(response);
  };
  const fetchPitchCategory2 = async () => {
    const response = await apiGetPitches({ category: "Sân 7" });
    if (response.success) setCategory2(response);
  };
  const fetchPitchCategory3 = async () => {
    const response = await apiGetPitches({ category: "Sân 11" });
    if (response.success) setCategory3(response);
  };
  const fetchPitchCategory4 = async () => {
    const response = await apiGetPitches({ category: "Sân Futsal" });
    if (response.success) setCategory4(response);
  };
  useEffect(() => {
    fetchPitchCategory();
    fetchPitchCategory1();
    fetchPitchCategory2();
    fetchPitchCategory3();
    fetchPitchCategory4();
  }, []);
  const data = [
    { name: "Sân 3", value: category?.totalCount },
    { name: "Sân 5", value: category1?.totalCount },
    { name: "Sân 7", value: category2?.totalCount },
    { name: "Sân 11", value: category3?.totalCount },
    { name: "Sân Futsal", value: category4?.totalCount },
  ];

  return (
    <div className="w-full h-[22rem]  p-4 rounded-sm border border-gray-200 flex flex-col">
      <strong className="text-white font-bold text-center">
        Number of Pitches by Category
      </strong>
      <div className="mt-3 w-full flex-1 text-xs">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={400} height={300}>
            <Pie
              data={data}
              cx="50%"
              cy="45%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={105}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell
                  key={`${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PiechartCategory;
