import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface NewChatDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateChat: (name: string, isGroup: boolean) => void;
}

const NewChatDialog = ({ open, onOpenChange, onCreateChat }: NewChatDialogProps) => {
  const [chatName, setChatName] = useState("");
  const [activeTab, setActiveTab] = useState("personal");

  const handleCreate = () => {
    if (chatName.trim()) {
      onCreateChat(chatName, activeTab === "group");
      setChatName("");
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Новый чат</DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="personal">
              <Icon name="User" size={16} className="mr-2" />
              Личный
            </TabsTrigger>
            <TabsTrigger value="group">
              <Icon name="Users" size={16} className="mr-2" />
              Группа
            </TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-4 mt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Имя собеседника</label>
              <Input
                placeholder="Введите имя..."
                value={chatName}
                onChange={(e) => setChatName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleCreate();
                  }
                }}
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Создайте новый личный чат с пользователем
            </p>
          </TabsContent>

          <TabsContent value="group" className="space-y-4 mt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Название группы</label>
              <Input
                placeholder="Введите название..."
                value={chatName}
                onChange={(e) => setChatName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleCreate();
                  }
                }}
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Создайте групповой чат для общения с несколькими людьми
            </p>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Отмена
          </Button>
          <Button onClick={handleCreate} disabled={!chatName.trim()}>
            <Icon name="Plus" size={16} className="mr-2" />
            Создать
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewChatDialog;
