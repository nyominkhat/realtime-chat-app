import SideBar from "../components/sidebar/SideBar";
import ConversationList from "./components/ConversationList";

import getConversations from "../actions/getConversations";

export default async function ConversationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversations = await getConversations();

  return (
    <SideBar>
      <div className="h-full">
        <ConversationList initialItems={conversations} />

        {children}
      </div>
    </SideBar>
  );
}
