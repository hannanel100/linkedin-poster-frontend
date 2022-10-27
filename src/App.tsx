import { useState } from "react";
import "./App.css";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import axios from "axios";
import Form from "./Form";
function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Form />
    </QueryClientProvider>
  );
}

export default App;

// Path: src/App.css
// .App {
//   text-align: center;
// }

// .App-logo {
//   height: 40vmin;
//   pointer-events: none;
// }

// @media (prefers-reduced-motion: no-preference) {
//   .App-logo {
//     animation: App-logo-spin infinite 20s linear;
//   }
// }

// .App-header {
//   background-color: #282c34;
//   min-height: 100vh;
