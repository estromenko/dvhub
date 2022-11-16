import "./global.css";

import { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Auth from "./pages/auth";
import Main from "./pages/main";
import NotFound from "./pages/notFound";
import PullRequest from "./pages/pullRequest";
import Pulls from "./pages/pulls";
import Repository from "./pages/repository";
import store from "./store";

const App = () => {
  useEffect(() => {
    store.init().finally();
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/pulls/:id" element={<PullRequest />} />
        <Route path="/pulls" element={<Pulls />} />
        <Route path="/:username/:name" element={<Repository />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(<App />);
