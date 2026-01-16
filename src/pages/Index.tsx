import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ChatSidebar from "@/components/ChatSidebar";
import ChatWindow from "@/components/ChatWindow";
import ProfileView from "@/components/ProfileView";
import SettingsView from "@/components/SettingsView";

interface Message {
  id: number;
  text: string;
  sent: boolean;
  time: string;
}

interface Chat {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
}

const Index = () => {
  const [activeView, setActiveView] = useState<"chats" | "profile" | "settings">("chats");
  const [selectedChat, setSelectedChat] = useState<number | null>(1);
  const [messageInput, setMessageInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const chats: Chat[] = [
    {
      id: 1,
      name: "Анна Смирнова",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anna",
      lastMessage: "Отлично, встретимся завтра!",
      time: "14:32",
      unread: 2,
      online: true,
    },
    {
      id: 2,
      name: "Максим Петров",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Max",
      lastMessage: "Привет! Как дела?",
      time: "12:15",
      unread: 0,
      online: false,
    },
    {
      id: 3,
      name: "Команда разработки",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Team",
      lastMessage: "Новая задача в проекте",
      time: "Вчера",
      unread: 5,
      online: true,
    },
    {
      id: 4,
      name: "Елена Волкова",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
      lastMessage: "Спасибо за помощь!",
      time: "Вчера",
      unread: 0,
      online: true,
    },
  ];

  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Привет! Как проект продвигается?", sent: false, time: "14:25" },
    { id: 2, text: "Привет! Все отлично, почти закончил", sent: true, time: "14:28" },
    { id: 3, text: "Супер! Можем встретиться завтра?", sent: false, time: "14:30" },
    { id: 4, text: "Отлично, встретимся завтра!", sent: true, time: "14:32" },
  ]);

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        text: messageInput,
        sent: true,
        time: new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages([...messages, newMessage]);
      setMessageInput("");
    }
  };

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedChatData = chats.find((chat) => chat.id === selectedChat);

  return (
    <div className="h-screen bg-background text-foreground flex">
      <aside className="w-20 bg-sidebar border-r border-sidebar-border flex flex-col items-center py-4 gap-4">
        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-4">
          <Icon name="MessageCircle" size={24} className="text-primary-foreground" />
        </div>

        <Separator className="w-12" />

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setActiveView("chats")}
          className={`w-12 h-12 ${
            activeView === "chats" ? "bg-sidebar-accent" : ""
          }`}
        >
          <Icon name="MessagesSquare" size={22} />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setActiveView("profile")}
          className={`w-12 h-12 ${
            activeView === "profile" ? "bg-sidebar-accent" : ""
          }`}
        >
          <Icon name="User" size={22} />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setActiveView("settings")}
          className={`w-12 h-12 ${
            activeView === "settings" ? "bg-sidebar-accent" : ""
          }`}
        >
          <Icon name="Settings" size={22} />
        </Button>

        <div className="mt-auto">
          <Button variant="ghost" size="icon" className="w-12 h-12">
            <Icon name="Moon" size={22} />
          </Button>
        </div>
      </aside>

      {activeView === "chats" && (
        <>
          <ChatSidebar
            chats={filteredChats}
            selectedChat={selectedChat}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onChatSelect={setSelectedChat}
          />
          <ChatWindow
            selectedChatData={selectedChatData}
            messages={messages}
            messageInput={messageInput}
            onMessageInputChange={setMessageInput}
            onSendMessage={handleSendMessage}
          />
        </>
      )}

      {activeView === "profile" && <ProfileView />}

      {activeView === "settings" && <SettingsView />}
    </div>
  );
};

export default Index;
