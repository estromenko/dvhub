import "./global.css";

import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Login from "./pages/auth/login";
import Registration from "./pages/auth/registration";
import Issue from "./pages/issue";
import Issues from "./pages/issues";
import Main from "./pages/main";
import NotFound from "./pages/notFound";
import Profile from "./pages/profile";
import PullRequest from "./pages/pullRequest";
import Pulls from "./pages/pulls";
import Repositories from "./pages/repositories";
import Repository from "./pages/repository";
import store from "./store";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    store.init().finally(() => {
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div />;
  }

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/pulls/:id" element={<PullRequest />} />
        <Route path="/pulls" element={<Pulls />} />
        <Route path="/issues/:id" element={<Issue />} />
        <Route path="/issues" element={<Issues />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/registration" element={<Registration />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/repositories" element={<Repositories />} />
        <Route path="/:username/:name" element={<Repository />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(<App />);
