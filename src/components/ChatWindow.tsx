import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

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
  isGroup?: boolean;
  members?: number;
}

interface ChatWindowProps {
  selectedChatData: Chat | undefined;
  messages: Message[];
  messageInput: string;
  onMessageInputChange: (value: string) => void;
  onSendMessage: () => void;
}

const ChatWindow = ({
  selectedChatData,
  messages,
  messageInput,
  onMessageInputChange,
  onSendMessage,
}: ChatWindowProps) => {
  return (
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
                onChange={(e) => onMessageInputChange(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    onSendMessage();
                  }
                }}
                className="flex-1 bg-input border-border"
              />
              <Button variant="ghost" size="icon">
                <Icon name="Smile" size={20} />
              </Button>
              <Button onClick={onSendMessage} size="icon" className="bg-primary">
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
  );
};

export default ChatWindow;