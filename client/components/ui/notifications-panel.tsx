import React, { useState } from "react";
import {
  X,
  Check,
  Reply,
  Eye,
  UserPlus,
  FileText,
  MessageCircle,
  Settings,
  Trash2,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface NotificationUser {
  id: string;
  name: string;
  avatar?: string;
  initials: string;
}

interface NotificationAction {
  id: string;
  label: string;
  type: "primary" | "secondary" | "success" | "warning";
  icon?: React.ReactNode;
}

interface Notification {
  id: string;
  type: "comment" | "follow" | "assignment" | "like" | "file" | "system";
  user: NotificationUser;
  action: string;
  target?: string;
  timestamp: string;
  isRead: boolean;
  hasActions?: boolean;
  actions?: NotificationAction[];
  fileInfo?: {
    name: string;
    size: string;
  };
}

interface NotificationsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const sampleNotifications: Notification[] = [
  {
    id: "1",
    type: "comment",
    user: {
      id: "1",
      name: "Tina Hernandez",
      initials: "TH",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b332c5cd?w=32&h=32&fit=crop&crop=face",
    },
    action: "replied to your comment in",
    target: "Design",
    timestamp: "3 min ago",
    isRead: false,
    hasActions: true,
    actions: [
      {
        id: "reply",
        label: "Reply",
        type: "secondary",
        icon: <Reply className="w-4 h-4" />,
      },
      {
        id: "view",
        label: "View",
        type: "secondary",
        icon: <Eye className="w-4 h-4" />,
      },
    ],
  },
  {
    id: "2",
    type: "follow",
    user: {
      id: "2",
      name: "Alyssa Sherman",
      initials: "AS",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
    },
    action: "followed you",
    timestamp: "5 min ago",
    isRead: false,
    hasActions: true,
    actions: [{ id: "follow-back", label: "Follow Back", type: "primary" }],
  },
  {
    id: "3",
    type: "assignment",
    user: {
      id: "3",
      name: "Kelvin Hill",
      initials: "KH",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
    },
    action: "assigned you a task",
    target: "#BE3627",
    timestamp: "28 March, 2024, 5:42 PM",
    isRead: false,
  },
  {
    id: "4",
    type: "like",
    user: {
      id: "4",
      name: "Vanessa Lee",
      initials: "VL",
      avatar:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=32&h=32&fit=crop&crop=face",
    },
    action: "liked your comment",
    timestamp: "28 March, 2024, 5:40 PM",
    isRead: true,
  },
  {
    id: "5",
    type: "file",
    user: {
      id: "5",
      name: "Blanche Phillips",
      initials: "BP",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=32&h=32&fit=crop&crop=face",
    },
    action: "added file to",
    target: "Beyond UI",
    timestamp: "22 March, 2024, 7:20 AM",
    isRead: true,
    fileInfo: {
      name: "FinalFinalFinal123.psd",
      size: "1.7 MB",
    },
  },
];

const getNotificationIcon = (type: Notification["type"]) => {
  switch (type) {
    case "comment":
      return <MessageCircle className="w-3 h-3" />;
    case "follow":
      return <UserPlus className="w-3 h-3" />;
    case "assignment":
      return <Settings className="w-3 h-3" />;
    case "like":
      return <Check className="w-3 h-3" />;
    case "file":
      return <FileText className="w-3 h-3" />;
    default:
      return <Settings className="w-3 h-3" />;
  }
};

const getActionButtonClass = (type: NotificationAction["type"]) => {
  switch (type) {
    case "primary":
      return "bg-blue-600 text-white hover:bg-blue-700";
    case "secondary":
      return "bg-gray-100 text-gray-700 hover:bg-gray-200";
    case "success":
      return "bg-green-600 text-white hover:bg-green-700";
    case "warning":
      return "bg-yellow-600 text-white hover:bg-yellow-700";
    default:
      return "bg-gray-100 text-gray-700 hover:bg-gray-200";
  }
};

export function NotificationsPanel({
  isOpen,
  onClose,
}: NotificationsPanelProps) {
  const [notifications, setNotifications] =
    useState<Notification[]>(sampleNotifications);
  const [activeTab, setActiveTab] = useState<"all" | "unread">("all");

  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const filteredNotifications =
    activeTab === "unread"
      ? notifications.filter((n) => !n.isRead)
      : notifications;

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
  };

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 right-0 w-80 h-screen bg-white shadow-xl border-l border-gray-200 z-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
          {unreadCount > 0 && (
            <Badge variant="secondary" className="bg-blue-100 text-blue-700">
              {unreadCount}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={markAllAsRead}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            <Check className="w-4 h-4" />
            Mark all as read
          </button>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-md transition-colors"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab("all")}
          className={cn(
            "flex-1 px-4 py-3 text-sm font-medium border-b-2 transition-colors",
            activeTab === "all"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700",
          )}
        >
          All Notifications
        </button>
        <button
          onClick={() => setActiveTab("unread")}
          className={cn(
            "flex-1 px-4 py-3 text-sm font-medium border-b-2 transition-colors",
            activeTab === "unread"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700",
          )}
        >
          Unread
        </button>
      </div>

      {/* Notifications List */}
      <div className="flex-1 overflow-y-auto">
        {filteredNotifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500">
            <Check className="w-8 h-8 mb-2" />
            <p className="text-sm">
              {activeTab === "unread"
                ? "No unread notifications"
                : "No notifications"}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={cn(
                  "relative p-4 hover:bg-gray-50 transition-colors group",
                  !notification.isRead && "bg-blue-50/30",
                )}
              >
                {/* Delete button */}
                <button
                  onClick={() => deleteNotification(notification.id)}
                  className="absolute top-2 right-2 p-1 opacity-0 group-hover:opacity-100 hover:bg-gray-200 rounded-md transition-all"
                >
                  <Trash2 className="w-3 h-3 text-gray-400" />
                </button>

                <div className="flex items-start gap-3">
                  {/* Avatar with notification icon */}
                  <div className="relative flex-shrink-0">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={notification.user.avatar} />
                      <AvatarFallback className="text-xs bg-gray-200">
                        {notification.user.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center border border-gray-200">
                      {getNotificationIcon(notification.type)}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 mb-1">
                      <span className="font-medium text-gray-900 text-sm">
                        {notification.user.name}
                      </span>
                      <div className="flex items-center text-sm text-gray-600">
                        <span>{notification.action}</span>
                        {notification.target && (
                          <>
                            <span className="mx-1">in</span>
                            <span className="font-medium text-blue-600">
                              {notification.target}
                            </span>
                          </>
                        )}
                      </div>
                      {!notification.isRead && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full ml-auto flex-shrink-0"></div>
                      )}
                    </div>

                    <p className="text-xs text-gray-500 mb-2">
                      {notification.timestamp}
                    </p>

                    {/* File info */}
                    {notification.fileInfo && (
                      <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-md mb-2">
                        <FileText className="w-4 h-4 text-gray-400" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-gray-900 truncate">
                            {notification.fileInfo.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {notification.fileInfo.size}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    {notification.hasActions && notification.actions && (
                      <div className="flex gap-2 mt-2">
                        {notification.actions.map((action) => (
                          <Button
                            key={action.id}
                            size="sm"
                            className={cn(
                              "h-7 px-2 text-xs",
                              getActionButtonClass(action.type),
                            )}
                            onClick={() => markAsRead(notification.id)}
                          >
                            {action.icon}
                            {action.label}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
