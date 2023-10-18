import SideBar from "../components/sidebar/SideBar";
import ConversationList from "./components/ConversationList";

import getConversations from "../actions/getConversations";
import getUsers from "../actions/getUsers";

export default async function ConversationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversations = await getConversations();
  const users = await getUsers();

  return (
    <SideBar>
      <div className="h-full">
        <ConversationList initialItems={conversations} users={users} />

        {children}
      </div>
    </SideBar>
  );
}
