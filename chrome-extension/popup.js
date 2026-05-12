const chat = document.getElementById("chat");
const input = document.getElementById("input");
const sendBtn = document.getElementById("send");

function addMessage(text, isUser) {
  const div = document.createElement("div");
  div.className = isUser ? "msg-user" : "msg-ai";
  div.textContent = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

sendBtn.addEventListener("click", async () => {
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, true);
  input.value = "";

  addMessage("AIが考えています…", false);
  const loadingBubble = chat.lastChild;

  try {
    const res = await fetch("https://my-ai-api-red.vercel.app/api/tutor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question: text,
        history: []
      })
    });

    const data = await res.json();
    console.log("API response:", data);

    if (data.error) {
      loadingBubble.textContent = "エラー: " + data.error;
      return;
    }

    loadingBubble.textContent = data.explanation;

  } catch (err) {
    loadingBubble.textContent = "通信エラー: " + err.message;
  }
});
