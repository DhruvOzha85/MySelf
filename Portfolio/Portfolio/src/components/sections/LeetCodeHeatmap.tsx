import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface LeetCodeHeatmapProps {
  submissionCalendar: Record<string, number>;
}

export function LeetCodeHeatmap({ submissionCalendar }: LeetCodeHeatmapProps) {
  // Generate the last 12 months for the dropdown
  const monthOptions = useMemo(() => {
    const options = [];
    const now = new Date();
    for (let i = 0; i < 12; i++) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthString = d.toLocaleString('en-US', { month: 'long', year: 'numeric' });
      const valueStr = `${d.getFullYear()}-${d.getMonth()}`;
      options.push({ label: monthString, value: valueStr });
    }
    return options;
  }, []);

  const [selectedMonth, setSelectedMonth] = useState<string>(monthOptions[0].value);

  const { weeks, maxSubmissions, totalForMonth } = useMemo(() => {
    // Normalize submissionCalendar securely bypassing Timezone offsets
    const normalized: Record<string, number> = {};
    Object.entries(submissionCalendar || {}).forEach(([timestamp, count]) => {
      const date = new Date(parseInt(timestamp) * 1000);
      const dateString = `${date.getUTCFullYear()}-${date.getUTCMonth()}-${date.getUTCDate()}`; 
      normalized[dateString] = (normalized[dateString] || 0) + count;
    });

    // Parse the selected month and year
    const [selYearStr, selMonthStr] = selectedMonth.split('-');
    const selYear = parseInt(selYearStr);
    const selMonth = parseInt(selMonthStr);

    // Get the first and last day of the selected month
    const firstDayOfMonth = new Date(selYear, selMonth, 1);
    const lastDayOfMonth = new Date(selYear, selMonth + 1, 0);
    lastDayOfMonth.setHours(23, 59, 59, 999);

    // Adjust start date backwards to the most recent Sunday to safely pad the grid
    const startDate = new Date(firstDayOfMonth);
    const dayOfWeek = startDate.getDay();
    startDate.setDate(startDate.getDate() - dayOfWeek);
    startDate.setHours(0, 0, 0, 0);

    // Adjust end date forwards to the upcoming Saturday to safely pad the grid
    const endDate = new Date(lastDayOfMonth);
    const endDayOfWeek = endDate.getDay();
    if (endDayOfWeek !== 6) {
      endDate.setDate(endDate.getDate() + (6 - endDayOfWeek));
    }

    const weeksData: { date: Date; count: number; isCurrentMonth: boolean }[][] = [];
    let currentWeek: { date: Date; count: number; isCurrentMonth: boolean }[] = [];
    let maxCount = 0;
    let monthTotal = 0;
    
    const currentDate = new Date(startDate);
    
    while (currentDate <= endDate) {
      const dateString = `${currentDate.getFullYear()}-${currentDate.getMonth()}-${currentDate.getDate()}`;
      const count = normalized[dateString] || 0;
      const isCurrentMonth = currentDate.getMonth() === selMonth;

      if (isCurrentMonth) {
         maxCount = Math.max(maxCount, count);
         monthTotal += count;
      }
      
      currentWeek.push({
        date: new Date(currentDate),
        count,
        isCurrentMonth
      });
      
      if (currentWeek.length === 7) {
        weeksData.push(currentWeek);
        currentWeek = [];
      }
      
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    if (currentWeek.length > 0) {
      weeksData.push(currentWeek);
    }
    
    return { weeks: weeksData, maxSubmissions: maxCount, totalForMonth: monthTotal };
  }, [submissionCalendar, selectedMonth]);

  const getColor = (count: number, isCurrentMonth: boolean) => {
    if (!isCurrentMonth) return "bg-secondary/20"; // Dim out days that belong to previous/next month
    if (count === 0) return "bg-secondary/50";
    if (maxSubmissions === 0) return "bg-secondary/50";
    
    const intensity = count / maxSubmissions;
    if (intensity < 0.25) return "bg-[#FFA116]/30";
    if (intensity < 0.5) return "bg-[#FFA116]/50";
    if (intensity < 0.75) return "bg-[#FFA116]/70";
    return "bg-[#FFA116]";
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="flex flex-col gap-4">
      {/* Header controls */}
      <div className="flex items-center justify-between">
         <Select value={selectedMonth} onValueChange={setSelectedMonth}>
           <SelectTrigger className="w-[180px] h-9 text-xs">
             <SelectValue placeholder="Select Month" />
           </SelectTrigger>
           <SelectContent>
             {monthOptions.map((opt) => (
               <SelectItem key={opt.value} value={opt.value} className="text-xs">
                 {opt.label}
               </SelectItem>
             ))}
           </SelectContent>
         </Select>
         <div className="text-sm border border-secondary/50 bg-secondary/20 px-3 py-1.5 rounded-md font-medium text-[#FFA116]">
           {totalForMonth} submissions
         </div>
      </div>

      <div className="overflow-x-auto pb-2">
        <div className="flex gap-1 min-w-fit mx-auto justify-center">
          {/* Day labels */}
          <div className="flex flex-col gap-1 mr-2 text-[10px] text-muted-foreground justify-between">
            {dayLabels.map((day, i) => (
              <div 
                key={day} 
                className="h-4 flex items-center pr-1"
                style={{ visibility: i % 2 === 1 ? 'visible' : 'hidden' }}
              >
                {day}
              </div>
            ))}
          </div>
          
          {/* Heatmap grid */}
          <div className="flex gap-1.5">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-1.5">
                {week.map((day, dayIndex) => (
                  <motion.div
                    key={day.date.toISOString()}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      delay: (weekIndex * 7 + dayIndex) * 0.005,
                      duration: 0.2 
                    }}
                    className={`w-4 h-4 rounded-[3px] ${getColor(day.count, day.isCurrentMonth)} transition-all duration-200 ${day.isCurrentMonth ? 'cursor-pointer hover:ring-2 hover:ring-primary/50 hover:scale-110' : ''}`}
                    title={day.isCurrentMonth ? `${formatDate(day.date)}: ${day.count} submission${day.count !== 1 ? 's' : ''}` : undefined}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Legend */}
      <div className="flex items-center justify-end gap-2 text-xs text-muted-foreground mt-1">
        <span>Less</span>
        <div className="flex gap-1.5">
          <div className="w-4 h-4 rounded-[3px] bg-secondary/50" />
          <div className="w-4 h-4 rounded-[3px] bg-[#FFA116]/30" />
          <div className="w-4 h-4 rounded-[3px] bg-[#FFA116]/50" />
          <div className="w-4 h-4 rounded-[3px] bg-[#FFA116]/70" />
          <div className="w-4 h-4 rounded-[3px] bg-[#FFA116]" />
        </div>
        <span>More</span>
      </div>
    </div>
  );
}