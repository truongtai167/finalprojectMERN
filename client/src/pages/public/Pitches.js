import React, { useCallback, useEffect, useState } from "react";
import {
  useParams,
  useSearchParams,
  useNavigate,
  createSearchParams,
} from "react-router-dom";
import Slider from "react-slick";
import { apiGetPitch, apiGetPitches } from "../../apis";
import Masonry from "react-masonry-css";
import "react-datepicker/dist/react-datepicker.css";
import icons from "../../ultils/icons";
import { sorts } from "../../ultils/constants";
import {
  Breadcrumb,
  Pitch,
  SearchItems,
  InputSelect,
  Pagination,
} from "../../components";
// import ReactImageMagnify from "react-image-magnify";
import {
  formatMoney,
  formatPrice,
  renderStarFromNumber,
  formattedCategory,
} from "../../ultils/helpers";
const Pitches = () => {
  const breakpointColumnsObj = {
    default: 6,
    1100: 3,
    700: 2,
    500: 1,
  };
  const { category, brand } = useParams();
  const navigate = useNavigate();
  const [pitches, setPitches] = useState(null);
  const [activeClick, setActiveClick] = useState(null);
  const [params] = useSearchParams();
  const [sort, setSort] = useState("");
  // const formattedCategory2 = category.replace(/-/g, " ");
  const fetchPitchesByCategory = async (queries) => {
    const response = await apiGetPitches({ ...queries, category });
    // console.log(response);
    // console.log(formattedCategory2);

    if (response.success) setPitches(response);
  };

  const changeValue = useCallback(
    (value) => {
      setSort(value);
    },
    [sort]
  );

  useEffect(() => {
    if (sort) {
      navigate({
        pathname: `/${category}`,
        search: createSearchParams({ sort }).toString(),
      });
    }
  }, [sort]);
  useEffect(() => {
    // let param = [];
    // for (let i of params.entries()) param.push(i);
    // const queries = {};
    // for (let i of params) queries[i[0]] = i[1];
    // console.log(param);
    // fetchProductsByCategory(queries);
    const queries = Object.fromEntries([...params]);
    // console.log(queries);
    let priceQuery = {};
    if (queries.to && queries.from) {
      priceQuery = {
        $and: [
          { price: { gte: queries.from } },
          { price: { lte: queries.to } },
        ],
      };
      delete queries.price;
    } else {
      if (queries.from) queries.price = { gte: queries.from };
      if (queries.to) queries.price = { lte: queries.to };
    }
    delete queries.to;
    delete queries.from;
    const q = { ...priceQuery, ...queries };
    fetchPitchesByCategory(q);
    window.scrollTo(0, 50);
  }, [params]);
  const changeActiveFilter = useCallback(
    (name) => {
      if (activeClick === name) setActiveClick(null);
      else setActiveClick(name);
    },
    [activeClick]
  );
  return (
    <div className="w-full">
      <div className="h-[81px] flex justify-center items-center bg-gray-100">
        <div className="w-main ml-2">
          <h3 className="font-semibold uppercase">
            {formattedCategory(category)}
          </h3>
          <Breadcrumb
            category={formattedCategory(category)}
            brand={brand}
          ></Breadcrumb>
        </div>
      </div>
      <div className="w-main border p-4 flex justify-between mt-8 m-auto">
        <div className="w-4/5 flex-auto flex flex-col gap-3">
          <span className="font-semibold text-sm">Filter by</span>
          <div className="flex items-center gap-4">
            <SearchItems
              name="Price"
              activeClick={activeClick}
              changeActiveFilter={changeActiveFilter}
              type="input"
            ></SearchItems>
            <SearchItems
              name="Address"
              activeClick={activeClick}
              changeActiveFilter={changeActiveFilter}
            ></SearchItems>
          </div>
        </div>

        <div className="w-1/5 flex flex-col gap-3">
          <span className="font-semibold text-sm">Sort by</span>
          <div className="w-full">
            <InputSelect
              changeValue={changeValue}
              value={sort}
              options={sorts}
            ></InputSelect>
          </div>
        </div>
      </div>
      <div className="mt-8 w-main m-auto">
        <Masonry
          breakpointCols={3}
          className="my-masonry-grid flex mx-[-10px] pl-3"
          columnClassName="my-masonry-grid_column"
        >
          {pitches?.pitches?.map((el) => (
            <Pitch
              key={el._id}
              pid={el.id}
              pitchData={el}
              normal={true}
            ></Pitch>
          ))}
        </Masonry>
      </div>
      <div className="w-main m-auto my-4 flex bg-red-400 justify-end">
        <Pagination totalCount={pitches?.totalCount} />
        {/* <Pagination /> */}
      </div>
      <div className="h-[500px]"> </div>
    </div>
  );
};

export default Pitches;
