import React, { useState, useEffect, useRef, useCallback } from "react";
import PowerScreen from "./layouts/PowerScreen";
import LockScreen from "./layouts/LockScreen";
import Desktop from "./layouts/Desktop";
import WindowManager from "./components/Window/WindowManager";

const INACTIVITY_TIMEOUT = 60 * 1000; // 1 minute

function App() {
  const [stage, setStage] = useState<string | null>(null);
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Reset inactivity timer on any user activity
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }
    
    if (stage === "desktop") {
      inactivityTimerRef.current = setTimeout(() => {
        setStage("lock");
      }, INACTIVITY_TIMEOUT);
    }
  }, [stage]);

  // Set up activity listeners
  useEffect(() => {
    if (stage !== "desktop") {
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
        inactivityTimerRef.current = null;
      }
      return;
    }

    const activityEvents = [
      'mousedown', 'mousemove', 'keydown', 
      'scroll', 'touchstart', 'click', 'wheel'
    ];
    
    activityEvents.forEach(event => {
      window.addEventListener(event, resetInactivityTimer, { passive: true });
    });
    
    resetInactivityTimer();
    
    return () => {
      activityEvents.forEach(event => {
        window.removeEventListener(event, resetInactivityTimer);
      });
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
    };
  }, [stage, resetInactivityTimer]);

  // Persist and Restore OS State
  useEffect(() => {
    const savedState = localStorage.getItem("os_state");
    const savedTime = localStorage.getItem("os_state_time");
    
    if (!savedState || !savedTime) {
      setStage("power");
      return;
    }

    const lastVisit = Number(savedTime);
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;

    if (now - lastVisit < oneDay) {
      setStage(savedState);
    } else {
      setStage("power");
    }
  }, []);

  // Global Context Menu Disable
  useEffect(() => {
    const disableRightClick = (e: MouseEvent) => e.preventDefault();
    document.addEventListener("contextmenu", disableRightClick);
    return () => document.removeEventListener("contextmenu", disableRightClick);
  }, []);

  // Update Persistence
  useEffect(() => {
    if (!stage) return;
    localStorage.setItem("os_state", stage);
    localStorage.setItem("os_state_time", String(Date.now()));
  }, [stage]);

  if (!stage) return null;

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">
      {/* 1. Initial Power/Boot Screen */}
      {stage === "power" && (
        <PowerScreen goNext={() => setStage("lock")} />
      )}
      
      {/* 2. The Desktop Layer (Renders behind Lock for slide transitions) */}
      {(stage === "lock" || stage === "desktop") && (
        <div className="absolute inset-0">
          <Desktop setStage={setStage} isLocked={stage === "lock"} />
        </div>
      )}
      
      {/* 3. The Window Layer (ONLY visible when desktop is active) */}
      {stage === "desktop" && (
        <WindowManager />
      )}
      
      {/* 4. The Lock Screen Overlay (Highest Z-index) */}
      {stage === "lock" && (
        <div className="absolute inset-0 z-50">
          <LockScreen goNext={() => setStage("desktop")} />
        </div>
      )}
    </div>
  );
}

export default App;
