import { ReactNode, useState } from "react";
import { Link as RouterLink } from "react-router-dom";

type SidebarProps = {
  children: ReactNode;
};

type Link = {
  text: string;
  to: string;
  active: boolean;
  onClick: () => void;
};

function Sidebar({ children }: SidebarProps) {
  const [links, setLinks] = useState<Link[]>([
    {
      text: "Electronics",
      to: "/electronics",
      active: true,
      onClick: () => handleLinkClick(0),
    },
    {
      text: "Clothing",
      to: "/clothing",
      active: false,
      onClick: () => handleLinkClick(1),
    },
    {
      text: "Home & Kitchen",
      to: "/homeandkitchen",
      active: false,
      onClick: () => handleLinkClick(2),
    },
    {
      text: "Stationery",
      to: "/stationery",
      active: false,
      onClick: () => handleLinkClick(3),
    },
    {
      text: "Toys",
      to: "/toys",
      active: false,
      onClick: () => handleLinkClick(4),
    },
    {
      text: "Books",
      to: "/books",
      active: false,
      onClick: () => handleLinkClick(5),
    },
  ]);

  const handleLinkClick = (index: number) => {
    const updatedLinks = links.map((link, i) => ({
      ...link,
      active: i === index,
    }));
    setLinks(updatedLinks);
  };

  return (
    <div style={{ display: "flex", flexDirection: "row", height: "100vh" }}>
      <div className="position-sticky">
        <form className="form-inline">
          <div className="input-group">
            <input
              className="form-control mx-1 mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-success my-2 my-sm-0"
                type="submit"
              >
                <svg
                  className="feather feather-search"
                  fill="none"
                  height="18"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="18"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" x2="16.65" y1="21" y2="16.65" />
                </svg>
              </button>
            </div>
          </div>
        </form>

        <h3
          style={{ textAlign: "center", marginTop: "10px", fontSize: "1rem" }}
        >
          Shop by Category
        </h3>
        <div className="list-group list-group-flush mx-3 mt-4">
          {links.map((link, index) => (
            <RouterLink
              key={index}
              to={link.to}
              className={`list-group-item list-group-item-action py-2 ${
                link.active ? "active" : ""
              }`}
              onClick={link.onClick}
            >
              <i className="fa-fw me-3"></i>
              <span>{link.text}</span>
            </RouterLink>
          ))}
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}

export default Sidebar;
