import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Loader, RefreshCw, AlertCircle, MessageCircle, X, Minimize2, Maximize2, Volume2, VolumeX, Copy, Check } from 'lucide-react';

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [copiedMessageId, setCopiedMessageId] = useState(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'undefined';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  }, [messages, isOpen, isMinimized]);

  // Auto-resize textarea
  const adjustTextareaHeight = (textarea) => {
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
  };

  const playNotificationSound = () => {
    if (soundEnabled) {
      // Simple notification sound using Web Audio API
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.2);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setIsTyping(true);
    setError('');
    setShowWelcome(false);

    // Auto-resize textarea back to single line
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
    }

    try {
      const response = await fetch(`${API_BASE_URL}/bot/student-query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: input.trim(),
        }),
      });

      const data = await response.json();

      // Simulate typing delay for better UX
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (data.success && data.response) {
        const botMessage = {
          id: Date.now() + 1,
          role: 'assistant',
          content: data.response,
          timestamp: new Date(),
        };

        setMessages(prev => [...prev, botMessage]);
        playNotificationSound();
      } else {
        setError(data.error || 'Failed to get response');
      }
    } catch (err) {
      console.error('Chat error:', err);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    setError('');
    setShowWelcome(true);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    adjustTextareaHeight(e.target);
  };

  const copyMessage = async (messageId, content) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedMessageId(messageId);
      setTimeout(() => setCopiedMessageId(null), 2000);
    } catch (err) {
      console.error('Failed to copy message:', err);
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  const minimizeChat = () => {
    setIsMinimized(true);
  };

  const maximizeChat = () => {
    setIsMinimized(false);
  };

  const quickReplies = [
    "How can you help me?",
    "What subjects can you assist with?",
    "Give me study tips",
    "Explain a concept"
  ];

  const handleQuickReply = (reply) => {
    setInput(reply);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={toggleChat}
            className="group relative w-16 h-16 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white rounded-full shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center animate-pulse hover:animate-none"
            title="Open AI Assistant"
          >
            <MessageCircle className="w-7 h-7 transition-transform group-hover:scale-110" />
            
            {/* Floating notification badge */}
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-bounce">
              AI
            </div>
            
            {/* Tooltip */}
            <div className="absolute -top-16 right-0 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap transform translate-y-2 group-hover:translate-y-0 pointer-events-none">
              Chat with AI Assistant
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
            </div>
            
            {/* Ripple effect */}
            <div className="absolute inset-0 rounded-full bg-white opacity-20 scale-0 group-hover:scale-100 transition-transform duration-300"></div>
          </button>
        </div>
      )}

      {/* Chat Popup */}
      {isOpen && (
        <div className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ease-in-out transform ${
          isMinimized 
            ? 'w-80 h-16 scale-95' 
            : 'w-96 h-[650px] scale-100'
        } ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col h-full overflow-hidden backdrop-blur-sm bg-white/95">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white p-4 flex items-center justify-between rounded-t-2xl">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Bot className="w-7 h-7" />
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
                </div>
                <div>
                  <h1 className="text-lg font-bold">AI Assistant</h1>
                  {!isMinimized && (
                    <p className="text-xs opacity-90 flex items-center">
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                      Online • Ready to help
                    </p>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-1">
                {!isMinimized && (
                  <>
                    <button
                      onClick={() => setSoundEnabled(!soundEnabled)}
                      className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-all duration-200 transform hover:scale-105"
                      title={soundEnabled ? 'Disable sound' : 'Enable sound'}
                    >
                      {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={clearChat}
                      className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-all duration-200 transform hover:scale-105"
                      title="Clear chat"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  </>
                )}
                
                <button
                  onClick={isMinimized ? maximizeChat : minimizeChat}
                  className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-all duration-200 transform hover:scale-105"
                  title={isMinimized ? 'Maximize' : 'Minimize'}
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </button>
                
                <button
                  onClick={toggleChat}
                  className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-all duration-200 transform hover:scale-105"
                  title="Close chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Content */}
            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white">
                  {/* Welcome Message */}
                  {showWelcome && messages.length === 0 && (
                    <div className="text-center py-8 animate-fade-in">
                      <div className="relative inline-block">
                        <Bot className="w-16 h-16 mx-auto text-blue-500 mb-4" />
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-ping"></div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        Welcome to AI Assistant! 👋
                      </h3>
                      <p className="text-sm text-gray-600 mb-6 max-w-xs mx-auto">
                        I'm here to help you with your studies, answer questions, and provide guidance on any topic.
                      </p>
                      
                      {/* Quick Reply Buttons */}
                      <div className="space-y-2">
                        <p className="text-xs text-gray-500 font-medium">Try asking:</p>
                        <div className="flex flex-wrap gap-2 justify-center">
                          {quickReplies.map((reply, index) => (
                            <button
                              key={index}
                              onClick={() => handleQuickReply(reply)}
                              className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-xs hover:bg-blue-200 transition-colors duration-200 transform hover:scale-105"
                            >
                              {reply}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Messages */}
                  {messages.map((message, index) => (
                    <div
                      key={message.id}
                      className={`flex items-start space-x-3 animate-slide-in ${
                        message.role === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      {message.role === 'assistant' && (
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                      )}
                      
                      <div className="group relative">
                        <div
                          className={`max-w-xs rounded-2xl p-4 shadow-md transition-all duration-200 hover:shadow-lg ${
                            message.role === 'user'
                              ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white ml-auto'
                              : 'bg-white border border-gray-100 hover:border-gray-200'
                          }`}
                        >
                          <p className="text-sm whitespace-pre-wrap break-words leading-relaxed">
                            {message.content}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <p
                              className={`text-xs ${
                                message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                              }`}
                            >
                              {formatTime(message.timestamp)}
                            </p>
                            
                            {message.role === 'assistant' && (
                              <button
                                onClick={() => copyMessage(message.id, message.content)}
                                className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-100 rounded transition-all duration-200"
                                title="Copy message"
                              >
                                {copiedMessageId === message.id ? (
                                  <Check className="w-3 h-3 text-green-500" />
                                ) : (
                                  <Copy className="w-3 h-3 text-gray-400" />
                                )}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>

                      {message.role === 'user' && (
                        <div className="w-8 h-8 bg-gradient-to-r from-gray-500 to-gray-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                          <User className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Typing Indicator */}
                  {(isLoading || isTyping) && (
                    <div className="flex items-start space-x-3 animate-fade-in">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-white border border-gray-100 shadow-md rounded-2xl p-4 flex items-center space-x-3">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                        <span className="text-sm text-gray-600">AI is thinking...</span>
                      </div>
                    </div>
                  )}

                  {/* Error Message */}
                  {error && (
                    <div className="flex items-center space-x-3 p-4 bg-red-50 border border-red-200 rounded-2xl animate-shake">
                      <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-500" />
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="border-t  bg-slate-950  text-slate-700  p-4 rounded-b-2xl">
                  <div className="flex space-x-3 items-end">
                    <div className="flex-1 relative">
                      <textarea
                        ref={inputRef}
                        value={input}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your message.."
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200 placeholder-gray-400"
                        rows={1}
                        disabled={isLoading}
                        style={{ maxHeight: '120px' }}
                      />
                    </div>
                    <button
                      onClick={sendMessage}
                      disabled={!input.trim() || isLoading}
                      className="px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-black rounded-xl hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center transform hover:scale-105 disabled:hover:scale-100 shadow-md hover:shadow-lg"
                    >
                      {isLoading ? (
                        <Loader className="w-5 h-5 animate-spin" />
                      ) : (
                        <Send className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Mobile Overlay */}
      {isOpen && !isMinimized && (
        <div 
          className="fixed inset-0 bg-white bg-opacity-30 z-40 md:hidden backdrop-blur-sm transition-opacity duration-300"
          onClick={minimizeChat}
        />
      )}

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-in {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        
        .animate-slide-in {
          animation: slide-in 0.4s ease-out;
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </>
  );
};

export default ChatBot;