import React, { useEffect, useState } from "react";
import Notifcations from "./notifcations";
import { useSelector } from "react-redux";
import useProfile from "../../../hooks/useProfile";

export default function NotificationsDropdown({data,notificationList, loading, setLoading, notifiCount, handleFetchData}) {
  const [{ user }] = useSelector((state) => [state.authUser]);
  const { clearAllNotifications, getNotifications, updateNotification } = useProfile();


  const handleDeleteNotification = (notification) => {
    setLoading(true);
    updateNotification({ id: notification?.id, is_deleted: true })
      .then((_) => handleFetchData())
      .catch((error) => console.log("handleClearAllNotifications", error))
      .finally((_) => setLoading(false));
  };

  const handleClearAllNotifications = () => {
    setLoading(true);
    clearAllNotifications({
      user_id: user?.id,
      notifications: notificationList?.map((c) => c?.id),
    })
      .then((_) => handleFetchData())
      .catch((error) => console.log("handleClearAllNotifications", error))
      .finally((_) => setLoading(false));
  };

  const handleViewProject = (project_id) => {
    handleFetchData();
    window.open(`/projects/view/${project_id}/`, "_blank");
  };

  const handleViewNotification = (notification) => {
    setLoading(true);
    updateNotification({ id: notification?.id, is_seen: true })
      .then((_) => handleViewProject(notification?.project_id))
      .catch((error) => console.log("handleViewComment", error))
      .finally((_) => setLoading(false));
  };

  return (
    <Notifcations
      notifiCount={notifiCount?.notification_count}
      data={data}
      loading={loading}
      setLoading={setLoading}
      handleClearAllNotifications={handleClearAllNotifications}
      handleDeleteNotification={handleDeleteNotification}
      handleViewNotification={handleViewNotification}
    />
  );
}
