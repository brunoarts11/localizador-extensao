var B = globalThis.browser || chrome;
B.action.onClicked.addListener(function () {
  B.sidebarAction.toggle();
});
