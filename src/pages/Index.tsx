import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

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
          <div className="w-80 bg-card border-r border-border flex flex-col">
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Чаты</h2>
                <Button size="icon" variant="ghost">
                  <Icon name="PenSquare" size={20} />
                </Button>
              </div>

              <div className="relative">
                <Icon
                  name="Search"
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <Input
                  placeholder="Поиск..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-input border-border"
                />
              </div>
            </div>

            <ScrollArea className="flex-1">
              <div className="space-y-1 px-2">
                {filteredChats.map((chat) => (
                  <button
                    key={chat.id}
                    onClick={() => setSelectedChat(chat.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg smooth-hover ${
                      selectedChat === chat.id ? "bg-muted" : ""
                    }`}
                  >
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={chat.avatar} />
                        <AvatarFallback>{chat.name[0]}</AvatarFallback>
                      </Avatar>
                      {chat.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-card" />
                      )}
                    </div>

                    <div className="flex-1 text-left overflow-hidden">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium truncate">{chat.name}</span>
                        <span className="text-xs text-muted-foreground">{chat.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {chat.lastMessage}
                      </p>
                    </div>

                    {chat.unread > 0 && (
                      <Badge className="bg-primary text-primary-foreground">
                        {chat.unread}
                      </Badge>
                    )}
                  </button>
                ))}
              </div>
            </ScrollArea>
          </div>

          <div className="flex-1 flex flex-col">
            {selectedChatData ? (
              <>
                <div className="h-16 border-b border-border flex items-center justify-between px-6">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={selectedChatData.avatar} />
                        <AvatarFallback>{selectedChatData.name[0]}</AvatarFallback>
                      </Avatar>
                      {selectedChatData.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold">{selectedChatData.name}</h3>
                      <p className="text-xs text-muted-foreground">
                        {selectedChatData.online ? "в сети" : "был(а) недавно"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Icon name="Phone" size={20} />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Icon name="Video" size={20} />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Icon name="MoreVertical" size={20} />
                    </Button>
                  </div>
                </div>

                <ScrollArea className="flex-1 p-6">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sent ? "justify-end" : "justify-start"}`}
                      >
                        <div className="flex flex-col gap-1 max-w-[70%]">
                          <div
                            className={`chat-bubble ${
                              message.sent ? "chat-bubble-sent" : "chat-bubble-received"
                            }`}
                          >
                            {message.text}
                          </div>
                          <span
                            className={`text-xs text-muted-foreground ${
                              message.sent ? "text-right" : "text-left"
                            }`}
                          >
                            {message.time}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                <div className="p-4 border-t border-border">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Icon name="Paperclip" size={20} />
                    </Button>
                    <Input
                      placeholder="Введите сообщение..."
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      className="flex-1 bg-input border-border"
                    />
                    <Button variant="ghost" size="icon">
                      <Icon name="Smile" size={20} />
                    </Button>
                    <Button onClick={handleSendMessage} size="icon" className="bg-primary">
                      <Icon name="Send" size={20} />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto">
                    <Icon name="MessageCircle" size={40} className="text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Выберите чат</h3>
                    <p className="text-muted-foreground">
                      Выберите чат из списка, чтобы начать общение
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {activeView === "profile" && (
        <div className="flex-1 bg-gradient-to-br from-background via-background to-primary/5 overflow-y-auto">
          <div className="max-w-5xl mx-auto p-8">
            <div className="relative">
              <div className="h-48 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-3xl mb-[-80px]" />
              
              <div className="relative px-8">
                <div className="flex items-end gap-6 mb-8">
                  <div className="relative">
                    <Avatar className="w-40 h-40 border-4 border-background">
                      <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=You" />
                      <AvatarFallback>Я</AvatarFallback>
                    </Avatar>
                    <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-background" />
                  </div>
                  
                  <div className="flex-1 pb-4">
                    <h2 className="text-4xl font-bold mb-1">Ваше Имя</h2>
                    <p className="text-lg text-muted-foreground">@username</p>
                  </div>

                  <Button className="mb-4 bg-primary hover:bg-primary/90" size="lg">
                    <Icon name="Edit" size={20} className="mr-2" />
                    Редактировать
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-card rounded-2xl p-6 border border-border hover:border-primary/50 transition-colors">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                        <Icon name="Mail" size={24} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-medium">example@mail.com</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card rounded-2xl p-6 border border-border hover:border-secondary/50 transition-colors">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
                        <Icon name="Phone" size={24} className="text-secondary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Телефон</p>
                        <p className="font-medium">+7 (999) 123-45-67</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card rounded-2xl p-6 border border-border hover:border-accent/50 transition-colors">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                        <Icon name="MapPin" size={24} className="text-accent" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Локация</p>
                        <p className="font-medium">Москва, Россия</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div className="bg-card rounded-2xl p-6 border border-border">
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Icon name="User" size={22} className="text-primary" />
                      О себе
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Люблю общаться и находить новых друзей. Увлекаюсь технологиями, 
                      путешествиями и фотографией. Всегда открыт к новым знакомствам!
                    </p>
                  </div>

                  <div className="bg-card rounded-2xl p-6 border border-border">
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Icon name="BarChart3" size={22} className="text-secondary" />
                      Статистика
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <p className="text-3xl font-bold text-primary">42</p>
                        <p className="text-sm text-muted-foreground">Чатов</p>
                      </div>
                      <div className="text-center">
                        <p className="text-3xl font-bold text-secondary">1.2k</p>
                        <p className="text-sm text-muted-foreground">Сообщений</p>
                      </div>
                      <div className="text-center">
                        <p className="text-3xl font-bold text-accent">156</p>
                        <p className="text-sm text-muted-foreground">Друзей</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-card rounded-2xl p-6 border border-border mt-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Icon name="Settings" size={22} className="text-primary" />
                    Быстрые действия
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                      <Icon name="Shield" size={24} />
                      <span className="text-sm">Приватность</span>
                    </Button>
                    <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                      <Icon name="Bell" size={24} />
                      <span className="text-sm">Уведомления</span>
                    </Button>
                    <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                      <Icon name="Palette" size={24} />
                      <span className="text-sm">Тема</span>
                    </Button>
                    <Button variant="outline" className="h-auto py-4 flex-col gap-2 text-destructive border-destructive/50">
                      <Icon name="LogOut" size={24} />
                      <span className="text-sm">Выход</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeView === "settings" && (
        <div className="flex-1 p-8">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold">Настройки</h2>

            <div className="space-y-4">
              <div className="p-4 bg-card rounded-lg border border-border">
                <h3 className="font-semibold mb-2">Уведомления</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Управление уведомлениями приложения
                </p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Звук сообщений</span>
                    <Button variant="outline" size="sm">Включено</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Push-уведомления</span>
                    <Button variant="outline" size="sm">Включено</Button>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-card rounded-lg border border-border">
                <h3 className="font-semibold mb-2">Приватность</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Настройки конфиденциальности
                </p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Последний визит</span>
                    <Button variant="outline" size="sm">Все</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Чтение сообщений</span>
                    <Button variant="outline" size="sm">Все</Button>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-card rounded-lg border border-border">
                <h3 className="font-semibold mb-2">Аккаунт</h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Icon name="Key" size={18} className="mr-2" />
                    Изменить пароль
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-destructive">
                    <Icon name="LogOut" size={18} className="mr-2" />
                    Выйти из аккаунта
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;