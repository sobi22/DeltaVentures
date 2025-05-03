import React from "react";
import { CAvatar, CDropdownItem } from "@coreui/react";
import { cilTrash } from "@coreui/icons";
import Profile from "../../../assets/images/navbar/temporary_no_pic_avatar.jpg";
import CIcon from "@coreui/icons-react";
import { FormatUTCDate, FormatUTCTimeToLocal } from "../../../utils/formaters";

export default function Notifcation({
  notification,
  handleDeleteNotification,
  handleViewNotification,
}) {
  
  return (
    <CDropdownItem>
      <div className={`note-item ${notification?.seen ? "" : "active"}`}>
        <span className="delete-icon" title="Delete">
          <CIcon
            icon={cilTrash}
            onClick={(_) => handleDeleteNotification(notification)}
          />
        </span>
        <div className="d-flex">
          <div className="note-icon on">
            <CAvatar src={notification?.profile_image_uri || Profile} />
          </div>
          <div className="description">
            <h2 className="title" onClick={(_) => handleViewNotification(notification)}>{notification?.username}</h2>
            <h4 className="designation">{notification?.customer}</h4>
          </div>
        </div>
        <p className="address">{notification?.message}</p>
        <p className="date">{`${FormatUTCTimeToLocal(notification?.created_date)}`}</p>
      </div>
    </CDropdownItem>
  );
}
