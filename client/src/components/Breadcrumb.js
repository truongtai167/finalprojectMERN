import React from "react";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { Link } from "react-router-dom";
import icons from "../ultils/icons";
const userNamesById = { 1: "John" };
const { IoIosArrowForward } = icons;
const DynamicUserBreadcrumb = ({ match }) => (
  <span>{userNamesById[match.params.userId]}</span>
);
const Breadcrumb = ({ title, category }) => {
  const routes = [
    { path: "/:category", breadcrumb: category },
    { path: "/", breadcrumb: "Home" },
    { path: "/:category/:pid/:title", breadcrumb: title },
  ];

  
  const breadcrumb = useBreadcrumbs(routes);
  
  return (
    <div className="text-sm flex items-center gap-1">
      {breadcrumb
        ?.filter((el) => !el.match.route === false)
        .map(({ match, breadcrumb }, index, self) => (
          <Link
            className="flex gap-1 items-center hover:text-main"
            key={match.pathname}
            to={match.pathname}
          >
            <span className="capitalize">{breadcrumb}</span>
            {index !== self.length - 1 && <IoIosArrowForward />}
          </Link>
        ))}
    </div>
  );
};

export default Breadcrumb;
