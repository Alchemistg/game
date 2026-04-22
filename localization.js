(function (global) {
  "use strict";

  const bundles = {
    ru: {
      app: {
        title: "Катакомбы Культа",
        languageLabel: "\u042f\u0437\u044b\u043a",
        languageRu: "Русский",
        languageEn: "English",
        languageUk: "Українська"
      },
      legend: {
        normal: "Пустошь",
        trap: "Проклятие",
        boost: "Печать силы",
        shop: "Лавка реликвий",
        blackMarket: "Теневой торг",
        altar: "Кровавый алтарь",
        fortuneTeller: "Оракул",
        finish: "Святилище"
      },
      eventJournal: {
        title: "Хроники ритуала",
        button: "Логи",
        open: "Хроники ритуала ▾",
        close: "⌄",
        collapsed: "Хроники ритуала ▾",
        expanded: "Хроники ритуала ▴",
        copyBtn: "Копировать",
        copyDone: "Логи скопированы.",
        copyFailed: "Не удалось скопировать логи.",
        empty: "Пока нет событий",
        emptyFiltered: "Для этого фильтра событий нет.",
        filterLabel: "Фильтр",
        filterAll: "Все",
        filterSystem: "Системные",
        filterPlayer: "Действия",
        filterShop: "Торговля",
        filterRitual: "Ритуалы",
        filterWarning: "Предупреждения"
      },
      context: {
        shopTitle: "Магазин",
        shopSubtitle: "ЛКМ по товару: купить за золото выбранного игрока, который сейчас в магазине",
        fortuneTitle: "Оракул",
        fortuneSubtitle: "Нажмите кнопку ниже, чтобы получить предсказание для выбранного игрока.",
        blackMarketTitle: "Теневой торг",
        blackMarketSubtitle: "ЛКМ по товару: купить за золото выбранного игрока. На Теневом торге покупка может сорваться, ранить или выбросить на соседнюю клетку.",
        altarTitle: "Кровавый алтарь",
        altarSubtitle: "Выберите игрока на клетке Алтаря и нажмите кнопку ритуала.",
        playerLabelShop: "Носитель печати",
        playerLabelFortune: "Игрок для гадания",
        playerLabelBlackMarket: "Покупатель",
        playerLabelAltar: "Участник ритуала",
        fortuneAction: (cost) => `Погадать (${cost}💰)`,
        blackMarketAction: (cost) => `Заключить тёмный обмен (${cost}💰)`,
        altarAction: (cost) => `Совершить подношение (${cost}💰)`
      },
      emptySelect: {
        shop: "-- В магазине нет игроков --",
        fortuneTeller: "-- У Гадалки нет игроков --",
        blackMarket: "-- На Теневом торге нет игроков --",
        altar: "-- На Алтаре нет игроков --"
      },
      ui: {
        playersSectionTitle: "Круг Посвященных",
        playersMenuTitle: "Список носителей печати (очередь хода)",
        playerNameLabel: "Имя посвященного",
        playerNamePlaceholder: "Например: Артем",
        addPlayerBtn: "Призвать в круг",
        playersEmpty: "Призовите посвященных, чтобы открыть круг хода.",
        activePlayerNone: "-- Посвященный не выбран --",
        undoBtn: "Отменить ритуал",
        saveBtn: "Сохранить печать",
        loadBtn: "Восстановить печать",
        newGameBtn: "Новая игра",
        fullResetToggle: "Сбросить всё",
        installAppBtn: "Установить приложение",
        configMenuTitle: "Настройки конфига",
        configMenuHint: "Изменения применятся после перезагрузки.",
        configBoardSize: "Размер поля",
        configPlayerMaxHp: "Максимум HP",
        configGoldPerMove: "Золото за ход",
        configInventorySlots: "Слоты инвентаря",
        configAutosaveDelay: "Автосохранение, мс",
        configFinishersToEndGame: "Финишеров для конца игры",
        configLastCellHint: "Последняя клетка обновится автоматически.",
        configBalanceTitle: "Баланс",
        configFortuneGoodChance: "Хороший знак",
        configBlackMarketProfitChance: "Шанс получить предмет",
        configAltarShieldChance: "Печать с алтаря",
        configSaveBtn: "Применить настройки",
        configResetBtn: "Сбросить к дефолту",
        configSaved: "Настройки сохранены. Страница перезагрузится.",
        configResetDone: "Настройки сброшены. Страница перезагрузится.",
        configSaveFailed: "Не удалось сохранить настройки.",
        configResetFailed: "Не удалось сбросить настройки.",
        settingsLauncher: "⚙",
        settingsTitle: "Настройки",
        settingsClose: "×",
        settingsTabGeneral: "Базовые",
        settingsTabConfig: "Конфиг",
        sidePanelToggleLeft: "← Панель влево",
        sidePanelToggleRight: "→ Панель вправо",
        iconHp: "\u2665",
        iconGold: "\uD83D\uDCB0",
        iconUnknown: "\u2753",
        selectedPlayerTitle: "Избранник Круга",
        rollBtn: "🎲 Бросить кость знака",
        willTitle: "Воля Хранителя",
        addGoldBtn: "+50💰",
        removeGoldBtn: "-50💰",
        giveBootsBtn: "+ Поножи",
        giveShieldBtn: "+ Печать",
        punishBtn: "☠️ Кара Хранителя (-3 клетки)",
        tileInfo: "Выберите плиту святилища",
        moveToTileBtn: "Перенести избранника на плиту",
        inventoryName: "Игрок",
        closePanel: "×",
        victoryTitle: "Святилище признало избранных",
        diceResultIdle: "Результат: -",
        diceResultValue: "Результат: {roll}",
        diceResultRolling: "Результат: крутим...",
        noPlayers: "Добавьте игроков, чтобы сформировать порядок ходов.",
        turnEnded: "Обряд завершен: Святилище приняло {count} избранных.",
        turnCurrent: "Текущий ход: {name}",
        turnNone: "Активных ходов больше нет.",
        turnCount: "Осталось в круге: {count}",
        turnAllFinished: "Все оставшиеся участники завершили путь.",
        blackMarketBuySuccess: "{name} покупает \"{item}\" за {price}.",
        blackMarketBuyNoItem: "{name} платит {price} за \"{item}\", но торговец исчезает. Предмет не получен.",
        blackMarketBuyHurt: "{name} платит {price}, но получает рану на {damage} HP ({before} -> {after}).",
        blackMarketBuyThrown: "{name} платит {price} и его выбрасывают: {from} -> {to}.",
        blackMarketBuyCheated: "{name} платит {price}, но его обманули и забрали ещё {loss}.",
        blackMarketSellSuccess: "{name} продаёт 1x \"{item}\" за +{gold}.",
        blackMarketSellNoGold: "{name} отдаёт 1x \"{item}\", но не получает ничего в ответ.",
        blackMarketSellHurt: "{name} получает рану на {damage} HP ({before} -> {after}) во время сделки.",
        blackMarketSellThrown: "{name} завершает сделку, но его выбрасывают: {from} -> {to}.",
        blackMarketSellCheated: "{name} во время продажи обманули и забрали {loss}.",
        enterBlackMarket: "{name} ступает на Теневой торг {icon}. ПКМ по клетке — открыть меню.",
        blackMarketNotEnoughGold: "Теневой торг (клетка {cell}): {name} не хватает золота, чтобы купить \"{item}\" ({price}).",
        selectedTile: "Клетка {cell}: {info}",
        selectedTileDefault: "• Пустошь",
        finishRank1: "Первый избранный",
        finishRank2: "Второй избранный",
        finishRank3: "Третий избранный",
        finishRankN: "{rank}-й избранный",
        activeEffectsTitle: "Эффекты",
        activeEffectsNone: "Активных эффектов нет.",
        inventoryTitle: "Инвентарь",
        confirmReset: "Начать новую игру с теми же игроками и новой картой?",
        confirmFullReset: "Полностью сбросить игру, игроков и карту?",
        removePlayer: "Удалить игрока",
        tile: "клетка",
        finishStatus: ", Святилище #{order}",
        eventLabel: "Событие",
        omenGood: "Добрый знак",
        omenBad: "Плохой знак",
        prophecyTitle: "Пророчество Оракула",
        prophecyActive: "Активное пророчество:",
        prophecyHint: "Подсказка:",
        bootsPrimed: "Подготовленные ритуальные поножи",
        condition: "Условие:",
        nextRollCondition: "Срабатывает на следующем броске кости.",
        victorySummary: "Святилище приняло {count} из {total} необходимых избранных. Обряд завершен, новые ходы остановлены.",
        gameReady: "Игра готова. Добавьте игроков и начните забег!",
        gameSaved: "Игра сохранена.",
        saveNotFound: "Сохранение не найдено.",
        saveInvalidFormat: "Ошибка загрузки: поврежденный формат сохранения.",
        saveInvalidData: "Ошибка загрузки: некорректные данные сохранения.",
        saveLoaded: "Сохранение загружено.",
        newGameStarted: "Новая игра начата. Игроки сохранены, карта сгенерирована заново.",
        fullResetDone: "Игра полностью сброшена.",
        noSelectedPlayer: "Сначала выберите активного игрока.",
        noBuyPlayer: "Покупка недоступна: на клетке магазина нет выбранного игрока.",
        noFortunePlayer: "Гадание недоступно: у Гадалки нет выбранного игрока.",
        noActionPlayer: "Действие недоступно: нет выбранного игрока.",
        noShopPlayer: "Покупка недоступна: на клетке магазина нет выбранного игрока.",
        noCurrentPlayers: "Активных ходов больше нет.",
        allPlayersOut: "Все игроки выбыли. Партия завершена.",
        turnPassed: "Ход передан: {name}.",
        undoAction: "Отмена действия: {label}.",
      },
      quest: {
        reachCell: "Дойди до клетки {targetCell}.",
        reachCellHint: "Судьба указывает на отмеченную точку впереди; ориентир - примерно {stepHint} шагов.",
        itemOnCellType: "Имея предмет \"{item}\", стань на клетку типа \"{cellTypeLabel}\".",
        goldOnCellType: "Набери не менее {minGold}💰 и стань на клетку типа \"{cellTypeLabel}\".",
        reachCellDebug: "Приземлись точно на клетку {targetCell}.",
        itemOnCellTypeDebug: "Имей предмет \"{item}\" и стой на клетке типа \"{cellTypeLabel}\".",
        goldOnCellTypeDebug: "Имей не менее {minGold}💰 и стой на клетке типа \"{cellTypeLabel}\".",
      },
      items: {
        boots: { name: "Ритуальные поножи", desc: "+2 к следующему броску" },
        shield: { name: "Печать защиты (блок ловушки)", desc: "Гасит действие проклятой клетки" },
        luckCharm: { name: "Талисман благосклонности", desc: "Приносит +40 золота" },
        trapKit: { name: "Набор проклятых печатей", desc: "Накладывает проклятую печать на выбранную клетку" },
        rerollStone: { name: "Камень второго знака", desc: "Позволяет пройти новый знак: 1-6 клеток" },
        alchemyCrystal: { name: "Кровавый осколок", desc: "Высвобождает +25 золота" }
      },
      cellTypes: {
        trap: "Проклятие",
        boost: "Печать силы",
        shop: "Лавка реликвий",
        blackMarket: "Теневой торг",
        altar: "Кровавый алтарь",
        fortuneTeller: "Оракул",
        finish: "Святилище",
        normal: "Пустошь"
      },
      phases: {
        early: "ранняя стадия",
        mid: "средняя стадия",
        late: "поздняя стадия"
      }
    },
    en: {
      app: {
        title: "Cult Catacombs",
        languageLabel: "Language",
        languageRu: "Russian",
        languageEn: "English",
        languageUk: "Ukrainian"
      },
      legend: {
        normal: "Wasteland",
        trap: "Curse",
        boost: "Power seal",
        shop: "Relic shop",
        blackMarket: "Shadow market",
        altar: "Blood altar",
        fortuneTeller: "Oracle",
        finish: "Sanctuary"
      },
      eventJournal: {
        title: "Ritual chronicle",
        button: "Logs",
        open: "Ritual chronicle ▾",
        close: "⌄",
        collapsed: "Ritual chronicle ▾",
        expanded: "Ritual chronicle ▴",
        copyBtn: "Copy",
        copyDone: "Logs copied.",
        copyFailed: "Failed to copy logs.",
        empty: "No events yet",
        emptyFiltered: "No events match this filter.",
        filterLabel: "Filter",
        filterAll: "All",
        filterSystem: "System",
        filterPlayer: "Actions",
        filterShop: "Trade",
        filterRitual: "Rituals",
        filterWarning: "Warnings"
      },
      context: {
        shopTitle: "Shop",
        shopSubtitle: "Left click an item to buy it with the gold of the selected player in the shop",
        fortuneTitle: "Oracle",
        fortuneSubtitle: "Press the button below to get a prophecy for the selected player.",
        blackMarketTitle: "Shadow market",
        blackMarketSubtitle: "Left click an item to buy it with the gold of the selected player. On the Shadow market a purchase may fail, deal minor damage, or throw you to a neighboring tile.",
        altarTitle: "Blood altar",
        altarSubtitle: "Choose a player on the Altar tile and press the ritual button.",
        playerLabelShop: "Seal bearer",
        playerLabelFortune: "Player for prophecy",
        playerLabelBlackMarket: "Buyer",
        playerLabelAltar: "Ritual participant",
        fortuneAction: (cost) => `Consult (${cost}💰)`,
        blackMarketAction: (cost) => `Make a dark deal (${cost}💰)`,
        altarAction: (cost) => `Offer tribute (${cost}💰)`
      },
      emptySelect: {
        shop: "-- No players in the shop --",
        fortuneTeller: "-- No players at the Oracle --",
        blackMarket: "-- No players on the Shadow market --",
        altar: "-- No players on the Altar --"
      },
      ui: {
        playersSectionTitle: "Circle of Initiates",
        playersMenuTitle: "Seal bearer list (turn order)",
        playerNameLabel: "Initiate name",
        playerNamePlaceholder: "For example: Artem",
        addPlayerBtn: "Summon to the circle",
        playersEmpty: "Summon initiates to open the turn circle.",
        activePlayerNone: "-- No initiate selected --",
        undoBtn: "Undo ritual",
        saveBtn: "Save seal",
        loadBtn: "Restore seal",
        newGameBtn: "New game",
        fullResetToggle: "Reset all",
        installAppBtn: "Install app",
        configMenuTitle: "Game config",
        configMenuHint: "Changes apply after reload.",
        configBoardSize: "Board size",
        configPlayerMaxHp: "Max HP",
        configGoldPerMove: "Gold per move",
        configInventorySlots: "Inventory slots",
        configAutosaveDelay: "Autosave, ms",
        configFinishersToEndGame: "Finishers to end game",
        configLastCellHint: "The last cell updates automatically.",
        configBalanceTitle: "Balance",
        configFortuneGoodChance: "Good omen",
        configBlackMarketProfitChance: "Item success chance",
        configAltarShieldChance: "Altar seal",
        configSaveBtn: "Apply settings",
        configResetBtn: "Reset to defaults",
        configSaved: "Settings saved. The page will reload.",
        configResetDone: "Settings reset. The page will reload.",
        configSaveFailed: "Failed to save settings.",
        configResetFailed: "Failed to reset settings.",
        settingsLauncher: "⚙",
        settingsTitle: "Settings",
        settingsClose: "×",
        settingsTabGeneral: "Basic",
        settingsTabConfig: "Config",
        sidePanelToggleLeft: "← Panel to left",
        sidePanelToggleRight: "→ Panel to right",
        iconHp: "\u2665",
        iconGold: "\uD83D\uDCB0",
        iconUnknown: "\u2753",
        selectedPlayerTitle: "Chosen of the Circle",
        rollBtn: "🎲 Roll the sign die",
        willTitle: "Keeper's will",
        addGoldBtn: "+50💰",
        removeGoldBtn: "-50💰",
        giveBootsBtn: "+ Greaves",
        giveShieldBtn: "+ Seal",
        punishBtn: "☠️ Keeper's punishment (-3 cells)",
        tileInfo: "Choose a sanctuary tile",
        moveToTileBtn: "Move chosen one to tile",
        inventoryName: "Player",
        closePanel: "×",
        victoryTitle: "Sanctuary has recognized the chosen",
        diceResultIdle: "Result: -",
        diceResultValue: "Result: {roll}",
        diceResultRolling: "Result: rolling...",
        noPlayers: "Add players to build the turn order.",
        turnEnded: "The ritual is over: Sanctuary accepted {count} chosen ones.",
        turnCurrent: "Current turn: {name}",
        turnNone: "No active turns remain.",
        turnCount: "Remaining in circle: {count}",
        turnAllFinished: "All remaining participants have completed the path.",
        blackMarketBuySuccess: "{name} buys \"{item}\" for {price}.",
        blackMarketBuyNoItem: "{name} pays {price} for \"{item}\", but the dealer disappears. No item received.",
        blackMarketBuyHurt: "{name} pays {price} but gets hurt for {damage} HP ({before} -> {after}).",
        blackMarketBuyThrown: "{name} pays {price} and gets thrown: {from} -> {to}.",
        blackMarketBuyCheated: "{name} pays {price}, but gets cheated and loses an extra {loss}.",
        blackMarketSellSuccess: "{name} sells 1x \"{item}\" for +{gold}.",
        blackMarketSellNoGold: "{name} hands over 1x \"{item}\", but gets nothing in return.",
        blackMarketSellHurt: "{name} gets hurt for {damage} HP ({before} -> {after}) during the deal.",
        blackMarketSellThrown: "{name} completes the deal, but gets thrown: {from} -> {to}.",
        blackMarketSellCheated: "{name} gets cheated and loses {loss} during the sale.",
        enterBlackMarket: "{name} steps onto the Shadow market {icon}. Right-click the tile to open the market menu.",
        blackMarketNotEnoughGold: "Shadow market (tile {cell}): {name} lacks gold to buy \"{item}\" ({price}).",
        selectedTile: "Tile {cell}: {info}",
        selectedTileDefault: "• Wasteland",
        finishRank1: "First chosen",
        finishRank2: "Second chosen",
        finishRank3: "Third chosen",
        finishRankN: "{rank}th chosen",
        activeEffectsTitle: "Effects",
        activeEffectsNone: "No active effects.",
        inventoryTitle: "Inventory",
        confirmReset: "Start a new game with the same players and a fresh map?",
        confirmFullReset: "Fully reset the game, players, and map?",
        removePlayer: "Remove player",
        tile: "tile",
        finishStatus: ", Sanctuary #{order}",
        eventLabel: "Event",
        omenGood: "Good omen",
        omenBad: "Bad omen",
        prophecyTitle: "Oracle prophecy",
        prophecyActive: "Active prophecy:",
        prophecyHint: "Hint:",
        bootsPrimed: "Primed ritual greaves",
        condition: "Condition:",
        nextRollCondition: "Triggers on the next die roll.",
        victorySummary: "Sanctuary accepted {count} of {total} required chosen ones. The ritual is over and new turns are stopped.",
        gameReady: "Game ready. Add players and start the run!",
        gameSaved: "Game saved.",
        saveNotFound: "Save not found.",
        saveInvalidFormat: "Load error: corrupted save format.",
        saveInvalidData: "Load error: invalid save data.",
        saveLoaded: "Save loaded.",
        newGameStarted: "New game started. Players kept, map regenerated.",
        fullResetDone: "Game fully reset.",
        noSelectedPlayer: "Select an active player first.",
        noBuyPlayer: "Purchase unavailable: no selected player is on the shop tile.",
        noFortunePlayer: "Prophecy unavailable: no player is selected at the Oracle.",
        noActionPlayer: "Action unavailable: no player selected.",
        noShopPlayer: "Purchase unavailable: no selected player is on the shop tile.",
        noCurrentPlayers: "No active turns remain.",
        allPlayersOut: "All players are out. The match is over.",
        turnPassed: "Turn passed to: {name}.",
        undoAction: "Undid action: {label}.",
      },
      quest: {
        reachCell: "Reach tile {targetCell}.",
        reachCellHint: "Fate points to a marked spot ahead; roughly {stepHint} steps away.",
        itemOnCellType: "With item \"{item}\", stand on a \"{cellTypeLabel}\" tile.",
        goldOnCellType: "Collect at least {minGold}💰 and stand on a \"{cellTypeLabel}\" tile.",
        reachCellDebug: "Land exactly on tile {targetCell}.",
        itemOnCellTypeDebug: "Have item \"{item}\" and stand on a \"{cellTypeLabel}\" tile.",
        goldOnCellTypeDebug: "Have at least {minGold}💰 and stand on a \"{cellTypeLabel}\" tile.",
      },
      items: {
        boots: { name: "Ritual greaves", desc: "+2 to the next roll" },
        shield: { name: "Protection seal (blocks traps)", desc: "Cancels the effect of a cursed cell" },
        luckCharm: { name: "Charm of favor", desc: "Grants +40 gold" },
        trapKit: { name: "Cursed seal kit", desc: "Places a cursed seal on a chosen cell" },
        rerollStone: { name: "Second sign stone", desc: "Lets you roll a new sign: 1-6 cells" },
        alchemyCrystal: { name: "Blood shard", desc: "Releases +25 gold" }
      },
      cellTypes: {
        trap: "Curse",
        boost: "Power seal",
        shop: "Relic shop",
        blackMarket: "Shadow market",
        altar: "Blood altar",
        fortuneTeller: "Oracle",
        finish: "Sanctuary",
        normal: "Wasteland"
      },
      phases: {
        early: "early stage",
        mid: "mid stage",
        late: "late stage"
      }
    },
    uk: {
      app: {
        title: "Катакомби Культу",
        languageLabel: "\u041c\u043e\u0432\u0430",
        languageRu: "Російська",
        languageEn: "English",
        languageUk: "Українська"
      },
      legend: {
        normal: "Пустка",
        trap: "Прокляття",
        boost: "Печатка сили",
        shop: "Крамниця реліквій",
        blackMarket: "Тіньовий торг",
        altar: "Кривавий вівтар",
        fortuneTeller: "Оракул",
        finish: "Святилище"
      },
      eventJournal: {
        title: "Хроніки ритуалу",
        button: "Логи",
        open: "Хроніки ритуалу ▾",
        close: "⌄",
        collapsed: "Хроніки ритуалу ▾",
        expanded: "Хроніки ритуалу ▴",
        copyBtn: "Копіювати",
        copyDone: "Логи скопійовано.",
        copyFailed: "Не вдалося скопіювати логи.",
        empty: "Поки що немає подій",
        emptyFiltered: "Для цього фільтра подій немає.",
        filterLabel: "Фільтр",
        filterAll: "Усі",
        filterSystem: "Системні",
        filterPlayer: "Дії",
        filterShop: "Торгівля",
        filterRitual: "Ритуали",
        filterWarning: "Попередження"
      },
      context: {
        shopTitle: "Крамниця",
        shopSubtitle: "ЛКМ по товару: купити за золото вибраного гравця, який зараз у крамниці",
        fortuneTitle: "Оракул",
        fortuneSubtitle: "Натисніть кнопку нижче, щоб отримати пророцтво для вибраного гравця.",
        blackMarketTitle: "Тіньовий торг",
        blackMarketSubtitle: "ЛКМ по товару: купити за золото вибраного гравця. На Тіньовому торзі покупка може зірватися, поранити або викинути на сусідню клітинку.",
        altarTitle: "Кривавий вівтар",
        altarSubtitle: "Виберіть гравця на клітинці Вівтаря та натисніть кнопку ритуалу.",
        playerLabelShop: "Носій печатки",
        playerLabelFortune: "Гравець для ворожіння",
        playerLabelBlackMarket: "Покупець",
        playerLabelAltar: "Учасник ритуалу",
        fortuneAction: (cost) => `Заворожити (${cost}💰)`,
        blackMarketAction: (cost) => `Укласти тіньову угоду (${cost}💰)`,
        altarAction: (cost) => `Принести дар (${cost}💰)`
      },
      emptySelect: {
        shop: "-- У крамниці немає гравців --",
        fortuneTeller: "-- У Оракула немає гравців --",
        blackMarket: "-- На Тіньовому торзі немає гравців --",
        altar: "-- На Вівтарі немає гравців --"
      },
      ui: {
        playersSectionTitle: "Коло посвячених",
        playersMenuTitle: "Список носіїв печатки (порядок ходу)",
        playerNameLabel: "Ім'я посвяченого",
        playerNamePlaceholder: "Наприклад: Артем",
        addPlayerBtn: "Покликати до кола",
        playersEmpty: "Покличте посвячених, щоб відкрити коло ходу.",
        activePlayerNone: "-- Посвяченого не вибрано --",
        undoBtn: "Скасувати ритуал",
        saveBtn: "Зберегти печатку",
        loadBtn: "Відновити печатку",
        newGameBtn: "Нова гра",
        fullResetToggle: "Скинути все",
        installAppBtn: "Встановити застосунок",
        configMenuTitle: "Налаштування конфига",
        configMenuHint: "Зміни застосуються після перезавантаження.",
        configBoardSize: "Розмір поля",
        configPlayerMaxHp: "Максимум HP",
        configGoldPerMove: "Золото за хід",
        configInventorySlots: "Слоти інвентаря",
        configAutosaveDelay: "Автозбереження, мс",
        configFinishersToEndGame: "Фінішерів для кінця гри",
        configLastCellHint: "Остання клітинка оновиться автоматично.",
        configBalanceTitle: "Баланс",
        configFortuneGoodChance: "Хороший знак",
        configBlackMarketProfitChance: "Шанс отримати предмет",
        configAltarShieldChance: "Печатка з вівтаря",
        configSaveBtn: "Застосувати налаштування",
        configResetBtn: "Скинути до дефолту",
        configSaved: "Налаштування збережено. Сторінка перезавантажиться.",
        configResetDone: "Налаштування скинуто. Сторінка перезавантажиться.",
        configSaveFailed: "Не вдалося зберегти налаштування.",
        configResetFailed: "Не вдалося скинути налаштування.",
        settingsLauncher: "⚙",
        settingsTitle: "Налаштування",
        settingsClose: "×",
        settingsTabGeneral: "Базові",
        settingsTabConfig: "Конфіг",
        sidePanelToggleLeft: "← Панель вліво",
        sidePanelToggleRight: "→ Панель вправо",
        iconHp: "\u2665",
        iconGold: "\uD83D\uDCB0",
        iconUnknown: "\u2753",
        selectedPlayerTitle: "Обраний кола",
        rollBtn: "🎲 Кинути кубик знака",
        willTitle: "Воля Хранителя",
        addGoldBtn: "+50💰",
        removeGoldBtn: "-50💰",
        giveBootsBtn: "+ Поножі",
        giveShieldBtn: "+ Печатка",
        punishBtn: "☠️ Кара Хранителя (-3 клітинки)",
        tileInfo: "Виберіть плиту святилища",
        moveToTileBtn: "Перенести обраного на плиту",
        inventoryName: "Гравець",
        closePanel: "×",
        victoryTitle: "Святилище визнало обраних",
        diceResultIdle: "Результат: -",
        diceResultValue: "Результат: {roll}",
        diceResultRolling: "Результат: крутимо...",
        noPlayers: "Додайте гравців, щоб сформувати порядок ходів.",
        turnEnded: "Обряд завершено: Святилище прийняло {count} обраних.",
        turnCurrent: "Поточний хід: {name}",
        turnNone: "Активних ходів більше немає.",
        turnCount: "Залишилось у колі: {count}",
        turnAllFinished: "Усі учасники завершили шлях.",
        blackMarketBuySuccess: "{name} купує \"{item}\" за {price}.",
        blackMarketBuyNoItem: "{name} платить {price} за \"{item}\", але торговець зникає. Предмет не отримано.",
        blackMarketBuyHurt: "{name} платить {price}, але отримує рану на {damage} HP ({before} -> {after}).",
        blackMarketBuyThrown: "{name} платить {price} і його викидають: {from} -> {to}.",
        blackMarketBuyCheated: "{name} платить {price}, але його обдурили й забрали ще {loss}.",
        blackMarketSellSuccess: "{name} продає 1x \"{item}\" за +{gold}.",
        blackMarketSellNoGold: "{name} віддає 1x \"{item}\", але не отримує нічого у відповідь.",
        blackMarketSellHurt: "{name} отримує рану на {damage} HP ({before} -> {after}) під час угоди.",
        blackMarketSellThrown: "{name} завершує угоду, але його викидають: {from} -> {to}.",
        blackMarketSellCheated: "{name} під час продажу обдурили й забрали {loss}.",
        enterBlackMarket: "{name} ступає на Тіньовий торг {icon}. ПКМ по клітинці — відкрити меню.",
        blackMarketNotEnoughGold: "Тіньовий торг (клітинка {cell}): {name} не має достатньо золота, щоб купити \"{item}\" ({price}).",
        selectedTile: "Клітинка {cell}: {info}",
        selectedTileDefault: "• Пустка",
        finishRank1: "Перший обраний",
        finishRank2: "Другий обраний",
        finishRank3: "Третій обраний",
        finishRankN: "{rank}-й обраний",
        activeEffectsTitle: "Ефекти",
        activeEffectsNone: "Активних ефектів немає.",
        inventoryTitle: "Інвентар",
        confirmReset: "Почати нову гру з тими самими гравцями та новою картою?",
        confirmFullReset: "Повністю скинути гру, гравців і карту?",
        removePlayer: "Видалити гравця",
        tile: "клітинка",
        finishStatus: ", Святилище #{order}",
        eventLabel: "Подія",
        omenGood: "Добрий знак",
        omenBad: "Поганий знак",
        prophecyTitle: "Пророцтво Оракула",
        prophecyActive: "Активне пророцтво:",
        prophecyHint: "Підказка:",
        bootsPrimed: "Підготовлені ритуальні поножі",
        condition: "Умова:",
        nextRollCondition: "Спрацьовує на наступному кидку кубика.",
        victorySummary: "Святилище прийняло {count} із {total} потрібних обраних. Обряд завершено, нові ходи зупинено.",
        gameReady: "Гра готова. Додайте гравців і починайте забіг!",
        gameSaved: "Гру збережено.",
        saveNotFound: "Збереження не знайдено.",
        saveInvalidFormat: "Помилка завантаження: пошкоджений формат збереження.",
        saveInvalidData: "Помилка завантаження: некоректні дані збереження.",
        saveLoaded: "Збереження завантажено.",
        newGameStarted: "Нову гру розпочато. Гравців збережено, карту згенеровано заново.",
        fullResetDone: "Гру повністю скинуто.",
        noSelectedPlayer: "Спершу виберіть активного гравця.",
        noBuyPlayer: "Купівля недоступна: на клітинці крамниці немає вибраного гравця.",
        noFortunePlayer: "Ворожіння недоступне: у Оракула немає вибраного гравця.",
        noActionPlayer: "Дія недоступна: гравця не вибрано.",
        noShopPlayer: "Купівля недоступна: на клітинці крамниці немає вибраного гравця.",
        noCurrentPlayers: "Активних ходів більше немає.",
        allPlayersOut: "Усі гравці вибули. Партію завершено.",
        turnPassed: "Хід передано: {name}.",
        undoAction: "Скасовано дію: {label}.",
      },
      quest: {
        reachCell: "Дійди до клітинки {targetCell}.",
        reachCellHint: "Доля вказує на позначену точку попереду; орієнтир - приблизно {stepHint} кроків.",
        itemOnCellType: "Маючи предмет \"{item}\", стань на клітинку типу \"{cellTypeLabel}\".",
        goldOnCellType: "Назбирай щонайменше {minGold}💰 і стань на клітинку типу \"{cellTypeLabel}\".",
        reachCellDebug: "Стати точно на клітинку {targetCell}.",
        itemOnCellTypeDebug: "Мати предмет \"{item}\" і стояти на клітинці типу \"{cellTypeLabel}\".",
        goldOnCellTypeDebug: "Мати щонайменше {minGold}💰 і стояти на клітинці типу \"{cellTypeLabel}\".",
      },
      items: {
        boots: { name: "Ритуальні поножі", desc: "+2 до наступного кидка" },
        shield: { name: "Печатка захисту (блокує пастки)", desc: "Гасить дію проклятої клітинки" },
        luckCharm: { name: "Талісман прихильності", desc: "Приносить +40 золота" },
        trapKit: { name: "Набір проклятих печаток", desc: "Накладає прокляту печатку на вибрану клітинку" },
        rerollStone: { name: "Камінь другого знака", desc: "Дозволяє кинути новий знак: 1-6 клітинок" },
        alchemyCrystal: { name: "Кривавий уламок", desc: "Вивільняє +25 золота" }
      },
      cellTypes: {
        trap: "Прокляття",
        boost: "Печатка сили",
        shop: "Крамниця реліквій",
        blackMarket: "Тіньовий торг",
        altar: "Кривавий вівтар",
        fortuneTeller: "Оракул",
        finish: "Святилище",
        normal: "Пустка"
      },
      phases: {
        early: "рання стадія",
        mid: "середня стадія",
        late: "пізня стадія"
      }
    }
  };

  const staticMessages = {
    ru: {
      "Игра сохранена.": "Игра сохранена.",
      "Сохранение не найдено.": "Сохранение не найдено.",
      "Ошибка загрузки: поврежденный формат сохранения.": "Ошибка загрузки: поврежденный формат сохранения.",
      "Ошибка загрузки: некорректные данные сохранения.": "Ошибка загрузки: некорректные данные сохранения.",
      "Сохранение загружено.": "Сохранение загружено.",
      "Новая игра начата. Игроки сохранены, карта сгенерирована заново.": "Новая игра начата. Игроки сохранены, карта сгенерирована заново.",
      "Сбросить всё": "Сбросить всё",
      "Игра полностью сброшена.": "Игра полностью сброшена.",
      "Удаление недоступно во время движения игрока.": "Удаление недоступно во время движения игрока.",
      "Все игроки выбыли. Партия завершена.": "Все игроки выбыли. Партия завершена.",
      "Сначала выберите активного игрока.": "Сначала выберите активного игрока.",
      "Покупка недоступна: на клетке магазина нет выбранного игрока.": "Покупка недоступна: на клетке магазина нет выбранного игрока.",
      "Гадание недоступно: у Гадалки нет выбранного игрока.": "Гадание недоступно: у Гадалки нет выбранного игрока.",
      "Действие недоступно: нет выбранного игрока.": "Действие недоступно: нет выбранного игрока.",
      "Игра готова. Добавьте игроков и начните забег!": "Игра готова. Добавьте игроков и начните забег!"
    },
    en: {
      "Игра сохранена.": "Game saved.",
      "Сохранение не найдено.": "Save not found.",
      "Ошибка загрузки: поврежденный формат сохранения.": "Load error: corrupted save format.",
      "Ошибка загрузки: некорректные данные сохранения.": "Load error: invalid save data.",
      "Сохранение загружено.": "Save loaded.",
      "Новая игра начата. Игроки сохранены, карта сгенерирована заново.": "New game started. Players kept, map regenerated.",
      "Сбросить всё": "Reset all",
      "Игра полностью сброшена.": "Game fully reset.",
      "Удаление недоступно во время движения игрока.": "Removal is unavailable while a player is moving.",
      "Все игроки выбыли. Партия завершена.": "All players are out. The match is over.",
      "Сначала выберите активного игрока.": "Select an active player first.",
      "Покупка недоступна: на клетке магазина нет выбранного игрока.": "Purchase unavailable: no selected player is on the shop tile.",
      "Гадание недоступно: у Гадалки нет выбранного игрока.": "Prophecy unavailable: no player is selected at the Oracle.",
      "Действие недоступно: нет выбранного игрока.": "Action unavailable: no player selected.",
      "Игра готова. Добавьте игроков и начните забег!": "Game ready. Add players and start the run!"
    },
    uk: {
      "Игра сохранена.": "Гру збережено.",
      "Сохранение не найдено.": "Збереження не знайдено.",
      "Ошибка загрузки: поврежденный формат сохранения.": "Помилка завантаження: пошкоджений формат збереження.",
      "Ошибка загрузки: некорректные данные сохранения.": "Помилка завантаження: некоректні дані збереження.",
      "Сохранение загружено.": "Збереження завантажено.",
      "Новая игра начата. Игроки сохранены, карта сгенерирована заново.": "Нову гру розпочато. Гравців збережено, карту згенеровано заново.",
      "Сбросить всё": "Скинути все",
      "Игра полностью сброшена.": "Гру повністю скинуто.",
      "Удаление недоступно во время движения игрока.": "Видалення недоступне під час руху гравця.",
      "Все игроки выбыли. Партия завершена.": "Усі гравці вибули. Партію завершено.",
      "Сначала выберите активного игрока.": "Спершу виберіть активного гравця.",
      "Покупка недоступна: на клетке магазина нет выбранного игрока.": "Купівля недоступна: на клітинці крамниці немає вибраного гравця.",
      "Гадание недоступно: у Гадалки нет выбранного игрока.": "Ворожіння недоступне: у Оракула немає вибраного гравця.",
      "Действие недоступно: нет выбранного игрока.": "Дія недоступна: гравця не вибрано.",
      "Игра готова. Добавьте игроков и начните забег!": "Гра готова. Додайте гравців і починайте забіг!"
    }
  };

  function getBundle(lang) {
    return bundles[lang] || bundles.ru;
  }

  function getLanguageKey(storageKey, defaultLanguage) {
    try {
      return global.localStorage.getItem(storageKey) || defaultLanguage;
    } catch (_) {
      return defaultLanguage;
    }
  }

  function getPreferredLanguage(storageKey, defaultLanguage) {
    const stored = getLanguageKey(storageKey, "");
    if (stored) return stored;
    const nav = String(global.navigator?.language || "").toLowerCase();
    if (nav.startsWith("uk")) return "uk";
    if (nav.startsWith("en")) return "en";
    return defaultLanguage;
  }

  function setLanguageKey(storageKey, lang) {
    try {
      global.localStorage.setItem(storageKey, lang);
    } catch (_) {
      // ignore
    }
  }

  function getByPath(object, path) {
    return String(path || "").split(".").reduce((acc, key) => (acc && Object.prototype.hasOwnProperty.call(acc, key) ? acc[key] : undefined), object);
  }

  function formatTemplate(template, params = {}) {
    return String(template || "").replace(/\{(\w+)\}/g, (_, key) => {
      const value = params[key];
      return value === undefined || value === null ? "" : String(value);
    });
  }

  function t(path, params = {}, lang = getLanguageKey(global.GAME_CONFIG?.LANGUAGE_KEY || "alchemist_dungeon_language_v1", global.GAME_CONFIG?.DEFAULT_LANGUAGE || "ru")) {
    const bundle = getBundle(lang);
    const fallback = getBundle(global.GAME_CONFIG?.DEFAULT_LANGUAGE || "ru");
    const value = getByPath(bundle, path) ?? getByPath(fallback, path) ?? "";
    if (typeof value === "function") {
      return value(params.cost ?? params.value ?? 0, params);
    }
    return typeof value === "string" ? formatTemplate(value, params) : String(value || "");
  }

  function localizeValue(value, lang) {
    if (value && typeof value === "object" && !Array.isArray(value)) {
      return value[lang] || value.ru || value.en || value.uk || "";
    }
    return value ?? "";
  }

  function getShopItemName(item, lang) {
    return t(item?.nameKey || "", {}, lang);
  }

  function getShopItemDesc(item, lang) {
    return t(item?.descKey || "", {}, lang);
  }

  function getCellTypeLabel(type, lang) {
    return t(`cellTypes.${type}`, {}, lang);
  }

  function getPhaseLabel(key, lang) {
    return t(`phases.${key}`, {}, lang);
  }

  function translateEliminationReason(reason, lang) {
    const text = String(reason || "").trim();
    if (!text) return text;
    if (text === "health dropped to 0") {
      return lang === "uk" ? "здоров'я впало до 0" : "здоровье упало до 0";
    }
    return text;
  }

  function translateLogMessage(message, lang) {
    const text = String(message || "");
    if (!text) return text;
    if (lang === "en" && !/[А-Яа-яЁё]/.test(text)) return text;
    if (lang === "ru" && staticMessages.ru[text]) return staticMessages.ru[text];

    const exact = staticMessages[lang]?.[text];
    if (exact) return exact;

    const goldIcon = t("ui.iconGold", {}, lang) || "💰";
    const patterns = [
      [/^(.+) hits a trap .* and takes (\d+) HP damage \((\d+) -> (\d+)\)\.$/i, (m, a, b, c, d) => lang === "uk" ? `${a} потрапив у пастку й отримує ${b} шкоди HP (${c} -> ${d}).` : `${a} попал в ловушку и получает ${b} урона по HP (${c} -> ${d}).`],
      [/^(.+) receives a prophecy reward of \+(\d+)💰\.$/, (m, a, b) => lang === "uk" ? `${a} отримує нагороду за пророцтво: +${b}💰.` : `${a} получает награду за предсказание: +${b}💰.`],
      [/^(.+) receives \+1 Protection Seal\.$/, (m, a) => lang === "uk" ? `${a} отримує +1 Печатку захисту.` : `${a} получает +1 Печать защиты.`],
      [/^(.+) receives \+1 Ritual Greaves\.$/, (m, a) => lang === "uk" ? `${a} отримує +1 Ритуальні поножі.` : `${a} получает +1 Ритуальные поножи.`],
      [/^(.+) reaches tile 100 .* and earns rank "(.+)"\.$/, (m, a, b) => lang === "uk" ? `Святилище визнало ${a}: досягнуто клітинку 100 і отримано ранг "${b}".` : `Святилище признало ${a}: достигнута клетка 100 и получен ранг "${b}".`],
      [/^The ritual is over: Sanctuary gathered (\d+) chosen ones\.$/, (m, a) => lang === "uk" ? `Обряд завершено: Святилище зібрало ${a} обраних.` : `Обряд завершен: Святилище собрало ${a} избранных.`],
      [/^(.+) approaches the Oracle .* but lacks (\d+)💰 for the ritual\.$/, (m, a, b) => lang === "uk" ? `${a} підходить до Оракула, але йому бракує ${b}💰 для ритуалу.` : `${a} подходит к Гадалке, но ему не хватает ${b}💰 для ритуала.`],
      [/^(.+) already has an active prophecy: (.+)$/, (m, a, b) => lang === "uk" ? `${a} уже має активне пророцтво: ${b}` : `${a} уже имеет активное предсказание: ${b}`],
      [/^(.+) pays (\d+)💰 to the Oracle .* and receives the sign: (.+)\.$/, (m, a, b, c) => lang === "uk" ? `${a} сплачує ${b}💰 Оракулу й отримує знак: ${c}.` : `${a} платит ${b}💰 Гадалке и получает знак: ${c}.`],
      [/^Oracle wording for (.+?): (.+)$/, (m, a, b) => lang === "uk" ? `Формулювання Оракула для ${a}: ${b}` : `Формулировка Гадалки для ${a}: ${b}`],
      [/^(.+) enters the Shadow market .* but lacks (\d+)💰 for the deal\.$/, (m, a, b) => lang === "uk" ? `${a} заходить на Тіньовий торг, але йому бракує ${b}💰 для угоди.` : `${a} зашел на Черный рынок, но ему не хватает ${b}💰 для сделки.`],
      [/^(.+) pays (\d+)💰 at the Shadow market .* and lands a profitable deal: \+(\d+)💰\.$/, (m, a, b, c) => lang === "uk" ? `${a} сплачує ${b}💰 на Тіньовому торзі та зриває вигідну угоду: +${c}💰.` : `${a} платит ${b}💰 на Черном рынке и срывает выгодную сделку: +${c}💰.`],
      [/^(.+) pays (\d+)💰 at the Shadow market .* and gets tricked and loses another (\d+)💰\.$/, (m, a, b, c) => lang === "uk" ? `${a} сплачує ${b}💰 на Тіньовому торзі, але потрапляє на обман і втрачає ще ${c}💰.` : `${a} платит ${b}💰 на Черном рынке, но попадает в обман и теряет еще ${c}💰.`],
      [/^(.+) pays (\d+)💰 at the Shadow market .* and gets a rare trophy: \+1 Protection Seal\.$/, (m, a, b) => lang === "uk" ? `${a} сплачує ${b}💰 на Тіньовому торзі та отримує рідкісний трофей: +1 Печатка захисту.` : `${a} платит ${b}💰 на Черном рынке и получает редкий трофей: +1 Печать защиты.`],
      [/^(.+) offers (\d+)💰 at the Altar .* and receives a blessing: \+1 Protection Seal\.$/, (m, a, b) => lang === "uk" ? `${a} приносить ${b}💰 на Вівтарі та отримує благословення: +1 Печатка захисту.` : `${a} приносит ${b}💰 на Алтаре и получает благословение: +1 Печать защиты.`],
      [/^(.+) offers (\d+)💰 at the Altar .* and receives the gift of the path: \+1 Ritual Greaves\.$/, (m, a, b) => lang === "uk" ? `${a} приносить ${b}💰 на Вівтарі та отримує дар шляху: +1 Ритуальні поножі.` : `${a} приносит ${b}💰 на Алтаре и получает дар пути: +1 Ритуальные поножи.`],
      [/^(.+) tries to address the Altar .* without tribute and loses (\d+)💰\.$/, (m, a, b) => lang === "uk" ? `${a} намагається звернутися до Вівтаря без дару й втрачає ${b}💰.` : `${a} пытается обратиться к Алтарю без подношения и теряет ${b}💰.`],
      [/^(.+): Ritual greaves are already primed for the next roll\.$/, (m, a) => lang === "uk" ? `${a}: Ритуальні поножі вже заряджені на наступний кидок.` : `${a}: Ритуальные поножи уже заряжены на следующий бросок.`],
      [/^(.+) activates Ritual greaves\. The next roll gets \+2\.$/i, (m, a) => lang === "uk" ? `${a} активує Ритуальні поножі. Наступний кидок отримує +2.` : `${a} активирует Ритуальные поножи. Следующий бросок получает +2.`],
      [/^(.+) opens the Charm of favor and receives \+(\d+)💰\.$/, (m, a, b) => lang === "uk" ? `${a} розмикає Талісман прихильності та отримує +${b}💰.` : `${a} размыкает Талисман благосклонности и получает +${b}💰.`],
      [/^(.+): cannot place a trap on start or finish\.$/, (m, a) => lang === "uk" ? `${a}: не можна поставити пастку на старт або фініш.` : `${a}: нельзя поставить ловушку на старт или финиш.`],
      [/^(.+): a trap already exists on tile (\d+)\.$/, (m, a, b) => lang === "uk" ? `${a}: на клітинці ${b} вже є пастка.` : `${a}: на клетке ${b} уже есть ловушка.`],
      [/^(.+) places a cursed seal on tile (\d+)\.$/, (m, a, b) => lang === "uk" ? `${a} накладає прокляту печатку на клітинку ${b}.` : `${a} накладывает проклятую печать на клетку ${b}.`],
      [/^(.+) shatters a Blood shard and receives \+(\d+)💰\.$/, (m, a, b) => lang === "uk" ? `${a} розколює Кривавий уламок і отримує +${b}💰.` : `${a} раскалывает Кровавый осколок и получает +${b}💰.`],
      [/^(.+) awakens the Second sign stone: (\d+)\. Move: (\d+) -> (\d+)\.$/, (m, a, b, c, d) => lang === "uk" ? `${a} пробуджує Камінь другого знака: ${b}. Переміщення: ${c} -> ${d}.` : `${a} пробуждает Камень второго знака: ${b}. Перемещение: ${c} -> ${d}.`],
      [/^A player named "(.+)" already exists\. Choose another name\.$/, (m, a) => lang === "uk" ? `Гравець з іменем "${a}" вже існує. Виберіть інший нік.` : `Игрок с именем "${a}" уже существует. Выберите другой ник.`],
      [/^(.+) enters the game\.$/, (m, a) => lang === "uk" ? `До гри приєднується ${a}.` : `В игру вступает ${a}.`],
      [/^Player (.+) removed from the game\.$/, (m, a) => lang === "uk" ? `Гравця ${a} видалено з гри.` : `Игрок ${a} удален из игры.`],
      [/^(.+) drops out of the match: (.+)\.$/, (m, a, b) => lang === "uk" ? `${a} вибуває з партії: ${translateEliminationReason(b, lang)}.` : `${a} выбывает из партии: ${translateEliminationReason(b, lang)}.`],
      [/^(.+) hits? a trap .* but the Protection Seal sav(?:es|ed) them! The seal dissipat(?:es|ed)\.$/i, (m, a) => lang === "uk" ? `${a} потрапив у пастку, але Печатка захисту рятує! Печатка розсіялася.` : `${a} попал в ловушку, но Печать защиты спасает! Печать рассеялась.`],
      [/^(.+) hit a trap .* and takes (\d+) HP damage \((\d+) -> (\d+)\)\.$/, (m, a, b, c, d) => lang === "uk" ? `${a} потрапив у пастку й отримує ${b} шкоди HP (${c} -> ${d}).` : `${a} попал в ловушку и получает ${b} урона по HP (${c} -> ${d}).`],
      [/^(.+) touches the Power seal .* and surges from (\d+) -> (\d+)\.$/i, (m, a, b, c) => lang === "uk" ? `${a} торкається Печатки сили й ривком проходить шлях ${b} -> ${c}.` : `${a} касается Печати силы и рывком проходит путь ${b} -> ${c}.`],
      [/^(.+) enters the Relic shop .* Rewards are handed out manually by the Keeper\.$/, (m, a) => lang === "uk" ? `${a} входить до Крамниці реліквій. Дарунки видає Хранитель вручну.` : `${a} входит в Лавку реликвий. Дары выдаются Хранителем вручную.`],
      [/^(.+) steps onto the Shadow market .* Right-click the tile to open the ritual menu\.$/, (m, a) => lang === "uk" ? `${a} ступає на Тіньовий торг. Натисніть ПКМ по клітинці, щоб відкрити ритуальне меню.` : `${a} ступает на Теневой торг. Нажмите ПКМ по клетке, чтобы открыть ритуальное меню.`],
      [/^(.+) approaches the Blood altar .* Right-click the tile to open the ritual menu\.$/, (m, a) => lang === "uk" ? `${a} наближається до Кривавого вівтаря. Натисніть ПКМ по клітинці, щоб відкрити ритуальне меню.` : `${a} приближается к Кровавому алтарю. Нажмите ПКМ по клетке, чтобы открыть ритуальное меню.`],
      [/^(.+) enters the Oracle circle .* Right-click the Oracle tile to open the ritual menu\.$/, (m, a) => lang === "uk" ? `${a} входить до кола Оракула. Натисніть ПКМ по клітинці Оракула, щоб відкрити ритуальне меню.` : `${a} входит в круг Оракула. Нажмите ПКМ по клетке Оракула, чтобы открыть ритуальное меню.`],
      [/^(.+) activated Ritual greaves: \+2 to the roll\.$/i, (m, a) => lang === "uk" ? `${a} активував Ритуальні поножі: +2 до кидка.` : `${a} активировал Ритуальные поножи: +2 к броску.`],
      [/^(.+) rolled the die: (\d+)(?: \(\+(\d+)\))?(?: = (\d+))?\. Move: (\d+) -> (\d+)\.$/, (m, a, b, c, d, e, f) => {
        const bonusPart = c ? ` (+${c})` : "";
        const total = d || (Number(b) + Number(c || 0));
        const rollPart = c ? `${b}${bonusPart} = ${total}` : `${b}`;
        return lang === "uk"
          ? `${a} кинув кубик: ${rollPart}. Хід: ${e} -> ${f}.`
          : `${a} бросил кубик: ${rollPart}. Ход: ${e} -> ${f}.`;
      }],
      [/^Turn passed to: (.+)\.$/, (m, a) => lang === "uk" ? `Хід передано: ${a}.` : `Ход передан: ${a}.`],
      [/^Undid action: (.+)\.$/, (m, a) => lang === "uk" ? `Скасовано дію: ${a}.` : `Отмена действия: ${a}.`],
      [/^Keeper moves (.+) to tile (\d+) \((\d+) -> (\d+)\)\.$/, (m, a, b, c, d) => lang === "uk" ? `Хранитель переносить ${a} на клітинку ${b} (${c} -> ${d}).` : `Хранитель переносит ${a} на клетку ${b} (${c} -> ${d}).`],
      [/^Purchase denied: (.+) must stand on any shop tile .*$/, (m, a) => lang === "uk" ? `Купівлю відхилено: ${a} має стояти на будь-якій клітинці крамниці.` : `Покупка отклонена: ${a} должен стоять на любой клетке магазина.`],
      [/^Inventory full: (.+) has all (\d+) slots occupied \(a free slot is needed for a new item type\)\.$/, (m, a, b) => lang === "uk" ? `Інвентар повний: у ${a} зайнято всі ${b} слоти (потрібен вільний слот для нового типу предмета).` : `Инвентарь полон: у ${a} заняты все ${b} слота (нужен свободный слот для нового типа предмета).`],
      [/^Inventory full: (.+) has all (\d+) slots occupied\.$/, (m, a, b) => lang === "uk" ? `Інвентар повний: у ${a} зайнято всі ${b} слоти.` : `Инвентарь полон: у ${a} заняты все ${b} слота.`],
      [/^Relic shop \(tile (\d+)\): (.+) lacks gold to buy "(.+)" \((\d+)💰\)\.$/, (m, a, b, c, d) => lang === "uk" ? `Крамниця реліквій (клітинка ${a}): у ${b} не вистачає золота для купівлі "${c}" (${d}💰).` : `Лавка реликвий (клетка ${a}): у ${b} не хватает золота для покупки "${c}" (${d}💰).`],
      [/^Relic shop \(tile (\d+)\): (.+) gets "(.+)" for (\d+)💰 and immediately releases \+(\d+)💰 energy\.$/, (m, a, b, c, d, e) => lang === "uk" ? `Крамниця реліквій (клітинка ${a}): ${b} отримує "${c}" за ${d}💰 і одразу вивільняє +${e}💰 енергії.` : `Лавка реликвий (клетка ${a}): ${b} получает "${c}" за ${d}💰 и тут же высвобождает +${e}💰 энергии.`],
      [/^Relic shop \(tile (\d+)\): (.+) gets "(.+)" for (\d+)💰\.$/, (m, a, b, c, d) => lang === "uk" ? `Крамниця реліквій (клітинка ${a}): ${b} отримує "${c}" за ${d}💰.` : `Лавка реликвий (клетка ${a}): ${b} получает "${c}" за ${d}💰.`],
      [/^Sale denied: (.+) must stand on any shop tile .*$/, (m, a) => lang === "uk" ? `Продаж відхилено: ${a} має стояти на будь-якій клітинці крамниці.` : `Продажа отклонена: ${a} должен стоять на любой клетке магазина.`],
      [/^Relic shop \(tile (\d+)\): (.+) trades 1x "(.+)" for \+(\d+)💰\.$/, (m, a, b, c, d) => lang === "uk" ? `Крамниця реліквій (клітинка ${a}): ${b} передає 1x "${c}" в обмін на +${d}💰.` : `Лавка реликвий (клетка ${a}): ${b} передает 1x "${c}" в обмен на +${d}💰.`],
      [/^Keeper grants (.+) \+50\D* \(total: (\d+)\D*\)\.$/, (m, a, b) => lang === "uk" ? `Хранитель дарує ${a} +50${goldIcon} (разом: ${b}${goldIcon}).` : `Хранитель дарует ${a} +50${goldIcon} (итого: ${b}${goldIcon}).`],
      [/^Keeper takes 50\D* from (.+) \(total: (\d+)\D*\)\.$/, (m, a, b) => lang === "uk" ? `Хранитель вилучає у ${a} 50${goldIcon} (разом: ${b}${goldIcon}).` : `Хранитель изымает у ${a} 50${goldIcon} (итого: ${b}${goldIcon}).`],
      [/^Keeper hands (.+) Ritual greaves \(total: (\d+)\)\.$/i, (m, a, b) => lang === "uk" ? `Хранитель вручає ${a} Ритуальні поножі (усього: ${b}).` : `Хранитель вручает ${a} Ритуальные поножи (всего: ${b}).`],
      [/^Keeper hands (.+) Protection Seal \(total: (\d+)\)\.$/, (m, a, b) => lang === "uk" ? `Хранитель вручає ${a} Печатку захисту (усього: ${b}).` : `Хранитель вручает ${a} Печать защиты (всего: ${b}).`],
      [/^Keeper punishes (.+): -3 tiles \((\d+) -> (\d+)\)\.$/, (m, a, b, c) => lang === "uk" ? `Хранитель карає ${a}: -3 клітинки (${b} -> ${c}).` : `Хранитель карает ${a}: -3 клетки (${b} -> ${c}).`],
      [/^Prophecy unavailable: no player is selected at the Oracle\.$/, (m) => lang === "uk" ? "Ворожіння недоступне: у Оракула немає вибраного гравця." : "Гадание недоступно: у Гадалки нет выбранного игрока."],
      [/^Prophecy denied: (.+) must stand on the Oracle tile .*$/, (m, a) => lang === "uk" ? `Пророцтво відхилено: ${a} має стояти на клітинці Оракула.` : `Гадание отклонено: ${a} должен стоять на клетке Гадалки.`],
      [/^Action unavailable: no player selected\.$/, (m) => lang === "uk" ? "Дія недоступна: гравця не вибрано." : "Действие недоступно: нет выбранного игрока."],
      [/^Deal denied: (.+) must stand on the Shadow market tile .*$/, (m, a) => lang === "uk" ? `Угоду відхилено: ${a} має стояти на клітинці Тіньового торгу.` : `Сделка отклонена: ${a} должен стоять на клетке Черного рынка.`],
      [/^Ritual denied: (.+) must stand on the Altar tile .*$/, (m, a) => lang === "uk" ? `Ритуал відхилено: ${a} має стояти на клітинці Вівтаря.` : `Ритуал отклонен: ${a} должен стоять на клетке Алтаря.`],
      [/^Game ready\. Add players and start the run!$/, (m) => lang === "uk" ? "Гра готова. Додайте гравців і починайте забіг!" : "Игра готова. Добавьте игроков и начните забег!"],
      [/^Предсказание выполнено: (.+) получает награду \+(\d+)💰\.$/, (m, a, b) => lang === "uk" ? `Пророцтво виконано: ${a} отримує нагороду +${b}💰.` : `Prophecy completed: ${a} receives a +${b}💰 reward.`],
      [/^Предсказание выполнено: (.+) получает \+1 Печать защиты\.$/, (m, a) => lang === "uk" ? `Пророцтво виконано: ${a} отримує +1 Печатку захисту.` : `Prophecy completed: ${a} receives +1 Protection Seal.`],
      [/^Предсказание выполнено: (.+) получает \+1 Ритуальные поножи\.$/, (m, a) => lang === "uk" ? `Пророцтво виконано: ${a} отримує +1 Ритуальні поножі.` : `Prophecy completed: ${a} receives +1 Ritual Greaves.`],
      [/^(.+?) подходит к Гадалке .* но не хватает (\d+)💰 для ритуала\.$/, (m, a, b) => lang === "uk" ? `${a} підходить до Оракула, але йому бракує ${b}💰 для ритуалу.` : `${a} approaches the Oracle, but lacks ${b}💰 for the ritual.`],
      [/^(.+?) уже имеет активное предсказание: (.+)$/, (m, a, b) => lang === "uk" ? `${a} уже має активне пророцтво: ${b}` : `${a} already has an active prophecy: ${b}`],
      [/^(.+?) платит (\d+)💰 Гадалке .* и получает знак: (.+)\.$/, (m, a, b, c) => lang === "uk" ? `${a} сплачує ${b}💰 Оракулу й отримує знак: ${c}.` : `${a} pays ${b}💰 to the Oracle and receives the sign: ${c}.`],
      [/^Формулировка Гадалки для (.+?): (.+)$/, (m, a, b) => lang === "uk" ? `Формулювання Оракула для ${a}: ${b}` : `Oracle wording for ${a}: ${b}`],
      [/^(.+?) зашел на Черный рынок .* но ему не хватает (\d+)💰 для сделки\.$/, (m, a, b) => lang === "uk" ? `${a} зайшов на Тіньовий торг, але йому бракує ${b}💰 для угоди.` : `${a} entered the Shadow market, but lacks ${b}💰 for the deal.`],
      [/^(.+?) платит (\d+)💰 на Черном рынке .* и срывает выгодную сделку: \+(\d+)💰\.$/, (m, a, b, c) => lang === "uk" ? `${a} сплачує ${b}💰 на Тіньовому торзі та зриває вигідну угоду: +${c}💰.` : `${a} pays ${b}💰 at the Shadow market and lands a profitable deal: +${c}💰.`],
      [/^(.+?) платит (\d+)💰 на Черном рынке .* но попадает в обман и теряет еще (\d+)💰\.$/, (m, a, b, c) => lang === "uk" ? `${a} сплачує ${b}💰 на Тіньовому торзі, але потрапляє на обман і втрачає ще ${c}💰.` : `${a} pays ${b}💰 at the Shadow market, but gets tricked and loses another ${c}💰.`],
      [/^(.+?) платит (\d+)💰 на Черном рынке .* и получает редкий трофей: \+1 Печать защиты\.$/, (m, a, b) => lang === "uk" ? `${a} сплачує ${b}💰 на Тіньовому торзі та отримує рідкісний трофей: +1 Печатка захисту.` : `${a} pays ${b}💰 at the Shadow market and gets a rare trophy: +1 Protection Seal.`],
      [/^(.+?) приносит (\d+)💰 на Алтаре .* и получает благословение: \+1 Печать защиты\.$/, (m, a, b) => lang === "uk" ? `${a} приносить ${b}💰 на Вівтарі та отримує благословення: +1 Печатка захисту.` : `${a} offers ${b}💰 at the Altar and receives a blessing: +1 Protection Seal.`],
      [/^(.+?) приносит (\d+)💰 на Алтаре .* и получает дар пути: \+1 Ритуальные поножи\.$/, (m, a, b) => lang === "uk" ? `${a} приносить ${b}💰 на Вівтарі та отримує дар шляху: +1 Ритуальні поножі.` : `${a} offers ${b}💰 at the Altar and receives the gift of the path: +1 Ritual Greaves.`],
      [/^(.+?) пытается обратиться к Алтарю .* без подношения и теряет (\d+)💰\.$/, (m, a, b) => lang === "uk" ? `${a} намагається звернутися до Вівтаря без дару й втрачає ${b}💰.` : `${a} tries to address the Altar without tribute and loses ${b}💰.`],
      [/^(.+?): Ритуальные поножи уже заряжены на следующий бросок\.$/, (m, a) => lang === "uk" ? `${a}: Ритуальні поножі вже заряджені на наступний кидок.` : `${a}: Ritual greaves are already primed for the next roll.`],
      [/^(.+?) активирует Ритуальные поножи\. Следующий бросок получает \+2\.$/, (m, a) => lang === "uk" ? `${a} активує Ритуальні поножі. Наступний кидок отримує +2.` : `${a} activates Ritual Greaves. The next roll gets +2.`],
      [/^(.+?) размыкает Талисман благосклонности и получает \+(\d+)💰\.$/, (m, a, b) => lang === "uk" ? `${a} розмикає Талісман прихильності та отримує +${b}💰.` : `${a} opens Charm of Favor and gets +${b}💰.`],
      [/^(.+?): нельзя поставить ловушку на старт или финиш\.$/, (m, a) => lang === "uk" ? `${a}: не можна поставити пастку на старт або фініш.` : `${a}: cannot place a trap on start or finish.`],
      [/^(.+?): на клетке (\d+) уже есть ловушка\.$/, (m, a, b) => lang === "uk" ? `${a}: на клітинці ${b} вже є пастка.` : `${a}: a trap already exists on tile ${b}.`],
      [/^(.+?) накладывает проклятую печать на клетку (\d+)\.$/, (m, a, b) => lang === "uk" ? `${a} накладає прокляту печатку на клітинку ${b}.` : `${a} places a cursed seal on tile ${b}.`],
      [/^(.+?) раскалывает Кровавый осколок и получает \+(\d+)💰\.$/, (m, a, b) => lang === "uk" ? `${a} розколює Кривавий уламок і отримує +${b}💰.` : `${a} shatters a Blood Shard and gets +${b}💰.`],
      [/^(.+?) пробуждает Камень второго знака: (\d+)\. Перемещение: (\d+) -> (\d+)\.$/, (m, a, b, c, d) => lang === "uk" ? `${a} пробуджує Камінь другого знака: ${b}. Переміщення: ${c} -> ${d}.` : `${a} awakens the Second Sign Stone: ${b}. Move: ${c} -> ${d}.`],
      [/^Игрок с именем "(.+)" уже существует\. Выберите другой ник\.$/, (m, a) => lang === "uk" ? `Гравець з іменем "${a}" вже існує. Виберіть інший нік.` : `A player named "${a}" already exists. Choose another name.`],
      [/^В игру вступает (.+)\.$/, (m, a) => lang === "uk" ? `До гри приєднується ${a}.` : `${a} enters the game.`],
      [/^Игрок (.+) удален из игры\.$/, (m, a) => lang === "uk" ? `Гравця ${a} видалено з гри.` : `Player ${a} removed from the game.`],
      [/^(.+) выбывает из партии: (.+)\.$/, (m, a, b) => lang === "uk" ? `${a} вибуває з партії: ${translateEliminationReason(b, lang)}.` : `${a} drops out of the match: ${translateEliminationReason(b, lang)}.`],
      [/^(.+) попал в ловушку .* но Печать защиты спасает! Печать рассеялась\.$/, (m, a) => lang === "uk" ? `${a} потрапив у пастку, але Печатка захисту рятує! Печатка розсіялася.` : `${a} hits a trap, but the Protection Seal saves them! The seal dissipates.`],
      [/^(.+) попал в ловушку .* и получает (\d+) урона по HP \((\d+) -> (\d+)\)\.$/, (m, a, b, c, d) => lang === "uk" ? `${a} потрапив у пастку й отримує ${b} шкоди HP (${c} -> ${d}).` : `${a} hit a trap and takes ${b} HP damage (${c} -> ${d}).`],
      [/^(.+) касается Печати силы .* и рывком проходит путь (\d+) -> (\d+)\.$/, (m, a, b, c) => lang === "uk" ? `${a} торкається Печатки сили й ривком проходить шлях ${b} -> ${c}.` : `${a} touches the Power seal and surges from ${b} -> ${c}.`],
      [/^(.+) входит в Лавку реликвий .* Дары выдаются Хранителем вручную\.$/, (m, a) => lang === "uk" ? `${a} входить до Крамниці реліквій. Дарунки видає Хранитель вручну.` : `${a} enters the Relic shop. Rewards are handed out manually by the Keeper.`],
      [/^(.+) ступает на Теневой торг .* Нажмите ПКМ по клетке, чтобы открыть ритуальное меню\.$/, (m, a) => lang === "uk" ? `${a} ступає на Тіньовий торг. Натисніть ПКМ по клітинці, щоб відкрити ритуальне меню.` : `${a} steps onto the Shadow market. Right-click the tile to open the ritual menu.`],
      [/^(.+) приближается к Кровавому алтарю .* Нажмите ПКМ по клетке, чтобы открыть ритуальное меню\.$/, (m, a) => lang === "uk" ? `${a} наближається до Кривавого вівтаря. Натисніть ПКМ по клітинці, щоб відкрити ритуальне меню.` : `${a} approaches the Blood altar. Right-click the tile to open the ritual menu.`],
      [/^(.+) входит в круг Оракула .* Нажмите ПКМ по клетке Оракула, чтобы открыть ритуальное меню\.$/, (m, a) => lang === "uk" ? `${a} входить до кола Оракула. Натисніть ПКМ по клітинці Оракула, щоб відкрити ритуальне меню.` : `${a} enters the Oracle circle. Right-click the Oracle tile to open the ritual menu.`],
      [/^(.+) активировал Ритуальные поножи: \+2 к броску\.$/, (m, a) => lang === "uk" ? `${a} активував Ритуальні поножі: +2 до кидка.` : `${a} activated Ritual Greaves: +2 to the roll.`],
      [/^(.+) бросил кубик: (\d+)(?: \(\+(\d+)\))?(?: = (\d+))?\. Ход: (\d+) -> (\d+)\.$/, (m, a, b, c, d, e, f) => {
        const bonusPart = c ? ` (+${c})` : "";
        const total = d || (Number(b) + Number(c || 0));
        const rollPart = c ? `${b}${bonusPart} = ${total}` : `${b}`;
        return lang === "uk"
          ? `${a} кинув кубик: ${rollPart}. Хід: ${e} -> ${f}.`
          : `${a} rolled the die: ${rollPart}. Move: ${e} -> ${f}.`;
      }],
      [/^Ход передан: (.+)\.$/, (m, a) => lang === "uk" ? `Хід передано: ${a}.` : `Turn passed to: ${a}.`],
      [/^Отмена действия: (.+)\.$/, (m, a) => lang === "uk" ? `Скасовано дію: ${a}.` : `Undid action: ${a}.`],
      [/^Хранитель переносит (.+) на клетку (\d+) \((\d+) -> (\d+)\)\.$/, (m, a, b, c, d) => lang === "uk" ? `Хранитель переносить ${a} на клітинку ${b} (${c} -> ${d}).` : `Keeper moves ${a} to tile ${b} (${c} -> ${d}).`],
      [/^Покупка отклонена: (.+) должен стоять на любой клетке магазина .*$/, (m, a) => lang === "uk" ? `Купівлю відхилено: ${a} має стояти на будь-якій клітинці крамниці.` : `Purchase denied: ${a} must stand on any shop tile.`],
      [/^Инвентарь полон: у (.+) заняты все (\d+) слота \(нужен свободный слот для нового типа предмета\)\.$/, (m, a, b) => lang === "uk" ? `Інвентар повний: у ${a} зайнято всі ${b} слоти (потрібен вільний слот для нового типу предмета).` : `Inventory full: ${a} has all ${b} slots occupied (a free slot is needed for a new item type).`],
      [/^Инвентарь полон: у (.+) заняты все (\d+) слота\.$/, (m, a, b) => lang === "uk" ? `Інвентар повний: у ${a} зайнято всі ${b} слоти.` : `Inventory full: ${a} has all ${b} slots occupied.`],
      [/^Інвентар повний: у (.+) зайнято всі (\d+) слоти\.$/, (m, a, b) => lang === "uk" ? `Інвентар повний: у ${a} зайнято всі ${b} слоти.` : `Inventory full: ${a} has all ${b} slots occupied.`],
      [/^Лавка реликвий \(клетка (\d+)\): у (.+) не хватает золота для покупки "(.+)" \((\d+)💰\)\.$/, (m, a, b, c, d) => lang === "uk" ? `Крамниця реліквій (клітинка ${a}): у ${b} не вистачає золота для купівлі "${c}" (${d}💰).` : `Relic shop (tile ${a}): ${b} lacks gold to buy "${c}" (${d}💰).`],
      [/^Лавка реликвий \(клетка (\d+)\): (.+) получает "(.+)" за (\d+)💰 и тут же высвобождает \+(\d+)💰 энергии\.$/, (m, a, b, c, d, e) => lang === "uk" ? `Крамниця реліквій (клітинка ${a}): ${b} отримує "${c}" за ${d}💰 і одразу вивільняє +${e}💰 енергії.` : `Relic shop (tile ${a}): ${b} gets "${c}" for ${d}💰 and immediately releases +${e}💰 energy.`],
      [/^Лавка реликвий \(клетка (\d+)\): (.+) получает "(.+)" за (\d+)💰\.$/, (m, a, b, c, d) => lang === "uk" ? `Крамниця реліквій (клітинка ${a}): ${b} отримує "${c}" за ${d}💰.` : `Relic shop (tile ${a}): ${b} gets "${c}" for ${d}💰.`],
      [/^Продажа отклонена: (.+) должен стоять на любой клетке магазина .*$/, (m, a) => lang === "uk" ? `Продаж відхилено: ${a} має стояти на будь-якій клітинці крамниці.` : `Sale denied: ${a} must stand on any shop tile.`],
      [/^Лавка реликвий \(клетка (\d+)\): (.+) передает 1x "(.+)" в обмен на \+(\d+)💰\.$/, (m, a, b, c, d) => lang === "uk" ? `Крамниця реліквій (клітинка ${a}): ${b} передає 1x "${c}" в обмін на +${d}💰.` : `Relic shop (tile ${a}): ${b} trades 1x "${c}" for +${d}💰.`],
      [/^Хранитель дарует (.+) \+50💰 \(итого: (\d+)\)\.$/, (m, a, b) => lang === "uk" ? `Хранитель дарує ${a} +50💰 (разом: ${b}).` : `Keeper grants ${a} +50💰 (total: ${b}).`],
      [/^Хранитель изымает у (.+) 50💰 \(итого: (\d+)\)\.$/, (m, a, b) => lang === "uk" ? `Хранитель вилучає у ${a} 50💰 (разом: ${b}).` : `Keeper takes 50💰 from ${a} (total: ${b}).`],
      [/^Хранитель вручает (.+) Ритуальные поножи \(всего: (\d+)\)\.$/, (m, a, b) => lang === "uk" ? `Хранитель вручає ${a} Ритуальні поножі (усього: ${b}).` : `Keeper hands ${a} Ritual Greaves (total: ${b}).`],
      [/^Хранитель вручает (.+) Печать защиты \(всего: (\d+)\)\.$/, (m, a, b) => lang === "uk" ? `Хранитель вручає ${a} Печатку захисту (усього: ${b}).` : `Keeper hands ${a} Protection Seal (total: ${b}).`],
      [/^Хранитель карает (.+): -3 клетки \((\d+) -> (\d+)\)\.$/, (m, a, b, c) => lang === "uk" ? `Хранитель карає ${a}: -3 клітинки (${b} -> ${c}).` : `Keeper punishes ${a}: -3 tiles (${b} -> ${c}).`],
      [/^Гадание отклонено: (.+) должен стоять на клетке Гадалки .*$/, (m, a) => lang === "uk" ? `Ворожіння відхилено: ${a} має стояти на клітинці Оракула.` : `Prophecy denied: ${a} must stand on the Oracle tile.`],
      [/^Сделка отклонена: (.+) должен стоять на клетке Черного рынка .*$/, (m, a) => lang === "uk" ? `Угоду відхилено: ${a} має стояти на клітинці Тіньового торгу.` : `Deal denied: ${a} must stand on the Shadow market tile.`],
      [/^Ритуал отклонен: (.+) должен стоять на клетке Алтаря .*$/, (m, a) => lang === "uk" ? `Ритуал відхилено: ${a} має стояти на клітинці Вівтаря.` : `Ritual denied: ${a} must stand on the Altar tile.`],
      [/^Святилище признало (.+): достигнута клетка 100 .* и получен ранг "(.+)"\.$/, (m, a, b) => lang === "uk" ? `Святилище визнало ${a}: досягнуто клітинку 100 і отримано ранг "${b}".` : `Sanctuary recognized ${a}: reached tile 100 and received rank "${b}".`],
      [/^Обряд завершен: Святилище собрало (\d+) избранных\.$/, (m, a) => lang === "uk" ? `Обряд завершено: Святилище зібрало ${a} обраних.` : `The ritual is over: Sanctuary gathered ${a} chosen ones.`],
      [/^(.+) уже имеет активное предсказание: (.+)$/, (m, a, b) => lang === "uk" ? `${a} уже має активне пророцтво: ${b}` : `${a} already has an active prophecy: ${b}`],
      [/^Гадание недоступно: у Гадалки нет выбранного игрока\.$/, (m) => lang === "uk" ? "Ворожіння недоступне: у Оракула немає вибраного гравця." : "Prophecy unavailable: no player is selected at the Oracle."],
      [/^Покупка недоступна: на клетке магазина нет выбранного игрока\.$/, (m) => lang === "uk" ? "Купівля недоступна: на клітинці крамниці немає вибраного гравця." : "Purchase unavailable: no selected player is on the shop tile."],
      [/^Действие недоступно: нет выбранного игрока\.$/, (m) => lang === "uk" ? "Дія недоступна: гравця не вибрано." : "Action unavailable: no player selected."],
      [/^Игра готова\. Добавьте игроков и начните забег!$/, (m) => lang === "uk" ? "Гра готова. Додайте гравців і починайте забіг!" : "Game ready. Add players and start the run!"]
    ];

    for (const [rx, fn] of patterns) {
      const match = text.match(rx);
      if (match) return fn(...match);
    }

    return text;
  }

  global.GAME_I18N = {
    DEFAULT_LANGUAGE: "ru",
    bundles,
    getBundle,
    getLanguageKey,
    getPreferredLanguage,
    setLanguageKey,
    getByPath,
    formatTemplate,
    t,
    localizeValue,
    getShopItemName,
    getShopItemDesc,
    getCellTypeLabel,
    getPhaseLabel,
    translateLogMessage
  };
})(window);
