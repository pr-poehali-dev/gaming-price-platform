import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const SettingsView = () => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [pushEnabled, setPushEnabled] = useState(true);
  const [lastSeenPrivacy, setLastSeenPrivacy] = useState("Все");
  const [readReceiptsPrivacy, setReadReceiptsPrivacy] = useState("Все");
  const { toast } = useToast();

  const handleToggleSound = () => {
    setSoundEnabled(!soundEnabled);
    toast({
      title: "Зву сообщений",
      description: `Зву ${!soundEnabled ? "включен" : "выключен"}`,
    });
  };

  const handleTogglePush = () => {
    setPushEnabled(!pushEnabled);
    toast({
      title: "Push-уведомления",
      description: `Push-уведомления ${!pushEnabled ? "включены" : "выключены"}`,
    });
  };

  const handleChangePassword = () => {
    toast({
      title: "Изменение пароля",
      description: "Открыта форма смены пароля",
    });
  };

  const handleLogout = () => {
    toast({
      title: "Выход",
      description: "Вы вышли из аккаунта",
      variant: "destructive",
    });
  };
  return (
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
                <Button onClick={handleToggleSound} variant="outline" size="sm">
                  {soundEnabled ? "Включено" : "Выключено"}
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Push-уведомления</span>
                <Button onClick={handleTogglePush} variant="outline" size="sm">
                  {pushEnabled ? "Включено" : "Выключено"}
                </Button>
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
              <Button onClick={handleChangePassword} variant="outline" className="w-full justify-start">
                <Icon name="Key" size={18} className="mr-2" />
                Изменить пароль
              </Button>
              <Button onClick={handleLogout} variant="outline" className="w-full justify-start text-destructive">
                <Icon name="LogOut" size={18} className="mr-2" />
                Выйти из аккаунта
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;