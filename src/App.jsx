import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  Upload,
  MessageSquare,
  Clock,
  History,
  FileJson,
  X,
  Github,
  Moon,
  Sun
} from 'lucide-react';
import { format } from 'date-fns';
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';
import { parseConversations } from './utils/parser';
import './App.css';

const md = new MarkdownIt({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value;
      } catch (__) { }
    }
    return ''; // use external default escaping
  }
});

function App() {
  const [conversations, setConversations] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);
        const parsed = parseConversations(json);
        setConversations(parsed);
        if (parsed.length > 0) {
          setSelectedId(parsed[0].id);
        }
      } catch (err) {
        alert("Erro ao ler o ficheiro JSON. Certifica-te que é um formato válido de exportação do ChatGPT.");
      }
    };
    reader.readAsText(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type === "application/json") {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const json = JSON.parse(event.target.result);
          const parsed = parseConversations(json);
          setConversations(parsed);
          if (parsed.length > 0) {
            setSelectedId(parsed[0].id);
          }
        } catch (err) {
          alert("Erro ao ler o ficheiro JSON.");
        }
      };
      reader.readAsText(file);
    }
  };

  const filteredConversations = useMemo(() => {
    if (!searchTerm) return conversations;
    const lowerSearch = searchTerm.toLowerCase();
    return conversations.filter(conv =>
      conv.title.toLowerCase().includes(lowerSearch) ||
      conv.messages.some(msg => msg.content.toLowerCase().includes(lowerSearch))
    );
  }, [conversations, searchTerm]);

  const activeConversation = useMemo(() =>
    conversations.find(c => c.id === selectedId),
    [conversations, selectedId]
  );

  return (
    <div className="app-container"
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1><MessageSquare size={24} /> ChatGPT Viewer</h1>
          <div className="search-box">
            <Search size={18} />
            <input
              type="text"
              placeholder="Pesquisar conversas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="conversation-list">
          {filteredConversations.map(conv => (
            <div
              key={conv.id}
              className={`conversation-item ${selectedId === conv.id ? 'active' : ''}`}
              onClick={() => setSelectedId(conv.id)}
            >
              <div className="title">{conv.title}</div>
              <div className="date">{format(conv.createTime, 'dd MMM yyyy')}</div>
            </div>
          ))}
          {conversations.length > 0 && filteredConversations.length === 0 && (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
              Nenhuma conversa encontrada.
            </div>
          )}
        </div>
      </aside>

      <main className="main-content">
        {!activeConversation ? (
          <div className="welcome-area">
            <div className={`drop-zone ${isDragging ? 'dragging' : ''}`} onClick={() => document.getElementById('fileInput').click()}>
              <FileJson />
              <h2>Importar Conversas</h2>
              <p>Arrasta o ficheiro <code>conversations.json</code> ou clica para selecionar.</p>
              <input
                id="fileInput"
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />
            </div>
          </div>
        ) : (
          <>
            <div className="chat-container">
              {activeConversation.messages.map((msg, idx) => (
                <div key={idx} className={`message ${msg.role}`}>
                  <div className="message-bubble">
                    <div
                      className="message-content"
                      dangerouslySetInnerHTML={{ __html: md.render(msg.content) }}
                    />
                  </div>
                  <div className="message-meta">
                    {msg.role === 'user' ? 'Tu' : (msg.authorName || 'ChatGPT')} • {format(msg.createTime, 'HH:mm')}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
