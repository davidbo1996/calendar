/* eslint-disable no-use-before-define */
import "./assets/App.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Calendar from "./pages/Calendar";
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Calendar />
    </QueryClientProvider>
  );
}

export default App;
