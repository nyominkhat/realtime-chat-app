"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { MdOutlineGroupAdd } from "react-icons/md";
import { User } from "@prisma/client";

import ConversationBox from "./ConversationBox";
import GroupChatModal from "./GroupChatModal";

import { FullConversationType } from "@/app/types";
import useConversation from "@/app/hooks/useConversation";

interface ConversationListProps {
  initialItems: FullConversationType[];
  users: User[];
}

const ConversationList: React.FC<ConversationListProps> = ({
  initialItems,
  users,
}) => {
  const [items, setItems] = useState(initialItems);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  // useEffect(() => {
  //   setItems(initialItems);
  // }, [initialItems]);

  const { conversationId, isOpen } = useConversation();

  return (
    <>
      <GroupChatModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        users={users}
      />

      <aside
        className={clsx(
          `
  fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200
  `,
          isOpen ? "hidden" : "block w-full left-0"
        )}
      >
        <div className="px-5">
          <div className="flex justify-between mb-4 pt-4">
            <div className="text-2xl font-bold text-neutral-800">Messages</div>

            <div
              onClick={() => setIsModalOpen(true)}
              className="rounded-full p-2 bg-gray-100 cursor-pointer hover:opacity-75 transition text-gray-600"
            >
              <MdOutlineGroupAdd size={20} />
            </div>
          </div>

          {items.map((item) => (
            <ConversationBox
              key={item.id}
              data={item}
              selected={conversationId === item.id}
            />
          ))}
        </div>
      </aside>
    </>
  );
};

export default ConversationList;
