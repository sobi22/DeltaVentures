import React, { useState } from "react";
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
import CommentIcon from "../../../assets/images/navbar/comment-icon.png";
import Comment from "./comment";
import { Link } from "react-router-dom";

export default function Comments({ chatCount, data, handleClearAllComments, handleDeleteComment, loading, setLoading, handleViewComment, }) {

  return (
    <CDropdown variant="nav-item" autoClose="outside" >
      <CDropdownToggle placement="bottom-end" caret={false}>
        <img src={CommentIcon} className="comments" />
        {data?.length ? <CBadge>{chatCount}</CBadge> : false}
      </CDropdownToggle>
      <CDropdownMenu
        className="notification-dropdown comment pt-0"
        placement="bottom-end"
      >
        <CDropdownHeader className="py-2">
          Chat
          <CDropdownToggle caret={false}><CCloseButton /></CDropdownToggle>
        </CDropdownHeader>
        <div className="total-count">
          <h2>{`${chatCount} Unread Chats`}</h2>
          <a href="#" onClick={handleClearAllComments}>
            Clear All
          </a>
        </div>
        <div className="notify-block">
          {data?.map((comment, index) => (
            <Comment
              key={index}
              comment={comment}
              loading={loading}
              setLoading={setLoading}
              handleDeleteComment={handleDeleteComment}
              handleViewComment={handleViewComment}
            />
          ))}
        </div>
        <CFooter>
          <CDropdownToggle caret={false}>
            <Link to="/comments">
              {" "}
              View All Chats{" "}
            </Link>
          </CDropdownToggle>
        </CFooter>
        <CDropdownDivider />
      </CDropdownMenu >
    </CDropdown >
  );
}
