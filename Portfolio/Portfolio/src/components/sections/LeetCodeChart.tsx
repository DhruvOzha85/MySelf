import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { motion } from "framer-motion";
import { useMemo, useState, useEffect } from "react";

interface LeetCodeChartProps {
  easy: number;
  medium: number;
  hard: number;
}

export function LeetCodeChart({ easy, medium, hard }: LeetCodeChartProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const data = useMemo(() => [
    { name: "Easy", value: easy, color: "#00B8A3" },
    { name: "Medium", value: medium, color: "#FFC01E" },
    { name: "Hard", value: hard, color: "#EF4743" },
  ], [easy, medium, hard]);

  const total = easy + medium + hard;

  if (total === 0 || !mounted) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="h-[250px] w-full relative flex items-center justify-center p-4 bg-card/30 rounded-2xl border border-border/50"
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius="65%"
            outerRadius="90%"
            paddingAngle={5}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} className="drop-shadow-md hover:opacity-80 transition-opacity cursor-pointer" />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ 
              backgroundColor: "rgba(10, 10, 10, 0.95)", 
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "12px",
              color: "#fff",
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.5)"
            }} 
            itemStyle={{ color: "#e2e8f0", fontWeight: "600" }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-4xl md:text-5xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-br from-white to-white/50">{total}</span>
        <span className="text-sm text-muted-foreground uppercase tracking-widest mt-1 font-medium">Solved</span>
      </div>
    </motion.div>
  );
}
