import React from "react";
import { CAvatar, CDropdownItem } from "@coreui/react";
import { cilTrash } from "@coreui/icons";
import Profile from "../../../assets/images/navbar/temporary_no_pic_avatar.jpg";
import CIcon from "@coreui/icons-react";
import { FormatUTCDate, FormatUTCTimeToLocal } from "../../../utils/formaters";

export default function Comment({ comment, handleDeleteComment, handleViewComment }) {
  
  return (
    <CDropdownItem >
      <div className={`note-item ${comment?.seen ? "" : "active"}`}>
        <span className="delete-icon" title="Delete">
          <CIcon
            icon={cilTrash}
            onClick={(_) => handleDeleteComment(comment)}
          />
        </span>
        <div className="d-flex">
          <div className="note-icon on">
            <CAvatar src={comment?.profile_image_uri || Profile} />
          </div>
          <div className="description">
            <h2 className="title" onClick={(_) => handleViewComment(comment)}>{comment?.username}</h2>
            <h4 className="designation">{comment?.customer}</h4>
          </div>
        </div>
        <p className="address">{comment?.message}</p>
        <p className="date">{`${FormatUTCTimeToLocal(comment?.created_date)}`}</p>
      </div>
    </CDropdownItem>
  );
}
