import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import type { Tactic } from '../../types/database';
import { TacticCard } from '../../components/TacticCard';
import { Loader } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export const TacticDetailPage = () => {
 const { id } = useParams();
 const [tactic, setTactic] = useState<Tactic | null>(null);
 const [loading, setLoading] = useState(true);

 <Helmet>
   <title>{tactic ? tactic.tactic_name + " - Best FC25 Tactic" : "Loading..."}</title>
   <meta name="description" content={tactic ? tactic.description : "Explore top FC25 tactics with detailed insights."} />
   <meta name="keywords" content="FC25, tactics, best formations, meta tactics" />
 </Helmet>
 
 useEffect(() => {
   const fetchTactic = async () => {
     setLoading(true);
     try {
       const { data, error } = await supabase
         .from('tacticsTable')
         .select('*')
         .eq('id', id)
         .single();

       if (error) throw error;
       setTactic(data);
     } catch (error) {
       console.error('Error fetching tactic:', error);
     } finally {
       setLoading(false);
     }
   };

   fetchTactic();
 }, [id]);

 if (loading) return (
   <div className="flex justify-center items-center min-h-screen">
     <Loader className="animate-spin" size={32} />
   </div>
 );

 if (!tactic) return <div>Tactic not found</div>;

 return (
   <div className="flex-1 bg-gradient-to-b from-gray-900 to-black overflow-auto pt-16 md:pt-0">
     <div className="p-4 md:p-8 max-w-4xl mx-auto">
       <TacticCard 
         tactic={tactic}
         isExpanded={true}
         onToggle={() => {}}
       />
     </div>
   </div>
 );
};