import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

const ProfileView = () => {
  const { toast } = useToast();

  const handleEdit = () => {
    toast({
      title: "Редактирование профиля",
      description: "Функция редактирования профиля в разработке",
    });
  };

  const handlePrivacy = () => {
    toast({
      title: "Настройки приватности",
      description: "Открыты настройки конфиденциальности",
    });
  };

  const handleNotifications = () => {
    toast({
      title: "Уведомления",
      description: "Настройки уведомлений",
    });
  };

  const handleTheme = () => {
    document.documentElement.classList.toggle('dark');
    toast({
      title: "Тема изменена",
      description: "Тема приложения успешно изменена",
    });
  };

  const handleLogout = () => {
    toast({
      title: "Выход из аккаунта",
      description: "Вы вышли из системы",
      variant: "destructive",
    });
  };
  return (
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

              <Button onClick={handleEdit} className="mb-4 bg-primary hover:bg-primary/90" size="lg">
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
                <Button onClick={handlePrivacy} variant="outline" className="h-auto py-4 flex-col gap-2">
                  <Icon name="Shield" size={24} />
                  <span className="text-sm">Приватность</span>
                </Button>
                <Button onClick={handleNotifications} variant="outline" className="h-auto py-4 flex-col gap-2">
                  <Icon name="Bell" size={24} />
                  <span className="text-sm">Уведомления</span>
                </Button>
                <Button onClick={handleTheme} variant="outline" className="h-auto py-4 flex-col gap-2">
                  <Icon name="Palette" size={24} />
                  <span className="text-sm">Тема</span>
                </Button>
                <Button onClick={handleLogout} variant="outline" className="h-auto py-4 flex-col gap-2 text-destructive border-destructive/50">
                  <Icon name="LogOut" size={24} />
                  <span className="text-sm">Выход</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;