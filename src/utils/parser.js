/**
 * Parses the ChatGPT conversations.json structure.
 * Each conversation has a 'mapping' which is a tree of messages.
 * This utility flattens the tree for a specific conversation.
 */

export function parseConversations(jsonData) {
  if (!Array.isArray(jsonData)) return [];

  return jsonData.map(conversation => {
    const { title, create_time, update_time, mapping, current_node } = conversation;
    
    return {
      id: conversation.id || conversation.conversation_id,
      title: title || "Untitled Conversation",
      createTime: create_time * 1000,
      updateTime: update_time * 1000,
      messages: flattenMessages(mapping, current_node)
    };
  }).sort((a, b) => b.updateTime - a.updateTime);
}

function flattenMessages(mapping, currentNodeId) {
  const messages = [];
  let currentId = currentNodeId;

  while (currentId && mapping[currentId]) {
    const node = mapping[currentId];
    const message = node.message;

    if (message && message.content && message.content.parts) {
      const text = message.content.parts.join("\n");
      if (text.trim() || message.author.role !== "system") {
        messages.unshift({
          id: message.id,
          role: message.author.role,
          content: text,
          createTime: message.create_time * 1000,
          authorName: message.author.name
        });
      }
    }

    currentId = node.parent;
  }

  return messages;
}
