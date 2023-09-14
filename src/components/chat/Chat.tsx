import SubmitMessage from "./components/SubmitMessage";
import ChatHeader from "./components/ChatHeader";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import { useRef } from "react";
import Container from "../Container/Container";
import useUserData from "../../hooks/useQueryHooks/useUserData";
import Messages from "./components/Messages";

const Chat = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const userSet = useUserData();

  return (
    <Container>
      <ChatHeader />
      <main className="chat">
        <ErrorBoundary>
          <Messages />
        </ErrorBoundary>
        <div ref={scrollRef} className="dummyscroll"></div>
      </main>
      <SubmitMessage username={userSet.data?.name} />
    </Container>
  );
};

export default Chat;
