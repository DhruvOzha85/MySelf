 import { useMemo } from "react";
 import { motion } from "framer-motion";
 import { useIsMobile } from "@/hooks/use-mobile";
 
 interface LeetCodeHeatmapProps {
   submissionCalendar: Record<string, number>;
 }
 
 export function LeetCodeHeatmap({ submissionCalendar }: LeetCodeHeatmapProps) {
   const isMobile = useIsMobile();
   
   const { weeks, maxSubmissions } = useMemo(() => {
     const now = new Date();
     const weeksToShow = isMobile ? 12 : 26; // Show 12 weeks on mobile, 26 on desktop
     const startDate = new Date(now);
     startDate.setDate(startDate.getDate() - (weeksToShow * 7));
     
     // Adjust to start from Sunday
     const dayOfWeek = startDate.getDay();
     startDate.setDate(startDate.getDate() - dayOfWeek);
     
     const weeksData: { date: Date; count: number }[][] = [];
     let currentWeek: { date: Date; count: number }[] = [];
     let maxCount = 0;
     
     const currentDate = new Date(startDate);
     
     while (currentDate <= now) {
       const timestamp = Math.floor(currentDate.getTime() / 1000).toString();
       const count = submissionCalendar[timestamp] || 0;
       maxCount = Math.max(maxCount, count);
       
       currentWeek.push({
         date: new Date(currentDate),
         count,
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
     
     return { weeks: weeksData, maxSubmissions: maxCount };
   }, [submissionCalendar, isMobile]);
 
   const getColor = (count: number) => {
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
       month: 'short', 
       day: 'numeric',
       year: 'numeric'
     });
   };
 
   const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
 
   return (
     <div className="overflow-x-auto">
       <div className="flex gap-1 min-w-fit">
         {/* Day labels */}
         <div className="flex flex-col gap-1 mr-2 text-xs text-muted-foreground">
           {dayLabels.map((day, i) => (
             <div 
               key={day} 
               className="h-3 flex items-center"
               style={{ visibility: i % 2 === 1 ? 'visible' : 'hidden' }}
             >
               {day}
             </div>
           ))}
         </div>
         
         {/* Heatmap grid */}
         <div className="flex gap-1">
           {weeks.map((week, weekIndex) => (
             <div key={weekIndex} className="flex flex-col gap-1">
               {week.map((day, dayIndex) => (
                 <motion.div
                   key={day.date.toISOString()}
                   initial={{ opacity: 0, scale: 0 }}
                   animate={{ opacity: 1, scale: 1 }}
                   transition={{ 
                     delay: (weekIndex * 7 + dayIndex) * 0.005,
                     duration: 0.2 
                   }}
                   className={`w-3 h-3 rounded-sm ${getColor(day.count)} transition-colors cursor-pointer hover:ring-2 hover:ring-primary/50`}
                   title={`${formatDate(day.date)}: ${day.count} submission${day.count !== 1 ? 's' : ''}`}
                 />
               ))}
             </div>
           ))}
         </div>
       </div>
       
       {/* Legend */}
       <div className="flex items-center justify-end gap-2 mt-4 text-xs text-muted-foreground">
         <span>Less</span>
         <div className="flex gap-1">
           <div className="w-3 h-3 rounded-sm bg-secondary/50" />
           <div className="w-3 h-3 rounded-sm bg-[#FFA116]/30" />
           <div className="w-3 h-3 rounded-sm bg-[#FFA116]/50" />
           <div className="w-3 h-3 rounded-sm bg-[#FFA116]/70" />
           <div className="w-3 h-3 rounded-sm bg-[#FFA116]" />
         </div>
         <span>More</span>
       </div>
     </div>
   );
 }