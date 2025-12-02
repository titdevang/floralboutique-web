"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "@/app/utils/apiRequest";
import Checkbox from "../common/fields/Checkbox";
import { useCheckout } from "@/app/context/CheckoutContext";
import MessageSkeleton from "../ui/loader/MessageSkeleton";

interface Category {
  id: number;
  name: string;
  subcategories_exists: boolean;
}

interface SubCategory {
  id: number;
  name: string;
}

interface MessageItem {
  id: number;
  message: string;
}

const Message = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [loading, setLoading] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<
    number | null
  >(null);
  const [selectedMessageId, setSelectedMessageId] = useState<number | null>(
    null
  );

  const [personalizeMssage, setPersonalizeMssage] = useState(true);

  const { setMessage, message } = useCheckout()

  // -------------------------
  // Load Categories
  // -------------------------
  useEffect(() => {
    setLoading(true);
    const loadCategories = async () => {
      try {
        const res = await apiRequest<{ data: Category[] }>(
          "GET",
          "/message/category"
        );

        if (res?.status === 200) {
          const list: Category[] = res.data.data || [];
          setCategories(list);

          if (list.length > 0) {
            setSelectedCategory(list[0]);
            loadData(list[0]);
          }
        }
      } catch (error) {
        console.error("Category error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  // -------------------------
  // Load Data When Category Changes
  // -------------------------
  const loadData = async (category: Category) => {
    try {
      if (category.subcategories_exists) {
        const subRes = await apiRequest<{ data: SubCategory[] }>(
          "GET",
          `/message/sub-category/${category.id}`
        );

        if (subRes?.status === 200) {
          const list: SubCategory[] = subRes.data?.data || [];
          setSubCategories(list);

          if (list.length > 0) {
            const firstID = list[0].id;
            setSelectedSubCategoryId(firstID);
            await loadMessages(category.id, firstID);
          }
        }
      } else {
        setSubCategories([]);
        setSelectedSubCategoryId(0);

        const msgRes = await apiRequest<{ data: MessageItem[] }>(
          "GET",
          `/message/category/${category.id}/sub-category/0`
        );

        if (msgRes?.status === 200) {
          setMessages(msgRes.data.data || []);
        }
      }
    } catch (error) {
      console.error("Category load error:", error);
    }
  };

  // -------------------------
  // Load Messages by Subcategory
  // -------------------------
  const loadMessages = async (categoryId: number, subCategoryId: number) => {
    try {
      const res = await apiRequest<{ data: MessageItem[] }>(
        "GET",
        `/message/category/${categoryId}/sub-category/${subCategoryId}`
      );

      if (res?.status === 200) {
        setMessages(res.data.data || []);
      }
    } catch (error) {
      console.error("Subcategory Messages error:", error);
    }
  };

  return (
    <div className="py-6 md:px-6 px-4 bg-white rounded-[40px]">
      <div className={"flex items-center gap-4"}>
        <div className={"bg-primary w-10 h-10"}>
          <p
            className={
              "text-white flex items-center justify-center h-full text-md"
            }
          >
            3
          </p>
        </div>
        <div>
          <p className={"text-md"}>Message</p>
        </div>
      </div>
      {loading || !categories.length ? <MessageSkeleton/> : <div>
      {/* Category Buttons */}
      <div className="py-10 space-y-6">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                setSelectedCategory(cat);
                loadData(cat);
              }}
              className={`px-3 py-1.5 ${
                selectedCategory?.id === cat.id
                  ? "bg-hov-primary"
                  : "bg-primary"
              } hover:bg-hov-primary duration-300 text-white rounded-full`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="border-b border-gray-light pb-4">
          <Checkbox
            id="personalize_message"
            name="personalize_message"
            type="checkbox"
            label="Personalize your greeting message(Optional)"
            checked={personalizeMssage}
            onChange={(e) => {
              setPersonalizeMssage(e.target.checked);
              setSelectedMessageId(null);
              setMessage("");
            }}
          />
        </div>

        {!!subCategories.length && (
          <div className="flex flex-wrap gap-2">
            {subCategories.map((sub) => (
              <button
                key={sub.id}
                type="button"
                onClick={() => {
                  if (selectedCategory) {
                    loadMessages(selectedCategory.id, sub.id);
                  }
                  setSelectedSubCategoryId(sub.id);
                }}
                className={`px-3 py-1.5 ${
                  selectedSubCategoryId === sub.id
                    ? "bg-hov-primary"
                    : "bg-primary"
                } hover:bg-hov-primary duration-300 text-white rounded-full`}
              >
                {sub.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Messages + Compose */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="">
          <h3 className="text-sm mb-3">Select a message</h3>

          <div className="flex flex-col gap-3 h-full max-h-72 overflow-y-auto pr-1">
            {messages.length === 0 && (
              <p className="text-xs text-gray-500 italic">No messages found.</p>
            )}

            {messages.map((msg) => (
              <button
                key={msg.id}
                onClick={() => {
                  setMessage(msg.message);
                  setSelectedMessageId(msg.id);
                }}
                disabled={!personalizeMssage}
                className={`border text-start disabled:cursor-default rounded-sm p-3 text-sm cursor-pointer italic text-gray-extra-dark font-light transition-all duration-300 ${
                  selectedMessageId === msg.id
                    ? "border-primary"
                    : "border-gray-light"
                } hover:border-primary`}
              >
                {msg.message?.substring(0, 80)}...
              </button>
            ))}
          </div>
        </div>

        <div className="">
          <h3 className="text-sm mb-3">Compose a message</h3>

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={!personalizeMssage}
            placeholder="Write a message..."
            className="w-full h-52 p-3 border border-gray-light text-gray-extra-dark font-light italic rounded-sm text-sm focus:outline-none"
          />

          <div className="text-end">
            <button className="mt-4 px-6 py-2 bg-primary text-white rounded-sm text-sm hover:bg-hov-primary transition-all">
              Save
            </button>
          </div>
        </div>
      </div>
      </div>}
    </div>
  );
};

export default Message;
