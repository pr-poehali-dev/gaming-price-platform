import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface Chat {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  isGroup?: boolean;
  members?: number;
}

interface ChatSidebarProps {
  chats: Chat[];
  selectedChat: number | null;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onChatSelect: (id: number) => void;
  onNewChatClick: () => void;
}

const ChatSidebar = ({
  chats,
  selectedChat,
  searchQuery,
  onSearchChange,
  onChatSelect,
  onNewChatClick,
}: ChatSidebarProps) => {
  return (
    <div className="w-80 bg-card border-r border-border flex flex-col">
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Чаты</h2>
          <Button size="icon" variant="ghost" onClick={onNewChatClick}>
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
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-input border-border"
          />
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="space-y-1 px-2">
          {chats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => onChatSelect(chat.id)}
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
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <span className="font-medium truncate">{chat.name}</span>
                    {chat.isGroup && (
                      <Badge variant="outline" className="text-xs px-1.5 py-0">
                        <Icon name="Users" size={12} className="mr-1" />
                        {chat.members}
                      </Badge>
                    )}
                  </div>
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
  );
};

export default ChatSidebar;