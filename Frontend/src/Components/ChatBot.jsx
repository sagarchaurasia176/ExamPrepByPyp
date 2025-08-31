import React, { useState, useEffect, useRef } from "react";
import {
  Send,
  Bot,
  User,
  Loader,
  RotateCcw,
  AlertCircle,
  MessageCircle,
  X,
  Minimize2,
  Maximize2,
  Copy,
  Check,
} from "lucide-react";
import axios from "axios";

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [copiedMessageId, setCopiedMessageId] = useState(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  }, [messages, isOpen, isMinimized]);

  const adjustTextareaHeight = (textarea) => {
    textarea.style.height = "auto";
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + "px";
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setError("");
    setShowWelcome(false);

    if (inputRef.current) {
      inputRef.current.style.height = "auto";
    }
    // bot/student-query
    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/bot/student-query",
        {
          userQuery: input.trim(),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // const response = await fetch("http://localhost:5000/bot/student-query", {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     userQuery: input.trim(),
      //   }),
      // });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Debug: Log the actual response structure
      console.log("API Response:", data);

      await new Promise((resolve) => setTimeout(resolve, 800));

      // Handle the response
      if (data.success && data.response) {
        const botMessage = {
          id: Date.now() + 1,
          role: "assistant",
          content: data.response,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMessage]);
      } else if (data.answer) {
        // Fallback for current backend format
        const botMessage = {
          id: Date.now() + 1,
          role: "assistant",
          content: data.answer,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        console.error("Unexpected response format:", data);
        setError(data.error || "Failed to get response from AI");
      }
    } catch (err) {
      console.error("Chat error:", err);
      setError(`Connection failed: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    setError("");
    setShowWelcome(true);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
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
      console.error("Failed to copy message:", err);
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
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
    "Explain a concept",
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
            className="group relative w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 text-black rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
            title="PYP-Assistant"
          >
            <MessageCircle className="w-10 h-10 text-white  bg-white/20 rounded-full p-1" />

            {/* Status indicator */}
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white">
              <div className="w-full h-full bg-green-400 rounded-full animate-ping"></div>
            </div>

            {/* Hover tooltip */}
            <div className="absolute bottom-full right-0 mb-2 bg-gray-900 text-white px-3 py-1.5 rounded-lg text-sm animate-bounce whitespace-nowrap z-50  ">
              Chat with AI
              <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
            </div>
          </button>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ease-out ${
            isMinimized ? "w-80 h-14" : "w-96 h-[600px]"
          }`}
        >
          <div className="bg-slate-950 rounded-xl shadow-2xl border border-gray-200 flex flex-col h-full overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4 flex items-center justify-between rounded-t-xl">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <h1 className=" text-indigo-100 text-md">
                    Learn In XR (AI-Assistant)
                  </h1>
                  {!isMinimized && (
                    <p className="text-xs text-indigo-100">
                      Always here to help
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-1">
                {!isMinimized && (
                  <button
                    onClick={clearChat}
                    className="p-1.5 hover:bg-white/20 rounded-lg transition-colors duration-200"
                    title="Clear chat"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                )}

                <button
                  onClick={isMinimized ? maximizeChat : minimizeChat}
                  className="p-1.5 hover:bg-white/20 rounded-lg transition-colors duration-200"
                  title={isMinimized ? "Maximize" : "Minimize"}
                >
                  {isMinimized ? (
                    <Maximize2 className="w-4 h-4" />
                  ) : (
                    <Minimize2 className="w-4 h-4" />
                  )}
                </button>

                <button
                  onClick={toggleChat}
                  className="p-1.5 hover:bg-white/20 rounded-lg transition-colors duration-200"
                  title="Close chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Content */}
            {!isMinimized && (
              <>
                {/* Messages Container */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                  {/* Welcome Screen */}
                  {showWelcome && messages.length === 0 && (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Bot className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        Welcome! I'm your AI Assistant 👋
                      </h3>
                      <p className="text-sm font-semibold text-gray-600 mb-6 leading-relaxed">
                        Hi! I’m your guide on Learn In XR — here to assist with
                        questions, explain tough topics, and take your learning
                        to the next level with immersive experiences
                      </p>

                      <div className="space-y-3">
                        <p className="text-xs text-gray-500 font-medium">
                          Quick start:
                        </p>
                        <div className="grid grid-cols-1 gap-2">
                          {quickReplies.map((reply, index) => (
                            <button
                              key={index}
                              onClick={() => handleQuickReply(reply)}
                              className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 hover:border-indigo-300 transition-all duration-200 hover:shadow-sm"
                            >
                              {reply}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Messages */}
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.role === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`flex max-w-xs lg:max-w-md ${
                          message.role === "user"
                            ? "flex-row-reverse"
                            : "flex-row"
                        } space-x-2`}
                      >
                        {/* Avatar */}
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            message.role === "user"
                              ? "bg-indigo-500 ml-2"
                              : "bg-gray-300 mr-2"
                          }`}
                        >
                          {message.role === "user" ? (
                            <User className="w-4 h-4 text-black" />
                          ) : (
                            <Bot className="w-4 h-4 text-gray-600" />
                          )}
                        </div>

                        {/* Message Bubble */}
                        <div className="group relative">
                          <div
                            className={`rounded-2xl px-4 py-3 shadow-sm ${
                              message.role === "user"
                                ? "bg-indigo-500 text-white"
                                : "bg-slate-950  border border-gray-200"
                            }`}
                          >
                            <p className="text-sm leading-relaxed whitespace-pre-wrap">
                              {message.content}
                            </p>
                          </div>

                          {/* Message meta */}
                          <div
                            className={`flex items-center mt-1 space-x-2 ${
                              message.role === "user"
                                ? "justify-end"
                                : "justify-start"
                            }`}
                          >
                            <span className="text-xs text-gray-500">
                              {formatTime(message.timestamp)}
                            </span>

                            {message.role === "assistant" && (
                              <button
                                onClick={() =>
                                  copyMessage(message.id, message.content)
                                }
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
                    </div>
                  ))}

                  {/* Typing Indicator */}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="flex space-x-2">
                        <div className="w-8 h-8  bg-slate-900 rounded-full flex items-center justify-center flex-shrink-0">
                          <Bot className="w-4 h-4  text-white" />
                        </div>
                        <div className="bg-slate-950 border border-gray-200 text-white rounded-2xl px-4 py-3 shadow-sm">
                          <div className="flex items-center space-x-2">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                              <div
                                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                style={{ animationDelay: "0.1s" }}
                              ></div>
                              <div
                                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                style={{ animationDelay: "0.2s" }}
                              ></div>
                            </div>
                            <span className="text-xs text-gray-500">
                              Thinking...
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Error Message */}
                  {error && (
                    <div className="flex items-center space-x-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="border-t border-gray-200 p-4 bg-slate-950 text-black rounded-b-xl">
                  <div className="flex space-x-3 items-end">
                    <div className="flex-1 relative">
                      <textarea
                        ref={inputRef}
                        value={input}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask me anything..."
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none transition-all duration-200 placeholder-gray-400"
                        rows={1}
                        disabled={isLoading}
                        style={{ maxHeight: "120px" }}
                      />
                    </div>
                    <button
                      onClick={sendMessage}
                      disabled={!input.trim() || isLoading}
                      className="px-4 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center transform hover:scale-105 disabled:hover:scale-100"
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
    </>
  );
};

export default ChatBot;
