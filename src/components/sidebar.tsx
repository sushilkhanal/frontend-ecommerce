import React, { ReactNode } from "react";

type SidebarProps = {
  children: ReactNode;
};

function Sidebar({ children }: SidebarProps) {
  return (
    <div style={{ display: "flex", flexDirection: "row", height: "100vh" }}>
      <div className="position-sticky">
        <div className="list-group list-group-flush mx-3 mt-4">
          <a
            href="#"
            className="list-group-item list-group-item-action py-2 ripple"
            aria-current="page"
          >
            <i className=""></i>
            <span className="fw-bold">Item Categories</span>
          </a>
          <a
            href="#"
            className="list-group-item list-group-item-action py-2 ripple active"
          >
            <i className="fa-fw me-3"></i>
            <span>Electronics</span>
          </a>
          <a
            href="#"
            className="list-group-item list-group-item-action py-2 ripple"
          >
            <i className="fa-fw me-3"></i>
            <span>Clothing</span>
          </a>
          <a
            href="#"
            className="list-group-item list-group-item-action py-2 ripple"
          >
            <i className="fa-fw me-3"></i>
            <span>Home & Kitchen</span>
          </a>
          <a
            href="#"
            className="list-group-item list-group-item-action py-2 ripple"
          >
            <i className="fa-fw me-3"></i>
            <span>Stationery</span>
          </a>
          <a
            href="#"
            className="list-group-item list-group-item-action py-2 ripple"
          >
            <i className="fa-fw me-3"></i>
            <span>Toys</span>
          </a>
          <a
            href="#"
            className="list-group-item list-group-item-action py-2 ripple"
          >
            <i className="fa-fw me-3"></i>
            <span>Books</span>
          </a>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}

export default Sidebar;
