import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCfsVBmrH7ziGv4_CdshtDxNlgAyxViVQE",
  authDomain: "martrix-msg.firebaseapp.com",
  projectId: "martrix-msg",
  storageBucket: "martrix-msg.firebasestorage.app",
  messagingSenderId: "31207469629",
  appId: "1:31207469629:web:6ba53be6532a177c4e7054",
  measurementId: "G-0BP9EV49GD",
  databaseURL: "https://martrix-msg-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
let usuario = "";

window.entrar = () => {
  const u = document.getElementById('user').value.trim();
  if(!u) return alert("Pon tu nombre");
  usuario = u;
  document.getElementById('loginBox').style.display='none';
  document.getElementById('chatBox').style.display='flex';
  document.getElementById('status').textContent = "● " + usuario;
}

window.send = () => {
  const input = document.getElementById('msg');
  const text = input.value.trim();
  if(!text || !usuario) return;
  push(ref(db, 'mensajes'), { user: usuario, text, time: Date.now() });
  input.value = "";
}

onChildAdded(ref(db, 'mensajes'), snap => {
  const m = snap.val();
  const chat = document.getElementById('chat');
  const isMe = m.user === usuario;
  const div = document.createElement('div');
  div.className = "bubble " + (isMe ? "me" : "other");
  div.innerHTML = `<div class="meta">${m.user} • ${new Date(m.time).toLocaleTimeString()}</div>${m.text}`;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
});
