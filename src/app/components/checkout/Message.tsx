'use client'
import { useState } from 'react'

const Message = () => {
    const messages = [
      "The only reason you need to express your best wishes is a heart full of love. So here’s sending...",
      "For being such a wonderful and understanding person, you deserve only the best. Here’s a token...",
    ];

    const [selected, setSelected] = useState<string | null>(null);
    const [customMessage, setCustomMessage] = useState("");
  return (
    <div className="p-6 bg-white rounded-[40px]">
      <div className="flex gap-4">
        <div className="w-1/2">
          <h3 className="text-sm mb-3">Select a message</h3>
          <div className="flex flex-col gap-3">
            {messages.map((msg, index) => (
              <div
                key={index}
                onClick={() => {
                  setSelected(msg);
                  setCustomMessage(msg);
                }}
                className={`border text-gray-extra-dark font-light italic rounded-sm p-3 text-sm cursor-pointer transition-all duration-300 hover:border-primary
${selected === msg ? "border-primary" : "border-gray-light"}`}
              >
                {msg.substring(0, 80)}...
              </div>
            ))}
          </div>
        </div>

        {/* Right: Compose a message */}
        <div className="w-1/2">
          <h3 className="text-sm mb-3">Compose a message</h3>
          <textarea
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
            placeholder="Write a message or choose and edit any of the suggestions."
            className="w-full h-32 p-3 border border-gray-light text-gray-extra-dark font-light italic rounded-sm text-sm focus:outline-none focus:ring-0"
          />

          <div className="text-end">
            <button className="mt-4 px-6 py-2 bg-primary hover:bg-hov-primary text-white rounded-sm text-sm transition-all">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Message