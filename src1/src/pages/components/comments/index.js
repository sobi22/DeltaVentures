import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Comments from "./comments";
import useProfile from "../../../hooks/useProfile";

export default function CommentsDropdown({ data, conversationList, loading, setLoading, chatCount, handleFetchData }) {
  
  const [{ user }] = useSelector((state) => [state.authUser]);
  const { getConversations, updateConversation, clearAllConversations } = useProfile();

  const handleDeleteComment = (conversation) => {
    setLoading(true);
    updateConversation({ id: conversation?.id, is_deleted: true }).then((_) => handleFetchData()).catch((error) => console.log("handleClearAllNotifications", error)).finally((_) => setLoading(false));
  };

  const handleClearAllComments = () => {
    setLoading(true);
    clearAllConversations({ user_id: user?.id, comments: conversationList?.map((c) => c?.id) }).catch((error) => console.log("handleClearAllComments", error)).finally((_) => setLoading(false));
  };

  const handleViewProject = (project_id) => {
    handleFetchData();
    window.open(`/projects/view/${project_id}/`, "_blank");
  };

  const handleViewComment = (conversation) => {
    setLoading(true);
    updateConversation({ id: conversation?.id, is_seen: true }).then((_) => handleViewProject(conversation?.project_id)).catch((error) => console.log("handleViewComment", error)).finally((_) => setLoading(false));
  };

  return <Comments chatCount={chatCount} data={data} loading={loading} setLoading={setLoading} handleClearAllComments={handleClearAllComments} handleDeleteComment={handleDeleteComment} handleViewComment={handleViewComment} />
}
