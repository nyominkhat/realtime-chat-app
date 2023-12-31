"use client";

import { Conversation, User } from "@prisma/client";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { HiChevronLeft, HiEllipsisHorizontal } from "react-icons/hi2";

import ProfileDrawer from "./ProfileDrawer";
import Avatar from "@/app/components/Avatar";
import AvatarGroup from "@/app/components/AvatarGroup";

import useOtherUser from "@/app/hooks/useOtherUser";
import useActiveList from "@/app/hooks/useActiveList";

interface HeaderProps {
  conversation: Conversation & {
    users: User[];
  };
}

const Header: React.FC<HeaderProps> = ({ conversation }) => {
  const otherUser = useOtherUser(conversation);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [otherUsername, setOtherUsername] = useState("");
  const { members } = useActiveList();

  useEffect(() => {
    if (otherUser) {
      setIsActive(members.indexOf(otherUser?.email!) !== -1);
      setOtherUsername(otherUser?.name!);
    }
  }, [members, otherUser]);

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }

    return isActive ? "Active" : "Offline";
  }, [conversation, isActive]);

  return (
    <>
      <ProfileDrawer
        data={conversation}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
      <div className="bg-white w-full flex border-b sm:px-4 py-3 px-4 lg:px-6 justify-between shadow-sm items-center">
        <div className="flex gap-3 items-center">
          <Link
            href={"/conversations"}
            className="
          lg:hidden block text-sky-500 hover:text-sky-600 transition cursor-pointer
        "
          >
            <HiChevronLeft size={32} />
          </Link>

          {conversation.isGroup ? (
            <AvatarGroup users={conversation.users} />
          ) : (
            <Avatar user={otherUser} />
          )}

          <div className="flex flex-col">
            <div>{conversation.name || otherUsername}</div>
            <div className="text-sm font-light text-neutral-500">
              {statusText}
            </div>
          </div>
        </div>

        <HiEllipsisHorizontal
          size={32}
          onClick={() => setDrawerOpen(true)}
          className="text-sky-500 cursor-pointer transition hover:text-sky-600"
        />
      </div>
    </>
  );
};

export default Header;
