import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const featuredGames = [
    {
      id: 1,
      title: "Cyber Warfare",
      price: 599,
      discount: 20,
      image: "https://cdn.poehali.dev/projects/35332ebd-fd49-4a15-947a-e8e837eac3aa/files/d590fbc1-ffcb-466d-92a8-53a5f795bf18.jpg",
      tags: ["Экшен", "Шутер", "Киберпанк"],
      rating: 4.8,
    },
    {
      id: 2,
      title: "Mystic Legends",
      price: 899,
      discount: 15,
      image: "https://cdn.poehali.dev/projects/35332ebd-fd49-4a15-947a-e8e837eac3aa/files/67e3b357-17b9-4647-ad90-c11e9c617937.jpg",
      tags: ["RPG", "Фэнтези", "Приключения"],
      rating: 4.9,
    },
    {
      id: 3,
      title: "Space Command",
      price: 749,
      discount: 25,
      image: "https://cdn.poehali.dev/projects/35332ebd-fd49-4a15-947a-e8e837eac3aa/files/7f3ff1ce-ac0d-4821-8c79-c34e4d73dd7b.jpg",
      tags: ["Стратегия", "Sci-Fi", "Космос"],
      rating: 4.7,
    },
  ];

  const catalogGames = [
    ...featuredGames,
    {
      id: 4,
      title: "Desert Storm",
      price: 499,
      discount: 0,
      image: "https://cdn.poehali.dev/projects/35332ebd-fd49-4a15-947a-e8e837eac3aa/files/d590fbc1-ffcb-466d-92a8-53a5f795bf18.jpg",
      tags: ["Экшен", "Тактика"],
      rating: 4.5,
    },
    {
      id: 5,
      title: "Dragon Quest",
      price: 999,
      discount: 10,
      image: "https://cdn.poehali.dev/projects/35332ebd-fd49-4a15-947a-e8e837eac3aa/files/67e3b357-17b9-4647-ad90-c11e9c617937.jpg",
      tags: ["RPG", "Фэнтези"],
      rating: 4.9,
    },
    {
      id: 6,
      title: "Galactic Wars",
      price: 699,
      discount: 30,
      image: "https://cdn.poehali.dev/projects/35332ebd-fd49-4a15-947a-e8e837eac3aa/files/7f3ff1ce-ac0d-4821-8c79-c34e4d73dd7b.jpg",
      tags: ["Стратегия", "Космос"],
      rating: 4.6,
    },
  ];

  const navItems = [
    { id: "home", label: "Главная", icon: "Home" },
    { id: "catalog", label: "Каталог", icon: "Grid3x3" },
    { id: "library", label: "Библиотека", icon: "Library" },
    { id: "community", label: "Сообщество", icon: "Users" },
    { id: "shop", label: "Магазин", icon: "ShoppingCart" },
    { id: "profile", label: "Профиль", icon: "User" },
  ];

  const calculateDiscountPrice = (price: number, discount: number) => {
    return Math.round(price * (1 - discount / 100));
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex h-screen">
        <aside
          className={`${
            sidebarOpen ? "w-64" : "w-20"
          } bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col`}
        >
          <div className="p-4 border-b border-sidebar-border flex items-center justify-between">
            {sidebarOpen && (
              <h1 className="text-2xl font-bold neon-glow">GameHub</h1>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hover:bg-sidebar-accent"
            >
              <Icon name="Menu" size={20} />
            </Button>
          </div>

          <nav className="flex-1 p-2 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                  activeSection === item.id
                    ? "bg-primary text-primary-foreground neon-border"
                    : "hover:bg-sidebar-accent text-sidebar-foreground"
                }`}
              >
                <Icon name={item.icon} size={20} />
                {sidebarOpen && <span className="font-medium">{item.label}</span>}
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-sidebar-border">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 hover:bg-sidebar-accent"
            >
              <Icon name="Settings" size={20} />
              {sidebarOpen && <span>Настройки</span>}
            </Button>
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto">
          <header className="sticky top-0 z-10 bg-card/95 backdrop-blur-sm border-b border-border">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex-1 max-w-xl">
                <div className="relative">
                  <Icon
                    name="Search"
                    size={20}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />
                  <Input
                    placeholder="Поиск игр..."
                    className="pl-10 bg-input border-border"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4 ml-4">
                <Button variant="ghost" size="icon" className="relative">
                  <Icon name="MessageSquare" size={20} />
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent rounded-full text-xs flex items-center justify-center">
                    3
                  </span>
                </Button>
                <Button variant="ghost" size="icon">
                  <Icon name="Bell" size={20} />
                </Button>
                <Button variant="ghost" size="icon">
                  <Icon name="Wallet" size={20} />
                </Button>
              </div>
            </div>
          </header>

          <div className="p-6">
            {activeSection === "home" && (
              <div className="space-y-8">
                <section className="relative h-[400px] rounded-xl overflow-hidden card-glow">
                  <img
                    src={featuredGames[0].image}
                    alt="Hero"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-8 space-y-4">
                    <h2 className="text-5xl font-bold neon-glow">
                      {featuredGames[0].title}
                    </h2>
                    <p className="text-xl text-foreground/80 max-w-2xl">
                      Погрузитесь в мир будущего с невероятной графикой и
                      захватывающим сюжетом
                    </p>
                    <div className="flex items-center gap-4">
                      <Button size="lg" className="bg-primary hover:bg-primary/90 neon-border">
                        <Icon name="Play" size={20} className="mr-2" />
                        Играть сейчас
                      </Button>
                      <Button size="lg" variant="outline" className="border-primary text-primary">
                        <Icon name="Plus" size={20} className="mr-2" />
                        В список желаемого
                      </Button>
                    </div>
                  </div>
                </section>

                <section>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-3xl font-bold">Специальные предложения</h3>
                    <Button variant="ghost" className="text-primary">
                      Смотреть все
                      <Icon name="ChevronRight" size={20} className="ml-1" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuredGames.map((game) => (
                      <Card
                        key={game.id}
                        className="bg-card border-border overflow-hidden card-glow cursor-pointer"
                      >
                        <div className="relative h-48">
                          <img
                            src={game.image}
                            alt={game.title}
                            className="w-full h-full object-cover"
                          />
                          {game.discount > 0 && (
                            <Badge className="absolute top-2 right-2 bg-accent text-accent-foreground">
                              -{game.discount}%
                            </Badge>
                          )}
                        </div>
                        <CardContent className="p-4 space-y-3">
                          <h4 className="text-xl font-semibold">{game.title}</h4>
                          <div className="flex flex-wrap gap-2">
                            {game.tags.map((tag) => (
                              <Badge
                                key={tag}
                                variant="outline"
                                className="border-primary/50 text-primary"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center gap-2">
                            <Icon name="Star" size={16} className="text-accent" />
                            <span className="text-sm font-medium">{game.rating}</span>
                          </div>
                          <div className="flex items-center justify-between pt-2">
                            <div className="flex items-center gap-2">
                              {game.discount > 0 && (
                                <span className="text-muted-foreground line-through text-sm">
                                  {game.price}₽
                                </span>
                              )}
                              <span className="text-2xl font-bold text-primary">
                                {calculateDiscountPrice(game.price, game.discount)}₽
                              </span>
                            </div>
                            <Button size="sm" className="bg-primary hover:bg-primary/90">
                              Купить
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </section>
              </div>
            )}

            {activeSection === "catalog" && (
              <div className="space-y-6">
                <h2 className="text-4xl font-bold mb-6">Каталог игр</h2>

                <Tabs defaultValue="all" className="w-full">
                  <TabsList className="bg-card border border-border">
                    <TabsTrigger value="all">Все игры</TabsTrigger>
                    <TabsTrigger value="action">Экшен</TabsTrigger>
                    <TabsTrigger value="rpg">RPG</TabsTrigger>
                    <TabsTrigger value="strategy">Стратегия</TabsTrigger>
                    <TabsTrigger value="new">Новинки</TabsTrigger>
                  </TabsList>

                  <TabsContent value="all" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {catalogGames.map((game) => (
                        <Card
                          key={game.id}
                          className="bg-card border-border overflow-hidden card-glow cursor-pointer"
                        >
                          <div className="relative h-48">
                            <img
                              src={game.image}
                              alt={game.title}
                              className="w-full h-full object-cover"
                            />
                            {game.discount > 0 && (
                              <Badge className="absolute top-2 right-2 bg-accent text-accent-foreground">
                                -{game.discount}%
                              </Badge>
                            )}
                          </div>
                          <CardContent className="p-4 space-y-3">
                            <h4 className="text-xl font-semibold">{game.title}</h4>
                            <div className="flex flex-wrap gap-2">
                              {game.tags.map((tag) => (
                                <Badge
                                  key={tag}
                                  variant="outline"
                                  className="border-primary/50 text-primary"
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            <div className="flex items-center gap-2">
                              <Icon name="Star" size={16} className="text-accent" />
                              <span className="text-sm font-medium">{game.rating}</span>
                            </div>
                            <div className="flex items-center justify-between pt-2">
                              <div className="flex items-center gap-2">
                                {game.discount > 0 && (
                                  <span className="text-muted-foreground line-through text-sm">
                                    {game.price}₽
                                  </span>
                                )}
                                <span className="text-2xl font-bold text-primary">
                                  {calculateDiscountPrice(game.price, game.discount)}₽
                                </span>
                              </div>
                              <Button size="sm" className="bg-primary hover:bg-primary/90">
                                Купить
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            )}

            {activeSection === "library" && (
              <div className="space-y-6">
                <h2 className="text-4xl font-bold">Моя библиотека</h2>
                <p className="text-muted-foreground text-lg">
                  Здесь будут отображаться ваши игры
                </p>
              </div>
            )}

            {activeSection === "community" && (
              <div className="space-y-6">
                <h2 className="text-4xl font-bold">Сообщество</h2>
                <p className="text-muted-foreground text-lg">
                  Общайтесь с другими игроками
                </p>
              </div>
            )}

            {activeSection === "shop" && (
              <div className="space-y-6">
                <h2 className="text-4xl font-bold">Магазин</h2>
                <p className="text-muted-foreground text-lg">
                  Внутриигровые покупки и дополнения
                </p>
              </div>
            )}

            {activeSection === "profile" && (
              <div className="space-y-6">
                <h2 className="text-4xl font-bold">Профиль</h2>
                <p className="text-muted-foreground text-lg">
                  Настройки вашего аккаунта
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
