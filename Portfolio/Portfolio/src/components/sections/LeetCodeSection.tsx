 import { motion } from "framer-motion";
 import { ExternalLink, Trophy, Target, Zap, Flame } from "lucide-react";
 import { useState, useEffect, useMemo, lazy, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { socialLinks } from "@/data/portfolio";
 import { supabase } from "@/integrations/supabase/client";
 import { Skeleton } from "@/components/ui/skeleton";
 
 // Lazy load the activity heatmap for performance
 const ActivityHeatmap = lazy(() => import("./LeetCodeHeatmap").then(m => ({ default: m.LeetCodeHeatmap })));
 
 interface LeetCodeStats {
   username: string;
   totalSolved: number;
   easySolved: number;
   mediumSolved: number;
   hardSolved: number;
   totalQuestions: number;
   easyTotal: number;
   mediumTotal: number;
   hardTotal: number;
   ranking: number;
   submissionCalendar: Record<string, number>;
 }
 
 function StatCard({ 
   label, 
   value, 
   total, 
   color, 
   icon: Icon,
   delay 
 }: { 
   label: string; 
   value: number; 
   total?: number; 
   color: string;
   icon: React.ElementType;
   delay: number;
 }) {
   return (
     <motion.div
       initial={{ opacity: 0, y: 20 }}
       whileInView={{ opacity: 1, y: 0 }}
       viewport={{ once: true }}
       transition={{ delay }}
       className="bg-card/50 backdrop-blur-sm rounded-xl p-4 border border-border hover:border-primary/30 transition-colors"
     >
       <div className="flex items-center gap-2 mb-2">
         <Icon className="h-4 w-4" style={{ color }} />
         <span className="text-sm text-muted-foreground">{label}</span>
       </div>
       <div className="flex items-baseline gap-1">
         <span className="text-2xl font-bold font-display" style={{ color }}>{value}</span>
         {total && (
           <span className="text-sm text-muted-foreground">/ {total}</span>
         )}
       </div>
     </motion.div>
   );
 }
 
 function StatsLoadingSkeleton() {
   return (
     <div className="space-y-6">
       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
         {[...Array(4)].map((_, i) => (
           <div key={i} className="bg-card/50 rounded-xl p-4 border border-border">
             <Skeleton className="h-4 w-16 mb-2" />
             <Skeleton className="h-8 w-20" />
           </div>
         ))}
       </div>
       <div className="bg-card/50 rounded-xl p-6 border border-border">
         <Skeleton className="h-4 w-32 mb-4" />
         <Skeleton className="h-32 w-full" />
       </div>
     </div>
   );
 }

export function LeetCodeSection() {
   const [stats, setStats] = useState<LeetCodeStats | null>(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);
 
   useEffect(() => {
     const fetchStats = async () => {
       try {
         setLoading(true);
         setError(null);
         
         // Extract username from LeetCode URL
         const leetcodeUrl = socialLinks.leetcode;
         const username = leetcodeUrl.split('/u/')[1]?.replace('/', '') || 'DhruvOzha';
         
         const { data, error: fnError } = await supabase.functions.invoke('leetcode-stats', {
           body: { username }
         });
         
         if (fnError) throw fnError;
         if (data.error) throw new Error(data.error);
         
         setStats(data);
       } catch (err) {
         console.error('Failed to fetch LeetCode stats:', err);
         setError('Unable to load live stats');
       } finally {
         setLoading(false);
       }
     };
 
     fetchStats();
   }, []);
 
  return (
     <section id="leetcode" className="section-padding bg-gradient-to-b from-background to-card/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            <span className="gradient-text">LeetCode</span> Journey
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Practicing Data Structures & Algorithms
          </p>
        </motion.div>

         <div className="max-w-4xl mx-auto space-y-8">
           {/* Profile Card */}
           <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true, margin: "-50px" }}
             transition={{ duration: 0.5, delay: 0.2 }}
           >
             <div className="bg-card rounded-2xl border border-border p-6 md:p-8 relative overflow-hidden group hover:border-primary/50 transition-colors">
               {/* LeetCode-inspired background */}
               <div className="absolute inset-0 opacity-5">
                 <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#FFA116] blur-3xl" />
                 <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-[#1A1A1A] blur-3xl" />
               </div>
 
               <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
                 <motion.div
                   initial={{ scale: 0 }}
                   whileInView={{ scale: 1 }}
                   viewport={{ once: true }}
                   transition={{ type: "spring", delay: 0.3 }}
                   className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#FFA116] to-[#FF6B00] flex items-center justify-center flex-shrink-0"
                 >
                   <span className="text-3xl font-bold text-white font-display">LC</span>
                 </motion.div>
 
                 <div className="text-center md:text-left flex-1">
                   <h3 className="text-xl md:text-2xl font-display font-bold mb-2">
                     {stats?.username || 'DhruvOzha'}
                   </h3>
                   <p className="text-muted-foreground text-sm md:text-base mb-4">
                     Actively practicing Data Structures and Algorithms
                   </p>
                   {stats?.ranking && stats.ranking > 0 && (
                     <div className="inline-flex items-center gap-2 text-sm text-muted-foreground bg-secondary/50 px-3 py-1 rounded-full">
                       <Trophy className="h-4 w-4 text-[#FFA116]" />
                       <span>Global Rank: <strong className="text-foreground">{stats.ranking.toLocaleString()}</strong></span>
                     </div>
                   )}
                 </div>
 
                 <Button
                   size="lg"
                   className="bg-[#FFA116] hover:bg-[#FF9100] text-white flex-shrink-0"
                   asChild
                 >
                   <a
                     href={socialLinks.leetcode}
                     target="_blank"
                     rel="noopener noreferrer"
                   >
                     <ExternalLink className="h-5 w-5 mr-2" />
                     Visit Profile
                   </a>
                 </Button>
               </div>
            </div>
           </motion.div>

           {/* Stats Section */}
           {loading ? (
             <StatsLoadingSkeleton />
           ) : error ? (
             <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               className="bg-card/50 rounded-xl p-6 border border-border text-center"
             >
               <p className="text-muted-foreground">{error}</p>
               <p className="text-sm text-muted-foreground mt-2">
                 Visit the profile directly to see live statistics.
               </p>
             </motion.div>
           ) : stats ? (
             <>
               {/* Problem Solving Stats */}
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                 <StatCard
                   label="Total Solved"
                   value={stats.totalSolved}
                   total={stats.totalQuestions}
                   color="#FFA116"
                   icon={Target}
                   delay={0.1}
                 />
                 <StatCard
                   label="Easy"
                   value={stats.easySolved}
                   total={stats.easyTotal}
                   color="#00B8A3"
                   icon={Zap}
                   delay={0.2}
                 />
                 <StatCard
                   label="Medium"
                   value={stats.mediumSolved}
                   total={stats.mediumTotal}
                   color="#FFC01E"
                   icon={Flame}
                   delay={0.3}
                 />
                 <StatCard
                   label="Hard"
                   value={stats.hardSolved}
                   total={stats.hardTotal}
                   color="#EF4743"
                   icon={Trophy}
                   delay={0.4}
                 />
               </div>
 
               {/* Activity Heatmap */}
               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.5 }}
                 className="bg-card/50 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-border"
               >
                 <h4 className="text-lg font-display font-semibold mb-4 flex items-center gap-2">
                   <Flame className="h-5 w-5 text-[#FFA116]" />
                   Submission Activity
                 </h4>
                 <Suspense fallback={<Skeleton className="h-32 w-full" />}>
                   <ActivityHeatmap submissionCalendar={stats.submissionCalendar} />
                 </Suspense>
               </motion.div>
             </>
           ) : null}
         </div>
      </div>
    </section>
  );
}
