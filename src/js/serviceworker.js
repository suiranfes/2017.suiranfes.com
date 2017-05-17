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
  
    notifyButton: {
    enable: true, /* Required to use the notify button */
    size: 'medium', /* One of 'small', 'medium', or 'large' */
    theme: 'default', /* One of 'default' (red-white) or 'inverse" (white-red) */
    position: 'bottom-right', /* Either 'bottom-left' or 'bottom-right' */
    offset: {
      bottom: '0px',
      left: '0px', /* Only applied if bottom-left */
      right: '0px' /* Only applied if bottom-right */
    },
    prenotify: true, /* Show an icon with 1 unread message for first-time site visitors */
    showCredit: false, /* Hide the OneSignal logo */
    text: {
      'tip.state.unsubscribed': '通知を受け取る',
      'tip.state.subscribed': "通知は許可済みです。",
      'tip.state.blocked': "通知は拒否されています。",
      'message.prenotify': 'クリックすると通知の設定ができます。',
      'message.action.subscribed': "通知を受け取っていただきありがとうございます。",
      'message.action.resubscribed': "通知はすでに許可されています。",
      'message.action.unsubscribed': "通知は拒否されました。",
      'dialog.main.title': 'サイトの更新の通知を受け取ることができます。',
      'dialog.main.button.subscribe': '受け取る',
      'dialog.main.button.unsubscribe': '拒否',
      'dialog.blocked.title': '是非通知を受け取ってください。',
      'dialog.blocked.message': ""
    }
  },
  welcomeNotification: {
        "title": "第65回翠巒祭HP",
        "message": "✔ サイトが更新されました！"
  }
}]);

$(window).on('load',function(){
OneSignal.push(function() {
  OneSignal.showHttpPrompt();
});
});