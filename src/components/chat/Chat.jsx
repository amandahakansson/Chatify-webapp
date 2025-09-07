import "./Chat.css";
import { useEffect, useState, useRef } from "react";
import DOMPurify from "dompurify";
import { useAuth } from "../../context/useAuth";
import { getMessages, createMessage, deleteMessage } from "../../services/AuthService";

export default function Chat() {
  const { user, isLoggedIn } = useAuth();

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const messagesEndRef = useRef(null);

  const fakeChat = [
    { id: "f1", text: "Tja tja, hur mår du?", avatar: "https://i.pravatar.cc/100?img=14", username: "Johnny" },
    { id: "f2", text: "Hallå!! Svara då!!", avatar: "https://i.pravatar.cc/100?img=14", username: "Johnny" },
    { id: "f3", text: "Sover du eller?! 😴", avatar: "https://i.pravatar.cc/100?img=14", username: "Johnny" },
  ];

  async function load() {
    try {
      const data = await getMessages();
      setMessages([...fakeChat, ...data]);
      scrollToBottom();
    } catch {
      setError("Kunde inte hämta meddelanden.");
      setMessages(fakeChat);
    }
  }

  useEffect(() => {
    if (isLoggedIn) load();
  }, [isLoggedIn]);

  function isMine(msg) {
    return msg.userId === user?.id || msg.username === user?.username;
  }

  async function onSend(e) {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      const clean = DOMPurify.sanitize(text, {
        ALLOWED_TAGS: ["b", "i", "em", "strong", "a", "br"],
      });

      const response = await createMessage(clean);

      const sent = {
        id: response.latestMessage?.id || Date.now(),
        userId: user.id,
        username: user.username,
        avatar: user.avatar,
        text: clean,
      };

      setMessages((prev) => [...prev, sent]);
      setText("");
      scrollToBottom();
    } catch {
      setError("Kunde inte skicka meddelandet.");
    }
  }

  async function onDelete(id) {
    try {
      await deleteMessage(id);
      const data = await getMessages();
      setMessages([...fakeChat, ...data]);
      scrollToBottom();
    } catch {
      setError("Kunde inte radera meddelandet.");
    }
  }

  function scrollToBottom() {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }

  if (!isLoggedIn) {
    return <p>Du måste vara inloggad för att se chatten.</p>;
  }

  return (
    <div className="chat">
      {error && <p className="error">{error}</p>}

      <div className="messages">
        {messages.map((m) => {
          const isFake = fakeChat.some(f => f.id === m.id);
          const mine = isFake ? false : isMine(m);

          return (
            <Bubble
              key={m.id}
              mine={mine}
              onDelete={!isFake && mine ? () => onDelete(m.id) : undefined}
              avatar={m.avatar || (mine ? user.avatar : "")}
              username={m.username || (mine ? user.username : "Okänd")}
              dangerouslyHtml={m.text || m.content || m.message}
              fake={isFake}
            />
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <form className="composer" onSubmit={onSend}>
        <input
          placeholder="Skriv ett meddelande…"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <button>Skicka</button>
      </form>
    </div>
  );
}

function Bubble({ mine, avatar, username, dangerouslyHtml, onDelete, fake }) {
  return (
    <div className={`bubble ${mine ? "mine" : "theirs"} ${fake ? "fake" : ""}`}>
      {!mine && avatar && (
        <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6 }}>
          <img
            src={avatar}
            alt="avatar"
            width="28"
            height="28"
            style={{ borderRadius: "50%"}}
          />
          <strong>{username}</strong>
        </div>
      )}
      <div dangerouslySetInnerHTML={{ __html: dangerouslyHtml }} />
      {mine && onDelete && <button className="del" onClick={onDelete}>🗑</button>}
    </div>
  );
}
