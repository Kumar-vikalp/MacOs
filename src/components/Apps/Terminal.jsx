import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Terminal = ({ windowId }) => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const terminalRef = useRef(null);

  // Helper to get formatted live date
  const getTerminalDate = () => {
    const now = new Date();
    // Formats to: "Sat Apr 04 15:30:08 2026"
    return now.toString().split(' ').slice(0, 6).join(' ');
  };

  // Helper to get session uptime
  const getUptime = () => {
    const totalSeconds = Math.floor(performance.now() / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    return `${hours}h ${mins}m`;
  };

  const runCommand = (cmd) => {
    const clean = cmd.trim().toLowerCase();

    if (clean === "help") {
      return (
        <div className="space-y-1">
          <div className="text-white/70 font-semibold">Available Commands:</div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-white/90">
            <div>- <b className="text-yellow-400">whoami</b></div>
            <div>- <b className="text-yellow-400">uname -a</b></div>
            <div>- <b className="text-yellow-400">sw_vers</b></div>
            <div>- <b className="text-yellow-400">pwd</b></div>
            <div>- <b className="text-yellow-400">ls</b></div>
            <div>- <b className="text-yellow-400">date</b></div>
            <div>- <b className="text-yellow-400">uptime</b></div>
            <div>- <b className="text-yellow-400">echo [text]</b></div>
            <div>- <b className="text-yellow-400">cal</b></div>
            <div>- <b className="text-yellow-400">clear</b></div>
          </div>
        </div>
      );
    }

    if (clean === "whoami") return <span className="text-green-300">guest</span>;

    if (clean === "uname -a") {
      return <span className="text-white/80">Darwin MacBook-Pro.local 23.2.0 Darwin Kernel Version 23.2.0: root:xnu-8792.61.2~1/RELEASE_X86_64 x86_64</span>;
    }

    if (clean === "sw_vers") {
      return <pre className="text-white/80">{`ProductName:    macOS\nProductVersion: 15.2.0\nBuildVersion:   24C101`}</pre>;
    }

    if (clean === "pwd") return <span className="text-white/80">/Users/guest</span>;

    if (clean === "ls") {
      return <pre className="text-green-300">Desktop   Documents   Downloads   Music   Pictures   Public</pre>;
    }

    if (clean === "date") {
      return <span className="text-white/80">{getTerminalDate()}</span>;
    }

    if (clean === "uptime") {
      return <span className="text-white/80">{getUptime()} up, 1 user, load averages: 2.08 2.15 2.10</span>;
    }

    if (clean.startsWith("echo ")) {
      return <span className="text-white/80">{cmd.slice(5)}</span>;
    }

    if (clean === "cal") {
      return (
        <pre className="text-white/80">
          {`    April 2026
Su Mo Tu We Th Fr Sa
          1  2  3  4
 5  6  7  8  9 10 11
12 13 14 15 16 17 18
19 20 21 22 23 24 25
26 27 28 29 30`}
        </pre>
      );
    }

    if (clean === "clear") return "CLEAR_SCREEN";

    return (
      <div className="text-blue-400">
        <span className="font-semibold">Hey! This is a MacOS Simulator bro 😆</span><br />
        Don&apos;t try real commands here, just explore!<br />
        <span className="text-green-400">Check out more cool stuff at <a href="https://github.com/Kumar-vikalp" target="_blank" rel="noopener noreferrer" className="underline">github.com/Kumar-vikalp</a></span>
      </div>
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanInput = input.trim();
    if (!cleanInput) return;

    const output = runCommand(cleanInput);

    if (output === "CLEAR_SCREEN") {
      setHistory([]);
    } else {
      setHistory((prev) => [...prev, { command: cleanInput, result: output }]);
    }
    
    setInput("");
  };

  // Auto-scroll to bottom when history updates
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <div className="w-full h-full flex flex-col font-mono text-white relative p-2 bg-black/90 rounded-b-lg overflow-hidden">
      <div
        ref={terminalRef}
        className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-thin scrollbar-thumb-white/20"
      >
        <div className="text-white/40 text-xs mb-4">
          Last login: {getTerminalDate()} on ttys000
        </div>

        <AnimatePresence>
          {history.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.1 }}
            >
              <div className="flex items-center gap-2">
                <span className="text-green-500">guest@macos</span>
                <span className="text-white">:</span>
                <span className="text-blue-400">~</span>
                <span className="text-white">$</span>
                <span className="text-white/90">{line.command}</span>
              </div>
              <div className="pl-4 mt-1 mb-2">{line.result}</div>
            </motion.div>
          ))}
        </AnimatePresence>

        <div className="flex items-center gap-2 text-green-400">
          <span className="text-green-500">guest@macos</span>
          <span className="text-white">:</span>
          <span className="text-blue-400">~</span>
          <span className="text-white">$</span>
          <input
            autoFocus
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
            className="bg-transparent flex-1 outline-none text-white/90 caret-white"
            spellCheck="false"
            autoComplete="off"
          />
        </div>
      </div>
    </div>
  );
};

export default Terminal;