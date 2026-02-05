 import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
 
 const corsHeaders = {
   'Access-Control-Allow-Origin': '*',
   'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
 };
 
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
 
 serve(async (req) => {
   // Handle CORS preflight requests
   if (req.method === 'OPTIONS') {
     return new Response('ok', { headers: corsHeaders });
   }
 
   try {
     const { username } = await req.json();
     
     if (!username) {
       return new Response(
         JSON.stringify({ error: 'Username is required' }),
         { 
           status: 400, 
           headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
         }
       );
     }
 
     console.log(`Fetching LeetCode stats for: ${username}`);
 
     // LeetCode GraphQL API endpoint
     const leetcodeUrl = 'https://leetcode.com/graphql';
     
     const query = `
       query getUserProfile($username: String!) {
         matchedUser(username: $username) {
           username
           profile {
             ranking
           }
           submitStatsGlobal {
             acSubmissionNum {
               difficulty
               count
             }
           }
           submissionCalendar
         }
         allQuestionsCount {
           difficulty
           count
         }
       }
     `;
 
     const response = await fetch(leetcodeUrl, {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
         'Referer': 'https://leetcode.com',
       },
       body: JSON.stringify({
         query,
         variables: { username },
       }),
     });
 
     if (!response.ok) {
       console.error(`LeetCode API error: ${response.status}`);
       throw new Error(`LeetCode API returned ${response.status}`);
     }
 
     const data = await response.json();
     
     if (data.errors || !data.data?.matchedUser) {
       console.error('LeetCode user not found or API error:', data.errors);
       return new Response(
         JSON.stringify({ error: 'User not found or API error' }),
         { 
           status: 404, 
           headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
         }
       );
     }
 
     const user = data.data.matchedUser;
     const allQuestions = data.data.allQuestionsCount;
     
     // Parse submission stats
     const submitStats = user.submitStatsGlobal?.acSubmissionNum || [];
     const getCount = (difficulty: string) => 
       submitStats.find((s: { difficulty: string; count: number }) => s.difficulty === difficulty)?.count || 0;
     
     const getTotalCount = (difficulty: string) =>
       allQuestions.find((q: { difficulty: string; count: number }) => q.difficulty === difficulty)?.count || 0;
 
     // Parse submission calendar
     let submissionCalendar: Record<string, number> = {};
     try {
       submissionCalendar = user.submissionCalendar ? JSON.parse(user.submissionCalendar) : {};
     } catch (e) {
       console.error('Failed to parse submission calendar:', e);
     }
 
     const stats: LeetCodeStats = {
       username: user.username,
       totalSolved: getCount('All'),
       easySolved: getCount('Easy'),
       mediumSolved: getCount('Medium'),
       hardSolved: getCount('Hard'),
       totalQuestions: getTotalCount('All'),
       easyTotal: getTotalCount('Easy'),
       mediumTotal: getTotalCount('Medium'),
       hardTotal: getTotalCount('Hard'),
       ranking: user.profile?.ranking || 0,
       submissionCalendar,
     };
 
     console.log(`Successfully fetched stats for ${username}:`, {
       totalSolved: stats.totalSolved,
       ranking: stats.ranking,
     });
 
     return new Response(
       JSON.stringify(stats),
       { 
         headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
       }
     );
 
   } catch (error) {
     console.error('Error fetching LeetCode stats:', error);
     return new Response(
       JSON.stringify({ 
         error: 'Failed to fetch LeetCode stats',
         message: error instanceof Error ? error.message : 'Unknown error'
       }),
       { 
         status: 500, 
         headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
       }
     );
   }
 });