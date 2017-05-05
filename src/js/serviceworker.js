var OneSignal = window.OneSignal || [];
OneSignal.push(["init", {
  appId: "caa81f3a-0264-4b5f-916b-ff5484aa6a2b",
  autoRegister: false,
  promptOptions: {
        /* These prompt options values configure both the HTTP prompt and the HTTP popup. */
        /* actionMessage limited to 90 characters */
        actionMessage: "通知にて第65回翠巒祭の最新情報をお届けします。",
        /* acceptButtonText limited to 15 characters */
        acceptButtonText: "通知を受け取る",
        /* cancelButtonText limited to 15 characters */
        cancelButtonText: "受け取らない"
  },
  safari_web_id: 'web.onesignal.auto.14c30330-c4fb-483f-9c66-942ad147f917',
  welcomeNotification: {
        "title": "第65回翠巒祭HP",
        "message": "✔ サイトが更新されました！"
  }
}]);