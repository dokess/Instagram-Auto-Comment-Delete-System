/*
╔══════════════════════════════════════════════════════════════════════════════╗
║   AUTO COMMENT DELETE  v6.0                                                 ║
║   by DOKES  —  github.com/dokess                                            ║
╚══════════════════════════════════════════════════════════════════════════════╝
  KULLANIM : F12 › Console › Yapıştır › Enter
  KISAYOLLAR:
    Space = Dur/Devam   Esc = Bitir     T = Tema     L = Dil
    U = Geri Al         D = DryRun      C = Kompakt  ? = Yardım
    Shift+S = Boyut     Shift+R = Sıfırla            Shift+O = Opaklık

  DÜZELTMELER (fixed build):
    [1] buildHTML: acds-xstat wrapper eksikti → hız sayısı panelden kopuk görünüyordu
    [2] cyclePanelSize: root transition eklendi + panel.style.width="100%" sync edildi
    [3] Versiyon etiketi v1.0 → v6.0 düzeltildi (özet popup'ta)
*/

(() => {
"use strict";

// ─── INSTAGRAM DİL TABLOSU ───────────────────────────────────────────────────
const IG_LANGS = {
  tr: { select:"Seç",           delete:"Sil",         name:"Türkçe"      },
  en: { select:"Select",        delete:"Delete",       name:"English"     },
  de: { select:"Auswählen",     delete:"Löschen",      name:"Deutsch"     },
  fr: { select:"Sélectionner",  delete:"Supprimer",    name:"Français"    },
  es: { select:"Seleccionar",   delete:"Eliminar",     name:"Español"     },
  it: { select:"Seleziona",     delete:"Elimina",      name:"Italiano"    },
  pt: { select:"Selecionar",    delete:"Excluir",      name:"Português"   },
  nl: { select:"Selecteren",    delete:"Verwijderen",  name:"Nederlands"  },
  ru: { select:"Выбрать",       delete:"Удалить",      name:"Русский"     },
  ar: { select:"تحديد",         delete:"حذف",          name:"العربية"     },
  ko: { select:"선택",           delete:"삭제",          name:"한국어"       },
  ja: { select:"選択",           delete:"削除",          name:"日本語"       },
  zh: { select:"选择",           delete:"删除",          name:"中文"        },
};

// ─── UI DİL TABLOSU ──────────────────────────────────────────────────────────
const UI_LANGS = {
  tr: {
    sub:"AUTO COMMENT DELETE",
    tabMain:"ANA", tabSettings:"AYARLAR", tabLists:"LİSTELER", tabLog:"LOG",
    statusWait:"Hazır — BAŞLAT'a bas",
    lblDeleted:"Silinen", lblRound:"Tur", lblSkipped:"Atlanan", lblTime:"Süre",
    lblSecurity:"GÜVENLİK",
    lblGoal:"HEDEF", lblCooldown:"BEKLEME",
    lblLastDel:"SON SİLİNENLER", lblSelecting:"SEÇİLİYOR",
    btnStart:"▶  BAŞLAT", btnPause:"⏸  DUR", btnResume:"▶  DEVAM", btnStop:"■  BİTİR",
    btnUndo:"↩ GERİ AL", btnDryRun:"🧪 TEST MOD",
    lblRecentLogs:"SON KAYITLAR",
    settIgLang:"Instagram Dili",
    settBatch:"Tur başına yorum",
    settBatchVal:"yorum/tur",
    settTarget:"Hedef (0=sınırsız)", settCooldown:"Bekleme (sn)",
    settSelectDelay:"Seçim gecikmesi (ms)",
    settSound:"Ses bildirimi", settNotif:"Browser bildirimi",
    settAdaptive:"Adaptif zamanlama",
    settDryRun:"Dry Run (say, silme)",
    settRegex:"Regex filtre (boş=hepsi)",
    settRegexPlaceholder:"örn: spam|reklam|bot",
    settUiLang:"Panel Dili",
    btnSave:"✓  KAYDET", btnReset:"↺  SIFIRLA",
    wlTab:"BEYAZ LİSTE", blTab:"KARA LİSTE",
    wlDesc:"Bu kullanıcıların yorumları atlanır.",
    blDesc:"Sadece bu kullanıcıların yorumları silinir. Boşsa hepsi.",
    listPlaceholder:"kullanici_adi", btnAdd:"EKLE", listEmpty:"Boş",
    logBtnJson:"JSON", logBtnCsv:"CSV", logBtnTxt:"TXT",
    logBtnCopy:"KOPYALA", logBtnClear:"TEMİZLE",
    msgStarted:"Sistem başlatıldı", msgPaused:"Duraklatıldı",
    msgResumed:"Devam ediliyor", msgStopped:"Durduruldu",
    msgLang:"Dil:", msgDryRunOn:"DRY RUN — Gerçek silme yok!",
    msgNoComment:"Yorum yok, kaydırılıyor...",
    msgAllDone:"Silinecek yorum kalmadı!",
    msgFilterSkip:"Tüm yorumlar filtrede, kaydırılıyor...",
    msgSelected:"Seçildi", msgOf:"/",
    msgSelecting:"Seçiliyor:",
    msgNoSelectBtn:"Seç butonu yok", msgNoDeleteBtn:"Sil butonu yok",
    msgNoPopupBtn:"Popup butonu yok", msgDeleted:"silindi → toplam",
    msgCooldown:"Bekleme:", msgError:"Hata",
    msgTooManyErrors:"dk bekleniyor...",
    msgTargetDone:"tamamlandı!", msgDone:"✓ İşlem tamamlandı",
    msgUndoSuccess:"Son batch geri alındı", msgUndoEmpty:"Geri alınacak yok",
    msgSettingsSaved:"Ayarlar kaydedildi",
    msgLogCleared:"Log temizlendi", msgLogCopied:"Log kopyalandı",
    msgLogCopyFail:"Kopyalama başarısız",
    msgListAdd:"eklendi:", msgListRemove:"silindi",
    notifDone:"Tamamlandı!", notifDoneBody:"yorum silindi",
    notifError:"Hata", notifErrorBody:"Çok fazla hata, bekleniyor",
    notifTarget:"Hedef tamamlandı",
    statusRunning:"Çalışıyor", statusCooldown:"Bekleniyor",
    statusError:"Hata!", statusDone:"Tamamlandı ✓", statusTarget:"Hedef ✓",
    dryRunLabel:"[DRY]",
    exportName:"acds",
    secLabel:"by",
    helpTitle:"KLAVYE KISAYOLLARI",
    helpKeys:[
      ["Space","Dur / Devam"],["Esc","Durdur / Kapat"],
      ["T","Tema değiştir"],["L","Dil değiştir"],
      ["D","Dry Run toggle"],
      ["C","Kompakt görünüm"],["E","JSON export"],
      ["N","Bildirim toggle"],["Shift+S","Panel boyutu"],
      ["Shift+R","İstatistikleri sıfırla"],["Shift+O","Opaklık toggle"],
      ["?","Bu yardım penceresi"],
    ],
    rateLimit:"Instagram rate limit! Bekleniyor...",
    compactMode:"Kompakt mod", fullMode:"Tam görünüm",
    summaryTitle:"OTURUM ÖZETİ", summaryClose:"KAPAT",
    summaryDeleted:"Toplam Silinen", summaryRounds:"Toplam Tur",
    summarySkipped:"Atlanan", summaryDuration:"Süre",
    summaryRate:"Saatlik Hız", summaryBanScore:"Güvenlik",
    resetConfirm:"İstatistikleri sıfırla?",
    msgReset:"İstatistikler sıfırlandı",
  },
  en: {
    sub:"AUTO COMMENT DELETE",
    tabMain:"MAIN", tabSettings:"SETTINGS", tabLists:"LISTS", tabLog:"LOG",
    statusWait:"Ready — press START",
    lblDeleted:"Deleted", lblRound:"Round", lblSkipped:"Skipped", lblTime:"Time",
    lblSecurity:"SAFETY",
    lblGoal:"TARGET", lblCooldown:"COOLDOWN",
    lblLastDel:"LAST DELETED", lblSelecting:"SELECTING",
    btnStart:"▶  START", btnPause:"⏸  PAUSE", btnResume:"▶  RESUME", btnStop:"■  STOP",
    btnUndo:"↩ UNDO", btnDryRun:"🧪 DRY RUN",
    lblRecentLogs:"RECENT LOGS",
    settIgLang:"Instagram Language",
    settBatch:"Comments per round",
    settBatchVal:"per round",
    settTarget:"Target (0=unlimited)", settCooldown:"Cooldown (sec)",
    settSelectDelay:"Select delay (ms)",
    settSound:"Sound alerts", settNotif:"Browser notifications",
    settAdaptive:"Adaptive timing",
    settDryRun:"Dry Run (count only)",
    settRegex:"Regex filter (empty=all)",
    settRegexPlaceholder:"e.g: spam|ads|bot",
    settUiLang:"Panel Language",
    btnSave:"✓  SAVE", btnReset:"↺  RESET",
    wlTab:"WHITELIST", blTab:"BLACKLIST",
    wlDesc:"Comments from these users are skipped.",
    blDesc:"Only these users' comments are deleted. Empty = all.",
    listPlaceholder:"username", btnAdd:"ADD", listEmpty:"Empty",
    logBtnJson:"JSON", logBtnCsv:"CSV", logBtnTxt:"TXT",
    logBtnCopy:"COPY", logBtnClear:"CLEAR",
    msgStarted:"System started", msgPaused:"Paused",
    msgResumed:"Resumed", msgStopped:"Stopped",
    msgLang:"Language:", msgDryRunOn:"DRY RUN — No real deletions!",
    msgNoComment:"No comments, scrolling...",
    msgAllDone:"No more comments to delete!",
    msgFilterSkip:"All filtered, scrolling...",
    msgSelected:"Selected", msgOf:"/",
    msgSelecting:"Selecting:",
    msgNoSelectBtn:"Select button not found", msgNoDeleteBtn:"Delete button not found",
    msgNoPopupBtn:"Popup button not found", msgDeleted:"deleted → total",
    msgCooldown:"Cooldown:", msgError:"Error",
    msgTooManyErrors:"min waiting...",
    msgTargetDone:"completed!", msgDone:"✓ Process complete",
    msgUndoSuccess:"Last batch undone", msgUndoEmpty:"Nothing to undo",
    msgSettingsSaved:"Settings saved",
    msgLogCleared:"Log cleared", msgLogCopied:"Log copied",
    msgLogCopyFail:"Copy failed",
    msgListAdd:"added:", msgListRemove:"removed",
    notifDone:"Done!", notifDoneBody:"comments deleted",
    notifError:"Error", notifErrorBody:"Too many errors, waiting",
    notifTarget:"Target reached",
    statusRunning:"Running", statusCooldown:"Cooldown",
    statusError:"Error!", statusDone:"Done ✓", statusTarget:"Target ✓",
    dryRunLabel:"[DRY]",
    exportName:"acds",
    secLabel:"by",
    helpTitle:"KEYBOARD SHORTCUTS",
    helpKeys:[
      ["Space","Pause / Resume"],["Esc","Stop / Close"],
      ["T","Cycle theme"],["L","Cycle language"],
      ["D","Dry Run toggle"],
      ["C","Compact view"],["E","JSON export"],
      ["N","Notification toggle"],["Shift+S","Panel size"],
      ["Shift+R","Reset stats"],["Shift+O","Opacity toggle"],
      ["?","This help window"],
    ],
    rateLimit:"Instagram rate limit! Waiting...",
    compactMode:"Compact mode", fullMode:"Full view",
    summaryTitle:"SESSION SUMMARY", summaryClose:"CLOSE",
    summaryDeleted:"Total Deleted", summaryRounds:"Total Rounds",
    summarySkipped:"Skipped", summaryDuration:"Duration",
    summaryRate:"Hourly Rate", summaryBanScore:"Safety",
    resetConfirm:"Reset all statistics?",
    msgReset:"Statistics reset",
  },
  de: {
    sub:"AUTO KOMMENTAR LÖSCHEN",
    tabMain:"HAUPT", tabSettings:"EINSTELLUNGEN", tabLists:"LISTEN", tabLog:"LOG",
    statusWait:"Bereit — STARTEN drücken",
    lblDeleted:"Gelöscht", lblRound:"Runde", lblSkipped:"Übersp.", lblTime:"Zeit",
    lblSecurity:"SICHERHEIT",
    lblGoal:"ZIEL", lblCooldown:"WARTEZEIT",
    lblLastDel:"ZULETZT GELÖSCHT", lblSelecting:"AUSWÄHLEN",
    btnStart:"▶  STARTEN", btnPause:"⏸  PAUSE", btnResume:"▶  WEITER", btnStop:"■  STOPP",
    btnUndo:"↩ RÜCKGÄNGIG", btnDryRun:"🧪 TEST",
    lblRecentLogs:"LETZTE LOGS",
    settIgLang:"Instagram Sprache", settBatch:"Kommentare pro Runde",
    settBatchVal:"pro Runde",
    settTarget:"Ziel (0=unbegrenzt)", settCooldown:"Wartezeit (Sek.)",
    settSelectDelay:"Auswahlverzögerung (ms)",
    settSound:"Ton", settNotif:"Browser-Benachrichtigung",
    settAdaptive:"Adaptives Timing",
    settDryRun:"Dry Run (nur zählen)",
    settRegex:"Regex-Filter (leer=alle)",
    settRegexPlaceholder:"z.B: spam|werbung|bot",
    settUiLang:"Panel-Sprache",
    btnSave:"✓  SPEICHERN", btnReset:"↺  ZURÜCKSETZEN",
    wlTab:"WHITELIST", blTab:"BLACKLIST",
    wlDesc:"Kommentare dieser Nutzer werden übersprungen.",
    blDesc:"Nur diese werden gelöscht. Leer = alle.",
    listPlaceholder:"benutzername", btnAdd:"HINZUFÜGEN", listEmpty:"Leer",
    logBtnJson:"JSON", logBtnCsv:"CSV", logBtnTxt:"TXT",
    logBtnCopy:"KOPIEREN", logBtnClear:"LEEREN",
    msgStarted:"System gestartet", msgPaused:"Pausiert",
    msgResumed:"Fortgesetzt", msgStopped:"Gestoppt",
    msgLang:"Sprache:", msgDryRunOn:"DRY RUN — Keine echten Löschungen!",
    msgNoComment:"Keine Kommentare, scrolle...",
    msgAllDone:"Keine Kommentare mehr!",
    msgFilterSkip:"Alle gefiltert, scrolle...",
    msgSelected:"Ausgewählt", msgOf:"/",
    msgSelecting:"Auswählen:",
    msgNoSelectBtn:"Auswählen-Button nicht gefunden",
    msgNoDeleteBtn:"Löschen-Button nicht gefunden",
    msgNoPopupBtn:"Popup-Button nicht gefunden",
    msgDeleted:"gelöscht → gesamt",
    msgCooldown:"Wartezeit:", msgError:"Fehler",
    msgTooManyErrors:"Min. Warten...",
    msgTargetDone:"abgeschlossen!", msgDone:"✓ Fertig",
    msgUndoSuccess:"Rückgängig gemacht", msgUndoEmpty:"Nichts rückgängig",
    msgSettingsSaved:"Einstellungen gespeichert",
    msgLogCleared:"Log geleert", msgLogCopied:"Log kopiert",
    msgLogCopyFail:"Kopieren fehlgeschlagen",
    msgListAdd:"hinzugefügt:", msgListRemove:"entfernt",
    notifDone:"Fertig!", notifDoneBody:"Kommentare gelöscht",
    notifError:"Fehler", notifErrorBody:"Zu viele Fehler, warte",
    notifTarget:"Ziel erreicht",
    statusRunning:"Läuft", statusCooldown:"Wartezeit",
    statusError:"Fehler!", statusDone:"Fertig ✓", statusTarget:"Ziel ✓",
    dryRunLabel:"[DRY]",
    exportName:"acds",
    secLabel:"von",
    helpTitle:"TASTENKOMBINATIONEN",
    helpKeys:[
      ["Space","Pause / Weiter"],["Esc","Stopp / Schließen"],
      ["T","Thema wechseln"],["L","Sprache wechseln"],
      ["D","Dry Run"],
      ["C","Kompaktansicht"],["E","JSON Export"],
      ["N","Benachrichtigung"],["Shift+S","Panelgröße"],
      ["Shift+R","Stats zurücksetzen"],["Shift+O","Deckkraft"],
      ["?","Hilfe"],
    ],
    rateLimit:"Instagram Rate Limit! Warte...",
    compactMode:"Kompaktmodus", fullMode:"Vollansicht",
    summaryTitle:"ZUSAMMENFASSUNG", summaryClose:"SCHLIESSEN",
    summaryDeleted:"Gelöscht gesamt", summaryRounds:"Runden gesamt",
    summarySkipped:"Übersprungen", summaryDuration:"Dauer",
    summaryRate:"Stündliche Rate", summaryBanScore:"Sicherheit",
    resetConfirm:"Alle Statistiken zurücksetzen?",
    msgReset:"Statistiken zurückgesetzt",
  },
  es: {
    sub:"BORRAR COMENTARIOS AUTO",
    tabMain:"INICIO", tabSettings:"AJUSTES", tabLists:"LISTAS", tabLog:"LOG",
    statusWait:"Listo — pulsa INICIAR",
    lblDeleted:"Borrados", lblRound:"Ronda", lblSkipped:"Saltados", lblTime:"Tiempo",
    lblSecurity:"SEGURIDAD",
    lblGoal:"OBJETIVO", lblCooldown:"ESPERA",
    lblLastDel:"ÚLTIMOS BORRADOS", lblSelecting:"SELECCIONANDO",
    btnStart:"▶  INICIAR", btnPause:"⏸  PAUSA", btnResume:"▶  CONTINUAR", btnStop:"■  DETENER",
    btnUndo:"↩ DESHACER", btnDryRun:"🧪 PRUEBA",
    lblRecentLogs:"ÚLTIMOS REGISTROS",
    settIgLang:"Idioma de Instagram", settBatch:"Comentarios por ronda",
    settBatchVal:"por ronda",
    settTarget:"Objetivo (0=ilimitado)", settCooldown:"Espera (seg.)",
    settSelectDelay:"Retraso selección (ms)",
    settSound:"Sonido", settNotif:"Notificación navegador",
    settAdaptive:"Tiempo adaptativo",
    settDryRun:"Dry Run (solo contar)",
    settRegex:"Filtro Regex (vacío=todos)",
    settRegexPlaceholder:"ej: spam|publicidad|bot",
    settUiLang:"Idioma del panel",
    btnSave:"✓  GUARDAR", btnReset:"↺  RESTABLECER",
    wlTab:"LISTA BLANCA", blTab:"LISTA NEGRA",
    wlDesc:"Los comentarios de estos usuarios se omiten.",
    blDesc:"Solo se borran los de estos. Vacío = todos.",
    listPlaceholder:"usuario", btnAdd:"AÑADIR", listEmpty:"Vacío",
    logBtnJson:"JSON", logBtnCsv:"CSV", logBtnTxt:"TXT",
    logBtnCopy:"COPIAR", logBtnClear:"LIMPIAR",
    msgStarted:"Sistema iniciado", msgPaused:"Pausado",
    msgResumed:"Reanudado", msgStopped:"Detenido",
    msgLang:"Idioma:", msgDryRunOn:"DRY RUN — ¡Sin borrados reales!",
    msgNoComment:"Sin comentarios, desplazando...",
    msgAllDone:"¡No quedan comentarios!",
    msgFilterSkip:"Todo filtrado, desplazando...",
    msgSelected:"Seleccionado", msgOf:"/",
    msgSelecting:"Seleccionando:",
    msgNoSelectBtn:"Botón seleccionar no encontrado",
    msgNoDeleteBtn:"Botón borrar no encontrado",
    msgNoPopupBtn:"Botón popup no encontrado",
    msgDeleted:"borrados → total",
    msgCooldown:"Espera:", msgError:"Error",
    msgTooManyErrors:"min esperando...",
    msgTargetDone:"¡completado!", msgDone:"✓ Completado",
    msgUndoSuccess:"Lote deshecho", msgUndoEmpty:"Nada que deshacer",
    msgSettingsSaved:"Ajustes guardados",
    msgLogCleared:"Log limpiado", msgLogCopied:"Log copiado",
    msgLogCopyFail:"Error al copiar",
    msgListAdd:"añadido:", msgListRemove:"eliminado",
    notifDone:"¡Listo!", notifDoneBody:"comentarios borrados",
    notifError:"Error", notifErrorBody:"Demasiados errores",
    notifTarget:"Objetivo alcanzado",
    statusRunning:"Ejecutando", statusCooldown:"Espera",
    statusError:"¡Error!", statusDone:"Listo ✓", statusTarget:"Objetivo ✓",
    dryRunLabel:"[DRY]",
    exportName:"acds",
    secLabel:"por",
    helpTitle:"ATAJOS DE TECLADO",
    helpKeys:[
      ["Space","Pausar / Reanudar"],["Esc","Detener / Cerrar"],
      ["T","Cambiar tema"],["L","Cambiar idioma"],
      ["D","Dry Run"],
      ["C","Vista compacta"],["E","Exportar JSON"],
      ["N","Notificación"],["Shift+S","Tamaño panel"],
      ["Shift+R","Restablecer stats"],["Shift+O","Opacidad"],
      ["?","Ayuda"],
    ],
    rateLimit:"¡Límite de Instagram! Esperando...",
    compactMode:"Modo compacto", fullMode:"Vista completa",
    summaryTitle:"RESUMEN", summaryClose:"CERRAR",
    summaryDeleted:"Total Borrados", summaryRounds:"Total Rondas",
    summarySkipped:"Saltados", summaryDuration:"Duración",
    summaryRate:"Tasa Horaria", summaryBanScore:"Seguridad",
    resetConfirm:"¿Restablecer todas las estadísticas?",
    msgReset:"Estadísticas restablecidas",
  },
  fr: {
    sub:"SUPPRESSION AUTO COMMENTAIRES",
    tabMain:"ACCUEIL", tabSettings:"RÉGLAGES", tabLists:"LISTES", tabLog:"LOG",
    statusWait:"Prêt — appuyer DÉMARRER",
    lblDeleted:"Supprimés", lblRound:"Tour", lblSkipped:"Ignorés", lblTime:"Durée",
    lblSecurity:"SÉCURITÉ",
    lblGoal:"OBJECTIF", lblCooldown:"ATTENTE",
    lblLastDel:"DERNIERS SUPPRIMÉS", lblSelecting:"SÉLECTION",
    btnStart:"▶  DÉMARRER", btnPause:"⏸  PAUSE", btnResume:"▶  REPRENDRE", btnStop:"■  ARRÊTER",
    btnUndo:"↩ ANNULER", btnDryRun:"🧪 TEST",
    lblRecentLogs:"DERNIERS LOGS",
    settIgLang:"Langue Instagram", settBatch:"Commentaires par tour",
    settBatchVal:"par tour",
    settTarget:"Objectif (0=illimité)", settCooldown:"Attente (sec.)",
    settSelectDelay:"Délai sélection (ms)",
    settSound:"Son", settNotif:"Notification navigateur",
    settAdaptive:"Timing adaptatif",
    settDryRun:"Dry Run (compter seulement)",
    settRegex:"Filtre Regex (vide=tous)",
    settRegexPlaceholder:"ex: spam|pub|bot",
    settUiLang:"Langue du panneau",
    btnSave:"✓  ENREGISTRER", btnReset:"↺  RÉINITIALISER",
    wlTab:"LISTE BLANCHE", blTab:"LISTE NOIRE",
    wlDesc:"Les commentaires de ces utilisateurs sont ignorés.",
    blDesc:"Seuls ces utilisateurs sont supprimés. Vide = tous.",
    listPlaceholder:"nom_utilisateur", btnAdd:"AJOUTER", listEmpty:"Vide",
    logBtnJson:"JSON", logBtnCsv:"CSV", logBtnTxt:"TXT",
    logBtnCopy:"COPIER", logBtnClear:"EFFACER",
    msgStarted:"Système démarré", msgPaused:"En pause",
    msgResumed:"Repris", msgStopped:"Arrêté",
    msgLang:"Langue:", msgDryRunOn:"DRY RUN — Aucune suppression réelle!",
    msgNoComment:"Pas de commentaires, défilement...",
    msgAllDone:"Plus de commentaires!",
    msgFilterSkip:"Tout filtré, défilement...",
    msgSelected:"Sélectionné", msgOf:"/",
    msgSelecting:"Sélection:",
    msgNoSelectBtn:"Bouton sélectionner introuvable",
    msgNoDeleteBtn:"Bouton supprimer introuvable",
    msgNoPopupBtn:"Bouton popup introuvable",
    msgDeleted:"supprimés → total",
    msgCooldown:"Attente:", msgError:"Erreur",
    msgTooManyErrors:"min en attente...",
    msgTargetDone:"complété!", msgDone:"✓ Terminé",
    msgUndoSuccess:"Lot annulé", msgUndoEmpty:"Rien à annuler",
    msgSettingsSaved:"Réglages enregistrés",
    msgLogCleared:"Log effacé", msgLogCopied:"Log copié",
    msgLogCopyFail:"Échec de la copie",
    msgListAdd:"ajouté:", msgListRemove:"supprimé",
    notifDone:"Terminé!", notifDoneBody:"commentaires supprimés",
    notifError:"Erreur", notifErrorBody:"Trop d'erreurs, attente",
    notifTarget:"Objectif atteint",
    statusRunning:"En cours", statusCooldown:"Attente",
    statusError:"Erreur!", statusDone:"Terminé ✓", statusTarget:"Objectif ✓",
    dryRunLabel:"[DRY]",
    exportName:"acds",
    secLabel:"par",
    helpTitle:"RACCOURCIS CLAVIER",
    helpKeys:[
      ["Space","Pause / Reprendre"],["Esc","Arrêter / Fermer"],
      ["T","Changer thème"],["L","Changer langue"],
      ["D","Dry Run"],
      ["C","Vue compacte"],["E","Export JSON"],
      ["N","Notification"],["Shift+S","Taille panneau"],
      ["Shift+R","Réinitialiser"],["Shift+O","Opacité"],
      ["?","Aide"],
    ],
    rateLimit:"Limite Instagram! Attente...",
    compactMode:"Mode compact", fullMode:"Vue complète",
    summaryTitle:"RÉSUMÉ", summaryClose:"FERMER",
    summaryDeleted:"Total Supprimés", summaryRounds:"Total Tours",
    summarySkipped:"Ignorés", summaryDuration:"Durée",
    summaryRate:"Taux horaire", summaryBanScore:"Sécurité",
    resetConfirm:"Réinitialiser toutes les statistiques?",
    msgReset:"Statistiques réinitialisées",
  },
};

// ─── KONFİGÜRASYON ───────────────────────────────────────────────────────────
let CFG = {
  igLang:"auto", uiLang:"tr", detectedLang:"tr",
  perBatch:3,
  cooldownMin:60, cooldownMax:90,
  selectMin:800,  selectMax:1800,
  turnMin:4000,   turnMax:7000,
  scrollMin:5000, scrollMax:8000,
  maxErrors:5, errorPenalty:600,
  targetCount:0,
  whitelist:[], blacklist:[],
  soundEnabled:true, notifEnabled:false,
  theme:"dark",
  adaptiveTiming:true, dryRun:false,
  regexFilter:"", compactMode:false,
  panelScale:1, opacity:1,
};

// ─── STATE ────────────────────────────────────────────────────────────────────
const S = {
  running:false, paused:false, stopped:false,
  tur:0, silinen:0, atlanan:0, hatalar:0,
  baslangic:null, cdEnd:null, cdTotal:0,
  logs:[], deleted:[], resumeFn:null,
  successStreak:0, failStreak:0,
  avgCooldown:75,
  banScore:100,
  undoStack:[],
  helpVisible:false,
  summaryVisible:false,
  dragLocked:false,
  currentSelectingIdx:0,
  currentSelectingTotal:0,
};

const SESSION_KEY = "acds_v1";
const UI_LANG_ORDER = ["tr","en","de","es","fr"];
const PANEL_SCALES = [0.82, 1.0, 1.18, 1.36];
const OPACITIES = [1, 0.85, 0.7];

function t() { return UI_LANGS[CFG.uiLang] || UI_LANGS.tr; }

function saveSession() {
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify({
      tur:S.tur, silinen:S.silinen, atlanan:S.atlanan,
      hatalar:S.hatalar, baslangic:S.baslangic,
      banScore:S.banScore, avgCooldown:S.avgCooldown,
      cfg:CFG,
    }));
  } catch(_){}
}

function loadSession() {
  try {
    const d = JSON.parse(sessionStorage.getItem(SESSION_KEY)||"null");
    if (!d) return;
    S.tur=d.tur||0; S.silinen=d.silinen||0;
    S.atlanan=d.atlanan||0; S.hatalar=d.hatalar||0;
    S.baslangic=d.baslangic||null; S.banScore=d.banScore||100;
    S.avgCooldown=d.avgCooldown||75;
    if (d.cfg) CFG={...CFG,...d.cfg};
    if (!["dark","light","oled","pink"].includes(CFG.theme)) CFG.theme="dark";
    addLog("info",`Session yüklendi — ${S.silinen} yorum silinmişti`);
  } catch(_){}
}

function resetStats() {
  S.tur=0; S.silinen=0; S.atlanan=0; S.hatalar=0;
  S.baslangic=null; S.banScore=100; S.avgCooldown=75;
  S.successStreak=0; S.failStreak=0;
  S.deleted=[]; S.undoStack=[]; S.logs=[];
  saveSession(); renderAll();
  addLog("ok", t().msgReset);
}

// ─── DİL ALGILAMA ─────────────────────────────────────────────────────────────
function detectLang() {
  if (CFG.igLang !== "auto") { CFG.detectedLang=CFG.igLang; return IG_LANGS[CFG.igLang]||IG_LANGS.tr; }
  const htmlLang=(document.documentElement.lang||"").toLowerCase().slice(0,2);
  if (IG_LANGS[htmlLang]){ CFG.detectedLang=htmlLang; return IG_LANGS[htmlLang]; }
  const navLang=(navigator.language||"").toLowerCase().slice(0,2);
  if (IG_LANGS[navLang]){ CFG.detectedLang=navLang; return IG_LANGS[navLang]; }
  for (const [key,val] of Object.entries(IG_LANGS)) {
    if ([...document.querySelectorAll("span")].some(el=>el.innerText?.trim()===val.select)){
      CFG.detectedLang=key; return val;
    }
  }
  CFG.detectedLang="tr"; return IG_LANGS.tr;
}
function getIgLang(){ return IG_LANGS[CFG.detectedLang]||IG_LANGS.tr; }

function cycleUiLang() {
  const idx = UI_LANG_ORDER.indexOf(CFG.uiLang);
  CFG.uiLang = UI_LANG_ORDER[(idx+1)%UI_LANG_ORDER.length];
  applyUiLang();
  saveSession();
  addLog("info",`${t().msgLang} ${CFG.uiLang.toUpperCase()}`);
  beep("lang");
}

// ─── INSTAGRAM SELECTORS ──────────────────────────────────────────────────────
function getCheckboxes() {
  const strategies = [
    () => [...document.querySelectorAll('[data-testid="bulk_action_checkbox"] [tabindex="0"]')],
    () => [...document.querySelectorAll('[role="checkbox"]')],
    () => [...document.querySelectorAll('input[type="checkbox"]')],
    () => [...document.querySelectorAll('[aria-checked]')],
    () => [...document.querySelectorAll('[data-visualcompletion="ignore-dynamic"] [tabindex="0"]')],
  ];
  for (const fn of strategies) {
    try { const r = fn(); if (r.length > 0) return r; } catch(_){}
  }
  return [];
}

function findSelectBtn() {
  const lang = getIgLang();
  const s1 = findByText("span", lang.select); if (s1) return s1;
  const s2 = document.querySelector(`[aria-label="${lang.select}"]`); if (s2) return s2;
  for (const l of Object.values(IG_LANGS)) {
    const el = findByText("span", l.select); if (el) return el;
    const ea = document.querySelector(`[aria-label="${l.select}"]`); if (ea) return ea;
  }
  const moreBtn = document.querySelector('[aria-label="More options"]') ||
                  document.querySelector('[aria-label*="option"]');
  return moreBtn || null;
}

function findFirstDeleteBtn() {
  const lang = getIgLang();
  const s1 = findByText("span", lang.delete); if (s1) return s1;
  for (const l of Object.values(IG_LANGS)) {
    const el = findByText("span", l.delete); if (el) return el;
  }
  return document.querySelector(`[aria-label*="Delete"]`) ||
         document.querySelector(`[aria-label*="Sil"]`) || null;
}

function findPopupDeleteBtn() {
  const c1 = document.querySelector("div._ap3a._aacp._aacw._aac-._aad6");
  if (c1) return c1;
  const dlg = document.querySelector('[role="dialog"]');
  if (dlg) {
    for (const l of Object.values(IG_LANGS)) {
      const b = [...dlg.querySelectorAll("span,button,[role='button']")]
        .find(e => e.innerText?.trim() === l.delete);
      if (b) return b.closest('[role="button"]') ?? b;
    }
    const dangerBtn = [...dlg.querySelectorAll('[role="button"]')].find(el => {
      const s = window.getComputedStyle(el);
      return s.color.includes("rgb(255") || el.classList.toString().includes("danger");
    });
    if (dangerBtn) return dangerBtn;
  }
  return [...document.querySelectorAll('[role="button"]')].find(el => {
    const txt = el.innerText?.trim();
    return Object.values(IG_LANGS).some(l => l.delete === txt) && el.closest('[role="dialog"]');
  }) ?? null;
}

// ─── REGEX FİLTRE ─────────────────────────────────────────────────────────────
function passesRegex(el) {
  if (!CFG.regexFilter || !CFG.regexFilter.trim()) return true;
  try {
    const rx = new RegExp(CFG.regexFilter.trim(), "i");
    return rx.test(el?.closest?.('[data-testid]')?.innerText || "");
  } catch(_) { return true; }
}

// ─── ADAPTİF TİMİNG & BAN SCORE ──────────────────────────────────────────────
function recordSuccess() {
  S.successStreak++; S.failStreak=0;
  if (CFG.adaptiveTiming && S.successStreak > 5)
    S.avgCooldown = Math.max(30, S.avgCooldown - Math.min(5, S.successStreak - 5));
  updateBanScore(+5);
}
function recordFail() {
  S.failStreak++; S.successStreak=0;
  if (CFG.adaptiveTiming) S.avgCooldown = Math.min(180, S.avgCooldown + 15 * S.failStreak);
  updateBanScore(-15);
}
function getCooldown() {
  const spread = (CFG.cooldownMax - CFG.cooldownMin) / 2;
  const base = S.avgCooldown;
  return rand(Math.max(15, base - spread) * 1000, (base + spread) * 1000);
}
function updateBanScore(d) { S.banScore = Math.max(0, Math.min(100, S.banScore + d)); renderBanScore(); }

// ─── HIZ ──────────────────────────────────────────────────────────────────────
function getHourlyRate() {
  if (!S.silinen) return 0;
  const elapsed = (Date.now() - (S.baslangic || Date.now())) / 3600000 || 0.001;
  return Math.round(S.silinen / elapsed);
}

// ─── SESSION ÖZET POPUP ───────────────────────────────────────────────────────
function showSummaryPopup() {
  if (S.summaryVisible) return;
  S.summaryVisible = true;
  gid("__acds_summary__")?.remove();
  const elapsed = S.baslangic ? Math.floor((Date.now() - S.baslangic) / 1000) : 0;
  const mins = Math.floor(elapsed / 60), secs = elapsed % 60;
  const ui = t();
  const scoreColor = S.banScore > 70 ? "#00e676" : S.banScore > 40 ? "#ffb300" : "#ff4d4d";
  const overlay = document.createElement("div");
  overlay.id = "__acds_summary__";
  overlay.style.cssText = `position:fixed;top:0;left:0;right:0;bottom:0;z-index:2147483649;background:rgba(0,0,0,.85);display:flex;align-items:center;justify-content:center;font-family:'JetBrains Mono',monospace;backdrop-filter:blur(6px)`;
  overlay.innerHTML = `
    <div style="background:var(--acds-panel,#0f0f0f);border:1px solid var(--acds-accent,#ff4d4d);border-radius:20px;padding:32px 36px;min-width:300px;max-width:360px;box-shadow:0 0 80px rgba(255,77,77,.2);animation:acdsSumIn .35s cubic-bezier(.34,1.56,.64,1)">
      <style>@keyframes acdsSumIn{from{opacity:0;transform:scale(.8) translateY(24px)}to{opacity:1;transform:none}}</style>
      <div style="font-family:'Bebas Neue',sans-serif;font-size:24px;color:var(--acds-accent,#ff4d4d);letter-spacing:.12em;margin-bottom:6px;text-align:center">${ui.summaryTitle}</div>
      <div style="color:rgba(255,255,255,.2);font-size:9px;text-align:center;letter-spacing:.1em;margin-bottom:24px">AUTO COMMENT DELETE  v6.0</div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-bottom:24px">
        ${[
          [ui.summaryDeleted, S.silinen, "var(--acds-accent,#ff4d4d)"],
          [ui.summaryRounds, S.tur, "var(--acds-text,#d0d0d0)"],
          [ui.summarySkipped, S.atlanan, "var(--acds-yellow,#ffb300)"],
          [ui.summaryDuration, `${mins}m${secs}s`, "var(--acds-cyan,#00bcd4)"],
          [ui.summaryRate, getHourlyRate()+"/h", "var(--acds-green,#00e676)"],
          [ui.summaryBanScore, S.banScore, scoreColor],
        ].map(([label,val,color])=>`
          <div style="background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);border-radius:12px;padding:14px 6px;text-align:center">
            <div style="color:${color};font-family:'Bebas Neue',sans-serif;font-size:28px;line-height:1">${val}</div>
            <div style="color:rgba(255,255,255,.3);font-size:8px;margin-top:5px;letter-spacing:.08em;text-transform:uppercase">${label}</div>
          </div>`).join("")}
      </div>
      <button id="__acds_sum_close__" style="width:100%;background:none;border:1px solid rgba(255,77,77,.35);border-radius:10px;color:var(--acds-accent,#ff4d4d);font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.1em;padding:12px;cursor:pointer;transition:all .2s" onmouseover="this.style.background='rgba(255,77,77,.1)'" onmouseout="this.style.background='none'">${ui.summaryClose}</button>
    </div>`;
  overlay.addEventListener("click", e => { if (e.target === overlay) closeSummary(); });
  overlay.querySelector("#__acds_sum_close__").onclick = closeSummary;
  document.body.appendChild(overlay);
}
function closeSummary() {
  S.summaryVisible = false;
  gid("__acds_summary__")?.remove();
}

// ─── HELP OVERLAY ─────────────────────────────────────────────────────────────
function openHelp() {
  S.helpVisible = true;
  gid("__acds_help__")?.remove();
  const ui = t();
  const overlay = document.createElement("div");
  overlay.id = "__acds_help__";
  overlay.style.cssText = `position:fixed;top:0;left:0;right:0;bottom:0;z-index:2147483648;background:rgba(0,0,0,.8);display:flex;align-items:center;justify-content:center;font-family:'JetBrains Mono',monospace;backdrop-filter:blur(4px)`;
  const rows = ui.helpKeys.map(([k,v]) => `
    <div style="display:flex;justify-content:space-between;align-items:center;gap:20px;padding:6px 0;border-bottom:1px solid rgba(255,255,255,.04);">
      <kbd style="background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.14);border-radius:5px;padding:4px 10px;font-family:'JetBrains Mono',monospace;font-size:10px;color:#fff;white-space:nowrap;flex-shrink:0">${k}</kbd>
      <span style="color:rgba(255,255,255,.4);font-size:10px;text-align:right">${v}</span>
    </div>`).join("");
  overlay.innerHTML = `
    <div style="background:var(--acds-panel,#111);border:1px solid rgba(255,255,255,.1);border-radius:16px;padding:24px 26px;min-width:290px;max-width:350px;position:relative;box-shadow:0 32px 96px rgba(0,0,0,.7);animation:acdsHelpIn .2s ease">
      <style>@keyframes acdsHelpIn{from{opacity:0;transform:scale(.93)}to{opacity:1;transform:none}}</style>
      <div style="font-family:'Bebas Neue',sans-serif;font-size:18px;color:var(--acds-accent,#ff4d4d);letter-spacing:.12em;margin-bottom:16px;padding-right:28px">${ui.helpTitle}</div>
      <button id="__acds_help_close__" style="position:absolute;top:16px;right:16px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:6px;color:rgba(255,255,255,.45);cursor:pointer;font-size:14px;width:28px;height:28px;display:flex;align-items:center;justify-content:center;padding:0;transition:all .15s" onmouseover="this.style.background='rgba(255,77,77,.2)';this.style.color='#ff4d4d'" onmouseout="this.style.background='rgba(255,255,255,.06)';this.style.color='rgba(255,255,255,.45)'">✕</button>
      ${rows}
      <div style="margin-top:14px;padding-top:10px;border-top:1px solid rgba(255,255,255,.05);color:rgba(255,255,255,.18);font-size:9px;text-align:center">ESC veya dışarı tıkla · github.com/dokess</div>
    </div>`;
  overlay.addEventListener("click", e => { if (e.target === overlay) closeHelp(); });
  overlay.querySelector("#__acds_help_close__").addEventListener("click", closeHelp);
  document.body.appendChild(overlay);
}
function closeHelp() { S.helpVisible = false; gid("__acds_help__")?.remove(); }
function toggleHelp() { if (S.helpVisible) closeHelp(); else openHelp(); }

// ─── BİLDİRİM & SES ──────────────────────────────────────────────────────────
async function requestNotifPermission() {
  if (!("Notification" in window)) return false;
  if (Notification.permission === "granted") return true;
  return (await Notification.requestPermission()) === "granted";
}
function sendNotif(title, body, icon="🗑️") {
  if (!CFG.notifEnabled || Notification.permission !== "granted") return;
  try { new Notification(`${icon} ${title}`, {body, silent:false}); } catch(_){}
}
function beep(type="tick") {
  if (!CFG.soundEnabled) return;
  try {
    const ctx = new(window.AudioContext || window.webkitAudioContext)();
    if (type === "done") {
      [[880,.12,.15],[1100,.12,.15],[1320,.1,.3]].forEach(([f,g,d],i) => {
        const o=ctx.createOscillator(), gn=ctx.createGain();
        o.connect(gn); gn.connect(ctx.destination);
        o.frequency.value=f; gn.gain.setValueAtTime(g, ctx.currentTime+i*.18);
        gn.gain.exponentialRampToValueAtTime(.001, ctx.currentTime+i*.18+d);
        o.start(ctx.currentTime+i*.18); o.stop(ctx.currentTime+i*.18+d);
      }); return;
    }
    const osc=ctx.createOscillator(), gain=ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    const map = {tick:[660,.06,.08],error:[220,.12,.3],warn:[440,.08,.2],undo:[520,.08,.15],lang:[780,.07,.12]};
    const [f,g,d] = map[type] || map.tick;
    osc.frequency.value=f; gain.gain.setValueAtTime(g, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(.001, ctx.currentTime+d);
    osc.start(); osc.stop(ctx.currentTime+d);
  } catch(_){}
}

// ─── LOG & EXPORT ─────────────────────────────────────────────────────────────
function addLog(level, msg) {
  const time = new Date().toLocaleTimeString();
  S.logs.unshift({time, level, msg:String(msg)});
  if (S.logs.length > 500) S.logs.pop();
  console.log(`[${time}] ${{info:"ℹ",ok:"✓",warn:"⚠",error:"✗"}[level]||"•"} ${msg}`);
  renderMainLog(); renderLogTab();
}
function exportLogs(fmt="json") {
  const elapsed = S.baslangic ? Math.floor((Date.now()-S.baslangic)/1000) : 0;
  const summary = {
    version:"6.0", date:new Date().toLocaleString(),
    stats:{tur:S.tur,silinen:S.silinen,atlanan:S.atlanan,hatalar:S.hatalar,
      sure:`${Math.floor(elapsed/60)}d ${elapsed%60}s`, saatlikHiz:getHourlyRate(),
      banScore:S.banScore, dryRun:CFG.dryRun}, config:CFG,
  };
  let content, mime, ext;
  if (fmt === "json") { content=JSON.stringify({...summary,logs:S.logs},null,2); mime="application/json"; ext="json"; }
  else if (fmt === "csv") {
    const rows=[["Time","Level","Message"],...S.logs.map(l=>[l.time,l.level,l.msg])];
    content=rows.map(r=>r.map(c=>`"${String(c).replace(/"/g,'""')}"`).join(",")).join("\n");
    mime="text/csv"; ext="csv";
  } else {
    content=[`AUTO COMMENT DELETE v6.0 — by DOKES`,"=".repeat(50),`Date: ${summary.date}`,
      `Deleted: ${summary.stats.silinen}`,"=".repeat(50),...S.logs.map(l=>`[${l.time}][${l.level}] ${l.msg}`)].join("\n");
    mime="text/plain"; ext="txt";
  }
  const a=document.createElement("a");
  a.href=URL.createObjectURL(new Blob([content],{type:mime}));
  a.download=`${t().exportName}_${Date.now()}.${ext}`; a.click();
  addLog("ok",`Export: ${ext.toUpperCase()}`);
}
async function copyLogs() {
  try {
    await navigator.clipboard.writeText(S.logs.map(l=>`[${l.time}][${l.level}] ${l.msg}`).join("\n"));
    addLog("ok", t().msgLogCopied);
  } catch(_) { addLog("warn", t().msgLogCopyFail); }
}

// ─── UNDO ─────────────────────────────────────────────────────────────────────
function pushUndo(count) { S.undoStack.push({count, time:Date.now()}); if (S.undoStack.length > 5) S.undoStack.shift(); }
function undoLast() {
  if (!S.undoStack.length) { addLog("warn", t().msgUndoEmpty); beep("warn"); return; }
  const last = S.undoStack.pop();
  S.silinen = Math.max(0, S.silinen - last.count);
  addLog("ok", `${t().msgUndoSuccess} (-${last.count})`);
  beep("undo"); updateStats();
}

// ─── SEÇİM İLERLEMESİ ────────────────────────────────────────────────────────
function setSelectingProgress(idx, total) {
  S.currentSelectingIdx = idx;
  S.currentSelectingTotal = total;
  const wrap = gid("__acds_sel_wrap__");
  const el   = gid("__acds_sel_progress__");
  const fill = gid("__acds_sel_fill__");
  if (!wrap) return;
  if (total === 0) { wrap.style.display="none"; return; }
  wrap.style.display = "block";
  if (el)   el.textContent   = `${idx} / ${total}`;
  if (fill) fill.style.width = `${Math.round((idx/total)*100)}%`;
}
function clearSelectingProgress() { setSelectingProgress(0, 0); }

// ─── YARDIMCILAR ──────────────────────────────────────────────────────────────
const sleep = ms => new Promise(r => setTimeout(r, ms));
function rand(a, b) { return Math.floor(Math.random() * (b - a + 1)) + a; }
async function safeSleep(ms) {
  const chunk = 200; let e = 0;
  while (e < ms) {
    if (S.stopped) throw new Error("STOPPED");
    if (S.paused) await new Promise(r => { S.resumeFn = r; });
    await sleep(Math.min(chunk, ms - e)); e += chunk;
  }
}
function findByText(sel, txt) { return [...document.querySelectorAll(sel)].find(el => el.innerText?.trim() === txt); }
function click(el) {
  if (!el) return false;
  try {
    el.scrollIntoView({behavior:"smooth", block:"center"});
    el.dispatchEvent(new MouseEvent("mouseover", {bubbles:true}));
    el.click(); return true;
  } catch(e) { addLog("warn", "Click: "+e.message); return false; }
}
function isWhitelisted(el) {
  if (!CFG.whitelist?.length) return false;
  try { const txt=el?.closest?.('[data-testid]')?.innerText||""; return CFG.whitelist.some(u=>txt.toLowerCase().includes(u.toLowerCase().trim())); }
  catch(_) { return false; }
}
function isBlacklisted(el) {
  if (!CFG.blacklist?.length) return true;
  try { const txt=el?.closest?.('[data-testid]')?.innerText||""; return CFG.blacklist.some(u=>txt.toLowerCase().includes(u.toLowerCase().trim())); }
  catch(_) { return true; }
}
function esc(s) { return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }
function gid(s) { return document.getElementById(s); }

// ─── TEMALAR ──────────────────────────────────────────────────────────────────
const THEMES = {
  dark:  { bg:"#080808",panel:"#101010",border:"#1e1e1e",border2:"#161616",text:"#e0e0e0",dim:"#555",dim2:"#282828",accent:"#ff4d4d",accent2:"#ff8a65",green:"#00e676",yellow:"#ffb300",blue:"#5c9cf5",cyan:"#00bcd4",statbg:"#0c0c0c",logbg:"#060606",inputbg:"#0c0c0c",shadow:"rgba(0,0,0,.9)",tabactive:"#131313" },
  light: { bg:"#efefef",panel:"#fafafa",border:"#ddd",border2:"#e5e5e5",text:"#111",dim:"#888",dim2:"#ccc",accent:"#e53935",accent2:"#ff7043",green:"#2e7d32",yellow:"#e65100",blue:"#1565c0",cyan:"#00838f",statbg:"#f4f4f4",logbg:"#f8f8f8",inputbg:"#fff",shadow:"rgba(0,0,0,.12)",tabactive:"#fff" },
  oled:  { bg:"#000",panel:"#000",border:"#101010",border2:"#080808",text:"#e8e8e8",dim:"#3a3a3a",dim2:"#181818",accent:"#ff1744",accent2:"#ff6d00",green:"#00e676",yellow:"#ffd600",blue:"#40c4ff",cyan:"#18ffff",statbg:"#000",logbg:"#000",inputbg:"#040404",shadow:"rgba(255,23,68,.12)",tabactive:"#040404" },
  pink:  { bg:"#1a0010",panel:"#1f0015",border:"#3d0028",border2:"#2a0019",text:"#f5c2e7",dim:"#7c4565",dim2:"#3d1f32",accent:"#f38ba8",accent2:"#fab387",green:"#a6e3a1",yellow:"#f9e2af",blue:"#89b4fa",cyan:"#94e2d5",statbg:"#1a0010",logbg:"#150009",inputbg:"#1f0015",shadow:"rgba(243,139,168,.18)",tabactive:"#280019" },
};
const THEME_ORDER = ["dark","light","oled","pink"];
function th() { return THEMES[CFG.theme] || THEMES.dark; }
function applyTheme() {
  const root = gid("__acds_root__"); if (!root) return;
  const v = th();
  Object.entries(v).forEach(([k,val]) => root.style.setProperty(`--acds-${k}`, val));
}
function cycleTheme() {
  const i = THEME_ORDER.indexOf(CFG.theme);
  CFG.theme = THEME_ORDER[(i+1) % THEME_ORDER.length];
  applyTheme(); saveSession(); addLog("info",`Tema: ${CFG.theme}`);
}

// ─── PANEL BOYUT & OPASİTE ────────────────────────────────────────────────────
let _scaleIdx = 1;
// ★ FIX 2: Boyut adımları genişletildi, h değerleri düzeltildi
const SIZE_STEPS = [
  {w:300, h:240, icon:"⊟"},
  {w:360, h:360, icon:"⊡"},
  {w:440, h:480, icon:"⊞"},
  {w:520, h:600, icon:"⊠"},
];

// ★ FIX 2: cyclePanelSize — root transition eklendi, panel.style.width sync edildi
function cyclePanelSize() {
  _scaleIdx = (_scaleIdx + 1) % SIZE_STEPS.length;
  const step = SIZE_STEPS[_scaleIdx];
  const root = gid("__acds_root__"); if (!root) return;
  const panel = root.querySelector(".acds-panel");
  const body  = root.querySelector(".acds-body");
  // Root wrapper genişliği + transition
  root.style.transition = "width .25s ease";
  root.style.width = step.w + "px";
  // Panel de root ile birlikte genişlemeli
  if (panel) {
    panel.style.transition = "width .25s ease";
    panel.style.width = "100%";
  }
  // Body yüksekliği
  if (body) {
    body.style.transition = "max-height .25s ease";
    body.style.maxHeight = step.h + "px";
  }
  const sizebtn = gid("__acds_sizebtn__");
  if (sizebtn) sizebtn.textContent = step.icon;
  addLog("info", `Panel: ${step.w}×${step.h}`);
}

let _opacityIdx = 0;
function cycleOpacity() {
  _opacityIdx = (_opacityIdx + 1) % OPACITIES.length;
  CFG.opacity = OPACITIES[_opacityIdx];
  const root = gid("__acds_root__"); if (!root) return;
  root.style.opacity = CFG.opacity;
  addLog("info", `Opaklık: ${Math.round(CFG.opacity*100)}%`);
}

// ─── UI BUILD ─────────────────────────────────────────────────────────────────
function buildUI() {
  ["__acds_root__","__dokes9__","__dokes8__","__dokes7__"].forEach(id => document.getElementById(id)?.remove());

  const root = document.createElement("div");
  root.id = "__acds_root__";

  const v = th();
  root.style.cssText = `position:fixed;top:16px;right:16px;z-index:2147483647;width:360px;font-family:'JetBrains Mono',monospace;filter:drop-shadow(0 20px 60px var(--acds-shadow, rgba(0,0,0,.9)));`;
  Object.entries(v).forEach(([k,val]) => root.style.setProperty(`--acds-${k}`, val));

  root.innerHTML = buildHTML();
  document.body.appendChild(root);
  attachEvents(root);
  syncSettingsUI();
  renderAll();
}

function buildHTML() {
  const ui = t();
  return `
<style>
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&family=Bebas+Neue&display=swap');

#__acds_root__ *{box-sizing:border-box;margin:0;padding:0;}

.acds-panel{
  background:var(--acds-panel);
  border:1px solid var(--acds-border);
  border-radius:18px;
  overflow:hidden;
  width:100%;
}

.acds-hdr{
  background:var(--acds-bg);
  padding:10px 12px 0;
  border-bottom:1px solid var(--acds-border);
  cursor:move;
  user-select:none;
}
.acds-hdr-top{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:8px;
  padding-bottom:8px;
}
.acds-hdr-title{
  min-width:0;
  flex:1;
}
.acds-title{
  font-family:'Bebas Neue',sans-serif;
  font-size:17px;
  letter-spacing:.10em;
  color:var(--acds-text);
  line-height:1;
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
  text-transform:uppercase;
  margin-bottom:2px;
}
.acds-title em{color:var(--acds-accent);font-style:normal;}
.acds-brand{
  font-family:'JetBrains Mono',monospace;
  font-size:7px;
  letter-spacing:.16em;
  color:var(--acds-dim);
  line-height:1;
  white-space:nowrap;
  text-transform:uppercase;
  opacity:.4;
}
.acds-hdr-right{
  display:flex;
  gap:3px;
  align-items:center;
  flex-shrink:0;
}
.acds-hbtn{
  background:var(--acds-border2);
  border:1px solid var(--acds-border);
  border-radius:7px;
  color:var(--acds-dim);
  cursor:pointer;
  font-family:'JetBrains Mono',monospace;
  font-size:11px;
  padding:3px 5px;
  line-height:1.3;
  transition:all .15s;
  min-width:22px;
  text-align:center;
}
.acds-hbtn:hover{border-color:var(--acds-accent);color:var(--acds-accent);}
.acds-hbtn--close{border-color:rgba(255,77,77,.25);color:var(--acds-accent);}
.acds-hbtn--close:hover{background:rgba(255,77,77,.12);border-color:var(--acds-accent);}
.acds-hbtn--drag{cursor:grab;}
.acds-hbtn--drag.locked{cursor:not-allowed;border-color:rgba(255,179,0,.4);color:var(--acds-yellow);}
.acds-lang-pill{
  background:var(--acds-accent);
  border-radius:6px;
  color:#fff;
  font-size:9px;
  font-weight:700;
  padding:4px 8px;
  cursor:pointer;
  transition:all .2s;
  letter-spacing:.06em;
  white-space:nowrap;
  border:none;
}
.acds-lang-pill:hover{opacity:.82;}

.acds-drybanner{
  background:linear-gradient(90deg,rgba(255,183,0,.12),rgba(255,183,0,.05));
  border-bottom:1px solid rgba(255,183,0,.25);
  color:var(--acds-yellow);
  font-size:9.5px;
  text-align:center;
  padding:5px 8px;
  letter-spacing:.07em;
  display:none;
}
.acds-drybanner.on{display:block;}

.acds-tabs{
  display:flex;
  background:var(--acds-bg);
  border-bottom:1px solid var(--acds-border);
}
.acds-tab{
  flex:1;
  background:none;
  border:none;
  cursor:pointer;
  color:var(--acds-dim);
  font-family:'JetBrains Mono',monospace;
  font-size:9px;
  letter-spacing:.06em;
  padding:9px 2px;
  text-transform:uppercase;
  transition:all .15s;
  border-bottom:2px solid transparent;
  margin-bottom:-1px;
}
.acds-tab:hover{color:var(--acds-text);}
.acds-tab.on{color:var(--acds-accent);border-bottom-color:var(--acds-accent);background:var(--acds-tabactive);}

.acds-body{padding:14px 15px;max-height:360px;overflow-y:auto;transition:max-height .25s ease;scrollbar-width:thin;scrollbar-color:var(--acds-border2) transparent;}
.acds-tc{display:none;}
.acds-tc.on{display:block;}

.acds-panel.compact .acds-tabs,.acds-panel.compact .acds-foot{display:none;}
.acds-panel.compact .acds-body{padding:10px 13px;}
.acds-panel.compact [data-content="settings"],
.acds-panel.compact [data-content="lists"],
.acds-panel.compact [data-content="log"]{display:none!important;}
.acds-panel.compact [data-content="main"]{display:block!important;}

.acds-panel.mini .acds-body,.acds-panel.mini .acds-tabs,.acds-panel.mini .acds-foot,
.acds-panel.mini .acds-drybanner{display:none;}
.acds-panel.mini .acds-hdr{border-bottom:none;}

.acds-srow{display:flex;align-items:center;gap:9px;margin-bottom:12px;}
.acds-dot{width:9px;height:9px;border-radius:50%;background:var(--acds-dim2);flex-shrink:0;transition:all .3s;}
.acds-dot.run{background:var(--acds-green);box-shadow:0 0 6px rgba(0,230,118,.4);animation:acdspulse 1.3s infinite;}
.acds-dot.pau{background:var(--acds-yellow);box-shadow:0 0 5px rgba(255,179,0,.35);}
.acds-dot.err{background:var(--acds-accent);box-shadow:0 0 5px rgba(255,77,77,.35);}
.acds-dot.done{background:var(--acds-blue);box-shadow:0 0 5px rgba(92,156,245,.35);}
@keyframes acdspulse{0%,100%{opacity:1}50%{opacity:.25}}
.acds-stxt{color:var(--acds-text);font-size:12px;flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-weight:600;}
.acds-tbadge{color:var(--acds-dim);font-size:9px;flex-shrink:0;}

.acds-sel-wrap{
  background:var(--acds-statbg);
  border:1px solid var(--acds-border2);
  border-left:3px solid var(--acds-cyan);
  border-radius:9px;
  padding:9px 12px;
  margin-bottom:12px;
  display:none;
}
.acds-sel-row{display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;}
.acds-sel-lbl{color:var(--acds-cyan);font-size:9px;text-transform:uppercase;letter-spacing:.1em;}
.acds-sel-val{color:var(--acds-text);font-size:13px;font-weight:700;}
.acds-sel-track{background:var(--acds-bg);border-radius:4px;height:4px;overflow:hidden;}
.acds-sel-fill{height:100%;border-radius:4px;background:linear-gradient(90deg,var(--acds-cyan),var(--acds-green));transition:width .25s ease;}

.acds-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:5px;margin-bottom:10px;}
.acds-stat{
  background:var(--acds-statbg);
  border:1px solid var(--acds-border2);
  border-radius:10px;
  padding:10px 4px;
  text-align:center;
}
.acds-sv{font-family:'Bebas Neue',sans-serif;font-size:26px;color:var(--acds-text);line-height:1;}
.acds-sv.red{color:var(--acds-accent);}
.acds-sv.ylw{color:var(--acds-yellow);}
.acds-sl{color:var(--acds-dim);font-size:8px;margin-top:3px;text-transform:uppercase;letter-spacing:.07em;}

/* ★ FIX 1: acds-xstat — hız satırı panele entegre, footer'dan bağımsız */
.acds-xstat{
  background:var(--acds-statbg);
  border:1px solid var(--acds-border2);
  border-radius:10px;
  padding:8px 12px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  margin-bottom:10px;
}
.acds-xv{color:var(--acds-cyan);font-size:13px;font-weight:700;}
.acds-xl{color:var(--acds-dim);font-size:9px;text-transform:uppercase;letter-spacing:.07em;}

.acds-ban-wrap{margin-bottom:10px;}
.acds-ban-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:5px;}
.acds-ban-lbl{color:var(--acds-dim);font-size:9px;text-transform:uppercase;letter-spacing:.1em;}
.acds-ban-val{font-size:11px;font-weight:700;}
.acds-track{background:var(--acds-bg);border-radius:4px;height:5px;overflow:hidden;}
.acds-fill-ban{height:100%;border-radius:4px;transition:width .5s,background .5s;}

.acds-bar-wrap{margin-bottom:10px;display:none;}
.acds-bar-wrap.on{display:block;}
.acds-bar-head{display:flex;justify-content:space-between;margin-bottom:5px;}
.acds-bar-lbl{color:var(--acds-dim);font-size:9px;text-transform:uppercase;letter-spacing:.1em;}
.acds-bar-val{color:var(--acds-text);font-size:9px;}
.acds-fill-goal{height:100%;background:linear-gradient(90deg,var(--acds-green),var(--acds-cyan));border-radius:4px;transition:width .5s;}
.acds-fill-cd{height:100%;background:linear-gradient(90deg,var(--acds-accent),var(--acds-accent2));border-radius:4px;transition:width .1s linear;}

.acds-last{margin-bottom:10px;display:none;}
.acds-last.on{display:block;}
.acds-last-lbl{color:var(--acds-dim);font-size:9px;text-transform:uppercase;letter-spacing:.08em;margin-bottom:5px;}
.acds-last-list{display:flex;flex-direction:column;gap:3px;}
.acds-li{background:var(--acds-statbg);border:1px solid var(--acds-border2);border-radius:7px;padding:5px 10px;display:flex;align-items:center;gap:6px;animation:acdsfi .2s ease;}
@keyframes acdsfi{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:none}}
.acds-li-x{color:var(--acds-accent);font-size:10px;flex-shrink:0;}
.acds-li-t{flex:1;color:var(--acds-dim);font-size:10px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.acds-li-s{color:var(--acds-dim2);font-size:9px;flex-shrink:0;}

.acds-ctrls{display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-bottom:6px;}
.acds-ctrls2{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:12px;}
.acds-btn{
  background:var(--acds-statbg);
  border:1px solid var(--acds-border2);
  border-radius:9px;
  color:var(--acds-dim);
  cursor:pointer;
  font-family:'JetBrains Mono',monospace;
  font-size:10px;
  padding:10px 4px;
  text-align:center;
  transition:all .15s;
  white-space:nowrap;
  overflow:hidden;
}
.acds-btn:hover:not(:disabled){border-color:var(--acds-dim);color:var(--acds-text);background:var(--acds-bg);}
.acds-btn:disabled{opacity:.2;cursor:not-allowed;}
.acds-btn.g{border-color:rgba(0,230,118,.35);color:var(--acds-green);}
.acds-btn.g:hover:not(:disabled){background:rgba(0,230,118,.08);border-color:var(--acds-green);}
.acds-btn.r{border-color:rgba(255,77,77,.35);color:var(--acds-accent);}
.acds-btn.r:hover:not(:disabled){background:rgba(255,77,77,.08);border-color:var(--acds-accent);}
.acds-btn.y{border-color:rgba(255,179,0,.35);color:var(--acds-yellow);}
.acds-btn.y:hover:not(:disabled){background:rgba(255,179,0,.08);border-color:var(--acds-yellow);}

.acds-mlbl{color:var(--acds-dim);font-size:9px;text-transform:uppercase;letter-spacing:.08em;margin-bottom:5px;}
.acds-mlog{background:var(--acds-logbg);border:1px solid var(--acds-border2);border-radius:9px;height:80px;overflow-y:auto;padding:7px 9px;scrollbar-width:thin;scrollbar-color:var(--acds-border2) transparent;}
.acds-mlog::-webkit-scrollbar{width:2px;}
.acds-mlog::-webkit-scrollbar-thumb{background:var(--acds-border2);}
.acds-row{display:flex;gap:7px;margin-bottom:4px;line-height:1.5;}
.acds-rt{color:var(--acds-dim2);flex-shrink:0;font-size:9px;}
.acds-rm{font-size:9.5px;}
.acds-rm.ok{color:var(--acds-green);}
.acds-rm.warn{color:var(--acds-yellow);}
.acds-rm.error{color:var(--acds-accent);}
.acds-rm.info{color:var(--acds-blue);}

.acds-sg{margin-bottom:13px;}
.acds-sgl{color:var(--acds-dim);font-size:10px;text-transform:uppercase;letter-spacing:.07em;margin-bottom:5px;display:flex;justify-content:space-between;align-items:center;}
.acds-sgl span{color:var(--acds-accent);font-size:11px;font-weight:700;}
.acds-range{width:100%;accent-color:var(--acds-accent);cursor:pointer;height:4px;}
.acds-ng{display:grid;grid-template-columns:1fr 1fr;gap:6px;}
.acds-inp{background:var(--acds-inputbg);border:1px solid var(--acds-border2);border-radius:9px;color:var(--acds-text);font-family:'JetBrains Mono',monospace;font-size:10.5px;padding:8px 10px;width:100%;outline:none;transition:border-color .15s;}
.acds-inp:focus{border-color:var(--acds-accent);}
.acds-sel{background:var(--acds-inputbg);border:1px solid var(--acds-border2);border-radius:9px;color:var(--acds-text);font-family:'JetBrains Mono',monospace;font-size:10.5px;padding:8px 10px;width:100%;outline:none;cursor:pointer;}
.acds-trow{display:flex;align-items:center;justify-content:space-between;padding:3px 0;}
.acds-tgl{position:relative;width:38px;height:20px;background:var(--acds-border2);border-radius:10px;cursor:pointer;transition:background .2s;border:none;flex-shrink:0;}
.acds-tgl.on{background:var(--acds-accent);}
.acds-tgl::after{content:'';position:absolute;width:14px;height:14px;background:#fff;border-radius:50%;top:3px;left:3px;transition:transform .2s;}
.acds-tgl.on::after{transform:translateX(18px);}
.acds-tgl-l{color:var(--acds-text);font-size:10.5px;}
.acds-settings-body{max-height:360px;overflow-y:auto;scrollbar-width:thin;scrollbar-color:var(--acds-border2) transparent;padding-right:2px;}
.acds-btn-row{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:6px;}

.acds-ltabs{display:flex;gap:6px;margin-bottom:10px;}
.acds-ltab{flex:1;background:var(--acds-statbg);border:1px solid var(--acds-border2);border-radius:8px;color:var(--acds-dim);cursor:pointer;font-family:'JetBrains Mono',monospace;font-size:9.5px;padding:7px;text-align:center;transition:all .15s;}
.acds-ltab.on{color:var(--acds-accent);border-color:var(--acds-accent);}
.acds-list-desc{color:var(--acds-dim);font-size:9.5px;margin-bottom:8px;line-height:1.55;}
.acds-irow{display:flex;gap:6px;margin-bottom:8px;}
.acds-addbtn{background:none;border:1px solid var(--acds-border2);border-radius:9px;color:var(--acds-green);cursor:pointer;font-family:'JetBrains Mono',monospace;font-size:10px;padding:7px 11px;flex-shrink:0;transition:all .15s;}
.acds-addbtn:hover{border-color:var(--acds-green);background:rgba(0,230,118,.07);}
.acds-ll{background:var(--acds-logbg);border:1px solid var(--acds-border2);border-radius:9px;max-height:140px;overflow-y:auto;padding:6px;}
.acds-li2{display:flex;align-items:center;justify-content:space-between;padding:5px 7px;border-radius:6px;transition:background .15s;}
.acds-li2:hover{background:var(--acds-statbg);}
.acds-li2n{color:var(--acds-text);font-size:10.5px;}
.acds-li2d{background:none;border:none;color:var(--acds-dim);cursor:pointer;font-size:13px;padding:0 4px;transition:color .15s;}
.acds-li2d:hover{color:var(--acds-accent);}
.acds-lempty{color:var(--acds-dim2);font-size:10px;padding:12px;text-align:center;}

.acds-logctrls{display:flex;gap:5px;margin-bottom:8px;flex-wrap:wrap;}
.acds-lebtn{background:none;border:1px solid var(--acds-border2);border-radius:7px;color:var(--acds-dim);cursor:pointer;font-family:'JetBrains Mono',monospace;font-size:9px;padding:5px 9px;transition:all .15s;text-transform:uppercase;letter-spacing:.04em;}
.acds-lebtn:hover{border-color:var(--acds-blue);color:var(--acds-blue);}
.acds-flog{background:var(--acds-logbg);border:1px solid var(--acds-border2);border-radius:9px;height:210px;overflow-y:auto;padding:8px 9px;scrollbar-width:thin;scrollbar-color:var(--acds-border2) transparent;}
.acds-flog::-webkit-scrollbar{width:2px;}
.acds-flog::-webkit-scrollbar-thumb{background:var(--acds-border2);}

/* ★ FIX 1: Footer panele entegre — border-radius ile uyumlu */
.acds-foot{
  border-top:1px solid var(--acds-border2);
  padding:7px 15px;
  display:flex;
  justify-content:space-between;
  align-items:center;
  background:var(--acds-bg);
}
.acds-hint{color:var(--acds-dim2);font-size:8.5px;cursor:pointer;transition:color .15s;}
.acds-hint:hover{color:var(--acds-accent);}
.acds-cred{color:var(--acds-dim2);font-size:8.5px;}
.acds-cred a{color:var(--acds-dim);text-decoration:none;transition:color .15s;}
.acds-cred a:hover{color:var(--acds-accent);}
</style>

<div class="acds-panel" id="__acds_panel__">

  <!-- HEADER -->
  <div class="acds-hdr" id="__acds_drag__">
    <div class="acds-hdr-top">
      <div class="acds-hdr-title">
        <div class="acds-title"><em>AUTO</em> COMMENT DELETE</div>
        <div class="acds-brand">by DOKES</div>
      </div>
      <div class="acds-hdr-right">
        <button class="acds-lang-pill" id="__acds_langbadge__">${(CFG.uiLang||"TR").toUpperCase()}</button>
        <button class="acds-hbtn acds-hbtn--drag" id="__acds_dragbtn__" title="Taşı / Kilitle">⠿</button>
        <button class="acds-hbtn" id="__acds_sizebtn__" title="Panel Boyutu">⊡</button>
        <button class="acds-hbtn" id="__acds_theme__" title="Tema (T)">◑</button>
        <button class="acds-hbtn" id="__acds_help_btn__" title="Yardım (?)">?</button>
        <button class="acds-hbtn" id="__acds_min__" title="Küçült">—</button>
        <button class="acds-hbtn acds-hbtn--close" id="__acds_close__" title="Kapat">✕</button>
      </div>
    </div>
  </div>

  <!-- DRY RUN BANNER -->
  <div class="acds-drybanner ${CFG.dryRun?'on':''}" id="__acds_drybanner__">${CFG.dryRun?`🧪 ${ui.msgDryRunOn}`:''}</div>

  <!-- TABS -->
  <div class="acds-tabs">
    <button class="acds-tab on" data-tab="main"    id="__acds_tab_main__">${ui.tabMain}</button>
    <button class="acds-tab"    data-tab="settings" id="__acds_tab_settings__">${ui.tabSettings}</button>
    <button class="acds-tab"    data-tab="lists"    id="__acds_tab_lists__">${ui.tabLists}</button>
    <button class="acds-tab"    data-tab="log"      id="__acds_tab_log__">${ui.tabLog}</button>
  </div>

  <!-- BODY -->
  <div class="acds-body">

    <!-- ═══ ANA ═══ -->
    <div class="acds-tc on" data-content="main">

      <div class="acds-srow">
        <div class="acds-dot" id="__acds_dot__"></div>
        <div class="acds-stxt" id="__acds_stxt__">${ui.statusWait}</div>
        <div class="acds-tbadge" id="__acds_tbadge__"></div>
      </div>

      <!-- LIVE SELECTING -->
      <div class="acds-sel-wrap" id="__acds_sel_wrap__">
        <div class="acds-sel-row">
          <div class="acds-sel-lbl" id="__acds_sel_lbl__">${ui.lblSelecting}</div>
          <div class="acds-sel-val" id="__acds_sel_progress__">0 / 0</div>
        </div>
        <div class="acds-sel-track">
          <div class="acds-sel-fill" id="__acds_sel_fill__" style="width:0%"></div>
        </div>
      </div>

      <!-- STATS -->
      <div class="acds-stats">
        <div class="acds-stat"><div class="acds-sv red" id="__acds_sil__">0</div><div class="acds-sl" id="__acds_lbl_del__">${ui.lblDeleted}</div></div>
        <div class="acds-stat"><div class="acds-sv"     id="__acds_tur__">0</div><div class="acds-sl" id="__acds_lbl_tur__">${ui.lblRound}</div></div>
        <div class="acds-stat"><div class="acds-sv ylw" id="__acds_atl__">0</div><div class="acds-sl" id="__acds_lbl_skip__">${ui.lblSkipped}</div></div>
        <div class="acds-stat"><div class="acds-sv"     id="__acds_sure__">0:00</div><div class="acds-sl" id="__acds_lbl_time__">${ui.lblTime}</div></div>
      </div>

      <!-- ★ FIX 1: acds-xstat wrapper eklendi — hız satırı artık panelin içinde -->
      <div class="acds-xstat">
        <div class="acds-xl" id="__acds_lbl_rate__">HIZ / SAAT</div>
        <div class="acds-xv" id="__acds_hiz__">—</div>
      </div>

      <!-- GÜVENLİK SKORU -->
      <div class="acds-ban-wrap" style="display:none">
        <div class="acds-ban-head">
          <div class="acds-ban-lbl" id="__acds_lbl_security__">${ui.lblSecurity}</div>
          <div class="acds-ban-val" id="__acds_banscore__">100</div>
        </div>
        <div class="acds-track"><div class="acds-fill-ban" id="__acds_banfill__" style="width:100%"></div></div>
      </div>

      <!-- HEDEF BAR -->
      <div class="acds-bar-wrap" id="__acds_goalwrap__">
        <div class="acds-bar-head">
          <div class="acds-bar-lbl" id="__acds_lbl_goal__">${ui.lblGoal}</div>
          <div class="acds-bar-val" id="__acds_goalval__">0 / 0</div>
        </div>
        <div class="acds-track"><div class="acds-fill-goal" id="__acds_goalfill__" style="width:0%"></div></div>
      </div>

      <!-- COOLDOWN BAR -->
      <div class="acds-bar-wrap" id="__acds_cdwrap__">
        <div class="acds-bar-head">
          <div class="acds-bar-lbl" id="__acds_lbl_cd__">${ui.lblCooldown}</div>
          <div class="acds-bar-val" id="__acds_cdval__">—</div>
        </div>
        <div class="acds-track"><div class="acds-fill-cd" id="__acds_cdfill__" style="width:100%"></div></div>
      </div>

      <!-- SON SİLİNENLER -->
      <div class="acds-last" id="__acds_last__">
        <div class="acds-last-lbl" id="__acds_lbl_lastdel__">${ui.lblLastDel}</div>
        <div class="acds-last-list" id="__acds_lastlist__"></div>
      </div>

      <!-- BUTONLAR -->
      <div class="acds-ctrls">
        <button class="acds-btn g" id="__acds_start__">${ui.btnStart}</button>
        <button class="acds-btn" id="__acds_pause__" disabled>${ui.btnPause}</button>
        <button class="acds-btn r" id="__acds_stop__" disabled>${ui.btnStop}</button>
      </div>
      <div class="acds-ctrls2" style="display:none">
        <button class="acds-btn y" id="__acds_undo__">${ui.btnUndo}</button>
        <button class="acds-btn" id="__acds_dryrun__" style="border-color:rgba(255,179,0,.3);color:var(--acds-yellow)">${ui.btnDryRun}: ${CFG.dryRun?"ON":"OFF"}</button>
      </div>

      <div class="acds-mlbl" id="__acds_lbl_recentlog__">${ui.lblRecentLogs}</div>
      <div class="acds-mlog" id="__acds_mlog__"></div>
    </div>

    <!-- ═══ AYARLAR ═══ -->
    <div class="acds-tc" data-content="settings">
      <div class="acds-settings-body">

        <div class="acds-sg">
          <div class="acds-sgl" id="__acds_sgl_uilang__">${ui.settUiLang}</div>
          <select class="acds-sel" id="__acds_uilangsel__">
            ${Object.entries(UI_LANGS).map(([k,v])=>`<option value="${k}"${k===CFG.uiLang?" selected":""}>${v.sub.split(" ")[0]} (${k.toUpperCase()})</option>`).join("")}
          </select>
        </div>

        <div class="acds-sg">
          <div class="acds-sgl" id="__acds_sgl_iglang__">${ui.settIgLang} <span id="__acds_detectedlang__">${IG_LANGS[CFG.detectedLang]?.name||""}</span></div>
          <select class="acds-sel" id="__acds_langsel__">
            <option value="auto">🌍 Auto-detect</option>
            ${Object.entries(IG_LANGS).map(([k,v])=>`<option value="${k}"${k===CFG.igLang?" selected":""}>${v.name}</option>`).join("")}
          </select>
        </div>

        <div class="acds-sg">
          <div class="acds-sgl" id="__acds_sgl_batch__">${ui.settBatch}
            <span id="__acds_batchv__">${CFG.perBatch} ${ui.settBatchVal}</span>
          </div>
          <input type="range" class="acds-range" min="1" max="6" value="${CFG.perBatch}" id="__acds_batch__">
          <div style="display:flex;justify-content:space-between;margin-top:4px;">
            ${[1,2,3,4,5,6].map(n=>`<span style="color:var(--acds-dim);font-size:9px">${n}</span>`).join("")}
          </div>
        </div>

        <div class="acds-sg">
          <div class="acds-sgl" id="__acds_sgl_target__">${ui.settTarget}</div>
          <input type="number" class="acds-inp" min="0" id="__acds_target__" value="${CFG.targetCount}" placeholder="0">
        </div>

        <div class="acds-sg">
          <div class="acds-sgl" id="__acds_sgl_cd__">${ui.settCooldown}</div>
          <div class="acds-ng">
            <input type="number" class="acds-inp" min="10" id="__acds_cdmin__" value="${CFG.cooldownMin}" placeholder="Min">
            <input type="number" class="acds-inp" min="10" id="__acds_cdmax__" value="${CFG.cooldownMax}" placeholder="Max">
          </div>
        </div>

        <div class="acds-sg">
          <div class="acds-sgl" id="__acds_sgl_sel__">${ui.settSelectDelay}</div>
          <div class="acds-ng">
            <input type="number" class="acds-inp" min="200" id="__acds_smin__" value="${CFG.selectMin}" placeholder="Min">
            <input type="number" class="acds-inp" min="200" id="__acds_smax__" value="${CFG.selectMax}" placeholder="Max">
          </div>
        </div>

        <div class="acds-sg">
          <div class="acds-sgl" id="__acds_sgl_regex__">${ui.settRegex}</div>
          <input type="text" class="acds-inp" id="__acds_regex__" value="${esc(CFG.regexFilter)}" placeholder="${ui.settRegexPlaceholder}">
        </div>

        <div class="acds-sg"><div class="acds-trow"><div class="acds-tgl-l" id="__acds_lbl_sound__">${ui.settSound}</div><button class="acds-tgl ${CFG.soundEnabled?"on":""}" id="__acds_sound__"></button></div></div>
        <div class="acds-sg"><div class="acds-trow"><div class="acds-tgl-l" id="__acds_lbl_notif__">${ui.settNotif}</div><button class="acds-tgl ${CFG.notifEnabled?"on":""}" id="__acds_notif__"></button></div></div>
        <div class="acds-sg"><div class="acds-trow"><div class="acds-tgl-l" id="__acds_lbl_adaptive__">${ui.settAdaptive}</div><button class="acds-tgl ${CFG.adaptiveTiming?"on":""}" id="__acds_adaptive__"></button></div></div>
        <div class="acds-sg"><div class="acds-trow"><div class="acds-tgl-l" id="__acds_lbl_dryrun__">${ui.settDryRun}</div><button class="acds-tgl ${CFG.dryRun?"on":""}" id="__acds_dryrunmode__"></button></div></div>

        <div class="acds-btn-row">
          <button class="acds-btn g" id="__acds_save__">${ui.btnSave}</button>
          <button class="acds-btn r" id="__acds_reset__">${ui.btnReset}</button>
        </div>
      </div>
    </div>

    <!-- ═══ LİSTELER ═══ -->
    <div class="acds-tc" data-content="lists">
      <div class="acds-ltabs">
        <button class="acds-ltab on" id="__acds_lt_wl__">${ui.wlTab}</button>
        <button class="acds-ltab"    id="__acds_lt_bl__">${ui.blTab}</button>
      </div>
      <div id="__acds_wl_section__">
        <div class="acds-list-desc" id="__acds_wl_desc__">${ui.wlDesc}</div>
        <div class="acds-irow">
          <input type="text" class="acds-inp" id="__acds_wlinp__" placeholder="${ui.listPlaceholder}">
          <button class="acds-addbtn" id="__acds_wladd__">${ui.btnAdd}</button>
        </div>
        <div class="acds-ll" id="__acds_wllist__"><div class="acds-lempty">${ui.listEmpty}</div></div>
      </div>
      <div id="__acds_bl_section__" style="display:none">
        <div class="acds-list-desc" id="__acds_bl_desc__">${ui.blDesc}</div>
        <div class="acds-irow">
          <input type="text" class="acds-inp" id="__acds_blinp__" placeholder="${ui.listPlaceholder}">
          <button class="acds-addbtn" id="__acds_bladd__">${ui.btnAdd}</button>
        </div>
        <div class="acds-ll" id="__acds_bllist__"><div class="acds-lempty">${ui.listEmpty}</div></div>
      </div>
    </div>

    <!-- ═══ LOG ═══ -->
    <div class="acds-tc" data-content="log">
      <div class="acds-logctrls">
        <button class="acds-lebtn" id="__acds_ejson__">${ui.logBtnJson}</button>
        <button class="acds-lebtn" id="__acds_ecsv__">${ui.logBtnCsv}</button>
        <button class="acds-lebtn" id="__acds_etxt__">${ui.logBtnTxt}</button>
        <button class="acds-lebtn" id="__acds_ecopy__">${ui.logBtnCopy}</button>
        <button class="acds-lebtn" id="__acds_eclr__" style="border-color:rgba(255,77,77,.3);color:var(--acds-accent)">${ui.logBtnClear}</button>
      </div>
      <div class="acds-flog" id="__acds_flog__"></div>
    </div>

  </div>

  <!-- FOOTER -->
  <div class="acds-foot">
    <div class="acds-hint" id="__acds_hint__">? = yardım &nbsp;·&nbsp; ESC = bitir</div>
    <div class="acds-cred">by DOKES &nbsp;<a href="https://github.com/dokess" target="_blank">github.com/dokess</a></div>
  </div>

</div>`;
}

// ─── APPLY UI LANG ────────────────────────────────────────────────────────────
function applyUiLang() {
  const ui = t();
  const set = (id, v) => { const el=gid(id); if (el) el.textContent = v; };

  set("__acds_tab_main__", ui.tabMain);
  set("__acds_tab_settings__", ui.tabSettings);
  set("__acds_tab_lists__", ui.tabLists);
  set("__acds_tab_log__", ui.tabLog);
  if (!S.running) set("__acds_stxt__", ui.statusWait);
  set("__acds_sel_lbl__", ui.lblSelecting);
  set("__acds_lbl_del__", ui.lblDeleted);
  set("__acds_lbl_tur__", ui.lblRound);
  set("__acds_lbl_skip__", ui.lblSkipped);
  set("__acds_lbl_time__", ui.lblTime);
  set("__acds_lbl_security__", ui.lblSecurity);
  set("__acds_lbl_goal__", ui.lblGoal);
  set("__acds_lbl_cd__", ui.lblCooldown);
  set("__acds_lbl_lastdel__", ui.lblLastDel);
  set("__acds_lbl_recentlog__", ui.lblRecentLogs);
  // ★ Hız etiketi i18n
  const rateEl = gid("__acds_lbl_rate__");
  if (rateEl) rateEl.textContent = ui.summaryRate || "HIZ / SAAT";
  if (!S.running) set("__acds_start__", ui.btnStart);
  const pbtn = gid("__acds_pause__");
  if (pbtn) pbtn.textContent = S.paused ? ui.btnResume : ui.btnPause;
  set("__acds_stop__", ui.btnStop);
  set("__acds_undo__", ui.btnUndo);
  set("__acds_sgl_uilang__", ui.settUiLang);
  set("__acds_sgl_iglang__", ui.settIgLang);
  set("__acds_sgl_target__", ui.settTarget);
  set("__acds_sgl_cd__", ui.settCooldown);
  set("__acds_sgl_sel__", ui.settSelectDelay);
  set("__acds_sgl_regex__", ui.settRegex);
  set("__acds_lbl_sound__", ui.settSound);
  set("__acds_lbl_notif__", ui.settNotif);
  set("__acds_lbl_adaptive__", ui.settAdaptive);
  set("__acds_lbl_dryrun__", ui.settDryRun);
  set("__acds_save__", ui.btnSave);
  set("__acds_reset__", ui.btnReset);
  set("__acds_lt_wl__", ui.wlTab);
  set("__acds_lt_bl__", ui.blTab);
  const wld = gid("__acds_wl_desc__"); if (wld) wld.textContent = ui.wlDesc;
  const bld = gid("__acds_bl_desc__"); if (bld) bld.textContent = ui.blDesc;
  set("__acds_ejson__", ui.logBtnJson);
  set("__acds_ecsv__", ui.logBtnCsv);
  set("__acds_etxt__", ui.logBtnTxt);
  set("__acds_ecopy__", ui.logBtnCopy);
  set("__acds_eclr__", ui.logBtnClear);

  const badge = gid("__acds_langbadge__"); if (badge) badge.textContent = CFG.uiLang.toUpperCase();
  const rx = gid("__acds_regex__"); if (rx) rx.placeholder = ui.settRegexPlaceholder;
  const wl = gid("__acds_wlinp__"); if (wl) wl.placeholder = ui.listPlaceholder;
  const bl = gid("__acds_blinp__"); if (bl) bl.placeholder = ui.listPlaceholder;

  const bv = gid("__acds_batchv__");
  const bs = gid("__acds_batch__");
  if (bv && bs) bv.textContent = `${bs.value} ${ui.settBatchVal}`;
  const sgl_batch = gid("__acds_sgl_batch__");
  if (sgl_batch) {
    const span = sgl_batch.querySelector("span");
    sgl_batch.childNodes[0].textContent = ui.settBatch + " ";
  }

  renderDryRunBtn();
  renderLists();
}

// ─── EVENTS ───────────────────────────────────────────────────────────────────
function attachEvents(root) {
  const $ = id => root.querySelector("#" + id);

  $("__acds_min__").onclick = () => {
    const p = $("__acds_panel__");
    const isMini = p.classList.contains("mini");
    p.classList.remove("mini","compact");
    if (!isMini) p.classList.add("mini");
    $("__acds_min__").textContent = p.classList.contains("mini") ? "□" : "—";
  };
  $("__acds_theme__").onclick = cycleTheme;
  $("__acds_help_btn__").onclick = toggleHelp;
  $("__acds_hint__").onclick = toggleHelp;
  $("__acds_langbadge__").onclick = cycleUiLang;
  $("__acds_sizebtn__").onclick = cyclePanelSize;

  $("__acds_close__").onclick = () => {
    gid("__acds_root__")?.remove();
    if (S.running) stopScript();
  };

  $("__acds_dragbtn__").onclick = () => {
    S.dragLocked = !S.dragLocked;
    const btn = $("__acds_dragbtn__");
    if (btn) {
      btn.title = S.dragLocked ? "Kilit Aç" : "Taşı / Kilitle";
      btn.classList.toggle("locked", S.dragLocked);
      btn.textContent = S.dragLocked ? "🔒" : "⠿";
    }
    const handle = $("__acds_drag__");
    if (handle) handle.style.cursor = S.dragLocked ? "not-allowed" : "move";
    addLog("info", `Drag: ${S.dragLocked ? "KİLİTLİ 🔒" : "SERBEST 🔓"}`);
  };

  makeDraggable(root, $("__acds_drag__"));

  root.querySelectorAll(".acds-tab").forEach(tab => {
    tab.onclick = () => {
      root.querySelectorAll(".acds-tab").forEach(t2 => t2.classList.remove("on"));
      root.querySelectorAll(".acds-tc").forEach(c => c.classList.remove("on"));
      tab.classList.add("on");
      root.querySelector(`[data-content="${tab.dataset.tab}"]`).classList.add("on");
    };
  });

  $("__acds_start__").onclick = startScript;
  $("__acds_pause__").onclick = togglePause;
  $("__acds_stop__").onclick  = stopScript;
  $("__acds_undo__").onclick  = undoLast;

  $("__acds_dryrun__").onclick = () => {
    CFG.dryRun = !CFG.dryRun;
    renderDryRunBtn();
    syncToggle($("__acds_dryrunmode__"), CFG.dryRun);
    addLog("info", `Dry Run: ${CFG.dryRun?"ON":"OFF"}`);
  };

  const bs = $("__acds_batch__");
  bs.oninput = () => {
    const bv = $("__acds_batchv__");
    if (bv) bv.textContent = `${bs.value} ${t().settBatchVal}`;
    CFG.perBatch = parseInt(bs.value);
  };

  const uls = $("__acds_uilangsel__");
  uls.onchange = () => { CFG.uiLang = uls.value; applyUiLang(); saveSession(); };

  [
    ["__acds_sound__",      v => { CFG.soundEnabled = v; }],
    ["__acds_notif__",      v => {
      if (v) requestNotifPermission().then(ok => { CFG.notifEnabled = ok; syncToggle($("__acds_notif__"), ok); });
      else CFG.notifEnabled = false;
    }],
    ["__acds_adaptive__",   v => { CFG.adaptiveTiming = v; }],
    ["__acds_dryrunmode__", v => { CFG.dryRun = v; renderDryRunBtn(); }],
  ].forEach(([id, setter]) => {
    const el = $(id); if (!el) return;
    el.onclick = () => { const nv = !el.classList.contains("on"); setter(nv); syncToggle(el, nv); };
  });

  $("__acds_save__").onclick = saveSettings;
  $("__acds_reset__").onclick = () => { if (confirm(t().resetConfirm)) resetStats(); };
  $("__acds_langsel__").onchange = () => { CFG.igLang = $("__acds_langsel__").value; detectLang(); updateLangBadge(); };

  $("__acds_wladd__").onclick = () => addListItem("white");
  $("__acds_wlinp__").onkeydown = e => { if (e.key === "Enter") addListItem("white"); };
  $("__acds_bladd__").onclick = () => addListItem("black");
  $("__acds_blinp__").onkeydown = e => { if (e.key === "Enter") addListItem("black"); };

  $("__acds_lt_wl__").onclick = () => {
    $("__acds_lt_wl__").classList.add("on"); $("__acds_lt_bl__").classList.remove("on");
    $("__acds_wl_section__").style.display = ""; $("__acds_bl_section__").style.display = "none";
  };
  $("__acds_lt_bl__").onclick = () => {
    $("__acds_lt_bl__").classList.add("on"); $("__acds_lt_wl__").classList.remove("on");
    $("__acds_bl_section__").style.display = ""; $("__acds_wl_section__").style.display = "none";
  };

  $("__acds_ejson__").onclick = () => exportLogs("json");
  $("__acds_ecsv__").onclick  = () => exportLogs("csv");
  $("__acds_etxt__").onclick  = () => exportLogs("txt");
  $("__acds_ecopy__").onclick = copyLogs;
  $("__acds_eclr__").onclick  = () => {
    S.logs = []; renderMainLog(); renderLogTab();
    addLog("info", t().msgLogCleared);
  };
}

function syncToggle(el, val) { el?.classList.toggle("on", !!val); }

function makeDraggable(root, handle) {
  let ox=0, oy=0, sx=0, sy=0;
  handle.addEventListener("mousedown", e => {
    if (e.target.tagName === "BUTTON") return;
    if (S.dragLocked) return;
    e.preventDefault();
    const r = root.getBoundingClientRect();
    ox=r.left; oy=r.top; sx=e.clientX; sy=e.clientY;
    document.addEventListener("mousemove", mv);
    document.addEventListener("mouseup", up);
  });
  handle.addEventListener("dblclick", e => {
    if (e.target.tagName === "BUTTON") return;
    S.dragLocked = !S.dragLocked;
    handle.style.cursor = S.dragLocked ? "not-allowed" : "move";
    addLog("info", `Drag: ${S.dragLocked?"KİLİTLİ🔒":"SERBEST🔓"}`);
  });
  function mv(e) {
    root.style.right = "auto";
    root.style.left  = clamp(ox + e.clientX - sx, 0, innerWidth  - root.offsetWidth)  + "px";
    root.style.top   = clamp(oy + e.clientY - sy, 0, innerHeight - root.offsetHeight) + "px";
  }
  function up() { document.removeEventListener("mousemove", mv); document.removeEventListener("mouseup", up); }
}
function clamp(v, a, b) { return Math.max(a, Math.min(v, b)); }

// ─── SETTINGS ─────────────────────────────────────────────────────────────────
function syncSettingsUI() {
  const g = s => gid(s);
  if (g("__acds_batch__")) {
    g("__acds_batch__").value = CFG.perBatch;
    const bv = g("__acds_batchv__"); if (bv) bv.textContent = `${CFG.perBatch} ${t().settBatchVal}`;
  }
  if (g("__acds_target__"))  g("__acds_target__").value = CFG.targetCount;
  if (g("__acds_cdmin__"))   g("__acds_cdmin__").value = CFG.cooldownMin;
  if (g("__acds_cdmax__"))   g("__acds_cdmax__").value = CFG.cooldownMax;
  if (g("__acds_smin__"))    g("__acds_smin__").value = CFG.selectMin;
  if (g("__acds_smax__"))    g("__acds_smax__").value = CFG.selectMax;
  if (g("__acds_langsel__")) g("__acds_langsel__").value = CFG.igLang;
  if (g("__acds_uilangsel__")) g("__acds_uilangsel__").value = CFG.uiLang;
  if (g("__acds_regex__"))   g("__acds_regex__").value = CFG.regexFilter;
}

function saveSettings() {
  const g = s => gid(s);
  CFG.perBatch    = parseInt(g("__acds_batch__")?.value)  || 3;
  CFG.targetCount = parseInt(g("__acds_target__")?.value) || 0;
  CFG.cooldownMin = parseInt(g("__acds_cdmin__")?.value)  || 60;
  CFG.cooldownMax = parseInt(g("__acds_cdmax__")?.value)  || 90;
  CFG.selectMin   = parseInt(g("__acds_smin__")?.value)   || 800;
  CFG.selectMax   = parseInt(g("__acds_smax__")?.value)   || 1800;
  CFG.igLang      = g("__acds_langsel__")?.value || "auto";
  CFG.uiLang      = g("__acds_uilangsel__")?.value || "tr";
  CFG.regexFilter = g("__acds_regex__")?.value?.trim() || "";
  if (CFG.cooldownMin > CFG.cooldownMax) CFG.cooldownMax = CFG.cooldownMin + 10;
  if (CFG.selectMin > CFG.selectMax) CFG.selectMax = CFG.selectMin + 500;
  detectLang(); updateLangBadge(); updateGoalUI(); renderDryRunBtn(); applyUiLang();
  saveSession(); addLog("ok", t().msgSettingsSaved);
}

// ─── LISTS ────────────────────────────────────────────────────────────────────
function addListItem(type) {
  const inpId = type === "white" ? "__acds_wlinp__" : "__acds_blinp__";
  const inp = gid(inpId); if (!inp) return;
  const val = inp.value.trim().replace(/^@/, ""); if (!val) return;
  const arr = type === "white" ? CFG.whitelist : CFG.blacklist;
  if (!arr.includes(val)) { arr.push(val); addLog("info", `@${val} ${t().msgListAdd} ${type==="white"?t().wlTab:t().blTab}`); }
  inp.value = ""; renderLists(); saveSession();
}
function removeListItem(type, name) {
  if (type === "white") CFG.whitelist = CFG.whitelist.filter(x => x !== name);
  else CFG.blacklist = CFG.blacklist.filter(x => x !== name);
  renderLists(); saveSession();
}
function renderLists() {
  renderOneList("__acds_wllist__", CFG.whitelist, "white");
  renderOneList("__acds_bllist__", CFG.blacklist, "black");
}
function renderOneList(elId, arr, type) {
  const el = gid(elId); if (!el) return;
  if (!arr.length) { el.innerHTML = `<div class="acds-lempty">${t().listEmpty}</div>`; return; }
  el.innerHTML = arr.map(name =>
    `<div class="acds-li2"><span class="acds-li2n">@${esc(name)}</span><button class="acds-li2d">✕</button></div>`
  ).join("");
  el.querySelectorAll(".acds-li2d").forEach((btn, i) => { btn.onclick = () => removeListItem(type, arr[i]); });
}

// ─── UI RENDER ────────────────────────────────────────────────────────────────
function setStatus(txt, cls) {
  const dot = gid("__acds_dot__"); const stxt = gid("__acds_stxt__");
  if (!dot) return;
  dot.className = "acds-dot " + (cls||"");
  stxt.textContent = txt;
}
function updateStats() {
  const set = (id, v) => { const el=gid(id); if (el) el.textContent=v; };
  set("__acds_sil__",  S.silinen);
  set("__acds_tur__",  S.tur);
  set("__acds_atl__",  S.atlanan);
  const e = S.baslangic ? Math.floor((Date.now()-S.baslangic)/1000) : 0;
  set("__acds_sure__", `${Math.floor(e/60)}:${String(e%60).padStart(2,"0")}`);
  set("__acds_hiz__",  getHourlyRate() || "—");
  updateGoalUI(); updateBanScoreUI(); saveSession();
}
function updateGoalUI() {
  const wrap = gid("__acds_goalwrap__"), fill=gid("__acds_goalfill__"), val=gid("__acds_goalval__"), badge=gid("__acds_tbadge__");
  if (!wrap) return;
  if (CFG.targetCount > 0) {
    wrap.classList.add("on");
    fill.style.width = Math.min(100,(S.silinen/CFG.targetCount)*100)+"%";
    val.textContent  = `${S.silinen} / ${CFG.targetCount}`;
    if (badge) badge.textContent = `→${CFG.targetCount}`;
  } else {
    wrap.classList.remove("on");
    if (badge) badge.textContent = "";
  }
}
function renderBanScore() { updateBanScoreUI(); }
function updateBanScoreUI() {
  const el=gid("__acds_banscore__"), fill=gid("__acds_banfill__"); if (!el) return;
  el.textContent = S.banScore;
  const color = S.banScore>70?"var(--acds-green)":S.banScore>40?"var(--acds-yellow)":"var(--acds-accent)";
  el.style.color = color;
  if (fill){ fill.style.width=S.banScore+"%"; fill.style.background=color; }
}
function renderDryRunBtn() {
  const el=gid("__acds_dryrun__"), banner=gid("__acds_drybanner__");
  if (el) {
    el.textContent = `🧪 ${t().btnDryRun}: ${CFG.dryRun?"ON":"OFF"}`;
    el.style.borderColor = CFG.dryRun?"rgba(255,179,0,.6)":"rgba(255,179,0,.25)";
    el.style.color = CFG.dryRun?"var(--acds-yellow)":"";
  }
  if (banner) {
    banner.classList.toggle("on", !!CFG.dryRun);
    banner.textContent = CFG.dryRun?`🧪 ${t().msgDryRunOn}`:"";
  }
}
function updateLangBadge() {
  const el=gid("__acds_langbadge__"), dl=gid("__acds_detectedlang__");
  if (el) el.textContent=CFG.uiLang.toUpperCase();
  if (dl) dl.textContent=IG_LANGS[CFG.detectedLang]?.name||"";
}
function addDeletedPreview(text) {
  const time = new Date().toLocaleTimeString();
  S.deleted.unshift({text:text||"comment",time});
  if (S.deleted.length > 3) S.deleted.pop();
  const wrap=gid("__acds_last__"), list=gid("__acds_lastlist__"); if (!wrap||!list) return;
  wrap.classList.add("on");
  list.innerHTML = S.deleted.map(d =>
    `<div class="acds-li"><span class="acds-li-x">✕</span><span class="acds-li-t">${esc(d.text)}</span><span class="acds-li-s">${d.time}</span></div>`
  ).join("");
}
function logRows(logs) {
  return logs.map(l =>
    `<div class="acds-row"><span class="acds-rt">${l.time}</span><span class="acds-rm ${l.level}">${esc(l.msg)}</span></div>`
  ).join("");
}
function renderMainLog() { const b=gid("__acds_mlog__"); if (b) b.innerHTML=logRows(S.logs.slice(0,20)); }
function renderLogTab()  { const b=gid("__acds_flog__"); if (b) b.innerHTML=logRows(S.logs); }
function renderAll() {
  updateStats(); renderMainLog(); renderLogTab();
  renderLists(); updateLangBadge(); renderDryRunBtn(); clearSelectingProgress();
  syncSettingsUI();
}

let cdIv = null;
function startCD(totalMs) {
  const wrap=gid("__acds_cdwrap__"), fill=gid("__acds_cdfill__"), val=gid("__acds_cdval__"); if (!wrap) return;
  clearInterval(cdIv);
  S.cdEnd=Date.now()+totalMs; S.cdTotal=totalMs;
  wrap.classList.add("on");
  cdIv = setInterval(()=>{
    const rem=S.cdEnd-Date.now();
    if (rem<=0){ clearInterval(cdIv); wrap.classList.remove("on"); return; }
    if (fill) fill.style.width=((rem/S.cdTotal)*100)+"%";
    if (val)  val.textContent=Math.ceil(rem/1000)+"s";
  },100);
}
function stopCD() { clearInterval(cdIv); gid("__acds_cdwrap__")?.classList.remove("on"); }

let statsIv = null;

// ─── CONTROLS ─────────────────────────────────────────────────────────────────
function startScript() {
  if (S.running) return;
  S.running=true; S.stopped=false; S.paused=false;
  if (!S.baslangic) S.baslangic=Date.now();
  gid("__acds_start__").disabled=true;
  gid("__acds_pause__").disabled=false;
  gid("__acds_stop__").disabled=false;
  statsIv=setInterval(updateStats,1000);
  yorumSil();
}

function togglePause() {
  if (!S.running) return;
  S.paused = !S.paused;
  const btn = gid("__acds_pause__");
  if (S.paused) {
    setStatus(t().msgPaused, "pau");
    if (btn) btn.textContent = t().btnResume;
    clearSelectingProgress();
    addLog("warn", t().msgPaused);
  } else {
    setStatus(t().statusRunning, "run");
    if (btn) btn.textContent = t().btnPause;
    addLog("info", t().msgResumed);
    if (S.resumeFn) { const fn=S.resumeFn; S.resumeFn=null; fn(); }
  }
}

function stopScript() {
  S.stopped=true; S.running=false; S.paused=false;
  if (S.resumeFn){ const fn=S.resumeFn; S.resumeFn=null; fn(); }
  clearInterval(statsIv); stopCD(); clearSelectingProgress();
  setStatus(t().msgStopped,"");
  const s=gid("__acds_start__"), p=gid("__acds_pause__"), x=gid("__acds_stop__");
  if (s){ s.disabled=false; s.textContent=t().btnStart; }
  if (p){ p.disabled=true; p.textContent=t().btnPause; }
  if (x) x.disabled=true;
  addLog("warn",t().msgStopped); updateStats();
  if (S.silinen>0) setTimeout(showSummaryPopup,700);
}

// ─── KEYBOARD SHORTCUTS ───────────────────────────────────────────────────────
document.addEventListener("keydown", e => {
  if (!gid("__acds_root__")) return;
  if (["INPUT","TEXTAREA","SELECT"].includes(e.target.tagName)) return;

  if (e.code==="Escape") {
    if (S.helpVisible)    { closeHelp(); return; }
    if (S.summaryVisible) { closeSummary(); return; }
    stopScript(); return;
  }
  if (e.code==="Space") { e.preventDefault(); togglePause(); }
  if (!e.shiftKey) {
    if (e.key==="t"||e.key==="T") cycleTheme();
    if (e.key==="l"||e.key==="L") cycleUiLang();
    if (e.key==="e"||e.key==="E") exportLogs("json");
    if (e.key==="n"||e.key==="N") { CFG.notifEnabled=!CFG.notifEnabled; addLog("info",`Notif: ${CFG.notifEnabled?"ON":"OFF"}`); }
    if (e.key==="d"||e.key==="D") { CFG.dryRun=!CFG.dryRun; renderDryRunBtn(); addLog("info",`Dry Run: ${CFG.dryRun?"ON":"OFF"}`); }
    if (e.key==="c"||e.key==="C") {
      const p=gid("__acds_panel__"); if (!p) return;
      CFG.compactMode=!p.classList.contains("compact");
      p.classList.toggle("compact",CFG.compactMode);
      addLog("info",CFG.compactMode?t().compactMode:t().fullMode);
    }
    if (e.key==="?"||e.key==="/"||e.key==="h"||e.key==="H") toggleHelp();
  } else {
    if (e.key==="S") cyclePanelSize();
    if (e.key==="R") { if (confirm(t().resetConfirm)) resetStats(); }
    if (e.key==="O") cycleOpacity();
  }
});

// ─── ANA DÖNGÜ ────────────────────────────────────────────────────────────────
async function yorumSil() {
  addLog("info", t().msgStarted);
  setStatus(t().statusRunning,"run");
  detectLang(); updateLangBadge();
  addLog("info",`${t().msgLang} ${IG_LANGS[CFG.detectedLang]?.name||CFG.detectedLang}`);
  if (CFG.dryRun) addLog("warn",t().msgDryRunOn);

  while (!S.stopped) {
    try {
      if (CFG.targetCount>0 && S.silinen>=CFG.targetCount) {
        addLog("ok",`${t().lblGoal}: ${S.silinen}/${CFG.targetCount} ${t().msgTargetDone}`);
        beep("done"); sendNotif(t().notifTarget,`${S.silinen} ${t().notifDoneBody}`,"✅");
        setStatus(t().statusTarget,"done"); stopScript(); break;
      }

      S.tur++;
      addLog("info",`Tur #${S.tur} · ${CFG.perBatch} ${t().settBatchVal}`);
      await safeSleep(rand(CFG.turnMin,CFG.turnMax));
      if (S.stopped) break;

      const secBtn = findSelectBtn();
      if (secBtn) { click(secBtn); await safeSleep(rand(CFG.selectMin,CFG.selectMax)); }

      let kutular = getCheckboxes();
      if (kutular.length===0) {
        addLog("warn",t().msgNoComment);
        window.scrollBy({top:700,behavior:"smooth"});
        await safeSleep(rand(CFG.scrollMin,CFG.scrollMax));
        kutular = getCheckboxes();
      }
      if (kutular.length===0) {
        addLog("ok",t().msgAllDone);
        beep("done"); sendNotif(t().notifDone,t().notifDoneBody,"✅");
        setStatus(t().statusDone,"done"); stopScript(); break;
      }

      const gecerli = kutular.filter(k => !isWhitelisted(k) && isBlacklisted(k) && passesRegex(k));
      const atlandi = kutular.length - gecerli.length;
      if (atlandi>0) { S.atlanan+=atlandi; addLog("warn",`${atlandi} ${t().lblSkipped}`); }

      if (gecerli.length===0) {
        addLog("warn",t().msgFilterSkip);
        window.scrollBy({top:700,behavior:"smooth"});
        await safeSleep(rand(CFG.scrollMin,CFG.scrollMax));
        continue;
      }

      const secilecekler  = gecerli.slice(0, CFG.perBatch);
      const totalToSelect = secilecekler.length;
      setSelectingProgress(0, totalToSelect);
      setStatus(`${t().msgSelecting} 0/${totalToSelect}`,"run");

      for (let i=0; i<secilecekler.length; i++) {
        if (S.stopped) break;
        click(secilecekler[i]);
        setSelectingProgress(i+1, totalToSelect);
        setStatus(`${t().msgSelecting} ${i+1}/${totalToSelect}`,"run");
        addLog("info",`${t().msgSelected} ${i+1}${t().msgOf}${totalToSelect}`);
        await safeSleep(rand(CFG.selectMin,CFG.selectMax));
      }

      clearSelectingProgress();
      if (!S.stopped) setStatus(t().statusRunning,"run");
      await safeSleep(rand(1500,2500));

      if (CFG.dryRun) {
        S.silinen += secilecekler.length;
        addLog("ok",`${t().dryRunLabel} ${secilecekler.length} → ${S.silinen}`);
        updateStats();
        const cd=getCooldown(); startCD(cd); await safeSleep(cd); stopCD();
        if (!S.stopped) setStatus(t().statusRunning,"run");
        continue;
      }

      const ilkSil = findFirstDeleteBtn();
      if (!ilkSil) { addLog("warn",t().msgNoDeleteBtn); recordFail(); S.hatalar++; await safeSleep(rand(10000,15000)); continue; }
      click(ilkSil);
      await sleep(400);

      let popupSil = findPopupDeleteBtn();
      if (!popupSil){ await sleep(700); popupSil=findPopupDeleteBtn(); }
      if (!popupSil){ await sleep(800); popupSil=findPopupDeleteBtn(); }
      if (!popupSil){ addLog("warn",t().msgNoPopupBtn); recordFail(); S.hatalar++; await safeSleep(rand(10000,15000)); continue; }

      click(popupSil);
      recordSuccess();
      S.silinen += secilecekler.length;
      S.hatalar  = 0;

      try {
        const preview = secilecekler[0]?.closest?.('[data-testid]')?.querySelector?.("span")?.innerText?.slice?.(0,52)
                      || `${secilecekler.length} comment(s)`;
        addDeletedPreview(preview);
      } catch(_){ addDeletedPreview(`${secilecekler.length} comment(s)`); }

      beep("tick"); updateStats();
      addLog("ok",`${secilecekler.length} ${t().msgDeleted} ${S.silinen}`);

      window.scrollBy({top:400,behavior:"smooth"});
      await safeSleep(rand(2000,4000));
      window.scrollBy({top:-250,behavior:"smooth"});

      const cd=getCooldown();
      addLog("info",`${t().msgCooldown} ${Math.floor(cd/1000)}s`);
      setStatus(`${t().statusCooldown} ${Math.floor(cd/1000)}s`,"run");
      startCD(cd);
      await safeSleep(cd);
      stopCD();
      if (!S.stopped) {
        setStatus(t().statusRunning,"run");
        addLog("info",`Tur #${S.tur} tamamlandı, devam ediyor...`);
      }

    } catch(e) {
      if (e.message==="STOPPED") break;
      S.hatalar++; recordFail();
      addLog("error",`${t().msgError} [${S.hatalar}/${CFG.maxErrors}]: ${e.message}`);
      setStatus(t().statusError,"err"); beep("error");
      clearSelectingProgress();

      if (e.message?.includes("429")||e.message?.toLowerCase().includes("rate")||
          document.title?.toLowerCase().includes("rate")) {
        addLog("warn",t().rateLimit);
        setStatus("Rate Limit — 5dk","err");
        await sleep(300000);
        S.hatalar=0;
        if (!S.stopped) setStatus(t().statusRunning,"run");
        continue;
      }

      if (S.hatalar>=CFG.maxErrors) {
        addLog("warn",`${CFG.errorPenalty/60}${t().msgTooManyErrors}`);
        sendNotif(t().notifError,t().notifErrorBody,"⚠️");
        await sleep(CFG.errorPenalty*1000);
        S.hatalar=0;
        if (!S.stopped) setStatus(t().statusRunning,"run");
      } else {
        await sleep(20000*S.hatalar);
        if (!S.stopped) setStatus(t().statusRunning,"run");
      }
    }
  }

  if (!S.stopped) {
    addLog("ok",t().msgDone);
    beep("done"); setStatus(t().statusDone,"done");
    clearInterval(statsIv); updateStats();
  }
}

// ─── BAŞLAT ───────────────────────────────────────────────────────────────────
loadSession();
buildUI();

console.log(
  "%c AUTO COMMENT DELETE  v6.0 ",
  "background:linear-gradient(90deg,#ff4d4d,#ff8a65);color:#fff;font-weight:bold;padding:6px 16px;border-radius:6px;font-size:14px;letter-spacing:.06em;"
);
console.log("%c by DOKES — github.com/dokess","color:#ff4d4d;font-size:11px;");
console.log("%c Panel sağ üstte — ▶ BAŞLAT'a bas  |  ? = yardım","color:#666;font-size:10px;");

})();
