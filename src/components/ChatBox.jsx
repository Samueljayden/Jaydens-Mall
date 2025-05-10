import { useState, useRef, useEffect } from 'react';

const Test = () => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: "Hello! I'm your chatbot. Type 'quit' to end the chat." }
  ]);
  const [userInput, setUserInput] = useState('');
  const endOfChatRef = useRef(null);

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    document.body.className = theme === "dark" ? "dark-mode" : "light-mode";
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // Knowledge base including pairs and responses
  const knowledgeBase = {
    greetings: ["hello", "hi", "good morning", "goodmorning", "goodafternoon", "good afternoon", "good evening", "hi ai"],
    responses: "Hello! How can I assist you today?",
    pairs: [
      // patterns and responses...
      [/hello|hi|greetings/i, ["Hello! How can I assist you today?"]],
      [/how are you|how are you doing|how do you do/i, ["I'm good maybe you how are you doing and I'm glad to assist you!"]],
      [/what do you sell|what do you offer|what's available/i, ["We offer a variety of products and services."]],
      [/info|information|details/i, ["I can provide information about the mall, its services, and products."]],
      [/what can you do|what are your capabilities|what can you help with/i, ["I can provide information about the mall, its services, and products."]],
      [/mall services|services/i, ["We offer a variety of services including shopping, dining, and entertainment."]],
      [/mall products|products/i, ["We have a wide range of products including electronics, clothing, and home goods."]],
      [/what is jaydens mall|jayden's mall/i, ["Jayden's Mall is a shopping center located in Westlands."]],
      [/mall information|information/i, ["I can provide information about the mall's stores, hours, and services."]],
      [/mall features|features/i, ["The mall features a food court, cinema, and various retail stores."]],
      [/mall facilities|facilities/i, ["Facilities include restrooms, elevators, and baby changing stations."]],
      [/what is your name|who are you/i, ["I'm Jayden's Mall Chatbot. How can I assist you?"]],
      [/mall name|mall's name/i, ["The mall is called Jayden's Mall."]],
      [/mall hours/i, ["Jayden's Mall is open from 9 AM to 9 PM, Monday through Sunday."]],
      [/location/i, ["Jayden's Mall is located at Westlands near 9West Main Street, Opposite GTCO Tower."]],
      [/parking/i, ["Yes, we offer free parking for up to 3 hours."]],
      [/wifi/i, ["Free Wi-Fi is available throughout the mall. Connect to 'JaydenMall-FreeWiFi'."]],
      [/food court|foodcourt/i, ["Our food court offers various options including fast food, vegan, and international cuisines."]],
      [/cinema/i, ["The mall has a 10-screen cinema showing the latest movies daily."]],
      [/lost and found|lostandfound/i, ["If you've lost something, please visit the customer service desk on the ground floor."]],
      [/events/i, ["We frequently host events and promotions. Check our website or social media for updates."]],
      [/security/i, ["Security is available 24/7. If you need assistance, please contact any staff member."]],
      [/stores|store/i, ["We have a variety of stores including electronics, fashion, and home goods."]],
      [/playground|play area|kids area/i, ["The mall has a dedicated kids' play area on the second floor."]],
      [/accessibility|disabled access/i, ["The mall is wheelchair accessible with ramps and elevators."]],
      [/delivery|delivery service/i, ["We offer delivery services for purchases made in the mall. Check with individual stores for details."]],
      [/school|school supplies/i, ["We have a store that specializes in school supplies and stationery."]],
      [/kitchen|kitchenware/i, ["We have a store that specializes in kitchenware and home appliances."]],
      [/women|women's clothing/i, ["We have a variety of women's clothing stores including casual, formal, and sportswear."]],
      [/men|men's clothing/i, ["We have a variety of men's clothing stores including casual, formal, and sportswear."]],
      [/children|kids|kids clothing/i, ["We have a variety of children's clothing stores including casual, formal, and sportswear."]],
      [/gyming|fitness|gym/i, ["We have a gym on the third floor with various fitness classes and equipment."]],
      [/products|product knowledge/i, ["We offer phones, laptops, tablets, desktops, computer components, speakers, and microphones."]],
      [/phones|phone/i, ["Phones come in different types: budget, mid-range, and flagship. Consider battery life, camera quality, and processing power."]],
      [/laptops|laptop/i, ["Laptops vary by purpose: gaming, business, or general use. Key factors: RAM, processor speed, SSD."]],
      [/tablets|tablet/i, ["Tablets are great for portability and entertainment. Choose Android, iOS, or Windows."]],
      [/desktops|desktop/i, ["Desktops offer powerful performance. Look for upgradability, CPU/GPU strength, and cooling."]],
      [/computer components|computercomponents/i, ["Components include CPU, GPU, RAM, SSD, motherboard, PSU. Each affects performance."]],
      [/speakers|speaker/i, ["Speakers can be wired, Bluetooth, or smart. Consider quality, battery, and compatibility."]],
      [/microphones|microphone/i, ["Microphones may be dynamic or condenser. Dynamic suits live use; condenser is best for studio."]],
      [/customer service|customerservice/i, ["For assistance, visit our customer service desk on the ground floor."]],
      [/feedback|suggestions/i, ["We value your feedback! Please fill out a form at the customer service desk."]],
      [/complaints|complaint/i, ["For complaints, please visit the customer service desk or contact us via our website."]],
      [/thank you|thanks/i, ["You're welcome! If you have more questions, feel free to ask."]],
      [/help|assist/i, ["I'm here to help! What do you need assistance with?"]],
      [/download|download app/i, ["You can download our app from the App Store or Google Play."]],
      [/app|application/i, ["Our app provides information on stores, events, and promotions. Download it for the best experience."]],
      [/payment|payment methods/i, ["We accept cash, credit/debit cards, and mobile payments."]],
      [/bye|goodbye|see you|quit|later/i, ["Goodbye! Talk later.Lovely to assist you and have a nice time."]],
      [/Sorry|pardon|excuse/i, ["Sorry I didn't get that. Please clarify."]],
    
    ]
  };

  const getResponse = (input) => {
    for (const [pattern, responses] of knowledgeBase.pairs) {
      if (pattern.test(input)) {
        return responses[Math.floor(Math.random() * responses.length)];
      }
    }
    const fallbackResponses = [
      "Sorry I didn't get that",
      "Please clarify",
      "Pardon me?"
    ];
    return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedInput = userInput.trim();
    if (!trimmedInput) return;

    const newMessages = [...messages, { sender: 'user', text: trimmedInput }];
    if (trimmedInput.toLowerCase() === 'quit') {
      newMessages.push({ sender: 'bot', text: "Goodbye! Talk later." });
    } else {
      const response = getResponse(trimmedInput);
      newMessages.push({ sender: 'bot', text: response });
    }

    setMessages(newMessages);
    setUserInput('');
  };

  useEffect(() => {
    endOfChatRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div
      style={{
        maxWidth: '500px',
        margin: '20px auto',
        fontFamily: 'Arial, sans-serif',
        backgroundImage: `url('https://example.com/your-image.jpg')`, // Replace with your actual image URL
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '20px',
        borderRadius: '10px',
        color: '#fff',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      <h2>ChatBot</h2>
      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === "dark" ? <b>☀️</b> : <b>🌙</b>}
      </button>
      <div className="chat-container" style={{ marginBottom: '20px' }}>
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <strong>{msg.sender === 'user' ? 'You' : 'Bot'}:</strong> {msg.text}
          </div>
        ))}
        <div ref={endOfChatRef} />
      </div>
      <form onSubmit={handleSubmit} style={{ display: 'flex' }} className='chat-input'>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your message..."
          style={{
            flex: 1,
            padding: '8px',
            borderRadius: '5px',
            border: '1px solid #ddd',
          }}
        />
        <button type="submit" style={{
          padding: '8px 16px',
          borderRadius: '5px',
          border: '1px solid #ddd',
          backgroundColor: '#4CAF50',
          color: 'white',
        }}>Send</button>
      </form>
    </div>
  );
};

export default Test;
