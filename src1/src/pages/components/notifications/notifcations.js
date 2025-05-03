import React from "react";
import {
  CBadge,
  CDropdown,
  CDropdownDivider,
  CFooter,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CCloseButton,
} from "@coreui/react";
import { cilBell } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import Notification from "./notification";
import { Link } from "react-router-dom";

export default function Notifications({
  data,
  handleClearAllNotifications,
  handleDeleteNotification,
  loading,
  setLoading,
  notifiCount,
  handleViewNotification,
}) {

  return (
    <CDropdown variant="nav-item" autoClose="outside">
      <CDropdownToggle placement="bottom-end" caret={false}>
        <CIcon icon={cilBell} />
        {data?.length ? <CBadge>{notifiCount}</CBadge> : false}
      </CDropdownToggle>
      <CDropdownMenu
        className="notification-dropdown pt-0"
        placement="bottom-end"
      >
        <CDropdownHeader className="py-2">
          Notifications
          <CDropdownToggle caret={false}><CCloseButton /></CDropdownToggle>
        </CDropdownHeader>
        <div className="total-count">
          <h2>{`${notifiCount} Unread Notifications`}</h2>
          <a href="#" onClick={handleClearAllNotifications}>
            Clear All
          </a>
        </div>
        <div className="notify-block">
          {data?.map((notification, index) => (
            <Notification
              key={index}
              notification={notification}
              loading={loading}
              setLoading={setLoading}
              handleDeleteNotification={handleDeleteNotification}
              handleViewNotification={handleViewNotification}
            />
          ))}
        </div>
        <CFooter>
          <CDropdownToggle caret={false}>
            <Link to="/notifications">
              {" "}
              View All Notification{" "}
            </Link>
          </CDropdownToggle>
        </CFooter>
        <CDropdownDivider />
      </CDropdownMenu>
    </CDropdown>
  );
}
