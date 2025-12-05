import React from "react";
import { createRoot } from "react-dom/client";
import MobileTherapeuticCoach from "./MobileTherapeuticCoach.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MobileTherapeuticCoach />
  </React.StrictMode>
);
