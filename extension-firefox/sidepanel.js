(function () {
  var B = globalThis.browser || chrome;
  var CHAT_URL = "https://n8n.ebruno.com.br/webhook/localizador-chat";
  var elM = document.getElementById("messages");
  var elW = document.getElementById("welcome");
  var elI = document.getElementById("input");
  var elS = document.getElementById("btnSend");
  var elSt = document.getElementById("status");

  async function getSession() {
    var st = await B.storage.local.get("sessionId");
    if (st.sessionId) return st.sessionId;
    var s = "web-" + Date.now() + "-" + Math.random().toString(36).slice(2, 10);
    await B.storage.local.set({ sessionId: s });
    return s;
  }
  function esc(t) { return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function linkify(t) { return esc(t).replace(/(https?:\/\/[^\s<]+)/g, function (u) { return '<a href="' + u + '" target="_blank" rel="noopener noreferrer">' + u + "</a>"; }); }
  function add(text, cls, html) {
    if (elW) elW.style.display = "none";
    var d = document.createElement("div");
    d.className = "msg " + cls;
    if (html) d.innerHTML = linkify(text); else d.textContent = text;
    elM.appendChild(d); elM.scrollTop = elM.scrollHeight;
    return d;
  }
  function typing() {
    var d = document.createElement("div");
    d.className = "typing"; d.innerHTML = "<span></span><span></span><span></span>";
    elM.appendChild(d); elM.scrollTop = elM.scrollHeight;
    return d;
  }
  async function send() {
    var text = elI.value.trim();
    if (!text) return;
    add(text, "user", false);
    elI.value = ""; elI.style.height = "auto";
    elS.disabled = true; elSt.textContent = "Consultando...";
    var t = typing();
    try {
      var sid = await getSession();
      var res = await fetch(CHAT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "sendMessage", sessionId: sid, chatInput: text })
      });
      t.remove();
      if (!res.ok) { var b = await res.text(); throw new Error("HTTP " + res.status + (b ? " - " + b.slice(0, 200) : "")); }
      var ct = res.headers.get("content-type") || "";
      var data = ct.indexOf("application/json") >= 0 ? await res.json() : await res.text();
      var reply = typeof data === "string" ? data : (data.output != null ? data.output : (data.text != null ? data.text : JSON.stringify(data)));
      if (typeof reply !== "string") reply = JSON.stringify(reply, null, 2);
      add(reply || "(resposta vazia)", "bot", true);
      elSt.textContent = "Pronto";
    } catch (e) {
      t.remove();
      var msg = (e && e.message && (e.message.indexOf("NetworkError") >= 0 || e.message.indexOf("Failed to fetch") >= 0))
        ? "Sem conexão com o servidor. Verifique sua internet."
        : "Falha ao consultar o assistente: " + e.message;
      add(msg + "\nTente novamente em instantes.", "err", false);
      elSt.textContent = "Erro";
    } finally {
      elS.disabled = false; elI.focus();
    }
  }
  elS.addEventListener("click", send);
  elI.addEventListener("keydown", function (e) { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } });
  elI.addEventListener("input", function () { elI.style.height = "auto"; elI.style.height = Math.min(elI.scrollHeight, 130) + "px"; });
  document.getElementById("btnNew").addEventListener("click", async function () {
    var ok = confirm("Iniciar nova conversa? Sera necessario informar o codigo de acesso novamente.");
    if (!ok) return;
    await B.storage.local.remove("sessionId");
    var ms = elM.querySelectorAll(".msg, .typing");
    for (var j = 0; j < ms.length; j++) ms[j].remove();
    if (elW) elW.style.display = "";
    elSt.textContent = "Nova conversa";
  });
  elI.focus();
})();
