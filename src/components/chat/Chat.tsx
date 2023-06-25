import SubmitMessage from "./components/SubmitMessage";
import ChatHeader from "./components/ChatHeader";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import { useRef, useEffect } from "react";
import LoadingMessages from "../LoadingStates/LoadingMessages";
import Container from "../Container/Container";
import useUserData from "../../hooks/useQueryHooks/useUserData";
import Messages from "./components/Messages";
import useChatContext from "../../hooks/useContextHooks/useChatContext";

const Chat = () => {
  const { messages } = useChatContext();
  const scrollRef = useRef<HTMLDivElement>(null);
  const userSet = useUserData();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

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
